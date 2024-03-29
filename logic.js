document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector('input[name="display"]');
    const buttons = document.querySelectorAll('.calculator input[type="button"]');
    let currentExpression = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;
            
            if (value === 'On/Off') {
                // Clear the display and reset the expression
                currentExpression = '';
                display.value = '';
            } else if (value === '=') {
                // Evaluate the expression and display the result
                try {
                    const result = eval(currentExpression);
                    display.value = result;
                    currentExpression = result.toString();
                } catch (error) {
                    display.value = 'Error';
                    currentExpression = '';
                }
            } else if (value === 'DEL') {
                // Delete the last character from the expression
                currentExpression = currentExpression.slice(0, -1);
                display.value = currentExpression;
            } else {
                // Append the clicked value to the expression
                currentExpression += value;
                display.value = currentExpression;
            }
        });
    });
});