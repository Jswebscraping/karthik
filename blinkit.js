const puppeteer = require('puppeteer');
const csv = require('fast-csv');
const fs = require('fs');

(async function main() {
    try {
        var scrapedData = [];
        var ws = fs.createWriteStream('blinkit.csv');
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://blinkit.com/prn/eno-lemon-digestive-antacid/prid/10841', { waitUntil: 'networkidle2', timeout: 0 });
        //await page.waitForSelector('#AddToCartParent');
        // var name = await page.$eval('.B_NuCI',y => y.innerText);
        var title = await page.$eval('.css-1dbjc4n.r-1habvwh.r-13awgt0>.css-901oao.css-cens5h',z => z.innerText);
        var price = await page.$eval('.css-901oao.r-cqee49.r-1b1savu.r-1b43r93.r-14yzgew.r-1d4mawv', x => x.innerText);
        var Details = await page.$eval('.product-details',y => y.innerText);
       
       // var rating = await page.$eval(".css-1dbjc4n.r-1777fci.r-13qz1uu>div>div>.css-1dbjc4n.r-1habvwh.r-13awgt0.r-eqz5dr.r-1wtj0ep.r-5oul0u>div", h => h.innerText);
        
       console.log({ title,price,Details});
       scrapedData.push({
        Title: title,
        Price: price,
        details:Details
    });
    csv.write(scrapedData, { headers: true })
        .pipe(ws);
    console.log("Completed");

        await browser.close();

    } catch (e) {
        console.log('error', e);
    }
})()