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
clearBtnClick = true;

function clearBtnCheck () {
    if (clearBtnClick = true) {
        displayValue = '0';
        display.textContent = `${displayValue}`;
    }
}


function initialLoad () {
        numbers.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (clearBtnClick === true) {
                    displayValue = '';
                }
                equalBtnClick = false;
                clearBtnClick = false;
                let value = e.target.textContent;
                displayValue += value;
                display.textContent = `${displayValue}`;
                operatorBtn.forEach((operator) => {
                    operator.classList.remove('clicked');
                })
                console.log(e.target.id);
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
    } else if (operator == 'subtract') {
        return subtract (num1, num2)
    } else if (operator == 'multiply') {
        return multiply (num1, num2);
    } else if (operator == 'divide') {
        return divide (num1, num2);
    }
}

function getTotal() {

    num1 = `${newTotal}`
    num2 = `${displayValue}`;
    let newNum1 = parseFloat(num1);
    let newNum2 = parseFloat(num2);
    displayValue = '';
    let total = operate(newNum1, operandChoice, newNum2);
    displayValue += total;
    newTotal = total;
    display.textContent = `${displayValue}`;
}

let operatorBtn = document.querySelectorAll('.operator');
operatorBtn.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        clearBtnClick = false;
        if (operatorClick === true && equalBtnClick === false) {
            console.log('b');
            operandChoice = `${e.target.id}`
            getTotal();
        } else {
            num1 = `${displayValue}`;
            newTotal = `${displayValue}`
            addBtnClick = true;
            operandChoice = `${e.target.id}`;
            console.log('a');
        }
        displayValue = '';
        operatorClick = true;
        let choice = document.getElementById(`${e.target.id}`);
        choice.classList.add('clicked');
        // add some class list that will change how the button looks
    })
})

let equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', (equalButton))

function equalButton () {
    clearBtnClick = false;
    if (equalBtnClick === false) {
        getTotal();
    } if (equalBtnClick === true) {
        let newNum1 = parseFloat(newTotal);
        let newNum2 = parseFloat(num2);
        let total = operate(newNum1, operandChoice, newNum2);
        newTotal = total;
        displayValue = '';
        displayValue += total
        display.textContent = `${displayValue}`;
    }
    equalBtnClick = true;
    operatorBtn.forEach((operator) => {
        operator.classList.remove('clicked');
    })
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    clearBtnClick = true;
    clearBtnCheck();
    // displayValue = '';
    // display.textContent = `${displayValue}`;
    newTotal = '';
    num1 = '';
    num2 = '';
    equalBtnClick = false;
    addBtnClick = false;
    operatorClick = false;
})

initialLoad();
clearBtnCheck();

