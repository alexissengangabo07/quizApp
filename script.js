let width = 100;
let sec = 60;
let btnSuivant = document.querySelector('.suivant');
let form = document.querySelector('.form-question');
let radioInputs = document.querySelectorAll(`input[type="radio"]`);
let btnCommencer = document.querySelector('#submit-starter');
let identifForm = document.querySelector('#form-identifiant');
let inputs = document.querySelectorAll('.input');

identifForm.addEventListener('submit', e => {
    e.preventDefault();
    for(let i = 0; i < inputs.length; i++) {
            if(inputs[0].value.trim() == '' || inputs[0].value.trim().length < 3) {
                inputs[0].style.borderColor = 'red';
                document.querySelector('#error_name').textContent = 'N\'oubliez pas de renseigner votre nom avant de commencer le Quiz.';
            }
            if(inputs[1].value.trim() == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[1].value.trim()))) {
                inputs[1].style.borderColor = 'red';
                document.querySelector('#error_email').textContent = 'N\'oubliez pas de renseigner votre email avant de commencer le Quiz.';
            }
            else {
                alert('ok');
            }
    }
});

for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', () => {
        if(inputs[i].value.trim() != '') {
            inputs[i].style.borderColor = 'rgba(233, 231, 231)';
            if(inputs[0].value.trim() != '') {
                document.querySelector('#error_name').textContent = '';
            }
            if(inputs[1].value.trim() != '') {
                document.querySelector('#error_email').textContent = '';
            }
        }
        if(inputs[0].value.trim() != '' && inputs[1].value.trim() != '') {
            btnSuivant.className += 'suivant suivant-active';   
        }
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    for(let i = 0; i < radioInputs.length; i++) {
        radioInputs[i];
        if(radioInputs[i].checked) {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'rgba(233, 231, 231)');
            break;
        }
        else {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'red');
        }
    }
});

let secondeDisplay = setInterval(() => {
    if (sec > 0) {
        seconde.innerHTML = sec;
    } else {
        seconde.innerHTML = 0;
        clearInterval(secondeDisplay);
    }
    sec--;
}, 1000);
let secondeCounter = setInterval(() => {
    if (width > 0) {
        document.querySelector('.progress-bar').style.width = width + '%';
        if (width < 30) {
            document.querySelector('.progress-bar').style.background = 'red';
        }
    } else {
        document.querySelector('.progress-bar').style.width = 0 + '%';
        clearInterval(secondeCounter)
    }
    width--;
}, 600);

radioInputs.forEach((radio) => {
    radio.addEventListener('change', function() {
        if (radio.checked) {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'rgb(233, 231, 231)');
            this.parentElement.parentElement.style.borderColor = 'green';
            btnCommencer.className = 'suivant suivant-active';
        } 
    });
})

//PROPREMENTDIT CODE


console.log("object : " +question[0].assertions[2]);