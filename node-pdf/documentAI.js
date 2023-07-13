const pdfjsLib = require('pdfjs-dist');

// Specify the path to your PDF file
const pdfPath = '/home/user/Downloads/TXN_04042023_31032023_04042023_NatWest.pdf';

// Load the PDF document
const loadingTask = pdfjsLib.getDocument(pdfPath);

loadingTask.promise.then(function (pdfDocument) {
  // Get the number of pages in the PDF
  const numPages = pdfDocument.numPages;

  // Iterate through each page
  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    pdfDocument.getPage(pageNumber).then(function (page) {
      // Extract the text content from the page
      return page.getTextContent();
    }).then(function (textContent) {
      // Extract new lines
      const newLines = extractNewLines(textContent);

      // Display the new lines
      // console.log(newLines);
    }).catch(function (error) {
      console.error('Error occurred while processing page:', error);
    });
  }
}).catch(function (error) {
  console.error('Error occurred while loading PDF:', error);
});

function extractNewLines(textContent) {
  const items = textContent.items;
  const newLines = [];

  // Iterate through each item
  items.forEach(function (item) {
    // Split the item string into lines based on newline character (\n)
    const lines = item.str.split('\n');

    // Add each line to newLines array
    lines.forEach(function (line) {
      newLines.push(line.trim());
    });
  });

  return newLines;
}
