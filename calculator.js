function add(a, b){
    return a+b
}

function subtract(a, b){
    return a-b
}

function multiply(a, b){
    return a*b
}

function divide(a, b){
    if(b == 0){
        return "DiVidE bY zErO"
    }
    if(b == null){
        return NaN
    }

    return a/b
}

function operate(a, b, op){
    if(a == null){
        a = 0;
    }
    if(b == null){
        b = 0;
    }
    
    if(isNaN(a) || isNaN(b)){
        return NaN
    }

    if(op == "+"){
        return add(a,b)
    }
    if(op == "-"){
        return subtract(a,b)
    }
    if(op == "*"){
        return multiply(a,b)
    }
    if(op == "/"){
        return divide(a,b)
    }
    if(op == null || op == "="){
        return Math.max(a, b)
    }
}

function clearDisplay(){
    displayScreen.textContent = 0;
    firstNumber = null;
    secondNumber = null;
    operator = null;
    operatorChosen = null;
    result = null;
}

function addDecimalDot(){
    if(displayScreen.textContent == ""){
        displayScreen.textContent += 0;
    }

    if(!displayScreen.textContent.includes(".")){
        displayScreen.textContent += ".";
    }
}

function backspace(){
    str = displayScreen.textContent;
    displayScreen.textContent = str.slice(0, -1)
}

function appendNumber(event){
    // SI NO HAY UN NÚMERO, O YA SE ELIGIÓ OPERADOR, O TENEMOS 0 INICIAL, REEMPLAZA
    if(isNaN(displayScreen.textContent) || displayScreen.textContent == "0" || operatorChosen != null){
        displayScreen.textContent = event.target.textContent;
        operatorChosen = null;
    }
    else {
        displayScreen.textContent += event.target.textContent;
    }
}

function trimZeroes(number){
    while(number.includes(".")){
        if(number.charAt(number.length-1) == "0" || number.charAt(number.length-1) == "."){
            number = number.slice(0, -1)
        }
        else break
    }
    return number
}

function updateDisplay(event){
    if(event.target.textContent != "="){
        if(firstNumber != null && secondNumber == null){
            secondNumber = displayScreen.textContent;
            result = operate(Number(firstNumber), Number(secondNumber), operator);
            result = result.toFixed(5).toString();
            displayScreen.textContent = trimZeroes(result);
            secondNumber = null;
        }

        firstNumber = displayScreen.textContent;
        operator = event.target.textContent;
        operatorChosen = 1;
    }

    else if(event.target.textContent == "="){
        secondNumber = displayScreen.textContent;
        result = operate(Number(firstNumber), Number(secondNumber), operator);
        result = result.toFixed(5).toString();
        displayScreen.textContent = trimZeroes(result);
        firstNumber = null;
        secondNumber = null;
        operator = "=";
        operatorChosen = null;
    }
}


let operator = null;
let operatorChosen = null;
let firstNumber = null;
let secondNumber = null;
let result = null;

const displayScreen = document.getElementById("display-screen");
const numbers = document.getElementsByClassName("button-number");
const operators = document.getElementsByClassName("operator");

const clearButton = document.getElementById("clear");
const dotButton = document.getElementById("decimalDot");
const backButton = document.getElementById("backspace");

clearButton.addEventListener("click", clearDisplay);
dotButton.addEventListener("click", addDecimalDot);
backButton.addEventListener("click", backspace);

Array.from(numbers).forEach(number => number.addEventListener("click", appendNumber));
Array.from(operators).forEach(operator => operator.addEventListener("click", updateDisplay));