// Color Change
const colorSelect     = document.querySelector("#color-select");
const htmlBody        = document.body;
const htmlShadow      = document.querySelector(".shadow");
const colorBtnOrange  = document.querySelector("#orange");
const colorBtnGray    = document.querySelector("#grau");
const colorBtnBeige   = document.querySelector("#beige");
const colorHeadline   = document.querySelector("#color-headline");

colorSelect.addEventListener("click", changeColor);

function changeColor(){
    let target = event.target;
    target.classList.add("active-color")
    switch(target){
        case colorBtnOrange:
            colorBtnBeige.classList.remove("active-color");
            colorBtnGray.classList.remove("active-color");
            colorHeadline.style.color ="var(--orange)";
            htmlShadow.style.backgroundColor ="var(--orange)";
            htmlBody.style.backgroundColor ="var(--orange-dunkel)";
            break;
        case colorBtnGray:
            colorBtnBeige.classList.remove("active-color");
            colorBtnOrange.classList.remove("active-color");
            colorHeadline.style.color ="var(--grau-hell)";
            htmlShadow.style.backgroundColor ="var(--grau-hell)";
            htmlBody.style.backgroundColor ="var(--grau-dunkel)";
            break;
        case colorBtnBeige:
            colorBtnGray.classList.remove("active-color");
            colorBtnOrange.classList.remove("active-color");
            htmlShadow.style.backgroundColor ="var(--beige)";
            colorHeadline.style.color ="var(--beige)";
            htmlBody.style.backgroundColor ="var(--beige-dunkel)";
            break;
    } 
}

// Calculator
/*
object currentCalculation
    number 1 = ""
    number2 = ""
    operator = ""
    currentNumber = number1
    displayString = 

wenn numPad geklickt wird
    Fall 1 -> zahl oder .
        currentNumber anpassen
    fall 2  -> operator
        falls currentNumber == number2
            berechnung starten
        ansonsten currentNumber = number 2
    fall 3 -> =
        falls number1 und number 2 nicht leer sind
            berechnung starten
        ansonsten nichts machen
    fall 4 -> anpassungen
        fall   1 - c
        current number anpassen
        fall 2 +-
        current number anpassen
        fall 3 %
        current number anpassen
        fall 4 ce
        gesamte Rechnung zurücksetzen

currentNumber anpassen
            falls -> bisher kein Komma UND weniger als 10 zeichen
                zu current Number hinzufügen
            ansonsten falls -> enthält schon ein comma
                falls comma geklickt wurde 
                    nichts machen
                ansonsten falls -> weniger als 10 zeichen 
                    zu current number hinzufügen

updateDisplay
    currentNumber 
        aufteilen mit . als trennzeichen
        in einem array speichern
        wieder zusammenfügen und <span> einsetzen
        anzeigen

berechnung starten
    falls operater + -> addieren
    ...
anpassung
    falls c
        current number anpassen
    falls +-
        current number * -1
    falls %
        current number / 10
        
*/

const numPad                    = document.querySelector("#buttons");
const screen                    = document.querySelector("#number")
const digits                    = ["digit-1", "digit-2" , "digit-3",
                                    "digit-4", "digit-5", "digit-6",
                                    "digit-7", "digit-8", "digit-9",
                                    "digit-0", "dot-sign"];
const numberChanges             =["change-sign", "percent", "clear-everything", "clear"];
const calcOperators   =["divide-sign", "multiply-sign", "subtract-sign", "add-sign" ]
let numberOfDigits   = 10;
const scientificE      =    "*E"
const separatorHTML     = '<span class="dot">.</span>'

let calculation = {
    number1:        "",
    number2:        "",
    operator:       "",
    result:         "",
    currentNumber: "number1",
    separator:      false,
    calculationBefore: false,
}
updateDisplayResult(calculation.number1)

function removeZerosAtEnd(inputString){
    let newString = inputString;
    for(let i = inputString.length; i > 0; i-- ){
        if( newString.endsWith("0")){
            newString = newString.slice(0,i)
        }
    } 
    return newString;
}


function scientificNotation(input){
    if(input.length >= 300){
        screen.innerHTML    = "to high"
    } else {
        let powerDigits     =  (input.length).toString().length;
        let timesEDigits    = scientificE.length;
        let freeDigits      = numberOfDigits - (powerDigits+timesEDigits);
        let numScientific   = Math.round(input/(10**(input.length-freeDigits)))/(10**(freeDigits-1))   
        let splitedNum      = numScientific.toString().split(".");

        screen.innerHTML    = splitedNum[0]+separatorHTML + splitedNum[1]+ scientificE + input.length
    }
    
    
}

