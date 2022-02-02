const displayTop = document.getElementById('displayTop');
const displayBottom = document.getElementById('displayBottom');

const numberButtons = document.querySelectorAll('.calculator-button.number'); 
const operatorButtons = document.querySelectorAll('.calculator-button.operator');
const dotButton = document.getElementById('dotButton');
const equalsButton = document.getElementById('equalsButton');
const clearButton = document.getElementById('clearButton');
const backButton = document.getElementById('backButton');

let isFirstOperation = true;

let currentNumber = '';
let previousNumber = '';
let currentOperator = '';
let previousOperator = '';

// BUTTONS

numberButtons.forEach(button => {
    button.addEventListener('click', function() {

        currentNumber += button.textContent;

        if (currentNumber === '80085') { // lol
            updateDisplayBottom(`😳 ${currentNumber}`);
        } else if (currentNumber === '666') {
            updateDisplayBottom(`👹 ${currentNumber}`);
        } else if (currentNumber === '1337') {
            updateDisplayBottom(`🕹 ${currentNumber}`);
        } else if (currentNumber === '911') {
            updateDisplayBottom(`👮‍♂️ ${currentNumber}`);
        } else {
            updateDisplayBottom(currentNumber);
        }
    });
});

dotButton.addEventListener('click', function() {
    if (currentNumber.includes('.')) {
        return; // Prevents user from adding multiple decimals
    } else {
        currentNumber += dotButton.textContent;
        updateDisplayBottom(currentNumber);
    }
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (currentNumber === '' && previousNumber === '') {
            return; // Doesn't do anything if theres nothing to calculate on
        }

        currentOperator = button.textContent;
        updateDisplayTop(`${previousNumber} ${currentOperator}`);
        updateDisplayBottom('0');

            if (isFirstOperation) {
                previousNumber = currentNumber;
                updateDisplayTop(`${previousNumber} ${currentOperator}`);
            } else {
                if (currentNumber === '') {
                    return; // Doesn't continue if input is blank
                }
                let result = operate(previousOperator, previousNumber, currentNumber);
                updateDisplayTop(`${result} ${currentOperator}`);
                previousNumber = result;
            }

            isFirstOperation = false;
            currentNumber = '';
            previousOperator = currentOperator;
    });
});

equalsButton.addEventListener('click', function() {
    if (currentNumber === '' || previousNumber === '' || previousOperator === '') {
        return; // Doesn't do anything if theres nothing to calculate on
    }

    let result = operate(currentOperator, previousNumber, currentNumber);
    updateDisplayTop(`${previousNumber} ${currentOperator} ${currentNumber}`);
    updateDisplayBottom(`= ${result}`);
    previousNumber = result;
    currentNumber = '';
});

clearButton.addEventListener('click', function() {
    clearCalculator();
});

backButton.addEventListener('click', function() {
    if (displayBottom.textContent.includes('=')) {
        return; // Disables backspacing if a result is on display
    } else if (currentNumber != '') {
        currentNumber = currentNumber.slice(0, -1);
        updateDisplayBottom(currentNumber);
        if (displayBottom.textContent === '') { // Displays 0 when all numbers are removed
            updateDisplayBottom('0');
        }
    }
});

// FUNCTIONS

function updateDisplayTop(input) {
    displayTop.textContent = input;
}

function updateDisplayBottom(input) {
    displayBottom.textContent = input;
}

function clearCalculator() {
    isFirstOperation = true;
    currentNumber = '';
    previousNumber = '';
    currentOperator = '';
    previousOperator = '';
    updateDisplayBottom('0');
    updateDisplayTop('👌');
}

function operate(operator, a, b) {
    let result;
    a = Number(a);
    b = Number(b);
    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        if (b === 0) {
            alert("Can't divide by 0. 😅");
            currentNumber = 0;
            return a;
        }
        result = divide(a, b);
    } else if (operator === '%') {
        result = remainder(a, b);
    }

    // Removes all decimals but 2 and converts to string
    result = result.toFixed(2).toString();

    // Removes decimals if they're only zeros
    if (result.slice(-2) === '00') {
        result = result.slice(0, -3);
    }
    return result;
}

function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
}

function remainder(a, b) {
    return a % b;
}

// KEYBOARD SUPPORT

window.onkeydown = function(e){
    let x = e.key;
    let choice
    switch(x){
        case '1':
            choice = document.getElementById('oneButton');
            choice.click();
            break;
        case '2':
            choice = document.getElementById('twoButton');
            choice.click();
            break;
        case '3':
            choice = document.getElementById('threeButton');
            choice.click();
            break;
        case'4':
            choice = document.getElementById('fourButton');
            choice.click();
            break;
        case '5':
            choice = document.getElementById('fiveButton');
            choice.click();
            break;
        case '6':
            choice = document.getElementById('sixButton');
            choice.click();
            break;
        case '7':
            choice = document.getElementById('sevenButton');
            choice.click();
            break;
        case '8':
            choice = document.getElementById('eightButton');
            choice.click();
            break;
        case '9':
            choice = document.getElementById('nineButton');
            choice.click();
            break;
        case '0':
            choice = document.getElementById('zeroButton');
            choice.click();
            break;
        case 'Escape':
            choice = document.getElementById('clearButton');
            choice.click();
            break;
        case 'Backspace':
            choice = document.getElementById('backButton');
            choice.click();
            break;
        case '%':
            choice = document.getElementById('remainderButton');
            choice.click();
            break;
        case '/':
            choice = document.getElementById('divisionButton');
            choice.click();
            break;
        case '*':
            choice = document.getElementById('multiplyButton');
            choice.click();
            break;
        case '-':
            choice = document.getElementById('minusButton');
            choice.click();
            break;
        case '+':
            choice = document.getElementById('plusButton');
            choice.click();
            break;
        case '.':
            choice = document.getElementById('dotButton');
            choice.click();
            break;
        case '=':
            choice = document.getElementById('equalsButton');
            choice.click();
            break;
        case 'Enter':
            choice = document.getElementById('equalsButton');
            choice.click();
            break;
    }
}