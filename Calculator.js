const display = document.querySelector(".value");

// Event listener for Each Buttons

document.querySelectorAll(".num").forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = button.textContent;
    if (value === "C") {
      display.value = "";
    } else if (value === "Del") {
      display.value = display.value.slice(0, -1);
    } else if (value === "=" || value === "Enter") {
      const result = calculatePercentage(display.value);
      if (result !== null) {
        display.value = result;
      } else {
        try {
          display.value = eval(display.value);
        } catch (error) {
          display.value = "Invalid";
        }
      }
    } else if (value === "%") {
      display.value += value;
    } else {
      handleInput(value);
    }
  });
});

// For Percentage Calculation

function calculatePercentage(expression) {
  const match = expression.match(/([\d.]+)%\s*of\s*([\d.]+)/);
  if (match) {
    const percentage = parseFloat(match[1]) / 100;
    const baseNumber = parseFloat(match[2]);
    return percentage * baseNumber;
  }

  const percentMatch = expression.match(/([\d.]+)%([\d.]+)/);
  if (percentMatch) {
    const percentage = parseFloat(percentMatch[1]) / 100;
    const baseNumber = parseFloat(percentMatch[2]);
    return percentage * baseNumber;
  }

  return null;
}

// For Keyboard Support

document.addEventListener("keydown", function (event) {
  event.preventDefault();

  // Handling Key Input
  const validKeys = [...Array(10).keys()]
    .map(String)
    .concat(["+", "-", "*", "/", "%", "Enter", "Backspace", "Delete", "."]);
  if (validKeys.includes(event.key)) {
    if (event.key === "Enter") {
      const result = calculatePercentage(display.value);
      if (result !== null) {
        display.value = result;
      } else {
        try {
          display.value = eval(display.value);
        } catch (error) {
          display.value = "Invalid";
        }
      }
    } else if (event.key === "Backspace") {
      display.value = display.value.slice(0, -1);
    } else if (event.key === "Delete") {
      display.value = "";
    } else if (event.key === ".") {
      if (!display.value.includes(".")) {
        display.value += ".";
      }
    } else {
      handleInput(event.key);
    }
  }
});

// Function to handle input and operator validation

function handleInput(key) {
  const lastChar = display.value[display.value.length - 1];
  if (
    ["+", "-", "*", "/", "%"].includes(key) &&
    ["+", "-", "*", "/", "%"].includes(lastChar)
  ) {
    // Replace last operator
    display.value = display.value.slice(0, -1) + key;
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    // Append the operator if different from the last character
    display.value += key;
  } else {
    // For number input
    display.value += key;
  }
}
