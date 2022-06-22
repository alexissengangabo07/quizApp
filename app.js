let question = require('./question');

let btnSuivant = document.querySelectorAll('.suivant');
let form = document.querySelector('.form-question');
let radioInputs = document.querySelectorAll(`input[type="radio"]`);
let btnCommencer = document.querySelector('#submit-starter');
let identifForm = document.querySelector('#form-identifiant');
let inputs = document.querySelectorAll('.input');
let width = 100;
let sec = 60;

let secondeCounter = setInterval(() => {
    if (pageActive.idPage > 0) {
        if (sec > 0) {
            seconde.innerHTML = sec;
        } 
        else {
            sec = 60;
            loaderPage(1, pageActive.indexQ++);
            form.reset();
            document.querySelector('#questionCount').textContent = `${pageActive.indexQ} / ${question.length}`;
            console.log(utilisateur.points);
        }
        sec--;
    }
}, 1000);
let widthCounter = setInterval(() => {
    if (pageActive.idPage > 0) {
        if (width > 0) {
            document.querySelector('.progress-bar').style.width = width + '%';
        } else {
            width = 100;
        }
        width--;
    }
}, 600);

identifForm.addEventListener('submit', e => {
    e.preventDefault();
    validateSubmit();
});

for(let i = 0; i < inputs.length; i++) {
    oninputForm(i);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    // alert(pageActive.indexQ +' / '+ question.length);
    document.querySelector('#questionCount').textContent = `${pageActive.indexQ + 1} / ${question.length}`;
    
    for(let i = 0; i < radioInputs.length; i++) {
        
        if(radioInputs[i].checked) {
            width = 100;
            sec = 60;

            radioInputs.forEach(radio => {
                radio.parentElement.parentElement.style.borderColor = 'rgba(233, 231, 231)';
            });
            
            if(pageActive.indexQ < question.length) {
                form.reset();
                if(radioInputs[i].value == question[pageActive.indexQ - 1].reponseIndex) {
                    utilisateur.points++;    
                }
                loaderPage(1, pageActive.indexQ);
                console.log(`Utilisateur: ${utilisateur.nom} ${utilisateur.email} . Points: ${utilisateur.points}`);
                pageActive.indexQ++;
            }
            else {            
                if(radioInputs[i].value == question[pageActive.indexQ - 1].reponseIndex) {
                    utilisateur.points++;    
                }    
                loaderPage(2);
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
        else {
            btnSuivant[pageActive.idPage].className = 'suivant';
        }
    });
});
//PROPREMENT
let pages = document.querySelectorAll('.page');
let utilisateur = {
    nom: "",
    email: "",
    points: 0
};

let pageActive = {
    idPage: 0,
    indexQ: 0
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
            width = 0;
            sec = 0;
            document.querySelector('#questionCount').textContent = `${pageActive.indexQ + 1} / ${question.length}`;
            loaderPage(pageActive.idPage + 1);
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

    if(index < question.length) {
        questionDisplayer.textContent = question[index].titre;
        for(let i = 0; i < assertions.length; i++) {
            assertions[i].value = question[index].assertions.indexOf(question[index].assertions[i]);
            assertionDisplayer[i].textContent = question[index].assertions[i];
        }
    }
    if(active == 2) {
        clearInterval(secondeCounter);
        clearInterval(widthCounter);
        document.querySelector('#points').textContent = utilisateur.points;
        document.querySelector('#nom-display').textContent = utilisateur.nom;
        document.querySelector('#email-display').textContent = utilisateur.email;
        if(utilisateur.points < question.length / 2) {
            document.querySelector('.icon-error').style.display = "block";
        }
        else {
            document.querySelector('.icon-success').style.display = "block";
        }
    }
}

loaderPage();

document.querySelector('.quitter').addEventListener('click', () => {
    loaderPage(2);
});

console.log("object : " +question[0].assertions[2]);

module.exports = question;