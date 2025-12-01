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
const numberOfDigits    = 10;

let calculation = {
    number1:        "",
    number2:        "",
    operator:       "",
    result:         "",
    currentNumber: "number1",
    separator:      false,
}
console.log(calculation);
console.log(calculation.currentNumber)
console.log(calculation[calculation.currentNumber])

function removeZerosAtEnd(inputString){
    let newString = inputString;
    for(let i = inputString.length; i > 0; i-- ){
        if( newString.endsWith("0")){
            newString = newString.slice(0,i)
        }
    } 
    return newString;
}

function updateDisplay(input){
    if(input.includes(".")){
        let splitedInput = input.split(".")
        if(input.length < numberOfDigits){ 
            screen.innerHTML = splitedInput[0]+"<span class='dot'>.</span>"+splitedInput[1];
        }
        else if(splitedInput[0].length > numberOfDigits){
            screen.innerHTML = "to long"
        } else if (splitedInput[0].length < numberOfDigits) {     
            
            let freeDecimalPlaces = numberOfDigits-splitedInput[0].length;
            if(freeDecimalPlaces === splitedInput[1].length){
                screen.innerHTML = splitedInput[0]+"<span class='dot'>.</span>"+ splitedInput[1] ;
            } else{
                let slicedString = splitedInput[1].slice(0, freeDecimalPlaces+1);
                let roundedSlicedString = Math.round(slicedString/10);
                screen.innerHTML = splitedInput[0]+"<span class='dot'>.</span>"+ removeZerosAtEnd(roundedSlicedString.toString()) ;
            }
        } else if(splitedInput[0].length === numberOfDigits){ 
              screen.innerHTML=Math.round(splitedInput[0]+"."+splitedInput[1].slice(0, 1));
        } 
    } else{
        if(input.length > numberOfDigits){
            screen.innerHTML = "to long"
        } else{
            screen.innerHTML = input;
        }
    }
}
updateDisplay(calculation.number1)
numPad.addEventListener("click", processNumPad);

function processNumPad(){
    let target = event.target;
    if(digits.includes(target.id)){
        console.log("digits")
        console.log(target.innerHTML)
        updateCurrentNumber(target.innerHTML)
    } else if(numberChanges.includes(target.id)){
        console.log("changes")
    } else if(calcOperators.includes(target.id)){
        console.log("Operators")
    } else if (target.id === "equal-sign"){
        console.log("istgleich")
    }
}
function updateCurrentNumber(inputString){
    /*
    falls noch kein comma im aktuellen string ist
     und der aktuelle string kürzer als 10 zeichen ist
     updaten
     
     falls ein komma im string ist und der aktuelle string
     kürzer als 11 zeichen ist
        falls kein comma gedrückt wurde -> updaten
     */
    if (calculation.separator === false && calculation[calculation.currentNumber].length < numberOfDigits ){
        calculation[calculation.currentNumber] += inputString;
        updateDisplay(calculation[calculation.currentNumber])
        if(inputString === "."){
            calculation.separator = true;
        }
    } else if( calculation.separator === true && calculation[calculation.currentNumber].length < numberOfDigits+1 ){

        if(inputString != "."){
        calculation[calculation.currentNumber] += inputString;
        updateDisplay(calculation[calculation.currentNumber])
        }
    }
    
}
