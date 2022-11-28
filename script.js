function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b == 0 ? "error" : a / b;
}

function mathOperation(a, b, operation) {
  return window[operation](Number(a), Number(b));
}

function updateDisplays() {
  const displayTopDiv = document.querySelector(".display.top");
  const displayBottomDiv = document.querySelector(".display.bottom");
  if (queuedOperation == "equal") {
    displayTopDiv.textContent = numberOne;
    displayBottomDiv.textContent = numberOne;
  } else {
    const operation = wordToSymbol(queuedOperation);
    displayTopDiv.textContent = numberOne + operation + numberTwo;
    displayBottomDiv.textContent = numberOne;
  }
}

function wordToSymbol(operation) {
  switch (operation) {
    case "add":
      return " + ";
    case "subtract":
      return " - ";
    case "multiply":
      return " × ";
    case "divide":
      return " ÷ ";

    default:
      break;
  }
}

function numberTrim(num) {
  if (num > 999999999) {
    return 999999999;
  } else if (num < -999999999) {
    return -999999999;
  }
  return num.toFixed(8);
}

function stringTrim(num) {
  const isNegative = num.includes("-");
  const hasDecimal = num.includes(".");
  const digits = num.length - isNegative - hasDecimal;
  let newNum = num;
  if (digits > 9) {
    newNum = num.slice(0, 9 + isNegative + hasDecimal);
  }
  for (let i = 0; i < 11; i++) {
    if (newNum.includes(".")) {
      const lastChar = newNum.slice(-1);
      if (lastChar == "0") {
        newNum = newNum.slice(0, -1);
      } else if (lastChar == ".") {
        newNum = newNum.slice(0, -1);
        break;
      }
    }
  }
  return Number(newNum) == 0 ? "0" : newNum;
}

function calculate() {
  numberOne = mathOperation(numberOne, numberTwo, queuedOperation);
  if (numberOne == "error") {
    return;
  }
  numberOne = numberTrim(numberOne).toString();
  console.log(numberOne);
  numberOne = stringTrim(numberOne);
  numberTwo = "0";
  whichNumber = !whichNumber;
}

function updateNumber(num) {
  if (whichNumber && !(queuedOperation == "equal")) {
    whichNumber = !whichNumber;
  }
  let modifyNumber = whichNumber ? numberOne : numberTwo;
  const isNegative = modifyNumber.includes("-");
  const hasDecimal = modifyNumber.includes(".");
  const isZero = Number(modifyNumber) == 0;
  const oneDigit =
    Math.abs(Number(modifyNumber)) < 10 &&
    modifyNumber.length <= 2 &&
    !hasDecimal;
  const digits = modifyNumber.length - isNegative - hasDecimal;
  if (oneDigit && isZero && !whichNumber && num == "delete") {
    whichNumber = !whichNumber;
    numberTwo = "0";
    processOperation(num);
    return;
  }
  if (num == "plusminus") {
    if (isNegative) {
      modifyNumber = modifyNumber.slice(1);
    } else {
      modifyNumber = "-".concat(modifyNumber);
    }
  } else if (num == ".") {
    if (!hasDecimal) {
      modifyNumber = modifyNumber.concat(num);
    }
  } else if (num == "delete") {
    if (oneDigit) {
      modifyNumber = modifyNumber.slice(0, -1);
      modifyNumber = modifyNumber.concat("0");
    } else {
      modifyNumber = modifyNumber.slice(0, -1);
    }
  } else if (oneDigit && isZero) {
    modifyNumber = modifyNumber.slice(0, -1);
    modifyNumber = modifyNumber.concat(num);
  } else if (digits >= 9) {
  } else {
    modifyNumber = modifyNumber.concat(num);
  }
  whichNumber ? (numberOne = modifyNumber) : (numberTwo = modifyNumber);
  console.log(numberOne, queuedOperation, numberTwo);
}

function processOperation(operation) {
  // pressing equal clears the queue
  if (operation == "delete") {
    queuedOperation = "equal";
  } else if (queuedOperation == "equal" || whichNumber) {
    queuedOperation = operation;
  } else {
    calculate();
    queuedOperation = operation;
  }
  console.log(numberOne, queuedOperation, numberTwo);
}

function inputProcessor(key) {
  const input = getCorrespondingInput(key);
  // console.log(input);
  switch (input[1]) {
    case "number":
      if (numberOne != "error") {
        updateNumber(input[0]);
        updateDisplays();
      }
      break;
    case "operation":
      if (numberOne != "error") {
        processOperation(input[0]);
        updateDisplays();
      }
      break;
    case "clear":
      displayTop = "0";
      displayAns = "0";
      numberOne = "0";
      numberTwo = "0";
      whichNumber = true; //true: on num1, false: on num2
      queuedOperation = "equal";
      console.log(numberOne, queuedOperation, numberTwo);
      updateDisplays();
      break;
    case "doNothing":
      break;
    default:
      break;
  }
}

function getCorrespondingInput(key) {
  if (key >= 0 || key <= 9) {
    return [key, "number"];
  } else {
    const lowercaseKey = !key || key.toLowerCase();
    switch (lowercaseKey) {
      case "escape":
        return ["clear", "clear"];
      case "backspace":
      case "delete":
        if (queuedOperation == "equal" || !whichNumber) {
          return ["delete", "number"];
        } else {
          return ["delete", "operation"];
        }
      case "n":
        return ["plusminus", "number"];
      case "/":
      case "d":
        return ["divide", "operation"];
      case "*":
      case "x":
        return ["multiply", "operation"];
      case "-":
      case "s":
        return ["subtract", "operation"];
      case "+":
      case "a":
        return ["add", "operation"];
      case "=":
      case "enter":
        return ["equal", "operation"];
      case ".":
        return [".", "number"];
      default:
        return [" ", "doNothing"];
    }
  }
}

function getInputKey(event) {
  // console.log(event);
  if (event.type == "keydown") {
    // console.log(event.key);
    inputProcessor(event.key);
  } else if (event.type == "click") {
    // console.log(event.target.dataset.key);
    inputProcessor(event.target.dataset.key);
  }
}

function reportWindowSize() {
  const responsiveDiv = document.querySelector(".calculator-body");

  const body = document.querySelector("body");
  const bodyHeight = Number(getComputedStyle(body)["height"].slice(0, -2));
  const bodyWidth = Number(getComputedStyle(body)["width"].slice(0, -2));
  console.log(bodyHeight, bodyWidth);
  if (bodyHeight >= (8 / 5) * bodyWidth) {
    responsiveDiv.style.width = Math.min(700, bodyWidth * 0.9) + "px";
    responsiveDiv.style.height =
      Math.min(1020, (bodyWidth * 0.9 * 8) / 5) + "px";
    console.log("widthbased");
    responsiveDiv.style.fontSize = (bodyWidth * 8 * 0.1) / 5 + "px";
  } else {
    responsiveDiv.style.width =
      Math.min(700, (bodyHeight * 0.9 * 5) / 8) + "px";
    responsiveDiv.style.height = Math.min(1020, bodyHeight * 0.9) + "px";
    console.log("heightbased");
    responsiveDiv.style.fontSize = bodyHeight * 0.1 + "px";
  }
}

let displayTop = "0";
let displayAns = "0";
let numberOne = "0";
let numberTwo = "0";
let whichNumber = true; //true: on num1, false: on num2
let queuedOperation = "equal";

const allButton = document.querySelectorAll(".container .button");
document.addEventListener("click", getInputKey);
window.addEventListener("keydown", getInputKey);

reportWindowSize();
window.onresize = reportWindowSize;
