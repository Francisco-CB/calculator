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
    return a-b
}

function operate(a, b, op){
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

function updateDisplay(event){
    displayScreen.textContent = event.target.textContent;
    operationString += event.target.textContent;
}

let operationString = ""; // STR PARA GUARDAR OPERACIÓNES

const displayScreen = document.getElementById("display-screen");
const numbers = document.getElementsByClassName("button-number");
const operators = document.getElementsByClassName("operator");

Array.from(numbers).forEach(number => number.addEventListener("click", updateDisplay));
Array.from(operators).forEach(operator => operator.addEventListener("click", updateDisplay));
