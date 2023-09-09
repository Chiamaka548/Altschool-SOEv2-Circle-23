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
