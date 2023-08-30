/**
 * All calculations performed for our calculator web app.
 *
 * @author = @wkeebs Will Keeble: github.com/wkeebs
 */

//// [Visual Elements] \\\\
const calculator = document.querySelector(".calculator");
const keys = document.querySelectorAll(".key--number");
const operators = document.querySelectorAll(".key--operator");
let display = document.querySelector(".display");

//// [Display Functions] \\\\

/**
 * Displays a number.
 * @param {*} keyContent The content of the key press.
 */
function displayNum(keyContent) {
  const displayedNum = display.innerText;
  if (
    displayedNum === "0" ||
    calculator.dataset.previousKeyType === "operator"
  ) {
    display.textContent = keyContent;
  } else {
    display.textContent = display.textContent + keyContent;
  }
}

/**
 * Displays a decimal number.
 *
 * Checks if we are trying to chain decimal points.
 */
function displayDecimal() {
  const displayedNum = display.textContent;
  const prevKey = calculator.dataset.previousKeyType;
  if (!displayedNum.includes(".")) {
    display.textContent = displayedNum + ".";
  } else if (prevKey === "operator" || prevKey === "clear") {
    display.textContent = "0.";
  }
}

/**
 * Clears the view.
 */
function clear(key) {
  display.textContent = "0";

  if (key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";
  } else {
    key.textContent = "AC";
  }

  operators.forEach((b) => b.classList.remove("is-depressed"));
}

/**
 * Deletes a character from the view.
 * Resets to 0 if we are going to delete the last character.
 */
function displayDelete() {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = "0";
  }
}

//// [Calculation Functions] \\\\
/**
 * Calculates an operation.
 * @param {*} n1
 * @param {*} operator
 * @param {*} n2
 * @returns The calculated result.
 */
function calculate(n1, operator, n2) {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
}

//// [EVENT LISTENERS] \\\\
/**
 * Key event listeners.
 */
keys.forEach((button) => {
  button.addEventListener("click", () => {
    displayNum(button.textContent);
    operators.forEach((b) => b.classList.remove("is-depressed"));
    calculator.dataset.previousKeyType = "number";
  });
});

/**
 * Operator event listeners.
 */
operators.forEach((button) => {
  button.addEventListener("click", () => {
    const displayedNum = display.textContent;
    const action = button.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;
    const keyContent = button.textContent;

    // Display the operator.
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }

    switch (action) {
      case "decimal":
        displayDecimal();
        calculator.dataset.previousKey = "decimal";
        break;
      case "divide":
        calculator.dataset.operator = "divide";
        break;
      case "multiply":
        calculator.dataset.operator = "multiply";
        break;
      case "subtract":
        calculator.dataset.operator = "subtract";
        break;
      case "add":
        calculator.dataset.operator = "add";
        break;
      case "clear":
        clear(button);
        calculator.dataset.previousKey = "clear";
        break;
      case "delete":
        displayDelete();
        calculator.dataset.previousKey = "delete";
        break;
      case "calculate":
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayedNum;

        if (firstValue) {
          if (previousKeyType === "calculate") {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
          }
          display.textContent = calculate(firstValue, operator, secondValue);
        }

        // Set modValue attribute
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
        break;
      default:
        break;
    }

    // Change to CE
    if (action !== "clear") {
      const clearButton = document.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    // Extra checks if the last press was an operator.
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // Consecutive calculations.
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update first value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      // Update state data and depressed keys.
      operators.forEach((b) => b.classList.remove("is-depressed"));
      button.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }
  });
});