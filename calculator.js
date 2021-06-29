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
        return NaN
    }
    return a/b
}

function operate(a, b, op){
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
}

function clearDisplay(){
    displayValue = 0;
    firstNumber = 0;
    secondNumber = null;
    operator = null;
    result = null;
    displayScreen.textContent = displayValue;
}

function updateDisplay(event){
    // SI SE INGRESA NÚMERO
    if(!isNaN(event.target.textContent)){
        // SI NO HAY UN NÚMERO, O YA SE OPERÓ, O TENEMOS 0 INICIAL, REEMPLAZA
        if(isNaN(displayValue) || operator == "=" || displayScreen.textContent == "0"){
            displayValue = event.target.textContent;
        }
        // SI HAY NÚMERO SE AGREGA
        else {
            displayValue += event.target.textContent;
        }
    }

    // SI SE INGRESA OPERADOR
    else {
        // SI OPERADOR APRETADO ES != "="
        if(event.target.textContent != "="){
            if(Number(firstNumber) != 0){
                operator = event.target.textContent;
                secondNumber = displayValue;
                result = operate(Number(firstNumber), Number(secondNumber), operator);
                displayValue = result;
                firstNumber = result;
            }
            else if(Number(firstNumber) == 0){
                firstNumber = displayValue;
                operator = event.target.textContent;
                displayValue = event.target.textContent;
            }
        }
        // SI OPERADOR APRETADO ES "="
        else if(event.target.textContent == "="){
            // SI YA SE ELIGIÓ OPERACIÓN A REALIZAR
            if(operator != null){
                // SI NUNCA SE INGRESÓ 2DO NÚMERO
                if(isNaN(displayValue)){
                    secondNumber = 0;
                }
                else {
                    secondNumber = displayValue;
                }

                result = operate(Number(firstNumber), Number(secondNumber), operator);
                displayValue = result;
                firstNumber = result;
                operator = "=";
            }
        }
    }
    console.log(displayValue);
    displayScreen.textContent = displayValue;
}

let displayValue = 0; // STR PARA GUARDAR LO QUE HAY EN DISPLAY
let operator = null;
let firstNumber = 0;
let secondNumber = null;
let result = null;

const displayScreen = document.getElementById("display-screen");
const numbers = document.getElementsByClassName("button-number");
const operators = document.getElementsByClassName("operator");
const clearButton = document.getElementById("button-clear");

clearButton.addEventListener("click", clearDisplay);
Array.from(numbers).forEach(number => number.addEventListener("click", updateDisplay));
Array.from(operators).forEach(operator => operator.addEventListener("click", updateDisplay));
