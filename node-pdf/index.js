


const path = require("path");
var fs = require('fs');
var pdf = require('html-pdf');

var test_user_id = process.argv[2];
var test_id = process.argv[3];
var properties_address = process.argv[4];
var date = process.argv[5];
var folder_type = process.argv[6];
var options = { orientation: 'landscape',
    unit: 'in',
    format: [4,2]
 ,height: '700px', width: "845px", "border": {"top": "15px","right": "10px","bottom": "30px","left": "10px"}, type: 'pdf', quality: 50,
// var options = { format: 'A3',height: '10cm',

paginationOffset: 1, "header": {"height": "30mm","contents": 

    '<style> .header-wrapper { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; padding: 20px 15px; border-bottom: 2px solid #4eaeea;}.address-wrapper { width: 50%;'+
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

    '.image-wrapper img{'+
                'width: 80%;'+
                'height: 130px;'+
                /*margin:auto; */
                'border-top: 1px solid #fff;'+
                /*box-shadow: 0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 0px 40px 0 rgba(0, 0, 0, 0.19);*/
                /*box-shadow: 11px 0px 5px 0px rgba(0, 0, 0, 0.18);*/
                /*box-shadow: 11px 0px 5px 0px #0000001a;*/
                'box-shadow: 5px 0 5px -2px rgba(0,0,0,.5);'+
                'object-fit: cover;'+
                

            '}'+
    '.header-wrapper p strong{ color: #000 }'+
    '.contact-details p {font-family: sans-serif;}'+
    '.contact-details p span{color: #9fcd63; text-transform: uppercase; font-family: sans-serif;}'+
    '.header-wrapper p {'+
        'margin: 0 0 5px;'+
        'font-size: 14px;'+
        'color: #858585;;'+
    '}</style>'+
    '<div id="pageHeader">    '+
    '<div class="header-wrapper" style="padding:3px; border-bottom: 1px solid #4eaeea; width:98%; margin-left:8px;">'+
    '<div class="logo-wrapper" style="margin-bottom:5px;">'+
        '<img src="https://realestatespace.nyc3.digitaloceanspaces.com/local/uploads/inventory-inspections/image/0tGEWFykBivrDeN7wFsiOLogymnxTJ6WBN0WdbjG.png" alt="" style="width:150px;">'+
    '</div>'+
    '<div class="address-wrapper" style="margin-bottom:5px;">'+
        '<div class="address">'+
            '<span style="font-size:10px; color:#5c5c5c"><b>GLOBAL HOUSE ESTATES</b></span>'+
            '<p style="font-size:10px; margin-bottom:0; font-family: sans-serif;">35a St Georges Rd,</p>'+
            '<p style="font-size:10px; margin-bottom:0; font-family: sans-serif;">Elephant and Castle,</p>'+
            '<p style="font-size:10px; margin-bottom:0; font-family: sans-serif;">London SE1 6EW</p>'+
        '</div>'+
        '<div class="contact-details">'+
             '<p style="font-size:10px; margin-bottom:0; font-weight:400;font-style: normal"><span style="color:#9fcd63;font-weight: normal;font-style: normal"><b>Phone<span style="">&nbsp;:</span> </b></span><span class="left-span" style="margin-right: 3px; color:#858585">0207 401 2020</span></p>'+
            '<p style="font-size:10px; margin-bottom:0;font-weight: 400;font-style: normal"><span><b>Web<span style="margin-left:14px;">&nbsp;:</span></b></span>&nbsp;globalhouseestates.com</p>'+
            '<p style="font-size:10px; margin-bottom:0;font-weight: 400;font-style: normal"><span><b>Email<span style="margin-left:5px;">&nbsp;: </span></b></span>enquiries@globalhouseestates.com</p>'+
        '</div>'+
    '</div>'+
'</div>'+
  '</div>'

  },"footer": {
    "height": "40px",
    "contents": {
      // default: '<span style="color: #444; text-align:center;" >{{page}}</span>/<span>{{pages}}</span>', 
      default: '<style>.footer-wrapper {'+
        'background: #9fcd63;'+
        'padding: 10px 20px;'+
        'border:0px solid red;'+
        // 'margin-right:100px !important;'+
    '}'+
    '.footer-left {'+
        'display: inline-block;'+
    '}'+
    '.footer-right {'+
        'float: right;'+
        'color: #6a6865;'+
        'font-family: sans-serif;'+
    '}'+
    '.footer-wrapper p {'+
        'color: #6a6865;'+
        'margin: 0 0 5px;'+
        'font-size: 14px;'+
        'font-family: sans-serif;'+
    '}</style><div id="pageFooter"><div class="footer-wrapper">'+
    '<div class="footer-left">'+
        '<p style="font-size:10px; color:#6a6865;"><strong>Date:</strong>'+date+'</p>'+
        '<p style="font-size:10px; color:#6a6865;"><strong>Inspection Type:</strong> Inventory & Schedule of Condition</p>'+
        '<p style="font-size:10px; color:#6a6865;"><strong>Property Address:</strong> '+properties_address+'</p>'+

    '</div>'+
    '<div class="footer-right">'+
        '<p style="font-size:10px; color:#6a6865;">Page <span>{{page}}</span> to <span>{{pages}}</span></p>'+
    '</div>'+
'</div>'+
'</div>'
    , 
    }
  },

};
// var options = { height: '55cm', width: "1000px", "border": {"top": "30px","right": "0","bottom": "30px","left": "0"}, type: 'pdf', quality: 50};


if(folder_type == "live"){
  var html = fs.readFileSync('/var/www/html/public/PDF/'+test_user_id+'_'+test_id+'_pdf.html', 'utf8');
    pdf.create(html, options).toFile('/var/www/html/public/PDF/test_'+test_user_id+'_result.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });

    }
else{
    var html = fs.readFileSync('/var/www/html/'+folder_type+'/public/PDF/'+test_user_id+'_'+test_id+'_pdf.html', 'utf8');
    pdf.create(html, options).toFile('/var/www/html/'+folder_type+'/public/PDF/test_'+test_user_id+'_result.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
}


