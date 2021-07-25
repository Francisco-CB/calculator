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
        result = add(a,b);
    }
    if(op == "-"){
        result = subtract(a,b);
    }
    if(op == "*"){
        result = multiply(a,b);
    }
    if(op == "/"){
        result = divide(a,b);
    }
    if(op == null || op == "="){
        result = Math.max(a, b);
    }
    return result.toFixed(8);
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

function appendNumber(number){
    // SI NO HAY UN NÚMERO, O YA SE ELIGIÓ OPERADOR, O TENEMOS 0 INICIAL, REEMPLAZA
    if(isNaN(displayScreen.textContent) || displayScreen.textContent == "0" || operatorChosen != null){
        displayScreen.textContent = number;
        operatorChosen = null;
    }
    else {
        displayScreen.textContent += number;
    }
}

function appendOperator(op){
    if(op != "="){
        if(firstNumber != null && secondNumber == null){
            secondNumber = displayScreen.textContent;
            result = operate(Number(firstNumber), Number(secondNumber), operator);
            displayScreen.textContent = trimZeroes(result.toString());
            secondNumber = null;
        }

        firstNumber = displayScreen.textContent;
        operator = op;
        operatorChosen = 1;
    }

    else if(op == "="){
        secondNumber = displayScreen.textContent;
        result = operate(Number(firstNumber), Number(secondNumber), operator);
        displayScreen.textContent = trimZeroes(result.toString());
        firstNumber = null;
        secondNumber = null;
        operatorChosen = null;
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

function chooseOperator(event){
    appendOperator(event.target.textContent);
}

function chooseNumber(event){
    appendNumber(event.target.textContent);
}

function useKeybrd(event){
    if(acceptableNumbers.includes(event.key)){
        appendNumber(event.key);
    }
    else if(acceptableOperators.includes(event.key)){
        appendOperator(event.key);
    }
    else if(event.key == "Enter"){
        appendOperator("=");
    }
    else if(event.key == "Escape"){
        clearDisplay();
    }
    else if(event.key == "Backspace"){
        backspace();
    }
    else if(event.key == "."){
        addDecimalDot();
    }
}

let operator = null;
let operatorChosen = null;
let firstNumber = null;
let secondNumber = null;
let result = null;
let acceptableNumbers = "1234567890";
let acceptableOperators = "+-*/";

const displayScreen = document.getElementById("display-screen");
const numbers = document.getElementsByClassName("button-number");
const operators = document.getElementsByClassName("operator");

const clearButton = document.getElementById("clear");
const dotButton = document.getElementById("decimalDot");
const backButton = document.getElementById("backspace");

clearButton.addEventListener("click", clearDisplay);
dotButton.addEventListener("click", addDecimalDot);
backButton.addEventListener("click", backspace);

Array.from(numbers).forEach(number => number.addEventListener("click", chooseNumber));
Array.from(operators).forEach(operator => operator.addEventListener("click", chooseOperator));
window.addEventListener('keydown', useKeybrd);