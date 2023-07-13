// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// var folder_storage = process.argv[2];

// csvData = [];

// async function scrapeTableData(postcode) {
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();
//     await page.goto('https://planning.southwark.gov.uk/online-applications/search.do?action=monthlyList');

//     await page.waitForSelector('.govuk-table');

//       // Get the table rows
//       const tableRows = await page.evaluate(() => {
     
//       }

  
//   await browser.close();
// }


const puppeteer = require('puppeteer');

async function getAllPageHTML(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const htmlContent = await page.evaluate(() => {
    return document.documentElement.outerHTML;
  });

  await browser.close();

  return htmlContent;
}

// Usage example
const url = 'https://planning.southwark.gov.uk/online-applications/search.do?action=monthlyList';

getAllPageHTML(url)
  .then((html) => {
    console.log(html);
  })
  .catch((error) => {
    console.error('Error:', error);
  });