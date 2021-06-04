const inputField = document.querySelector(".inputbar");		
const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator-buttons");
const operatorKeys = document.querySelectorAll(".operator");

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = inputField.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;
	

		if (!action) {
			if (operatorKeys) {										// Making sure class "ispressed",
				operatorKeys.forEach(key => {						// will be removed from all operating keys,
					if (key.classList.contains("ispressed")) {		// after hitting a second number.
						key.classList.remove("ispressed");
					}
				});
			}

			if (
				displayedNum === '0' ||
				previousKeyType === 'operator' ||
				previousKeyType === 'calculate'
			) {
				inputField.textContent = keyContent;
			} else {
				inputField.textContent = displayedNum + keyContent;
			}
			calculator.dataset.previousKeyType = 'number';
		}

		if (action === 'decimal') {									// Checking if the input field,
			if (!displayedNum.includes('.')) {						// contains a dot, if so, 
				inputField.textContent = displayedNum + '.';		// no more dots can be added.
			}														// If not, a dot will be appended
																	// to the current string on the input field.
			calculator.dataset.previousKeyType = 'decimal';
		}
	
		if (														// Checking for all different 
			action === 'add' ||										// operational inputs.
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide' ||
			action === 'percentage' ||
			action === 'square-root'
		) {
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNum;

			if (
				firstValue &&
				operator &&
				previousKeyType !== 'operator' &&
				previousKeyType !== 'calculate'
			) {
				const calcValue = calculate(firstValue, operator, secondValue)
				inputField.textContent = calcValue;
				calculator.dataset.firstValue = calcValue;
			} else {
				calculator.dataset.firstValue = displayedNum;
			}
				
			key.classList.add('ispressed');
			calculator.dataset.previousKeyType = 'operator';
			calculator.dataset.operator = action;
		}

		if (action === 'clear') {
			if (key.textContent === 'AC') {
				calculator.dataset.firstValue = '';
				calculator.dataset.modValue = '';
				calculator.dataset.operator = '';
				calculator.dataset.previousKeyType = '';
			} else {
			key.textContent = 'AC';
			}

			if (operatorKeys) {										// Making sure class "ispressed",
				operatorKeys.forEach(key => {						// will be removed from all operating keys,
					if (key.classList.contains("ispressed")) {		// after hitting a second number.
						key.classList.remove("ispressed");
					}
				});
			}

			inputField.textContent = 0;
			calculator.dataset.previousKeyType = 'clear';
		} 

	if (action === 'ans' && calculator.dataset.answer !== '') { // If the user presses the "Ans" button,
			inputField.textContent = calculator.dataset.answer;	// the answer of the previous calculation,
		}														// will be displayed again on the screen.
					 											

		if (action === 'calculate') {
			if (inputField.textContent = "0") {
				inputField.textContent = "Syntax error";
			}
			const operator = calculator.dataset.operator;
			let firstValue = calculator.dataset.firstValue;
			let secondValue = displayedNum;
			let answer;

			if (firstValue && secondValue) {
				if (previousKeyType === 'calculate') {
					firstValue = displayedNum;
					secondValue = calculator.dataset.modValue;
				}
			}

			answer = calculate(firstValue, operator, secondValue);
			inputField.textContent = answer;

			calculator.dataset.answer = answer;
			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = 'calculate';
		}
	}
})

calculate = (num1, operator, num2 = '') => {							// The method used
	const number1 = Math.floor(num1);									// to do all the calculations,
	const number2 = Math.floor(num2);									// takes in 3 parameters, 
          																// number 1, number2, and the operator.
	if (operator === "add") return number1 + number2;					
	if (operator === "subtract") return number1 - number2;
	if (operator === "multiply") return number1 * number2;
	if (operator === "divide") return number1 / number2;
	if (operator === "percentage") return number1 / 100 * number2;
	if (operator === "square-root") return Math.sqrt(num1);
}

