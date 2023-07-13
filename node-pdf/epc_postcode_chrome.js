const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');



var folder_storage = process.argv[2];
var postcodeArr = process.argv[3];

csvData = [];
csvData.push({ "Postcode": 'Postcode', 'Property address': 'Property address', 'Energy rating': "Energy rating" , 'Valid until': "Valid until" , 'EPC Expired or not': "EPC Expired or not" , 'Url': "Url" });

async function scrapeTableData(postcode) {
  const browser = await puppeteer.launch();


        // console.log(postcode.length);    
   const page = await browser.newPage();

        for (let postcodeLenght = 0; postcodeLenght < postcode.length; postcodeLenght++) {
        try {
        await page.goto('https://find-energy-certificate.service.gov.uk/find-a-certificate/search-by-postcode?postcode='+postcode[postcodeLenght]);

        page.on('pageerror', (error) => {
        });
      // Wait for the table to be visible on the page
      await page.waitForSelector('.govuk-table');

      

      // Get the table rows
          const tableRows = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.govuk-table tr'));
            return rows.map(row => {
               
              const property_address = Array.from(row.querySelectorAll('th')).map(column => column.textContent.trim());
              const doc_link = Array.from(row.querySelectorAll('th a')).map(column => column.getAttribute('href') );
              const energy_rating_and_valid_until = Array.from(row.querySelectorAll('td')).map(column => column.textContent.trim());
              
              const valid_until = Array.from(row.querySelectorAll('td span')).map(column => column.textContent.trim());
              const valid_until_exp = Array.from(row.querySelectorAll('td strong')).map(column => column.textContent.trim());

             return property_address.concat('https://find-energy-certificate.service.gov.uk'+doc_link).concat(energy_rating_and_valid_until).concat(valid_until).concat(valid_until_exp);

             
             });
          });

           for (let s = 0; s < tableRows.length; s++) {

            // if(tableRows[s][2] != "" && tableRows[s][2] == 'G' || tableRows[s][2] == 'F' || tableRows[s][2] == 'g' || tableRows[s][2] == 'f'){

                is_valid = "";
                if(tableRows[s][5] == "EXPIRED"){
                     is_valid = "EXPIRED";
                }

                if(s != 0){
                    csvData.push({ "Postcode": postcode[postcodeLenght], 'Property address': tableRows[s][0], 'Energy rating': tableRows[s][2] , 'Valid until': tableRows[s][4] , 'EPC Expired or not': is_valid , 'Url': tableRows[s][1] });
                }

                
            // }
            }
        }
        catch (error) {
        }
        }

  
  await browser.close();
    pageCalledDone() .then((result) => {
    console.log('1'); // Print the response or null in case of an error
      })
      .catch((error) => {
        console.error(error);
      }); 
}
    async function pageCalledDone(){
        
         const csvData3 = csvData.map(objectToCsvRow).join('\n');
        
        const publicPath = path.join(__dirname, 'public')+'/storage/epc_postcode/';
        // publicPath = publicPath+'postcode.csv';

        folder_storage = folder_storage+'/epc_postcode.csv';

        // Write CSV data to a file
        fs.writeFile(folder_storage, csvData3, err => {
          if (err) {
          } else {
           }
        });
        return "1";
    }

    function objectToCsvRow(obj) {
      const values = Object.values(obj);
      const csvRow = values.map(value => `"${value}"`).join(',');
      return csvRow;
    }

    

// return "1";
async function fetchData() {
  try {
    postcodeArr = postcodeArr.replace('[', '').replace(']', '');
    const arr = postcodeArr.split(',');
     const fn = scrapeTableData(arr);    
  } catch (error) {
  }
}

fetchData();

 