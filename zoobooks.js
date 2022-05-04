const puppeteer = require('puppeteer');

(async function title() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/Zoobooks', { waitUntil: 'networkidle2', timeout: 0 });
    var i = 1;
    while (1) {
        try {
            await page.waitForXPath(`//*[@id="mw-content-text"]/div[1]/ul[1]/li[${i}]`, { timeout: 10000 });
            let elHandle = await page.$x(`//*[@id="mw-content-text"]/div[1]/ul[1]/li[${i}]`);
            let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
            console.log(lamudiNewPropertyCount);
            i += 1;
        }
        catch (e) { try {
            i += 1;
            await page.waitForXPath(`//*[@id="dynamicDirective"]/product-deck/section/div[2]/div[4]/div[1]/div/div/div[2]/div/div[${i}]/product-template/div/div[4]/div[1]`, { timeout: 10000 });
            let title_ele = await page.$x(`//*[@id="dynamicDirective"]/product-deck/section/div[2]/div[4]/div[1]/div/div/div[2]/div/div[${i}]/product-template/div/div[4]/div[1]`);
            let title1 = await page.evaluate(h2 => h2.textContent, title_ele[0]);
            let price1 = await get_price(page, i);
            //console.log("Title -", title1, "\nPrice -", price1);
            i += 1;
            scrapedData.push({
                Title :title1,
                Price :price1
            });
        }
        catch (e) {
            console.log(e)
            break;

        }
            break;
        }
    }
    await browser.close();
})();