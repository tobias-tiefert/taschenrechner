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
let keyboard = {
     "1": {
    id: "digit-1",
    innerHTML: "1",
    },
     "2": {
    id: "digit-2",
    innerHTML: "2",
    },
     "3": {
    id: "digit-3",
    innerHTML: "3"
     },
     "4": {
    id: "digit-4",
    innerHTML: "4"
     },
     "5": {
    id: "digit-5",
    innerHTML: "5"
     },
     "6": {
    id: "digit-6",
    innerHTML: "6"
     },
     "7": {
    id: "digit-7",
    innerHTML: "7"
     },
     "8": {
    id: "digit-8",
    innerHTML: "8"
     },
     "9": {
    id: "digit-9",
    innerHTML: "9"
     },
     "0": {
    id: "digit-0",
    innerHTML: "0"
     },
     ".": {
    id: "dot-sign",
    innerHTML: "."
     },
     ",": {
    id: "dot-sign",
    innerHTML: "."
     },
     "Clear": {
    id: "clear-everything",
    innerHTML: "ce"
     },
     "Backspace": {
    id: "clear",
    innerHTML: "c"
     },
    "Backspace": "clear",
     "%":   "percent",
     "-": {
    id: "subtract-sign",
    innerHTML: "-",
    },
     "+": {
    id: "add-sign",
    innerHTML: "+",
    },
     "*": {
    id: "multiply-sign",
    innerHTML: "×",
    },
     "/": {
    id: "divide-sign",
    innerHTML: "÷",
    },
    "Enter": {
    id: "equal-sign",
    innerHTML: "=",
    },
    "=": {
    id: "equal-sign",
    innerHTML: "=",
    },
    process(){
        let target = keyboard[event.key];
        if(numPad.digits.includes(target.id)){
            calculation.updateCurrentNumber(target.innerHTML)
        } else if(numPad.numberChanges.includes(target.id)){
            numPad.runChanges(target.id);
        } else if(calculation.calcOperators.includes(target.id)){
            numPad.runCalcOperators(target.innerHTML)
        } else if (target.id === "equal-sign"){
            if(calculation.number1 != "" &&
                calculation.number1 != "-" &&
                calculation.number2 != ""  &&
                calculation.number2 != "-" &&
                calculation.operator != ""
            ){
                calculation.operate();
            }
        }
    },
}

