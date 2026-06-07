interface Env {
  PHP_CONTACT_URL?: string
}

interface ContactBody {
  nume?: string
  prenume?: string
  email?: string
  telefon?: string
  subiect?: string
  mesaj?: string
  hp_field?: string
}

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const recentRequests = new Map<string, number[]>()

function clientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) return true
  hits.push(now)
  recentRequests.set(ip, hits)
  return false
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isPhone(v: string): boolean {
  return /^\+?[0-9\s\-()]{6,20}$/.test(v)
}

function bad(message: string, status = 400): Response {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { 'Content-Type': 'application/json' } }
  )
}

export async function onRequestPost(
  context: { request: Request; env: Env }
): Promise<Response> {
  const ip = clientIp(context.request)
  if (isRateLimited(ip)) {
    return bad('Prea multe cereri. Încearcă din nou mai târziu.', 429)
  }

  let body: ContactBody
  try {
    body = await context.request.json() as ContactBody
  } catch {
    return bad('Date invalide')
  }

  // Honeypot — bots complete this hidden field
  if (body.hp_field) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const nume = (body.nume ?? '').trim()
  const email = (body.email ?? '').trim()
  const mesaj = (body.mesaj ?? '').trim()
  const telefon = (body.telefon ?? '').trim()

  if (nume.length < 2 || nume.length > 100) return bad('Nume invalid (2-100 caractere)')
  if (!isEmail(email) || email.length > 254) return bad('Email invalid')
  if (mesaj.length < 10 || mesaj.length > 5000) return bad('Mesaj invalid (10-5000 caractere)')
  if (telefon && !isPhone(telefon)) return bad('Telefon invalid')

  const PHP_URL = context.env.PHP_CONTACT_URL || 'https://astoriahotels.ro/send-contact.php'

  try {
    const response = await fetch(PHP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        nume,
        prenume: (body.prenume ?? '').trim(),
        email,
        telefon,
        subiect: (body.subiect ?? 'altele').trim(),
        mesaj,
      }).toString(),
    })

    if (!response.ok) {
      console.error('PHP script error:', await response.text())
      return bad('Eroare la trimiterea emailului', 502)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Mesaj trimis cu succes' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Contact API error:', err)
    return bad('Eroare internă de server', 500)
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://astoriahotels.ro',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
