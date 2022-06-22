/* Declare some variables for DOM manuplutions */
const btnSuivant = document.querySelectorAll('.suivant');
const formulaire = document.querySelector('.form-question');
const radioInputs = document.querySelectorAll(`input[type="radio"]`);
const btnCommencer = document.querySelector('#submit-starter');
const identifForm = document.querySelector('#form-identifiant');
const inputs = document.querySelectorAll('.input');
const questionCountDisplay = document.querySelector('#questionCount');
const progressBar = document.querySelector('.progress-bar');
const assertionDisplayer = document.querySelectorAll('.assertion-displayer');
const assertions = document.querySelectorAll('.assertion-value');
const questionDisplayer = document.querySelector('#question-displayer');
const errorName =  document.querySelector('#error_name');
const errorEmail = document.querySelector('#error_email');
const email = document.querySelector('#email');
const nom = document.querySelector('#nom');
const points = document.querySelector('#points');
const nomDisplay = document.querySelector('#nom-display');
const emailDisplay = document.querySelector('#email-display');
const iconError = document.querySelector('.icon-error');
const iconSuccess = document.querySelector('.icon-success');

/* Declare width and height for progress bar*/
let width = 100;
let sec = 60;

/* Declare user object to store user infos and pageActive to manage page loading */
let pages = document.querySelectorAll('.page');
let utilisateur = {
    nom: (localStorage.username) ? localStorage.username : "",
    email: (localStorage.useremail) ? localStorage.useremail : "",
    points: (localStorage.userpoint) ? localStorage.userpoint : 0
};

let pageActive = {
    idPage: (localStorage.pageActif) ? localStorage.pageActif : 0,
    indexQ: (localStorage.questionActif) ?localStorage.questionActif : 0
};

/* Interval counter for progress */
let secondeCounter = setInterval(() => {
    if (pageActive.idPage > 0) {
        if (sec > 0) {
            seconde.innerHTML = sec;
        } 
        else {
            localStorage.questionActif = Number(localStorage.questionActif) + 1;
            loaderPage(1, Number(localStorage.questionActif) + 1);
            formulaire.reset();
            questionCountDisplay.textContent = `${Number(localStorage.questionActif) + 1} / ${questions.length}`;
            sec = 60;
        }
        sec--;
    }
}, 1000);
let widthCounter = setInterval(() => {
    if (pageActive.idPage > 0) {
        if (width > 0) {
            progressBar.style.width = width + '%';
        } else {
            width = 100;
        }
        width--;
    }
}, 600);

/*
    Function Loader Each Page,
    change questions  content and assertions from questions objects
*/
function loaderPage(active = 0, index = 0) {
    
    pages.forEach(page => page.style.display = "none");
    pages[active].style.display = "block";
    pageActive.idPage = active;
    questionCountDisplay.textContent = `${Number(localStorage.questionActif) + 1} / ${questions.length}`;

    if(index < questions.length) {
        questionDisplayer.textContent = questions[index].titre;
        for(let i = 0; i < assertions.length; i++) {
            assertions[i].value = questions[index].assertions.indexOf(questions[index].assertions[i]);
            assertionDisplayer[i].textContent = questions[index].assertions[i];
        }
    }
    if(active == 2) {
        clearInterval(secondeCounter);
        clearInterval(widthCounter);
        points.textContent = `${localStorage.userpoint} / ${questions.length}`;
        nomDisplay.textContent = localStorage.username;
        emailDisplay.textContent = localStorage.useremail;
        if(localStorage.userpoint < questions.length / 2) {
            iconError.style.display = "block";
        }
        else {
            iconSuccess.style.display = "block";
        }
    }
}

if(localStorage.pageActif != null) 
    loaderPage(Number(localStorage.pageActif), Number(localStorage.questionActif)); 
else 
    loaderPage();

