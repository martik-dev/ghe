<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientAccountController123 extends Controller
{

    public function importDataByPDF(Request $request){
        dd("Martik");
        $file = $request->file;
        // return "cd /var/www/html/ghe2/node-pdf && node pdfconvert2.js $file";
        $command = shell_exec("cd /var/www/html/ghe5/node-pdf && node pdfconvert2.js $file");
        
        if(trim($command) == 1){
            echo "martik";
        }
        exit;
        
    }
    
}
