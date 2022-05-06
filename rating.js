const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const urls =['https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml','https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6','https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g'];
    for (let url of urls){
        await page.goto(url,{waitUntil: 'networkidle2',timeout:0});
        try{
            await page.waitForXPath(`//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[2]`, {timeout:1000});
            let x = await page.$x(`//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[2]`,{timeout:1000});
            let rating = await page.evaluate(h1 => h1.textContent, x[0]);
            console.log("Rating",rating);
        }
        catch(e)
        {
            console.log("hidden");
        }
    }
    await browser.close();
}main();