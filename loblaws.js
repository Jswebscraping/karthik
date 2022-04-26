const puppeteer =require("puppeteer");
const fs = require("fs");


(async function main(){
    try{
    var work = ['Baby food', 'Chocolate icecream','Dry puppy food'];
    const browser = await puppeteer.launch({headless :false});
    const page = await browser.newPage();
    
    const output = [];
    const output1 = [];
    const output2 = [];
    console.log("ok");

   for(i=0;i<2;i++){
        await page.goto('https://www.loblaws.ca/',{ waitUntil: 'networkidle2', timeout: 0 });
        const searchbox = await page.waitForSelector('.search-input__input');
        await searchbox.type(work[i]);
        await page.keyboard.press('Enter');
        console.log(work[i]);
        const key=work[i];
        const o=48;
        for(var j=0;j<o;j++)
        {
            await page.waitForSelector('.product-tile-group__list__item',{ waitUntil: 'networkidle2', timeout: 0 });
            const search = await page.$$('.product-tile-group__list__item');
            
            const p=await search[j].$eval('.product-tile__details__info__name',h3=>h3.innerText);
            const q=await search[j].$eval('.price__value ',span=>span.innerText);
            const r=await search[j].$eval('.comparison-price-list',ul=>ul.innerText);
            
            console.log("title:",p,"\n price",q,"\ncompprice",r)
            output1.push({
                title:key,
                product:p,
                productprice:q,
                compprice:r

            })
        
        }}  await page.goto('https://www.loblaws.ca/',{ waitUntil: 'networkidle2', timeout: 0 });
        const searchbox = await page.waitForSelector('.search-input__input');
        await searchbox.type(work[i]);
        await page.keyboard.press('Enter');
        console.log(work[i]);
        const key=work[i];
        const o=15;
        for(var j=0;j<o;j++)
        {
            await page.waitForSelector('.product-tile-group__list__item',{ waitUntil: 'networkidle2', timeout: 0 });
            const search = await page.$$('.product-tile-group__list__item');
            
            const p=await search[j].$eval('.product-tile__details__info__name',h3=>h3.innerText);
            const q=await search[j].$eval('.price__value ',span=>span.innerText);
            const r=await search[j].$eval('.comparison-price-list',ul=>ul.innerText);
            
            console.log("title:",p,"\n price",q,"\ncompprice",r)
            output2.push({
                title:key,
                product:p,
                productprice:q,
                compprice:r

            })
        
        }
        output.push({
            output1,
            output2
        })
      
            //console.log(output);
    
            var result=JSON.stringify(output,null,2)
            fs.writeFile('.json',result, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("file created");
            })
        
        
       
   
            await browser.close();}
    catch(e)
        {
            //console.log("error",e);
        }
})();
       
                     