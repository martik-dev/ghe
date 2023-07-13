


const path = require("path");
var fs = require('fs');
var pdf = require('html-pdf');
var test_user_id = process.argv[2];
var test_id = process.argv[3];
var folder_type = process.argv[4];

var options = { orientation: 'landscape',
    unit: 'in',
    format: [4,2]
 ,height: '700px', width: "845px", "border": {"top": "15px","right": "10px","bottom": "30px","left": "10px"}, type: 'pdf', quality: 50,
// var options = { format: 'A3',height: '10cm',

paginationOffset: 1, "header": {"height": "30mm","contents": 

    '<style> .header-wrapper { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; padding: 20px 15px; border-bottom: 0px solid;}.address-wrapper { width: 50%;'+
        'display: -webkit-box;'+
        'display: -ms-flexbox;'+
        'display: flex;'+
        '-webkit-box-pack: end;'+
        '-ms-flex-pack: end;'+
                'justify-content: flex-end;'+
        '-webkit-box-align: end;'+
            '-ms-flex-align: end;'+
                'align-items: flex-end;'+
    '}'+
    '.address-wrapper > div {'+
        'padding: 0 10px;'+
        '-webkit-box-sizing: border-box;'+
               'box-sizing: border-box;'+
    '}'+
    '.header-wrapper p strong{ color: #000 }'+
    '.contact-details p {font-family: sans-serif;}'+
    '.contact-details p span{color: #9fcd63; text-transform: uppercase; font-family: sans-serif;}'+
    '.header-wrapper p {'+
        // 'margin: 0 0 5px;'+
        'font-size: 14px;'+
        'color: #858585;;'+
    '}</style>'+
    '<div id="pageHeader">    '+
    '<div class="header-wrapper" style="padding:3px; border-bottom: 0px solid #4eaeea; width:98%; margin-left:8px;">'+
    '<div class="logo-wrapper" style="margin-bottom:5px;">'+
        '<img src="https://realestatespace.nyc3.digitaloceanspaces.com/local/uploads/inventory-inspections/image/0tGEWFykBivrDeN7wFsiOLogymnxTJ6WBN0WdbjG.png" alt="" style="width:150px;">'+
    '</div>'+
    '<div class="address-wrapper" style="margin-bottom:20px;">'+
        '<div class="address">'+
            '<span style="font-size: 21.1px; color: #150B39;font-weight: normal;font-style: normal;text-decoration: none; font-family:"Bodoni MT",serif">Deauville Close, Poplar, London</span><br>'+
            '<span style="text-align:left; padding-left:73%; font-size: 16.1px; color: #150B39;font-weight: normal;font-style: normal;text-decoration: none; font-family:"Bodoni MT",serif">£6,995,000 </span>'+
        '</div>'+
    '</div>'+
'</div>'+
  '</div>'

  },
//   "footer": {
//     "height": "0px",
//     "contents": {
//       // default: '<span style="color: #444; text-align:center;" >{{page}}</span>/<span>{{pages}}</span>', 
//       default: '<div id="pageFooter"><div class="footer-wrapper">'+
// '</div>'
//     , 
//     }
//   },
};
    var html = fs.readFileSync('/var/www/html/'+folder_type+'/public/BrochurePDF/'+test_user_id+'_'+test_id+'_pdf.html', 'utf8');
    pdf.create(html, options).toFile('/var/www/html/'+folder_type+'/public/BrochurePDF/test_'+test_user_id+'_result.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });


