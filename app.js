const calculator = document.querySelector(".calculator");
const keys = document.querySelectorAll(".key--number");
const operators = document.querySelectorAll(".key--operator");
const display = document.querySelector(".display");

/** Display Functions */

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

function displayDecimal() {
  display.textContent = display.textContent + ".";
}

function clear() {
  display.textContent = "0";
  calculator.dataset.firstValue = "";
  calculator.dataset.secondValue = "";
  calculator.dataset.operator = "";
  calculator.dataset.previousKeyType = "";
}

function displayDelete() {
  display.textContent = display.textContent.slice(0, -1);
}

/** Calculation Functions */
function calculate(n1, operator, n2) {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}

/** Add Event Listeners */
keys.forEach((button) => {
  button.addEventListener("click", () => {
    displayNum(button.textContent);
    operators.forEach((b) => b.classList.remove("is-depressed"));
    calculator.dataset.previousKeyType == "number";
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    const displayedNum = display.textContent;
    const action = button.dataset.action;
    switch (action) {
      case "decimal":
        displayDecimal();
        break;
      case "divide":
        operator = "divide";
        break;
      case "multiply":
        operator = "multiply";
        break;
      case "subtract":
        operator = "subtract";
        break;
      case "add":
        operator = "add";
        break;
      case "clear":
        clear();
        break;
      case "delete":
        displayDelete();
        break;
      case "calculate":
        display.textContent = calculate(
          calculator.dataset.firstValue,
          calculator.dataset.operator,
          displayedNum
        );

        break;
      default:
        break;
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      operators.forEach((b) => b.classList.remove("is-depressed"));
      button.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }
  });
});