function updateDisplayResult(input){
    // check if digits fit in display
    if(input.length < numberOfDigits || (input.length <= numberOfDigits && !(input.includes(".")))){
        if(!calculation.separator){
            screen.innerHTML    = input;
        } else{
            let splitedInput    = input.split(".");
            screen.innerHTML = splitedInput[0] + separatorHTML + splitedInput[1]
        }
    } else{
        if(!(input.includes("."))){
            console.log("hier")
            scientificNotation(input)
        } else{
            let splitedInput    = input.split(".");
            if(splitedInput[0] > numberOfDigits){
                
                scientificNotation(splitedInput[0])
            } else{
                let freeDigits = numberOfDigits - splitedInput[0].length;
                let roundedDecimalPlaces = Math.round(splitedInput[1].slice(0, freeDigits+1)/10);
                screen.innerHTML = splitedInput[0] + separatorHTML + roundedDecimalPlaces;
            }
        }
    }
    console.log(calculation.result)
    calculation = {
    number1:        input,
    number2:        "",
    operator:       "",
    result:         "",
    currentNumber: "number1",
    separator:      false,
    calculationBefore: true,
}
}

numPad.addEventListener("click", processNumPad);

function processNumPad(){
    let target = event.target;
    if(digits.includes(target.id)){
        updateCurrentNumber(target.innerHTML)
    } else if(numberChanges.includes(target.id)){
        console.log("changes")
    } else if(calcOperators.includes(target.id)){
        runCalcOperators(target.innerHTML)
    } else if (target.id === "equal-sign"){
        console.log("istgleich")
        if(calculation.number1 != "" &&
            calculation.number1 != "-" &&
            calculation.number2 != ""  &&
            calculation.number2 != "-" &&
            calculation.operator != ""
        ){
            operate();
        }
    }
}
function updateCurrentNumber(inputString){
    if(inputString != "."){
        calculation[calculation.currentNumber] += inputString;
    }
    else if(calculation.separator === false ){
        calculation[calculation.currentNumber] += inputString;
        calculation.separator = true;
        if(calculation[calculation.currentNumber].length === 1){
            calculation[calculation.currentNumber] = "0."
        }
    } 
    
    updateDisplay(calculation[calculation.currentNumber])

}

function updateDisplay(input){
    if(!calculation.separator){
        screen.innerHTML    = input.slice(-1*numberOfDigits);
        } else{

        let splitedInput    = input.split(".");
        let currentLength   = input.length;         
        if(currentLength <= numberOfDigits+1){
            screen.innerHTML = splitedInput[0] + separatorHTML + splitedInput[1]
        } else {
            let digitBeforeSeparator = numberOfDigits- splitedInput[1].length;
          
            if (digitBeforeSeparator > 0){
                screen.innerHTML = splitedInput[0].slice(-1*digitBeforeSeparator) + separatorHTML + splitedInput[1];
            } else if (digitBeforeSeparator === 0){
                screen.innerHTML = separatorHTML + splitedInput[1].slice(-1*numberOfDigits);
            } else{
                screen.innerHTML = splitedInput[1].slice(-1*numberOfDigits);
            }
        }
    }
}

function runCalcOperators(input){
    
    if(calculation[calculation.currentNumber] === "" && input === "-"){
        calculation[calculation.currentNumber] = "-";
        updateDisplay(calculation[calculation.currentNumber])
    } else {
        if(calculation.currentNumber === "number1"){
            calculation.currentNumber = "number2";
            calculation.operator = input;
            calculation.separator = false;
            updateDisplay(calculation[calculation.currentNumber])
        } else if(calculation.currentNumber === "number2"){
            if(calculation[calculation.currentNumber] === ""){
                calculation.operator = input;
            } else if(calculation[calculation.currentNumber] != "" && calculation[calculation.currentNumber] != "-"){
                    
                    console.log("berechnung starten");
                    console.log(calculation)
            }
        /*operate();*/
        }
    }
}

function operate(){
    switch(calculation.operator){
        case "+":
            calculation.result = Number(calculation.number1)  + Number(calculation.number2) ;
            updateDisplayResult(calculation.result.toString())
            break;
        case "-":
            calculation.result = Number(calculation.number1)  - Number(calculation.number2) ;
            updateDisplayResult(calculation.result.toString())
            break;
        case "×":
            calculation.result = Number(calculation.number1)  * Number(calculation.number2) ;
            updateDisplayResult(calculation.result.toString())
            break;
        case "÷":
            if(Number(calculation.number2) === 0){
                updateDisplayResult("Error")
            } else{
                calculation.result = Number(calculation.number1)  / Number(calculation.number2) ;
                updateDisplayResult(calculation.result.toString())
            }
            
            break;
    }
}