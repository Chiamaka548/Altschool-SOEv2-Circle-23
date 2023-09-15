// Light and Dark Mode Functionality
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

// event listener for all keys
keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const evaluation = evaluationDisplay.textContent;
    const result = resultDisplay.textContent;


    // if the key is a number key
    if (!action) {

      // if there is no evaluation or there is a result, display the number key content
      if (evaluation == '0' || result !== '0') {
        evaluationDisplay.textContent = keyContent;
        resultDisplay.textContent = '0';

        // if there is an evaluation, add the number key content to the end of the evaluation
      } else {
        evaluationDisplay.textContent = evaluation + keyContent;
      }
    }


    // if the key is an operation key
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {

      // if there is no evaluation, do nothing
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      evaluationDisplay.textContent = evaluation + keyContent;

      // if there is a result, move it to the evaluation display when an operation key is pressed
      if (result !== '0') {
        evaluationDisplay.textContent = result + keyContent;
        resultDisplay.textContent = '0';
      }
    }


    // if the key is the clear key
    if (action === 'clear') {

      // clear all displays and reset result to 0
      evaluationDisplay.textContent = '';
      resultDisplay.textContent = '0';
    }


    // if the key is the percentage key
    if (action === 'percentage') {

      // if there is no evaluation, do nothing
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      
      // if there is a result, move it to the evaluation display when the percentage key is pressed
      if (result != 0) {
        evaluationDisplay.textContent = result;
      }
      const percentageResult = parseFloat(evaluationDisplay.textContent / 100);
      resultDisplay.textContent = percentageResult || 'Syntax Error';
    }


    // if the key is the decimal key
    if (action === 'decimal') {
      // add a decimal to the end of the evaluation
      evaluationDisplay.textContent = evaluation + '.';
    }


    // if the key is the square root key
    if (action === 'square-root') {

      // if there is no evaluation, do nothing
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      
      // if there is a result, move it to the evaluation display when the square root key is pressed
      if (result != 0) {
        evaluationDisplay.textContent = result;
      }
      let answer = Math.sqrt(parseFloat(evaluationDisplay.textContent));
      resultDisplay.textContent = answer.toFixed(2) || 'Syntax Error';
    }


    // if the key is the delete key
    if (action === 'delete' && evaluation.length > 0) {

      // delete the last character of the evaluation
      evaluationDisplay.textContent = evaluation.slice(0, -1);
    }


    // if the key is the calculate key  
    if (action === 'calculate') {

      // if there is no evaluation, do nothing
      if (
        Number(resultDisplay.textContent) === 0 &&
        evaluationDisplay.textContent === ''
      )
        return;
      
      // replace all instances of x with * and ÷ with / in the evaluation
      let newEvaluation = evaluation.replaceAll('x', '*');
      newEvaluation = newEvaluation.replaceAll('÷', '/');

      // if there is an error in the evaluation, display 'Syntax Error'
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

    // if the evaluation display is too long, decrease the font size
    if (window.innerWidth >= 550) {
      if (evaluationDisplay.textContent.length > 13) {
        evaluationDisplay.style.fontSize = '2rem';
      } else {
        evaluationDisplay.style.fontSize = '3rem';
      }
    }
  }
});
