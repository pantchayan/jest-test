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

  it("h1 tag gas blue color", async () => {
    const heading = await page.$('h1');
    const h1ComputedStyle = await page.evaluate(el => window.getComputedStyle(el).color, heading);
    expect(h1ComputedStyle).toBe('rgb(0, 0, 255)');
  });

  afterAll(() => browser.close());
});
