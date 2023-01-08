const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');

let displayValue = '';
let currentNum = '';
let previousNum = '';
let operandChoice = '';
let currentFactor = '';
let adjustedNum = '';
let buttonClicked = '';

let equalBtnClick = false;
let clearBtnClick = true;
let operatorClick = false;
let deleteBtnClick = false;
let scientificNotation = false;

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
            buttonClicked = 'number';
            if (scientificNotation === true) {
                return;
            }
            equalBtnClick = false;
            clearBtnClick = false;
            operatorClick = false;
            let value = e.target.textContent;
            currentNum += value;
            displayValue = currentNum;
            display.textContent = displayValue;
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
    } else if (operator == 'x') {
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
    if (num2 === 0 && operandChoice === '/') {
        display.textContent = 'Nice Try!'
    } else {
        let total = operate(num1, operandChoice, num2);
        previousNum = total
        currentNum = '';
        displayValue = previousNum;
        manageDisplay(displayValue);
        display.textContent = displayValue;
        console.log(displayValue.length - 1);
    }
}

let operatorBtn = document.querySelectorAll('.operator');
operatorBtn.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        clearBtnClick = false;
        scientificNotation = false;
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

let equalBtn = document.querySelector('#equal');
equalBtn.addEventListener('click', equalButton);

function equalButton() {
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

let clearBtn = document.querySelector('#clear');
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
    scientificNotation = false;
})

let deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', () => {
    if (scientificNotation === true) {
        return;
    }
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

function manageDisplay(num) {
    let integer = parseFloat(num);
    let string = integer.toString();
    let length = string.length - 1;
    
    if (length >= 9 && (integer > 1 || integer <= 0.00000009) && integer < 1**100) {
        let eNotation = integer.toExponential(6);
        displayValue = eNotation;
        display.textContent = displayValue;
        scientificNotation = true;
    } else if (length >= 9 && (integer >= (1**100))) {
        let eNotation = integer.toExponential(5);
        displayValue = eNotation;
        display.textContent = displayValue;
        scientificNotation = true;
    } else if (length >=9 && (integer > 0.00000009 && integer < 1) && string.includes('.')) {
        displayValue = integer.toFixed(8);
        display.textContent = displayValue;
    }
}

decimalBtn = document.querySelector('#decimal');
decimalBtn.addEventListener('click', (e) => {
    if (currentNum.toString().includes('.')) {
        return
    }
    let value = e.target.textContent;
    currentNum += value;
    displayValue = currentNum;
    display.textContent = displayValue;
});

negativeBtn = document.querySelector('#negative');
negativeBtn.addEventListener('click', () => {
    if (currentNum === '') {
        let newNum = previousNum * -1;
        previousNum = newNum;
        displayValue = previousNum.toString();
        display.textContent = displayValue;
    } else {
        let num = parseFloat(currentNum);
        currentNum = num * -1;
        displayValue = currentNum.toString();
        display.textContent = displayValue;
    }
})

window.addEventListener('keydown', (e) => {
    let key = e.key;
    console.log(key);
    if (key === 'Enter') {
        equalButton();
    } else if (key === '+' || key === '/' || key === '-' || key === 'x') {
        clearBtnClick = false;
        scientificNotation = false;
        if (operatorClick === true) {
            return;
        }
        if (previousNum === '') {
            previousNum = currentNum;
            currentNum = '';
            operandChoice = key;
        } else if (equalBtnClick === true) {
            operandChoice = key;
        } else {
            getTotal();
            operandChoice = key;
        }
        operatorClick = true;
        equalBtnClick = false;
        removeOperatorStyle();
    } else if (key === 'Backspace') {
        if (scientificNotation === true) {
            return;
        }
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
    } else if (key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || key === '6' || key === '7' || key === '8' || key === '9' || key === '0') {
        if (scientificNotation === true) {
            return;
        }
        equalBtnClick = false;
        clearBtnClick = false;
        operatorClick = false;
        let value = key;
        console.log(typeof(key));
        currentNum += value;
        displayValue = currentNum;
        display.textContent = displayValue;
        removeOperatorStyle();
    } else if (key === '.') {
        if (currentNum.toString().includes('.')) {
            return
        }
        let value = key
        currentNum += value;
        displayValue = currentNum;
        display.textContent = displayValue;
    } else {
        return;
    }
    clearBtnClick = false;
})

initialLoad();
clearBtnCheck();