const calculator = {
  displayValue: "",
  previousValue: "",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand, operator } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  let inputValue = parseFloat(displayValue);

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    calculator.firstOperand  === '0' ? inputValue = '0' : '';
    const result = Calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  
  displayValue === '' ? calculator.previousValue = '0' : '';
  displayValue === '' ? calculator.firstOperand = '0' : '';
  
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function Calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function updateDisplay() {
  const display = document.getElementById("display-value");
  if (display !== null || isNaN(display)) {
    display.value = calculator.displayValue;
  } 
}

let previousOperator = "";
let previoussecondNumber = "";
function updatePreviousValue() {
  const display = document.getElementById("previous-value");

  if (calculator.operator === "=") {
    display.value = `${calculator.previousValue} ${previousOperator} ${previoussecondNumber} =`;
    return;
  } else if (calculator.operator != null) {
    calculator.previousValue = calculator.firstOperand;
    previoussecondNumber = calculator.displayValue;
    previousOperator = calculator.operator;
    display.value = `${calculator.previousValue} ${previousOperator}`;
  } else {
    display.value = "";
  }
}

const keys = document.querySelector(".calc-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;

  const value = target.dataset.value;
  if (!target.matches("button")) {
    return;
  }
  const operators = ["*", "-", "+", "=", "/"];

  if (operators.includes(value)) {
    handleOperator(value);
  } else if (value == ".") {
    inputDecimal(value);
  } else if (value == "clear") {
    resetCalculator("clear");
  } else if (value == "cancel-entry"){
    resetCalculator("cancel-entry");
  } else if (value == "backspace") {
    backspace();
    return
  } else if (Number.isInteger(parseFloat(value))) {
    inputDigit(value);
  }

  updatePreviousValue();
  updateDisplay();
});

function resetCalculator(c) {
  if(c === "cancel-entry" ) {
  calculator.displayValue = "" 
    return  
  }

  calculator.displayValue = "";
  calculator.previousValue = "";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

const backspace = () => {
  const display = document.getElementById("display-value");
  const slice = display.value.slice(0,-1)
  display.value = slice
  calculator.displayValue = display.value
  previoussecondNumber = display.value
} 


//modal
const modal = document.querySelector(".calc");
const openModal = document.querySelector(".open-calc");
const closeModal = document.getElementById("close-modal");

openModal.addEventListener("click", () => {
  modal.classList.toggle("hide");
  modal.classList.toggle("modal");
  modal.style.left = ''
  modal.style.top = ''
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("modal");
  modal.classList.add("hide");
  modal.style.left = ''
  modal.style.top = ''
});


//drag and move
const header = document.querySelector(".top-modal");

function onDrag({ movementX, movementY }) {
  let getStyle = window.getComputedStyle(modal);
  let leftVal = parseInt(getStyle.left);
  let topVal = parseInt(getStyle.top);
  modal.style.left = `${leftVal + movementX}px`;
  modal.style.top = `${topVal + movementY}px`;
}

header.addEventListener("mousedown", () => {
  header.classList.add("active");
  header.addEventListener("mousemove", onDrag);
});

document.addEventListener("mouseup", () => {
  header.classList.remove("active");
  header.removeEventListener("mousemove", onDrag);
});
