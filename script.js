let buttonLight = document.getElementById('toggle-light');
let buttonDark = document.getElementById('toggle-dark');
let bodyEl = document.querySelector('body');

buttonLight.addEventListener('click', remove);
buttonDark.addEventListener('click', add);

function add() {
  bodyEl.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}

function remove() {
  bodyEl.classList.remove('dark');
  localStorage.setItem('theme', 'light');
}

function checkTheme() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;

  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    bodyEl.classList.add('dark');
  } else if (theme === 'light') bodyEl.classList.remove('dark');

  if (!theme && prefersDarkMode) bodyEl.classList.add('dark');
}
checkTheme();

// Calculator Functionality
const keys = document.querySelector(".btns-container");
const evaluationDisplay = document.querySelector(".evaluation");
const resultDisplay = document.querySelector(".result");

keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const evaluation = evaluationDisplay.value;
        const result = resultDisplay.textContent;

      // number keys
        if (!action) {
            if (evaluation == "0" || result !== "0") {
              evaluationDisplay.value = keyContent;
              resultDisplay.textContent = "0";
            } else {
                evaluationDisplay.value = evaluation + keyContent;
            }
        }

      //  operation keys
        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            evaluationDisplay.value = evaluation + keyContent;
            if (result !== "0") {
                evaluationDisplay.value = result + keyContent;
                resultDisplay.textContent = "0";
            }
        }

        // clear key
        if (action === "clear") {
            console.log("clear key!");
        }

        // percentage key
        if (action === "percentage") {
            console.log("percentage key!");
            percentageResult = evaluationDisplay.value / 100;
            resultDisplay.textContent = percentageResult;
        }

        // decimal key
        if (action === "decimal") {
            console.log("decimal key!");
      }
      
      // square root key
      if (action === "square-root") {
        resultDisplay.textContent = Math.sqrt(parseFloat(evaluationDisplay.value));
      }

        // delete (backspace) key
        if (action === "delete") {
            console.log("delete key!");
        }

        // equals key
        if (action === "calculate") {
            console.log("equal key!");
        }

    }
});
