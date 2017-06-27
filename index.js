#!/usr/bin/env node

const commander = require('commander');
const progress = require('progress');
const https = require('https');
const readline = require('readline');
const util = require('util');
const chalk = require('chalk');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
function profSearch(name, callback) {
	nameArray = name.split(" ")
	const profReg = new RegExp("<a href=\"(\/professors\/(" + nameArray[0] + "*)-(" + nameArray[1] + "*)\/)\">");
	const ErrorCheck = /El profesor que ha buscado no se encuentra./g
	const baseUrl = "https://notaso.com"
	var url = baseUrl + "/search/?q=" + name;


	//console.log(url);
	https.get(url, (resp) => {

			resp.on('data', (d) => {

				var list = profReg.exec(d);

				if (list != null) {
					//console.log(`YES${list[0]}`);
					clearTimeout(exitTimer);
					if (list[0] != null) {


						var profExt = list[1];
						var profUrl = baseUrl + profExt;
						var regExpGrade = /<div class="(grade\wsml).+">\s+<p>(\w.+?)<\/p>/g
						var regExpRate = /<div class="(rate\wsml).+">\s+<p>(\w.+?)<\/p>/g
						https.get(profUrl, (resp) => {

							resp.on('data', (d) => {
								//GradeLIST INDEX:
								//0: Returns the entire tag
								//1: Returns the grade
								//2:Returns what is graded
								var valuelist = [];

								var gradeList = regExpGrade.exec(d);
								var responsabilidad = []
								if (gradeList != null) {
									//RESPONSABILIDAD INDEX:
									//0:Value
									//1:Name

									valuelist.push(gradeList[1])
									valuelist.push(gradeList[2])
									//console.log(valuelist[0]);

								}

								var gradeList = regExpGrade.exec(d);
								var personalidad = []

								if (gradeList != null) {
									//PERSONALIDAD INDEX:
									//0:Value
									//1:Name
									valuelist.push(gradeList[1]);
									valuelist.push(gradeList[2]);
									//console.log(valuelist[1]);


								}
								// RATES:
								var rateList = regExpRate.exec(d);
								var dificultad = []
								if (rateList != null) {
									//DIFICULTAD INDEX:
									//0:Value
									//1:Name

									valuelist.push(rateList[1])
									valuelist.push(rateList[2])
									//console.log(valuelist[0]);

								}

								var rateList = regExpRate.exec(d);
								var trabajo = []

								if (rateList != null) {
									//TRABAJO INDEX:
									//0:Value
									//1:Name
									valuelist.push(rateList[1]);
									valuelist.push(rateList[2]);
									//console.log(valuelist[1]);


								}

								callback(valuelist)
							});
						});
					} else if (true) {
						console.log("ERROR")
					}
				}
        else{

					var exitTimer	=setTimeout(function(){
						console.log(chalk.bold.red("Error!"))


							console.log(chalk.bold.red.bgWhite("Your professor was not found!"))

						process.exit(1);

					},10000);




        }
      });



		})
		.on('error', (e) => {
			console.error(e);
		});
};




commander
  .arguments("<frstnm> <lstnm>")

  .action(function(frstnm,lstnm) {
    var profesor = "";
    profesor += frstnm;
    profesor += " ";
    profesor += lstnm;
    profSearch(profesor.toLowerCase(), function(valuelist) {
    	if (valuelist[0] != null) {

        var resp = chalk.green;
        var per = chalk.green;
        var trab = chalk.green;
        var dif = chalk.green;
    		  for (var i = 0; i < valuelist.length; i += 2) {
          var themeA = chalk.bold.green;
          var themeB = chalk.bold.blue;
          var themeC = chalk.bold.yellow;
          var themeD = chalk.bold.magenta;
          var themeF = chalk.bold.red;

    			switch (valuelist[i]) {
    				case "gradeAsml":
    					valuelist[i] = "A"

              if(valuelist[i+1]=="Responsabilidad")
              {
                resp =   themeA;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per =   themeA;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab =   themeA;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif =   themeA;
              }
    					break;
    				case "gradeBsml":
    					valuelist[i] = "B"
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp =themeB;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per =themeB;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab =themeB;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif =themeB;
              }
    					break;
    				case "gradeCsml":
    					valuelist[i] = "C"
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp= themeC;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per= themeC;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab = themeC;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif= themeC;
              }
    					break;
    				case "gradeDsml":
    					valuelist[i] = "D"
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp = themeD;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per= themeD;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab = themeD;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif = themeD;
              }
    					break;
    				case "gradeFsml":
    					valuelist[i] = "F"
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp= themeF;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per = themeF;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab = themeF;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif = themeF;
              }
    					break;
    				case "rate1sml":
    					//5
    					valuelist[i] = 5
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp = themeA;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per = themeA;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab= themeA;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif = themeA;
              }
    					break;
    				case "rate2sml":
    					//4
    					valuelist[i] = 4
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp= themeB;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per= themeB;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab= themeB;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif= themeB;
              }
    					break;
    				case "rate3sml":
    					//3
    					valuelist[i] = 3
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp = themeC;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per = themeC;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab = themeC;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif = themeC;
              }
    					break;
    				case "rate4sml":
    					//2
    					valuelist[i] = 2
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp= themeD;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per = themeD;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab = themeD;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif= themeD;
              }
    					break;
    				case "rate5sml":
    					//1
    					valuelist[i] = 1
              if(valuelist[i+1]=="Responsabilidad")
              {
                resp = themeF;
              }
              if(valuelist[i+1]=="Personalidad")
              {
                per= themeF;
              }
              if(valuelist[i+1]=="Dificultad")
              {
                trab = themeF;
              }
              if(valuelist[i+1]=="Trabajo")
              {
                dif = themeF;
              }
    					break;

    			}


           }



    		console.log(`Profesor:${profesor}\n`);
        console.log(`${valuelist[1]}:`+ resp(`${valuelist[0]}`));
        console.log(`${valuelist[3]}:`+ per(`${valuelist[2]}`));
        console.log(`${valuelist[5]}:`+ trab(`${valuelist[4]}`));
        console.log(`${valuelist[7]}:`+ dif(`${valuelist[6]}`));

          process.exit(0);
}


    });

  })
  .parse(process.argv);
