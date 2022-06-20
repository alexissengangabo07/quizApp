let btnSuivant = document.querySelectorAll('.suivant');
let form = document.querySelector('.form-question');
let radioInputs = document.querySelectorAll(`input[type="radio"]`);
let btnCommencer = document.querySelector('#submit-starter');
let identifForm = document.querySelector('#form-identifiant');
let inputs = document.querySelectorAll('.input');

function progression(width = 100, sec = 60) {
    let secondeDisplay = setInterval(() => {
        if (sec > 0) {
            seconde.innerHTML = sec;
        } else {
            seconde.innerHTML = 0;
            loaderPage(pageActive.idPage + 1);
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
}

identifForm.addEventListener('submit', e => {
    e.preventDefault();
    validateSubmit();
});

for(let i = 0; i < inputs.length; i++) {
    oninputForm(i);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    for(let i = 0; i < radioInputs.length; i++) {
        radioInputs[i];
        if(radioInputs[i].checked) {
            radioInputs.forEach(r => {
                r.parentElement.parentElement.style.borderColor = 'rgba(233, 231, 231)';
            });
            if(radioInputs[i].value == question[pageActive.idPage].reponseIndex) {
                // alert('reponse correcte');
                utilisateur.points++;
                loaderPage(active, index);
            }
            else {
                loaderPage(active, index);
            }
            break;
        }
        else {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'red');
        }
    }  
});

radioInputs.forEach((radio) => {
    radio.addEventListener('change', function() {
        if (radio.checked) {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'rgb(233, 231, 231)');
            this.parentElement.parentElement.style.borderColor = 'green';
            btnSuivant[pageActive.idPage].className = 'suivant suivant-active';
        } 
    });
})
//PROPREMENT
let pages = document.querySelectorAll('.page');
let utilisateur = {
    nom: "",
    email: "",
    points: 0
};

let pageActive = {
    idPage: 0
};

let temps = 60;
let points = 0;
let widthProgress = 100;

let tempsControleur;

//FUNCTIONS
//function pour valider le formuliare pour soummettre
function validateSubmit() {
    for(let i = 0; i < inputs.length; i++) {
        
        let conditionNom = inputs[0].value.trim() != '' && inputs[0].value.trim().length > 2;
        let conditionMail = inputs[1].value.trim() != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[1].value.trim()));
        
        if(!conditionNom) {
            inputs[0].style.borderColor = 'red';
            document.querySelector('#error_name').textContent = 'N\'oubliez pas de renseigner votre nom avant de commencer le Quiz.';
        }
        if(!conditionMail) {
            inputs[1].style.borderColor = 'red';
            document.querySelector('#error_email').textContent = 'N\'oubliez pas de renseigner votre email avant de commencer le Quiz.';
        }
        if(conditionNom && conditionMail) {
            utilisateur.email = document.querySelector('#email').value;
            utilisateur.nom = document.querySelector('#nom').value;
            loaderPage(pageActive.idPage + 1);
            progression();
            break;
        }
    }
}

//Fonction de validation on input
function oninputForm(i) {
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
            btnCommencer.className = 'suivant suivant-active';
        }
    });
}
//Function Loader Pages
function loaderPage(active = 0, index = 0) {
    let assertionDisplayer = document.querySelectorAll('.assertion-displayer');
    let assertions = document.querySelectorAll('.assertion-value');
    let questionDisplayer = document.querySelector('#question-displayer');

    pages.forEach(page => page.style.display = "none");
    pages[active].style.display = "block";
    pageActive.idPage = active;
    questionDisplayer.textContent = question[index].titre;
 
    for(let i = 0; i < assertions.length; i++) {
        assertions[i].value = question[index].assertions.indexOf(question[index].assertions[i]);
        assertionDisplayer[i].textContent = question[index].assertions[i];
    }
}

loaderPage();

console.log("object : " +question[0].assertions[2]);