let numPad    ={
    pad:            document.querySelector("#buttons"),
    digits:         ["digit-1", "digit-2" , "digit-3",
                    "digit-4", "digit-5", "digit-6",
                    "digit-7", "digit-8", "digit-9",
                    "digit-0", "dot-sign"],
    numberChanges:  ["change-sign", "percent", "clear-everything", "clear"],
    process(){
        let target = event.target;
        if(numPad.digits.includes(target.id)){
            calculation.updateCurrentNumber(target.innerHTML)
        } else if(numPad.numberChanges.includes(target.id)){
            numPad.runChanges(target.id);
        } else if(calculation.calcOperators.includes(target.id)){
            numPad.runCalcOperators(target.innerHTML)
        } else if (target.id === "equal-sign"){
            if(calculation.number1 != "" &&
                calculation.number1 != "-" &&
                calculation.number2 != ""  &&
                calculation.number2 != "-" &&
                calculation.operator != ""
            ){
                calculation.operate();
            }
        }
    },
    runCalcOperators(input){
        if(calculation.calculationBefore === true && calculation.currentNumber === "number1" ){
            calculation.number2 = "";
            calculation.currentNumber = "number2";
            screen.update(calculation[calculation.currentNumber]);
            } 
        if(calculation.operator === "" && calculation[calculation.currentNumber] === "" && input === "-"){
            calculation[calculation.currentNumber] = "-";
            screen.update(calculation[calculation.currentNumber])
        } else {
            if(calculation.currentNumber === "number1"){
                calculation.currentNumber = "number2";
                calculation.operator = input;
                calculation.separator = false;
                screen.update(calculation[calculation.currentNumber])
            } else if(calculation.currentNumber === "number2"){
                if(calculation[calculation.currentNumber] === ""){
                    calculation.operator = input;
                } else if(calculation[calculation.currentNumber] != "" && calculation[calculation.currentNumber] != "-"){
                        calculation.newOperator = input;
                        calculation.operate();
                }
            /*operate();*/
            }
        }
    },
    runChanges(input){
        switch(input){
            case "change-sign":
                if(calculation[calculation.currentNumber]!=""){
                    if(calculation.calculationBefore === true && calculation.currentNumber === "number1" ){
                    calculation.number2 = "";
                    }  
                    calculation[calculation.currentNumber] = (Number(calculation[calculation.currentNumber])*(-1)).toString();
                    screen.update(calculation[calculation.currentNumber])
                }
            break;

            case "percent":
                if(calculation[calculation.currentNumber]!=""){
                    if(calculation.calculationBefore === true && calculation.currentNumber === "number1" ){
                    calculation.number2 = "";
                    }   
                    calculation[calculation.currentNumber] = (Number(calculation[calculation.currentNumber])/100).toString();
                    screen.update(calculation[calculation.currentNumber])
                }    
            break;

            case "clear-everything":
                calculation.number1 =        "";
                calculation.number2 =        "";
                calculation.operator =     "";
                calculation.result =         "";
                calculation.currentNumber = "number1";
                calculation.separator =      false;
                calculation.calculationBefore= false;
                calculation.newOperator = "";
                
                screen.update(calculation[calculation.currentNumber])
            break;

            case "clear":
                if(calculation[calculation.currentNumber]!=""){
                    calculation[calculation.currentNumber] = calculation[calculation.currentNumber].slice(0, calculation[calculation.currentNumber].length -1);
                    screen.update(calculation[calculation.currentNumber])   
                }
            break;


        }
    },

}
let screen ={
    screen:             document.querySelector("#number"),
    numberOfDigits:     10,
    scientificE:        "e+",
    separatorHTML:      '<span class="dot">.</span>',
    removeZerosAtEnd(inputString){
        let newString = inputString;
        for(let i = inputString.length; i > 0; i-- ){
            if( newString.endsWith("0")){
                newString = newString.slice(0,i)
            }
        } 
        return newString;
    },
    scientificNotation(input){

            let powerDigits     =  (input.length).toString().length;
            let timesEDigits    = screen.scientificE.length;
            let freeDigits      = screen.numberOfDigits - (powerDigits+timesEDigits);
            let numScientific   = Math.round(input/(10**(input.length-freeDigits)))/(10**(freeDigits-1));
            if(numScientific.toString().includes(".")){
                let splitedNum      = numScientific.toString().split(".");
                screen.screen.innerHTML    = splitedNum[0]+screen.separatorHTML + splitedNum[1]+ screen.scientificE + input.length
            } else{
                console.log("hier lag der Fehler");
                console.log(numScientific)
                screen.screen.innerHTML    = numScientific +
                 screen.scientificE + input.length
            }
    },
    updateResult(input){
        console.log(calculation.result)
        // check if digits fit in display
        if(input.includes("e") && !input.includes("-")){
            let splitedInput = input.split("e");
            let splitedNumber   = input.split("+");
            this.screen.innerHTML = Math.round(splitedInput[0]*100)/100 + this.scientificE + splitedNumber[1]
        }
        else if(!(input.includes("e")) && (input.length < screen.numberOfDigits ||  (input.length <= screen.numberOfDigits && !(input.includes("."))))){
            if(!calculation.separator){

                screen.screen.innerHTML    = input;
            } else{
                let splitedInput    = input.split(".");
                screen.screen.innerHTML = splitedInput[0] + screen.separatorHTML + splitedInput[1]
            }
            } else{
                if(input.includes("e")&& !input.includes(".")){
                    this.screen.innerHTML = input;
                }
                else if(!(input.includes("."))){
                    console.log("hier")
                
                    screen.scientificNotation(input)
                    
                } 
            else{
                
                let splitedInput    = input.split(".");
                if(splitedInput[0].length > screen.numberOfDigits){
                    
                    screen.scientificNotation(splitedInput[0])
                } else{
                    if (splitedInput[1].includes("e-")){
                        if(Number(splitedInput[1].slice(splitedInput[1].indexOf("-")+1)) >= 300){
                            screen.screen.innerHTML = "To low"
                        } else{
                            if(splitedInput[1] != ""){
                                screen.screen.innerHTML = splitedInput[0] + screen.separatorHTML+ splitedInput[1].slice(0,3) +splitedInput[1].slice(splitedInput[1].indexOf("e"));

                                screen.screen.innerHTML = splitedInput[0] +splitedInput[1].slice(splitedInput[1].indexOf("e"));
                            }
                            
                        }
                    } else{
                        
                        let freeDigits = screen.numberOfDigits - splitedInput[0].length;
                        let roundedDecimalPlaces = Math.round(splitedInput[1].slice(0, freeDigits+1)/10).toString();
                        screen.screen.innerHTML = splitedInput[0] + screen.separatorHTML + this.removeZerosAtEnd(roundedDecimalPlaces);
                    }
                    
                }
            } 
        }
        calculation.number1             = input;
        calculation.currentNumber       = "number1"
        calculation.separator           = false;
        calculation.calculationBefore   = true;
        if(calculation.newOperator){
        calculation.operator            = calculation.newOperator;   

        }
            
    },
    update(input){
        if(!calculation.separator){
            screen.screen.innerHTML    = input.slice(-1*screen.numberOfDigits);
            } else{

            let splitedInput    = input.split(".");
            let currentLength   = input.length;         
            if(currentLength <= screen.numberOfDigits+1){
                screen.screen.innerHTML = splitedInput[0] + screen.separatorHTML + splitedInput[1]
            } else {
                let digitBeforeSeparator = screen.numberOfDigits- splitedInput[1].length;
            
                if (digitBeforeSeparator > 0){
                    screen.screen.innerHTML = splitedInput[0].slice(-1*digitBeforeSeparator) + screen.separatorHTML + splitedInput[1];
                } else if (digitBeforeSeparator === 0){
                    screen.screen.innerHTML = screen.separatorHTML + splitedInput[1].slice(-1*screen.numberOfDigits);
                } else{
                    screen.screen.innerHTML = splitedInput[1].slice(-1*screen.numberOfDigits);
                }
            }
        }
    }


}
let calculation = {
    number1:            "",
    number2:            "",
    operator:           "",
    result:             "",
    currentNumber:      "number1",
    separator:          false,
    calculationBefore:  false,
    calcOperators:      ["divide-sign", "multiply-sign", "subtract-sign", "add-sign" ],
    updateCurrentNumber(inputString){
        if(calculation.calculationBefore === true && calculation.currentNumber === "number1" ){
            calculation.number1             = "";
            calculation.number2             = "";
            calculation.currentNumber       = "number1"
            calculation.separator           = false;
            calculation.calculationBefore   = false;
            calculation.newOperator         = ""
            screen.update(calculation[calculation.currentNumber]);
            } 
        if(calculation.newOperator){
            calculation.number2="";
            calculation.operator = calculation.newOperator;
            calculation.newOperator =  undefined;
            calculation.currentNumber = "number2"
            screen.update(calculation.number2)
        }
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
        
        screen.update(calculation[calculation.currentNumber])

    },
    operate(){
        switch(calculation.operator){
            case "+":
                calculation.result = Number(calculation.number1)  + Number(calculation.number2) ;
                screen.updateResult(calculation.result.toString())
                break;
            case "-":
                calculation.result = Number(calculation.number1)  - Number(calculation.number2) ;
                screen.updateResult(calculation.result.toString())
                break;
            case "×":
                calculation.result = Number(calculation.number1)  * Number(calculation.number2) ;
                screen.updateResult(calculation.result.toString())
                break;
            case "÷":
                if(Number(calculation.number2) === 0){
                    screen.updateResult("Error")
                } else{
                    calculation.result = Number(calculation.number1)  / Number(calculation.number2) ;
                    screen.updateResult(calculation.result.toString())
                }
                
                break;
        }
    }
}
screen.update(calculation.number1)
numPad.pad.addEventListener("click", numPad.process)

htmlBody.addEventListener("keyup", keyboard.process)