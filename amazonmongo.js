const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
async function Mongo(finaldata) {
    const url = 'mongodb://localhost:27017';
    MongoClient.connect(url, function (err, db) {
      if (err) console.log("Error", err)
  
      const mydb = db.db('amazon');
      mydb.collection('data').insertMany(finaldata, function (err, res) {
        if (err) console.log("Error", err);
        console.log("Document Inserted");
        db.close();
      });
    })
  }
(async () => 
{
 const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.amazon.com/', { waitUntil: 'networkidle0', timeout: 0 });
        const keyword = fs.readFileSync("filpkartkeywords.csv", 'utf-8');
        const keywords = keyword.split('\r\n');
        const xpath = fs.readFileSync("amazon.csv", 'utf-8');
        const xpaths = xpath.split('\r\n');
        await page.waitForTimeout(5000);
        finaldata=[]
        for (i = 0; i < 4; i++) 
            {
                    const a = await page.$x(xpaths[0]);
                    await a[0].type(keywords[i]);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(10000);
                    await ClearSearch(page);
                 

                    let x = await page.$x(xpaths[1]);
                    let y = await page.$x(xpaths[2]);
                    for(j=0;j<x.length;j++)
                    {
                        try 
                        {
                            title = await page.evaluate(el => el.textContent, x[j]);
                            price = await page.evaluate(el => el.textContent, y[j]);
                            console.log(j+1,"] ",title,"-----",price); 
                            finaldata.push({
                              Title: title,
                              Price: price
                            })
                        } 
                        catch (error) 
                        {
                            console.log("Hidden");
                        }
                        
                    }
            }
            async function ClearSearch(page) 
            {
                const searchBox = await page.$x(xpaths[0]);
                await searchBox[0].focus();
                await page.keyboard.down('Control');
                await page.keyboard.press('A');
                await page.keyboard.up('Control')
                await page.keyboard.press('Backspace');
                await page.waitForTimeout(4000);
            }
            Mongo(finaldata);
})()
    