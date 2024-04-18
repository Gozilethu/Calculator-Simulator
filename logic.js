// Define a Calculator class
class Calculator {
    constructor(previousNum, currentNum) {
        this.previousNum = previousNum;
        this.currentNum = currentNum;
        this.opSign = '';
        this.isOn = false; // Flag to track if calculator is on
        this.isOff = false; // Flag to track if calculator is off
    }

    // Method to toggle the calculator on/off
    toggleCalculator() {
        this.isOn = !this.isOn; // Toggle the isOn flag
        const onOffButton = document.getElementById("onOffButton");
        onOffButton.value = this.isOn ? "ON" : "OFF"; // Update the button value
        document.getElementsByName("display")[0].disabled = !this.isOn; // Disable/enable the display
        this.disableButtons(!this.isOn); // Disable/enable other buttons based on calculator state
        if (this.isOn) {
            this.currentNum = '0'; // Reset current number when turning on
            this.updateDisplay();
            this.disableOutputField();
        } else {
            document.getElementsByName('display')[0].value = ''; // Clear display when turning off
        }
    }

    // Method to disable/enable buttons except the on/off button
    disableButtons(disable) {
        const buttons = document.querySelectorAll('.calculator input[type="button"]');
        buttons.forEach(button => {
            if (button.id !== 'onOffButton') {
                button.disabled = disable;
            }
        });
    }

    disableOutputField() {
        const display = document.getElementsByName('display')[0];
        display.disabled = true;
    }

    // Function to calculate square root
    squareRoot() {
        if (!calculator.isOn) 
            return; // Return if calculator is off
        const display = document.getElementsByName('display');
        this.currentNumber = parseFloat(display.innerText);
        if (!isNaN(currentNumber) && currentNumber >= 0) {
            const squareRootValue = Math.sqrt(currentNumber);
            display.innerText = squareRootValue.toString();
        } else {
            display.innerText = "Error"; // Display error if the input is negative
        }
    }

    // Function to calculate percentage
    percentage() {
        if (!this.isOn) 
            return; // Return if calculator is off
        const display = document.getElementsByName('display');
        this.currentNumber = parseFloat(display.innerText);
        if (!isNaN(currentNumber)) {
            const percentValue = currentNumber / 100;
            display.innerText = percentValue.toString();
        }
    }
    
    // Function to add a parenthesis
    addParenthesis(parenthesis) {
        if (!this.isOn) 
            return; // Return if calculator is off
        const display = document.getElementsByName('display');
        display.innerText += parenthesis; // Append the parenthesis to the display
    }

    // Method to add a number to the current number
    addNumber(number) {
        if (!this.isOn) 
            return; // Return if calculator is off
        if (this.currentNum.length >= 7) return; // Limit to seven digits
        if (number === '.' && this.currentNum.includes('.')) {
            return; // Avoid adding multiple decimal points
        }
        if (this.currentNum === '0' && number !== '.') {
            this.currentNum = ''; // Remove leading zero if adding a non-zero digit
        }
        this.currentNum = this.currentNum.toString() + number.toString(); // Append the number
        this.updateDisplay(); // Update the display
    }

    // Method to delete the last digit from the current number
    deleteLastDigit() {
        if (!this.isOn) 
        return; // Return if calculator is off
        if (this.currentNum.length === 1 || (this.currentNum.length === 2 && this.currentNum.startsWith('-'))) {
            this.currentNum = '0'; // Reset to zero if only one digit is present or if it's negative with one digit
        } else {
            this.currentNum = this.currentNum.slice(0, -1); // Remove the last digit
        }
        this.updateDisplay(); // Update the display
    }

    // Method to clear the calculator
    clear() {
        if (!this.isOn) 
        return; // Return if calculator is off
        this.previousNum = '';
        this.currentNum = '0'; // Reset to zero
        this.opSign = '';
        this.updateDisplay(); // Update the display
    }

    // Method to set the operation sign
    operationSign(opSign) {
        if (!this.isOn) 
            return; // Return if calculator is off
        if (this.opSign === '') {
            this.opSign = opSign;
            this.previousNum = this.currentNum;
            this.currentNum = "";
        } else {
            this.computeInput();
            this.opSign = opSign;
        }
        this.updateDisplay(); // Update the display
    }

    // Method to update the display with the current number
    updateDisplay() {
        document.getElementsByName('display')[0].value = this.currentNum;
        disableOutField();
    }

    // Method to compute the result of the operation
    computeInput() {
        if (!this.isOn) 
        return; // Return if calculator is off
        let sum;
        const preNumber = parseFloat(this.previousNum);
        const curNumber = parseFloat(this.currentNum);
        if (isNaN(preNumber) || isNaN(curNumber)) {
            return; // Return if either number is not a valid number
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

        this.currentNum = sum.toString();
        this.opSign = '';
        this.previousNum = "";
        this.updateDisplay(); // Update the display
    }
}

// Create a new instance of Calculator
const calculator = new Calculator('', '');

// Function to toggle the calculator on/off
function toggleCalculator() {
    calculator.toggleCalculator();

    if (!calculator.isOn) {
        calculator.disableOutputField(); // Call the function to disable the display
    }
}

// Function to add a number to the calculator
function addNumber(number) {
    calculator.addNumber(number);
}

// Function to set the operation sign
function operationSign(opSign) {
    calculator.operationSign(opSign);
    calculator.updateDisplay();
}

// Function to compute the result of the operation
function computeInput() {
    calculator.computeInput();
    calculator.updateDisplay();
}

// Function to delete the last digit from the current number
function deleteLastDigit() {
    calculator.deleteLastDigit();
}

// Function to clear the calculator
function clearAll() {
    calculator.clear();
}

// Function to turn off/on the calculator
function turnOffCalculator() {
    calculator.turnOffCalculator(); // This method is not defined in the class, needs implementation

}

function squareRoot() {
    calculator.squareRoot();
}

function addParenthesis(parenthesis) {
    calculator.addParenthesis(parenthesis);
}

function percentage() {
    calculator.percentage();
}
