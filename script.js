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

// function inputProcessor(key) {
//   getCorrespondingInput(key);
// }

// function getCorrespondingInput(key) {
//   switch (key) {
//     case value:
//       break;
//     case value:
//       break;
//     case value:
//       break;
//     case value:
//       break;
//     case value:
//       break;
//     case value:
//       break;
//     case value:
//       break;
//     default:
//       break;
//   }
// }

function getInputKey(event) {
  console.log(event);
  if (event.type == "keydown") {
    console.log(event.key);
    inputProcessor(event.key);
  } else if (event.type == "click") {
    console.log(event.target.dataset.key);
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
