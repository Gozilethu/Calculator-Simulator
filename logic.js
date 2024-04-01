class Calculator {
    constructor(previousNum, currentNum) {
        this.previousNum = previousNum;
        this.currentNum = currentNum;
        this.opSign = '';
    }
    
    onAndOf() {
        var on = rgb(255, 0, 0);
        var off = rgb(141, 149, 156);

        document.getElementById('onAndOff').value = on;

    }

    addNumber(number) {
        if (number === '.' && this.currentNum.includes('.')) {
            return;
        }
        this.currentNum = this.currentNum.toString() + number.toString();
    }
    deleteLastDigit() {
       /*onclick="display.value = display.value.toString().slice(0,-1)" */ 
       this.currentNum = this.currentNum.slice(0, -1);
    }

    clear() {
        this.previousNum = ' ';
        this.currentNum = ' ';
        this.opSign = ' ';
    }

    operationSign(opSign) {
        if (this.opSign === '') {
            this.opSign = opSign;
            this.previousNum = this.currentNum;
            this.currentNum = "";
        } else {
            this.computeInput();
            this.opSign = opSign;
        }
    }

    updateDisplay() {
        document.getElementsByName('display')[0].value = this.currentNum;
    }

    computeInput() {
        let sum;
        const preNumber = parseFloat(this.previousNum);
        const curNumber = parseFloat(this.currentNum);
        if (isNaN(preNumber) || isNaN(curNumber)) {
            return;
        }

        switch(this.opSign) {
            case '+':
                sum = preNumber + curNumber;
                break;
            case '/':
                sum = preNumber / curNumber;
                break;
            case '-':
                sum = preNumber - curNumber;
                break;
            case '*':
                sum = preNumber * curNumber;
                break;
            default:
                return;
        }

        this.currentNum = sum;
        this.opSign = '';
        this.previousNum = "";
    }
}

let previousNum = "";
let currentNum = "";
const display = document.getElementsByName('display')[0];
const numButtons = document.querySelectorAll('.numberButton');
const operationButtons = document.querySelectorAll('#operationSigns');
const calculator = new Calculator(previousNum, currentNum);

function addNumber(number) {
    calculator.addNumber(number);
    calculator.updateDisplay();
}

function operationSign(opSign) {
    calculator.operationSign(opSign);
    calculator.updateDisplay();
}

function computeInput() {
    calculator.computeInput();
    calculator.updateDisplay();
}

function deleteLastDigit() {
    calculator.deleteLastDigit();
    calculator.updateDisplay();
}

function clearAll() {
    calculator.clear();
    calculator.updateDisplay();
}

function onAndOff() {
    const display = document.getElementsByName('display')[0];
    const buttons = document.querySelectorAll('input[type="button"]');
    
    if (display.disabled) {
        display.disabled = false;
        buttons.forEach(button => button.disabled = false);
        calculator.onAndOf();
    } else {
        display.disabled = true;
        buttons.forEach(button => button.disabled = true);
    }
}