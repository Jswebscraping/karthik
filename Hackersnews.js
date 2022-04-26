const puppeteer= require('puppeteer');

(async() =>{
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.goto('https://news.ycombinator.com/',{waitUntil:'networkidle0' , timeout:0});
   await page.waitForSelector('.athing');
   const lis = await page.$$('.athing');   
for(j=0;j<=9;j++){
    var data = await lis[j].$eval('.titlelink', a => a.href);
    var links ={data};
    console.log(links)
}
await browser.close();
   
} )()