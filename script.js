let buttonLight = document.getElementById('toggle-light')
let buttonDark = document.getElementById('toggle-dark')

buttonLight.addEventListener('click', remove);
buttonDark.addEventListener('click', add)

function add() {
    let main = document.querySelector('main');
    main.classList.add('main-dark');

    let evaluation = document.getElementById('evaluation');
    evaluation.classList.add('evaluation-dark');

    let btns = document.getElementsByClassName('calc-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.add('btn-dark');

    }

    let clearAll = document.getElementById('clear-all');
    clearAll.classList.add('clear-all-dark')

    let equalTo = document.getElementById('equal-to');
    equalTo.classList.add('equal-to-dark')

    let operators = document.getElementsByClassName('operators');
    for (let j = 0; j < operators.length; j++){
        operators[j].classList.add('operators-dark')
    }

    let light = document.getElementById('toggle-light');
    light.classList.add('light-dark')

    let dark = document.getElementById('toggle-dark');
    dark.classList.add('dark-dark')


   

       
}

function remove() {
    let container = document.querySelector('main');
    container.classList.remove('main-dark')

    let evaluation = document.getElementById('evaluation');
    evaluation.classList.remove('evaluation-dark')

    let btns = document.getElementsByClassName('calc-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('btn-dark');

    }

    let clearAll = document.getElementById('clear-all');
    clearAll.classList.remove('clear-all-dark')

    let equalTo = document.getElementById('equal-to');
    equalTo.classList.remove('equal-to-dark')

    let operators = document.getElementsByClassName('operators');
    for (let j = 0; j < operators.length; j++){
        operators[j].classList.remove('operators-dark')
    }

    let light = document.getElementById('toggle-light');
    light.classList.remove('light-dark')

    let dark = document.getElementById('toggle-dark');
    dark.classList.remove('dark-dark')
}