export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json()
    const { nume, prenume, email, telefon, subiect, mesaj } = body

    if (!nume || !email || !mesaj) {
      return new Response(
        JSON.stringify({ error: 'Nume, email și mesaj sunt obligatorii' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const PHP_URL = context.env.PHP_CONTACT_URL || 'https://astoriahotels.ro/send-contact.php'

    const formData = new URLSearchParams({
      nume: `${nume} ${prenume || ''}`.trim(),
      email,
      telefon: telefon || '',
      subiect: subiect || 'altele',
      mesaj,
    })

    const response = await fetch(PHP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })

    if (!response.ok) {
      console.error('PHP script error:', await response.text())
      return new Response(
        JSON.stringify({ error: 'Eroare la trimiterea emailului' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Mesaj trimis cu succes' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return new Response(
      JSON.stringify({ error: 'Eroare internă de server' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
