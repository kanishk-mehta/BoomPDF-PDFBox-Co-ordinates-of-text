"use strict"

function run(filename, PageX, PageY, callback) {
    // Running the jar
    var child = require('child_process').spawn(
        'java', ['-jar', 'BoomPdf.jar', filename, PageX, PageY]
    );

    //  Global Variables
    var dataString = '';
    var storeString = [];

    //  Parse Data read from PDF
    child.stdout.on("data", (data) => { dataString += (data.toString()); });  //  Read PDF
    child.stdout.on("close", (close) => { //  Main Function
        //  Refine Input and turn into JSON Array
        var jStrDat = JSON.stringify(dataString);
        // var jStrDat = JSON.stringify(data.toString());
        var datJAr = [], datArr = jStrDat.substr(1, (jStrDat.length - 6)).split('\\n');
        for (var da of datArr) {
            var temp01 = da.split(') height')[0];
            if (temp01.indexOf('(') < 0) continue;
            var temp02 = temp01.split(' [');    //  Character = temp02[0];
            var temp03 = temp02[1].split(',');  //  Coordinates[x,y] = parseInt(temp03[#]);
            datJAr.push({
                C: temp02[0].split('\\').join(''),   //  Character
                X: parseFloat(temp03[0].split('=')[1]), //  X-coordinate
                Y: parseFloat(temp03[1].split('=')[1]) //  Y-coordinate
            });
        };

        //  Convert JSON Structure to a Cumulated String
        var finalString = '', elementString = '', CoX = 0, CoY = 0;
        for (var jel of datJAr) {
            if (CoY == jel.Y) {
                if (elementString.indexOf('^') < 0) CoX = jel.X;
                elementString = elementString + jel.C;
            } else {
                finalString = finalString + 'TEXT^' + elementString + '^' + CoX.toString() + '^' + CoY.toString() + '^0\n'
                elementString = jel.C;
                CoY = jel.Y;
            };
        };

        //  Refine String, remove Empty and undefined Text Units
        var finStr = finalString.split('\n');
        for (var fStr of finStr) {
            if (fStr.indexOf('TEXT^^') < 0 && fStr.trim() != '') storeString.push(fStr);
            if (fStr == finStr[finStr.length - 1]) callback(storeString);
        };
        // setTimeout(() => { callback(storeString) }, 3000);
    });
    child.stderr.on("error", (error) => { console.error(error); });   //  Detect and Handle Error
};

// var thisData;
// run(PDFfile, (data) => {
//     thisData = data;
//     console.log(thisData.join('\r\n'));
// });
// run(process.argv[2], (data) => { console.log(data); });

//=====================================================================================//
//====[ Output in String ]=============================================================//
//=====================================================================================//

run(process.argv[2], process.argv[3], process.argv[4], (data) => { console.log((data.join('\n'))); });