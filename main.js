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
let clearBtnClick = true;
let largeNum = ''
let largeNumCheck = false;
let decimal = 0;
let decimalCheck = false;



// need to make a function that would turn answer into scientific notation when it gets too long
function scientificNotation () {
    if (largeNumCheck === true && decimalCheck === true) {
        display.textContent = `${largeNum}` + 'e' + '-' + `${decimal}`;
    } else if (largeNumCheck === true) {
        display.textContent = `${largeNum}` + 'e' + `${(displayValue.length - 1)}`;
    } else if (largeNumCheck === false) {
        display.textContent = `${displayValue}`;
    }
}

function clearBtnCheck () {
    if (clearBtnClick = true) {
        displayValue = '0';
        display.textContent = `${displayValue}`;
    }
}

function scientificNotationCheck(num) {
    let length = num.length - 1;
    if (length >= 9) {
        largeNumCheck = true;
        let integer = parseFloat(num);
        if (integer < 1) {
            decimalCheck = true;
            for (i = 2; i <= num.length; i++) {
                if (num[i] === '0') {
                    console.log('this is zero');
                    continue;
                } else {
                    decimal = [i]-1;
                    console.log([i]);
                    largeNum = (multiply(integer, (10**decimal))).toString().slice(0, 8)
                    console.log(integer);
                    console.log(largeNum);
                    break;
                }
            }
        } else if (integer >= 1) {
            largeNum = (divide(integer, (10**length))).toString().slice(0, 9);
        }
    } else {
        largeNumCheck = false
        console.log('this works')
    }
    scientificNotation();
}


function initialLoad () {
        numbers.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (clearBtnClick === true) {
                    displayValue = '';
                }
                equalBtnClick = false;
                clearBtnClick = false;
                // let value = e.target.textContent;
                // displayValue += value;
                // display.textContent = `${displayValue}`;
                let value = e.target.textContent;
                displayValue += value;
                scientificNotationCheck(`${displayValue}`);
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
    scientificNotationCheck(`${displayValue}`);
}

let operatorBtn = document.querySelectorAll('.operator');
operatorBtn.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        clearBtnClick = false;
        if (operatorClick === true && equalBtnClick === false) {
            operandChoice = `${e.target.id}`
            getTotal();
        } else {
            num1 = `${displayValue}`;
            newTotal = `${displayValue}`
            addBtnClick = true;
            operandChoice = `${e.target.id}`;
        }
        displayValue = '';
        operatorClick = true;
        operatorBtn.forEach((operator) => {
            operator.classList.remove('clicked');
        })
        let choice = document.getElementById(`${e.target.id}`);
        choice.classList.add('clicked');
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
        displayValue += total;
        scientificNotationCheck(`${displayValue}`);
    }
    equalBtnClick = true;
    operatorBtn.forEach((operator) => {
        operator.classList.remove('clicked');
    })
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    operatorBtn.forEach((operator) => {
        operator.classList.remove('clicked');
    })
    clearBtnClick = true;
    clearBtnCheck();
    newTotal = '';
    num1 = '';
    num2 = '';
    equalBtnClick = false;
    addBtnClick = false;
    operatorClick = false;
})

initialLoad();
clearBtnCheck();

