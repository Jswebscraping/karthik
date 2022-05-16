const puppeteer = require('puppeteer');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
async function ClearSearch(page) {
    const searchBox = await page.$x(xpaths[0]);
    await searchBox[0].focus();
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control')
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(4000);}
 async function Mongo(finaldata) {
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, db) {
          if (err) console.log("Error", err)
      
          const mydb = db.db('loblows');
          mydb.collection('datas').insertMany(finaldata, function (err, res) {
            if (err) console.log("Error", err);
            console.log("Document Inserted");
            db.close();
          });
        })
      }

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.loblaws.ca/', { waitUntil: 'networkidle0', timeout: 0 });
        const keyword = fs.readFileSync("filpkartkeywords.csv", 'utf-8');
        const keywords = keyword.split('\r\n');
        const xpath = fs.readFileSync("xpath.csv", 'utf-8');
        const xpaths = xpath.split('\r\n');
        console.log(keywords);
        await page.waitForTimeout(10000);
        for (i = 0; i < 4; i++) 
        {
          const a = await page.$x(xpaths[0]);
         await a[0].type(keywords[i]);
          //await a[0].type('Dry Puppy Foods');
          await page.keyboard.press('Enter');
          await page.waitForTimeout(10000);
          let x = await page.$x(xpaths[1]);
          let y = await page.$x(xpaths[2]);
          await ClearSearch(page);
          finaldata=[]
          for (j = 0; j < 2; j++)
          
            try 
            {
              title = await page.evaluate(el => el.textContent, x[j]),
                price = await page.evaluate(m => m.textContent, y[j]);
                finaldata.push({
                    Title: title,
                    Price: price
                  })
             // console.log('Tittle', title, 'Price', price)
              // await ClearSearch(page);
      
            }
            catch (m) 
            {
               console.log('details not found') 
            }
        }


    } 
    catch (e)
     {
        console.log('error', e);
    }
    console.log(finaldata)
   Mongo(finaldata);
})()

