const pdfjsLib = require('pdfjs-dist');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
// var filename = process.argv[2];


function test123(){
// Specify the path to your PDF file
const pdfPath = 'https://realestatespace.nyc3.digitaloceanspaces.com/local/uploads/client_account/16891200001.pdf';

// Load the PDF document
const loadingTask = pdfjsLib.getDocument(pdfPath);

loadingTask.promise.then(function (pdfDocument) {
  // Get the number of pages in the PDF
  const numPages = pdfDocument.numPages;

  // Iterate through each page

  const mainArray = [];
  const test12345 = [];
  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {

    pdfDocument.getPage(pageNumber).then(function (page) {
      // Extract the text content from the page
      return page.getTextContent();
    }).then(function (textContent) {

     // mainArray.push("Martik");
      // Extract the table data
      const tableData = extractTableData(textContent);
     //  console.table(tableData);

      // Print the table
      var i = 1;
     
      tableData.forEach(function (item) {
        const fruits = [];
        item.forEach(function (item2) {
          
          if(item2 == ''){

               const keyValueObject2 = {
                    [pageNumber]: '<new row>'
               };
               mainArray.push(keyValueObject2);
               
               const keyValueObject4 = {
                    'name' : 'new row>',
                    'page_no' : [pageNumber],
                };
      
                // console.log(values[k]);
                test12345.push(keyValueObject4);

          }else if(item2 == ' '){

               const keyValueObject2 = {
                    [pageNumber]: '<column>'
               };

               mainArray.push(keyValueObject2);

               const keyValueObject4 = {
                    'name' : 'column_column_column',
                    'page_no' : [pageNumber],
               };

                test12345.push(keyValueObject4);

          }else{

               const keyValueObject2 = {
                    [pageNumber]: item2
               };
               mainArray.push(keyValueObject2);

               const keyValueObject4 = {
                    'name' : item2,
                    'page_no' : [pageNumber],
                };

                test12345.push(keyValueObject4);

          }
        });

      });

        

        console.log(1);

    }).catch(function (error) {
      console.error('Error occurred while processing page:', error);
    });
  }


  item3 = [];
  item4 = [];
  const fruits1 = [];

  pagecountis = "";

  setTimeout(function () {

    
     let fruits2 = [];
     // console.log(mainArray);
     mainArray.forEach(function (item) {

          
          item2 = Object.entries(item)[0];
          if(pagecountis == ""){
               pagecountis = item2[0];
          }
          // console.log(item2[1]);
          
          if(item[1] != "<new row>"){
               
               fruits2.push(item2[1]);
          }

          else if(item[1] == "<new row>"){

               item3.push(fruits2);
               fruits2 = [];
          }

          if(pagecountis != item2[0]){
               item4.push(pagecountis);
          }
          // item.forEach(function (n2) {
          //      console.log(n2);
          // });
     });
     
}, 2000);



const test= [];


setTimeout(function () {

     

     const result = mainArray.reduce((acc, obj) => {
          const [key, value] = Object.entries(obj)[0];
        
          if (!acc[key]) {
            acc[key] = [value];
          } else {
            acc[key].push(value);
          }
        
          return acc;
        }, {});

     //    for (let key in result) {
     //      if (result.hasOwnProperty(key)) {
     //        const values = result[key];
     //      //   console.log(`Key: ${key}`);
     //      test.push(values);
     //      //   console.log(values);
     //      }
     //    }

     const resultArray = Object.entries(result);

     const newArray = [];

     

for (let i = 0; i < resultArray.length; i++) {
  const [key, values] = resultArray[i];

  let martik = [];
  let test35 = [];
  for (let k = 0; k < values.length; k++) {
     if(values[k] == "<new row>"){
          martik.push(test35);
          test35 = [];
     }else{
          test35.push(values[k]);
          // const keyValueObject4 = {
          //     'name' : values[k]
          // };

          // // console.log(values[k]);
          // test12345.push(keyValueObject4);
           
     }
     
  }

  const item = [key, values];

  newArray.push(martik);
  martik = [];
}

for (let v = 0; v < newArray.length; v++) {

     const [values2] = newArray[v];
     // console.log(values2);
     for (let m = 0; m < newArray[v].length; m++) {
          // console.log(newArray[m]);
     }
     
  }

// console.log(newArray);


// const convertedArray = [];

// for (let i = 0; i < newArray.length; i++) {
//   const [key, values] = newArray[i];
//   const subArray = [];
//   const subArray2 = [];

// //   subArray.push(key);



//   for (let j = 0; j < values.length; j++) {
//     if (values[j] === '<new row>') {
//       const index = Math.floor(j / 2) + 1;
//       subArray.push(index.toString());
//      //  subArray = [];
//     } else {
//       subArray.push(values[j]);
//     }
//   }

//   convertedArray.push(subArray);
// }

// console.log(newArray);

        

     // console.log(resultArray);

     // const result = mainArray.map(obj => obj['1']);

// console.log(result);
     
}, 4000);

setTimeout(function () {
     const csvFilePath = '/home/user/Downloads/ghecsv2.csv';

     const csvWriter = createCsvWriter({
       path: csvFilePath,
       header: [
            { id: 'name', title: 'Name' },
            { id: 'page_no', title: 'Page no' },
           
          ]
     });

            csvWriter.writeRecords(test12345)
       .then(() => {
        console.log("1");
       })
       .catch((error) => {
       console.error('Error creating CSV file:', error);
       });

}, 10000);

     
}).catch(function (error) {
  console.error('Error occurred while loading PDF:', error);
});
}

function extractTableData(textContent) {
  const items = textContent.items;
  const tableData = [];

  // Iterate through each item
  items.forEach(function (item) {
    // Split the item string into columns based on multiple spaces
    const columns = item.str.split(/\s{2,}/);

    // Add each column to tableData array
    tableData.push(columns);
  });

  return tableData;
}

async function fetchData() {
     test123().then((result) => {
          console.log('2'); // Print the response or null in case of an error
            })
            .catch((error) => {
              console.error(error);
            }); 
   }

   fetchData();



