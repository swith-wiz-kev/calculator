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
  return a / b;
}

function mathOperation(a, b, operation) {
  return window[operation](a, b);
}

function inputProcessor(key) {
  const input = getCorrespondingInput(key);
  console.log(input);
}

function getCorrespondingInput(key) {
  if (key >= 0 || key <= 9) {
    // console.log(typeof key, key);
    // console.log(typeof Number(key), Number(key));
    return [Number(key), "number"];
  } else {
    if (typeof key == "string") {
      const lowercaseKey = key.toLowerCase();
      switch (lowercaseKey) {
        case "escape":
          return ["clear", "special"];
        case "backspace":
        case "delete":
          return ["delete", "special"];
        case "n":
          return ["plusminus", "special"];
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
          return ["equal", "special"];
        case ".":
          return ["decimal", "special"];
        default:
          break;
      }
    }
  }
}

function getInputKey(event) {
  console.log(event);
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

const allButton = document.querySelectorAll(".container .button");
document.addEventListener("click", getInputKey);
window.addEventListener("keydown", getInputKey);
reportWindowSize();
window.onresize = reportWindowSize;
