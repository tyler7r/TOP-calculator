const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
let displayValue = '';
let operatorClick = false;
let addBtnClick = false;
let operandChoice = '';
let num1 = '';
let num2 = '';
let newTotal = '';
let equalBtnClick = false;


function initialLoad () {
        numbers.forEach((button) => {
            button.addEventListener('click', (e) => {
                equalBtnClick = false;
                let value = e.target.textContent;
                displayValue += value;
                display.textContent = `${displayValue}`;
            })
        })
}



function add (num1, num2) {
    let total = num1 + num2;
    return total;
}

function subtract (num1, num2) {
    let total = num1 - num2;
    return total;
}

function multiply (num1, num2) {
    let total = num1 * num2;
    return total;
}

function divide (num1, num2) {
    let total = num1 / num2;
    return total;
}

function operate (num1, operator, num2) {
    if (operator == 'add') {
        return add (num1, num2);
    } else if (operator == subtract) {
        return subtract (num1, num2)
    } else if (operator == multiply) {
        return multiply (num1, num2);
    } else if (operator == divide) {
        return divide (num1, num2);
    }
}

function getTotal() {

    num1 = `${newTotal}`
    num2 = `${displayValue}`;
    let newNum1 = parseInt(num1);
    let newNum2 = parseInt(num2);
    displayValue = '';
    let total = operate(newNum1, operandChoice, newNum2);
    displayValue += total;
    newTotal = total;
    display.textContent = `${displayValue}`;
}

let addBtn = document.querySelector('.add');
addBtn.addEventListener('click', (e) => {
    if (operatorClick === true && equalBtnClick === false) {
        console.log('b');
        operandChoice = `${e.target.className}`
        getTotal();
    // if (equalBtnClick === true) {

    // }
    } else {
        num1 = `${displayValue}`;
        newTotal = `${displayValue}`
        addBtnClick = true;
        operandChoice = `${e.target.className}`;
        console.log('a');
    }
    displayValue = '';
    operatorClick = true;
    // add some class list that will change how the button looks
})

let equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', (equalButton))

function equalButton () {
    if (equalBtnClick === false) {
        getTotal();
    } if (equalBtnClick === true) {
        let newNum1 = parseInt(newTotal);
        let newNum2 = parseInt(num2);
        let total = operate(newNum1, operandChoice, newNum2);
        newTotal = total;
        displayValue = '';
        displayValue += total
        display.textContent = `${displayValue}`;
    }
    equalBtnClick = true;
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    displayValue = '';
    display.textContent = `${displayValue}`;
    newTotal = '';
    num1 = '';
    num2 = '';
    equalBtnClick = false;
    addBtnClick = false;
    operatorClick = false;
})
initialLoad();

