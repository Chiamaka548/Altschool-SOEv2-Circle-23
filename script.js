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
    const evaluation = evaluationDisplay.textContent;
    const result = resultDisplay.textContent;

    // number keys
    if (!action) {
      if (evaluation == '0' || result !== '0') {
        evaluationDisplay.textContent = keyContent;
        resultDisplay.textContent = '0';
      } else {
        evaluationDisplay.textContent = evaluation + keyContent;
      }
    }

    //  operation keys
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      evaluationDisplay.textContent = evaluation + keyContent;
      if (result !== '0') {
        evaluationDisplay.textContent = result + keyContent;
        resultDisplay.textContent = '0';
      }
    }

    // clear key
    if (action === 'clear') {
      evaluationDisplay.textContent = '';
      resultDisplay.textContent = '0';
    }

    // percentage key
    if (action === 'percentage') {
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      if (result != 0) {
        evaluationDisplay.textContent = result;
      }
      const percentageResult = parseFloat(evaluationDisplay.textContent / 100);
      resultDisplay.textContent = percentageResult || 'Syntax Error';
    }

    // decimal key
    if (action === 'decimal') {
      evaluationDisplay.textContent = evaluation + '.';
    }

    // square root key
    if (action === 'square-root') {
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      if (result != 0) {
        evaluationDisplay.textContent = result;
      }
      let answer = Math.sqrt(parseFloat(evaluationDisplay.textContent));
      resultDisplay.textContent = answer.toFixed(2) || 'Syntax Error';
    }

    // delete (backspace) key
    if (action === 'delete' && evaluation.length > 0) {
      evaluationDisplay.textContent = evaluation.slice(0, -1);
    }

    // equals key
    if (action === 'calculate') {
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
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

      resultDisplay.textContent = answer;
    }

    if (window.innerWidth >= 550) {
      if (evaluationDisplay.textContent.length > 13) {
        evaluationDisplay.style.fontSize = '2rem';
      } else {
        evaluationDisplay.style.fontSize = '3rem';
      }
    }
  }
});
