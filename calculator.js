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

function clearDisplay(){
    displayValue = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayScreen.textContent = displayValue;
}

function updateDisplay(event){
    // SI SE INGRESA NÚMERO
    if(!isNaN(event.target.textContent)){
        // SI ES QUE YA SE USÓ OPERADOR, O YA SE OPERÓ
        if(operator != null && displayValue == operator || operator == "="){
            displayValue = event.target.textContent;
        }
        // SI NO SIMPLEMENTE SE AGREGA NÚMERO
        else {
            displayValue += event.target.textContent;
        }
    }
    // SI SE INGRESA OPERADOR
    else {
        // SI YA SE QUIERE CALCULAR LA OPERACIÓN
        if(event.target.textContent == "="){
            secondNumber = Number(displayValue);
            displayValue = operate(firstNumber, secondNumber, operator);
            firstNumber = displayValue; // SE GUARDA PARA FUTURAS OPERACIONES
            operator = event.target.textContent;
        }
        // SI SIMPLEMENTE ES EL OPERADOR
        else {
            // SI ES QUE AÚN NO SE HA HECHO NINGUNA OPERACIÓN
            if(firstNumber == null){
                firstNumber = Number(displayValue);
            }
            operator = event.target.textContent;
            displayValue = event.target.textContent;
        }
    }
    displayScreen.textContent = displayValue;
}

let displayValue = ""; // STR PARA GUARDAR LO QUE HAY EN DISPLAY
let firstNumber = null;
let secondNumber = null;
let operator = null; // STR PARA GUARDAR OPERACIÓNES

const displayScreen = document.getElementById("display-screen");
const numbers = document.getElementsByClassName("button-number");
const operators = document.getElementsByClassName("operator");
const clearButton = document.getElementById("button-clear");

clearButton.addEventListener("click", clearDisplay);
Array.from(numbers).forEach(number => number.addEventListener("click", updateDisplay));
Array.from(operators).forEach(operator => operator.addEventListener("click", updateDisplay));
