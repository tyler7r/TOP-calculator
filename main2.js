const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');

let displayValue = '';
let currentNum = '';
let previousNum = '';
let operandChoice = '';
let currentFactor = '';
let adjustedNum = '';

let equalBtnClick = false;
let clearBtnClick = true;
let longNumCheck = false;
let decimalCheck = false;
let operatorClick = false;
let deleteBtnClick = false;

function clearBtnCheck() {
    if (clearBtnClick === true) {
        displayValue = '0';
        display.textContent = displayValue;
    }
}

function removeOperatorStyle() {
    operatorBtn.forEach((operator) => {
        operator.classList.remove('clicked');
    })
}

function initialLoad() {
    numbers.forEach((button) => {
        button.addEventListener('click', (e) => {
            equalBtnClick = false;
            clearBtnClick = false;
            operatorClick = false;
            let value = e.target.textContent;
            currentNum += value;
            displayValue = currentNum;
            display.textContent = displayValue;
            // scientificNotationCheck(`${displayValue}`);
            removeOperatorStyle();
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
    if (operator == '+') {
        return add (num1, num2);
    } else if (operator == '-') {
        return subtract (num1, num2)
    } else if (operator == 'X') {
        return multiply (num1, num2);
    } else if (operator == '/') {
        return divide (num1, num2);
    }
}

function getTotal () {
    if (deleteBtnClick === true) {
        previousNum = adjustedNum;
        if (adjustedNum === '') {
            previousNum = '0';
        }
        deleteBtnClick = false;
    }
    num1 = parseFloat(previousNum);
    num2 = parseFloat(currentNum);
    let total = operate(num1, operandChoice, num2);
    previousNum = total
    currentNum = '';
    displayValue = previousNum;
    display.textContent = displayValue;
}

let operatorBtn = document.querySelectorAll('.operator');
operatorBtn.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        clearBtnClick = false;
        if (operatorClick === true) {
            return;
        }
        if (previousNum === '') {
            previousNum = currentNum;
            currentNum = '';
            operandChoice = `${e.target.textContent}`;
        } else if (equalBtnClick === true) {
            operandChoice = `${e.target.textContent}`;
        } else {
            getTotal();
            operandChoice = `${e.target.textContent}`;
        }
        operatorClick = true;
        equalBtnClick = false;
        removeOperatorStyle();
        let operatorFill = document.getElementById(`${e.target.id}`);
        operatorFill.classList.add('clicked');
    })
})

let equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', equalButton);

function equalButton () {
    clearBtnClick = false;
    if (equalBtnClick === false) {
        currentFactor = currentNum;
        getTotal();
    } else if (equalBtnClick === true) {
        currentNum = currentFactor;
        getTotal();
    }
    equalBtnClick = true;
    removeOperatorStyle();
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    removeOperatorStyle();
    clearBtnClick = true;
    clearBtnCheck();
    previousNum = '';
    currentNum = '';
    currentFactor = '';
    equalBtnClick = false;
    operatorClick = false;
    deleteBtnClick = false;
})

let deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', () => {
    deleteBtnClick = true;
    let string = displayValue.toString();
    let lastNum = string.length - 1;
    let newNum = string.replace(string[lastNum], '');
    adjustedNum = newNum;
    displayValue = newNum;
    display.textContent = adjustedNum;
    if (displayValue === '') {
        displayValue = '0';
        display.textContent = displayValue;
    }
})

initialLoad();
clearBtnCheck();
