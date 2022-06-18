let i = 100;
let secondeCounter = setInterval(() => {
    if (i > 0) {
        document.querySelector('.progress-bar').style.width = i + '%';
        seconde.innerHTML = Math.ceil(i / 1.666666667);
        if (i < 30) {
            document.querySelector('.progress-bar').style.background = 'red';
        }
    } else {
        document.querySelector('.progress-bar').style.width = 0 + '%';
        seconde.innerHTML = 0;
        clearInterval(secondeCounter)
    }
    i--;
}, 600);

let radioInputs = document.querySelectorAll(`input[type="radio"]`);

radioInputs.forEach((radio) => {
    radio.addEventListener('change', function() {
        console.log(radioInputs);
        if (radio.checked) {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'rgb(233, 231, 231)')
            this.parentElement.parentElement.style.borderColor = 'green'
        } else {
            this.parentElement.parentElement.style.borderColor = 'rgb(233, 231, 231)';
        }
    });
})