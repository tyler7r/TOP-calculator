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
    if (operator == add) {
        return add (num1, num2);
    } else if (operator == subtract) {
        return subtract (num1, num2)
    } else if (operator == multiply) {
        return multiply (num1, num2);
    } else if (operator == divide) {
        return divide (num1, num2);
    }
}