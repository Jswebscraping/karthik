const puppeteer = require('puppeteer');
(async function main() {
  try {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.bigbasket.com/', { waitUntil: 'networkidle2', timeout: 0 });
    await page.type('#input', "beverages");
    await page.click('#navbar-main > div > div.col-md-6.col-sm-12.col-xs-12.mb-pad-0.mb-zindex.search-bar > div > div');
    // await page.keyboard.press('Enter');
    await page.waitForTimeout(10000);
    const u = page.url()
    for (i = 0; i <8; i++) {
      const d = await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]', { timeout: 10000 });
      let boxname = await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]');
      brandname = await page.evaluate(el => el.textContent, boxname[i]),
      console.log(brandname)
      // p= searchButton.length;
      await d[i].click();
      await page.waitForTimeout(10000);
      let x = await page.$x('//product-template/div/div[4]/div[1]/a');
      let y = await page.$x(`//*[@class="discnt-price"]`,);
      for (j = 0; j < x.length; j++)
        try {
          title = await page.evaluate(el => el.textContent, x[j]),
           price = await page.evaluate(m => m.textContent,y[j]);

            //product-template/div/div[4]/div[3]/div/div[1]/h4/span
            //let price = await page.evaluate(m => m.textContent,y[0]);
            console.log('Tittle',title,'Price',price)

        }
        catch (m) { console.log('Data not found', m); }
      await page.goto(u);
      await page.waitForTimeout(10000);
    }

  } catch (e) { console.log('error', e); }
  await browser.close();
})()