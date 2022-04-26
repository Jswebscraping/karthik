const puppeteer = require ('puppeteer');
try{
(async function main (){
    
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.nseindia.com/get-quotes/equity?symbol=SBIN', {waitUntil:'load'});
        await page.waitForSelector('.securityinfo');
        const lis = await page.$$('#securityInfo');
        for(const i of lis){
           var title = await i.$eval('h2', h2 => h2.innerText);
            var Theader = await page.$eval('#securityInfo > thead > tr', tr => tr.innerText);
            var description = await page.$eval('#securityInfo > tbody > tr', tr => tr.innerText);
            console.log({title,Theader,description});
        }
        await browser.close();
     })()

    }
catch(e){
        console.log('error',e);
    };