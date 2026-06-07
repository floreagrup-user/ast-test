import { chromium } from 'playwright'
import { preview } from 'vite'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

const ROUTES = [
  '/',
  '/camere',
  '/camere/apartament',
  '/camere/standard',
  '/camere/standard-balcon',
  '/restaurant',
  '/restaurant/meniu',
  '/pool-park',
  '/pool-park/meniu',
  '/evenimente',
  '/evenimente/nunta',
  '/evenimente/botez',
  '/evenimente/pool-party',
  '/evenimente/majorat',
  '/evenimente/petrecere-copii',
  '/sustenabilitate',
  '/welcome-to-alba',
  '/contact',
  '/politica-confidentialitate',
  '/termeni-conditii',
  '/cookies',
]

const DIST = resolve('dist')

async function prerender() {
  console.log('Starting Vite preview server...')
  const server = await preview({ preview: { port: 4193, strictPort: true } })
  const base = 'http://localhost:4193'

  console.log(`Preview server running on ${base}`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  })

  let success = 0
  let failed = 0

  for (const route of ROUTES) {
    const url = `${base}${route}`
    try {
      console.log(`  Prerendering ${route}...`)
      const page = await context.newPage()
      await page.goto(url, { waitUntil: 'load', timeout: 15000 })
      await page.waitForTimeout(2000)

      const html = await page.content()
      const title = await page.title()

      const filePath = route === '/'
        ? resolve(DIST, 'index.html')
        : resolve(DIST, route.slice(1), 'index.html')
      mkdirSync(dirname(filePath), { recursive: true })
      writeFileSync(filePath, html, 'utf-8')

      console.log(`    ✓ ${route} → ${title} (${(html.length / 1024).toFixed(0)} KB)`)
      success++
      await page.close()
    } catch (err) {
      console.error(`    ✗ ${route} — ${err instanceof Error ? err.message : 'unknown error'}`)
      failed++
    }
  }

  await browser.close()
  await server.httpServer.close()

  console.log(`\nDone. ${success} rendered, ${failed} failed.`)
  if (failed > 0) process.exit(1)
}

prerender()
