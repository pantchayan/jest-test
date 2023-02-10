const puppeteer = require('puppeteer');

describe("App.js", () => {
  let browser;
  let page;

  const width = 1440;
  const height = 700;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 25,
      args: [`--window-size=${width},${height}`],
      defaultViewport: {
        width,
        height,
      },
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  }, 100000);

  it("h1 tag content changed", async () => {
    const h1Handle = await page.$('h1');
    await h1Handle.click();
    const content = await page.evaluate(() => document.querySelector('h1').innerText);
    expect(content).toBe('Paragraph changed 1.');
  });

  afterAll(() => browser.close());
});
