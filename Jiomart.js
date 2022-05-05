const puppeteer = require('puppeteer');
(async function main() {
  try {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.jiomart.com/', { waitUntil: 'load' })


    const a = await page.$x('//*[@id="search"]');
    await a[0].type('Dairy');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(10000);
    const b = await page.$x('//*[@id="nav_cat_2"]',{ timeout: 10000 });
    await b[0].hover();
    const c = await page.$x('//*[@id="nav_link_61"]',{ timeout: 10000 });
    await c[0].click();
   
    await page.waitForTimeout(10000);
    const u = page.url()
    for (i = 0; i <4; i++) {
      const item = await page.$x('//*[@id="sort_container"]/button');
      await item[i].click();
      await page.waitForTimeout(10000);
      let x = await page.$x('//*[@id="algolia_hits"]/div/div/ol/li/div/a/span[3]');
      //*[@id="algolia_hits"]/div/div/ol/li/div/a/span[3]
      let y = await page.$x('//*[@id="final_price"]');
      for (j = 0; j < x.length; j++)
      try {
        title = await page.evaluate(el => el.textContent, x[j]),
         price = await page.evaluate(m => m.textContent,y[j]);

          console.log('Tittle',title,'Price',price)

      }
      catch (m) { console.log('Data not found', m); }
   
   
    }
    //await page.goto(u);
     // await page.waitForTimeout(10000);
    
  } catch (e) { console.log('error', e); }
  //await browser.close();
})()