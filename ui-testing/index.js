const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.lazada.vn/");

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