/* function for form checks and submitting*/
function validateSubmit() {
    for(let i = 0; i < inputs.length; i++) {
        
        let conditionNom = inputs[0].value.trim() != '' && inputs[0].value.trim().length > 2;
        let conditionMail = inputs[1].value.trim() != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[1].value.trim()));
        
        if(!conditionNom) {
            inputs[0].style.borderColor = 'red';
            errorName.textContent = 'N\'oubliez pas de renseigner votre nom avant de commencer le Quiz.';
        }
        if(!conditionMail) {
            inputs[1].style.borderColor = 'red';
            errorEmail.textContent = 'N\'oubliez pas de renseigner votre email avant de commencer le Quiz.';
        }
        if(conditionNom && conditionMail) {
            width = 100;
            sec = 60;
            utilisateur.email = email.value;
            utilisateur.nom = nom.value;
            localStorage.setItem('username', utilisateur.nom);
            localStorage.setItem('useremail', utilisateur.email);
            localStorage.setItem('pageActif', pageActive.idPage + 1);
            localStorage.setItem('questionActif', pageActive.indexQ);
            localStorage.setItem('userpoint', utilisateur.points);
            loaderPage(Number(localStorage.pageActif), Number(localStorage.questionActif));
            break;
        }
    }
}

/* Function reset error and color warnings, oninput evt on logon form */
function onInputForm(i) {
    inputs[i].addEventListener('input', () => {
        if(inputs[i].value.trim() != '') {
            inputs[i].style.borderColor = 'rgba(233, 231, 231)';
            if(inputs[0].value.trim() != '') {
                errorName.textContent = '';
            }
            if(inputs[1].value.trim() != '') {
                errorEmail.textContent = '';
            }
        }
        if(inputs[0].value.trim() != '' && inputs[1].value.trim() != '') {
            btnCommencer.className = 'suivant suivant-active';
        }
    });
}


/* EVENTS */
/* Event listener when user subimt form */
identifForm.addEventListener('submit', e => {
    e.preventDefault();
    validateSubmit();
});

/* check all input form from logon */
for(let i = 0; i < inputs.length; i++) {
    onInputForm(i);
}

/* 
    Event Listener when user submit each question ; Check if radio is checked then
    compare checked value and the correct assertion from questions.assertions
    then add points if correct, load next question
*/
formulaire.addEventListener('submit', e => {
    e.preventDefault();
    
    for(let i = 0; i < radioInputs.length; i++) {
        
        if(radioInputs[i].checked) {
            radioInputs.forEach(radio => {
                radio.parentElement.parentElement.style.borderColor = 'rgba(233, 231, 231)';
            });
            if(Number(localStorage.questionActif) < questions.length -1) {
                formulaire.reset();
                btnSuivant[localStorage.pageActif].className = 'suivant';
                if(radioInputs[i].value == questions[localStorage.questionActif].reponseIndex) {
                    utilisateur.points++;
                    localStorage.setItem('userpoint', utilisateur.points);
                }  
                localStorage.setItem('questionActif', Number(pageActive.indexQ) + 1);
                pageActive.indexQ++;
                localStorage.setItem('pageActif', 1);
                loaderPage(1, Number(localStorage.questionActif));
            }
            else {            
                if(radioInputs[i].value == questions[localStorage.questionActif].reponseIndex) {
                    utilisateur.points++;
                    localStorage.setItem('userpoint', utilisateur.points);
                }  
                loaderPage(2);
            }
            width = 100;
            sec = 60;
            break;
        }
        else {
            radioInputs.forEach(r => r.parentElement.parentElement.style.borderColor = 'red');
        }
    }  
});

/* Add green color on selected radio input */
radioInputs.forEach((radio) => {
    radio.addEventListener('change', function() {
        if (radio.checked) {
            radioInputs.forEach(radio => radio.parentElement.parentElement.style.borderColor = 'rgb(233, 231, 231)');
            this.parentElement.parentElement.style.borderColor = 'green';
            btnSuivant[pageActive.idPage].className = 'suivant suivant-active';
        } 
        else {
            btnSuivant[pageActive.idPage].className = 'suivant';
        }
    });
});

/* When user press on quit button */
document.querySelector('.quitter').addEventListener('click', () => {
    localStorage.setItem('pageActif', 2);
    loaderPage(2);
});

document.querySelector('#retour-acceuil').addEventListener('click', () => {
    localStorage.clear();
    formulaire.reset();
    identifForm.reset();
    loaderPage(0);
});