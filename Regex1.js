//const puppeteer = require ('puppeteer');
(async function main (){
   // const browser = await puppeteer.launch({ headless: false });
    //const page = await browser.newPage();
    //await page.goto('https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml', {waitUntil: 'networkidle2', timeout: 0});
    const search = 'https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml';
    const regex = RegExp(1159);
    const x = regex.exec(search);
    if(regex.test(search)) { console.log("Found ",x[0]); }
    else { console.log("Not Found"); }


    


//await browser.close();
})()