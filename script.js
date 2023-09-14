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
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.btns-container');
const evaluationDisplay = document.querySelector('.evaluation');
const resultDisplay = document.querySelector('.result');

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const evaluation = evaluationDisplay.value;
    const result = resultDisplay.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    console.log(action);

    // checking evaluation length
    if (evaluation.length >= 10) {
      if (
        action !== 'clear' &&
        action !== 'square-root' &&
        action !== 'percentage' &&
        action !== 'delete'
      )
        return;
    }

    // number keys
    if (!action) {
      if (evaluation == '0' || result !== '0') {
        evaluationDisplay.value = keyContent;
        resultDisplay.textContent = '0';
      } else {
        evaluationDisplay.value = evaluation + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    //  operation keys
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      evaluationDisplay.value = evaluation + keyContent;
      if (result !== '0') {
        evaluationDisplay.value = result + keyContent;
        resultDisplay.textContent = '0';
      }
      calculator.dataset.previousKeyType = 'operator';
    }

    // clear key
    if (action === 'clear') {
      evaluationDisplay.value = '';
      resultDisplay.textContent = '0';

      calculator.dataset.previousKeyType = 'clear';
    }

    // percentage key
    if (action === 'percentage') {
      if (result != 0) {
        evaluationDisplay.value = result;
      }
      const percentageResult = parseFloat(evaluationDisplay.value / 100);
      resultDisplay.textContent = percentageResult || 'Syntax Error';

      calculator.dataset.previousKeyType = 'percentage';
    }

    // decimal key
    if (action === 'decimal') {
      evaluationDisplay.value = evaluation + '.';

      calculator.dataset.previousKeyType = 'decimal';
    }

    // square root key
    if (action === 'square-root') {
      if (result != 0) {
        evaluationDisplay.value = result;
      }
      let answer = Math.sqrt(parseFloat(evaluationDisplay.value));
      resultDisplay.textContent = answer.toFixed(2) || 'Syntax Error';
      calculator.dataset.previousKeyType = 'square-root';
    }

    // delete (backspace) key
    if (action === 'delete' && evaluation.length > 0) {
      evaluationDisplay.value = evaluation.slice(0, -1);
      calculator.dataset.previousKeyType = 'delete';
    }

    // equals key
    if (action === 'calculate') {
      let newEvaluation = evaluation.replaceAll('x', '*');
      newEvaluation = newEvaluation.replaceAll('÷', '/');

      try {
        eval(newEvaluation);
      } catch (err) {
        if (err instanceof SyntaxError) {
          resultDisplay.textContent = 'Syntax Error';
          return;
        }
      }

      let answer = eval(newEvaluation);

      if (answer.toString().slice('').includes('.')) {
        console.log('yes');
        answer = Number(answer.toFixed(8));
      }

      if (
        answer.toString().length > 11 &&
        !answer.toString().slice('').includes('.')
      ) {
        answer = 'Infinity Error';
      }

      resultDisplay.textContent = answer;

      // if (result.indexOf('.') !== -1)
      //   resultDisplay.textContent = Math.round(eval(newEvaluation));

      calculator.dataset.previousKeyType = 'calculate';
    }
  }
});
