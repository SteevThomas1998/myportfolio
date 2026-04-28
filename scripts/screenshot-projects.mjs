import puppeteer from 'puppeteer'

const projects = [
    {
        url: 'https://www.stealeen.com',
        output: 'public/images/projects/stealeen.png',
    },
    {
        url: 'https://physio-de-casa.vercel.app/',
        output: 'public/images/projects/physio-de-casa.png',
    },
    {
        url: 'http://localhost:3000',
        output: 'public/images/projects/portfolio.png',
    },
]

const browser = await puppeteer.launch({ headless: true })

for (const project of projects) {
    console.log(`Capturing ${project.url}...`)
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    try {
        await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 15000 })
        await page.screenshot({ path: project.output, type: 'png' })
        console.log(`  Saved → ${project.output}`)
    } catch (err) {
        console.error(`  Failed: ${err.message}`)
    }
    await page.close()
}

await browser.close()
console.log('Done.')
