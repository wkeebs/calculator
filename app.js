// HTML Elements
const buttonsContainer = document.querySelector(".buttons-container");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");

// Ordering of buttons to add
const buttonOrder = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "x",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "=",
  "+",
];

// Numbers for operations
let firstNum = null;
let operator = null;
let secondNum = null;

const initialiseButtons = (num) => {
  for (let i = 0; i < num * num; i++) {
    let newBtn = document.createElement("button");
    newBtn.classList.add("small-btn");
    newBtn.id = `${buttonOrder[i]}-btn`;
    newBtn.innerHTML = buttonOrder[i];
    buttonsContainer.appendChild(newBtn);
  }
};

const putNumber = (num) => {
  if (firstNum === null) {
    firstNum = num;
  } else {
    secondNum = num;
  }
};

const addListeners = () => {
  // number buttons
  for (let num in buttonOrder) {
    let btn = document.querySelector(`${num}-btn`);
    btn.addEventListener("click", putNumber(num));
  }
};

const initialisePage = () => {
  initialiseButtons(4);
};

initialisePage();
