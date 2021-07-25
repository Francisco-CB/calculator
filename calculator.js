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
    console.log(op);
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
    displayValue = 0;
    firstNumber = null;
    secondNumber = null;
    operator = null;
    result = null;
    displayScreen.textContent = displayValue;
}

function updateDisplay(event){
    // SI SE INGRESA NÚMERO
    if(!isNaN(event.target.textContent)){
        // SI NO HAY UN NÚMERO, O YA SE OPERÓ, O TENEMOS 0 INICIAL, REEMPLAZA
        if(isNaN(displayValue) || operator != null || displayScreen.textContent == "0"){
            displayValue = event.target.textContent;
        }
        // SI HAY NÚMERO SE AGREGA
        else {
            displayValue += event.target.textContent;
        }
    }

    // SI SE INGRESA OPERADOR
    else {
        if(event.target.textContent == "BACK"){
            str = displayScreen.textContent;
            displayValue = str.replace(str.charAt(str.length-1), "")
        }
        else if(event.target.textContent == "."){
            if(!displayScreen.textContent.includes(event.target.textContent)){
                displayValue += event.target.textContent;
            }
        }

        else if(event.target.textContent != "=" && event.target.textContent != "BACK"){
            if(firstNumber == null){
                firstNumber = displayValue;
                operator = event.target.textContent;
                displayValue = firstNumber;
            }

            else if(firstNumber != null && secondNumber == null){
                secondNumber = displayValue;
                result = operate(Number(firstNumber), Number(secondNumber), operator);
                operator = event.target.textContent;
                displayValue = result.toFixed(8);
                firstNumber = result;
                secondNumber = null;
            }
        }
        else if(event.target.textContent == "="){
            secondNumber = displayValue;
            result = operate(Number(firstNumber), Number(secondNumber), operator);
            displayValue = result.toFixed(8);
            firstNumber = null;
            secondNumber = null;
            operator = "=";
            }
    }
    displayScreen.textContent = displayValue;
}

let displayValue = 0; // STR PARA GUARDAR LO QUE HAY EN DISPLAY
let operator = null;
let firstNumber = null;
let secondNumber = null;
let result = null;

const displayScreen = document.getElementById("display-screen");
const numbers = document.getElementsByClassName("button-number");
const operators = document.getElementsByClassName("operator");
const clearButton = document.getElementById("button-clear");

clearButton.addEventListener("click", clearDisplay);
Array.from(numbers).forEach(number => number.addEventListener("click", updateDisplay));
Array.from(operators).forEach(operator => operator.addEventListener("click", updateDisplay));
