const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://trezentasartesfelpudas.lovable.app/', { waitUntil: 'networkidle0' });
  const html = await page.content();
  fs.writeFileSync('/html.txt', html);
  await browser.close();
})();
