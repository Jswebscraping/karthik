const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017';
async function Mongo(finaldata) {
  const url = 'mongodb://localhost:27017';
  MongoClient.connect(url, function (err, db) {
    if (err) console.log("Error", err)

    const mydb = db.db('MyDataBase1');
    mydb.collection('Temp').insertMany(finaldata, function (err, res) {
      if (err) console.log("Error", err);
      console.log("Document Inserted");
      db.close();
    });
  })
}

(async function main() {
  try {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.flipkart.com/search?q=teddy+bear&sid=tng%2Cclb%2Cxv3&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_8_sc_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_8_sc_na_na&as-pos=1&as-type=RECENT&suggestionId=teddy+bear%7CTeddy+Bears&requestId=bc0d20c7-356d-4a5a-8d2a-5756b1464df3&as-searchtext=dadybeer', { waitUntil: 'load' })

    await page.waitForTimeout(10000);
    var finaldata = []
    //for(i=0;i>40;i++){
    let x = await page.$x('//*[@class="s1Q9rs"]');
    let y = await page.$x('//*[@class="_30jeq3"]');
    for (j = 0; j < 40; j++)
      try {
        title = await page.evaluate(el => el.textContent, x[j]),
          price = await page.evaluate(m => m.textContent, y[j]);
        finaldata.push({
          Title: title,
          Price: price
        })


      }
      catch (m) { console.log('Data not found', m); }

    Mongo(finaldata);
  } catch (e) { console.log('error', e); }

  // await browser.close();
})()