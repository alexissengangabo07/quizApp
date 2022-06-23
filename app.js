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
const notification =  document.querySelector('.notification');
const notifContent = document.querySelector('#notification-content');
/* Declare width and height for progress bar*/
let width = 100;
let sec = 60;

/* Declare user object to store user infos and pageActive to manage page loading */
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

/* Interval counter for progress */
let secondeCounter = setInterval(() => {
    if (pageActive.idPage > 0) {
        if (sec > 0) {
            seconde.innerHTML = sec;
        } 
        else {
            loaderPage(1, pageActive.indexQ++);
            formulaire.reset();
            questionCountDisplay.textContent = `${pageActive.indexQ} / ${questions.length}`;
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
    questionCountDisplay.textContent = `${pageActive.indexQ + 1} / ${questions.length}`;

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
        points.textContent = `${utilisateur.points} / ${questions.length}`;
        nomDisplay.textContent = utilisateur.nom;
        emailDisplay.textContent = utilisateur.email;
        if(utilisateur.points < questions.length / 2) {
            iconError.style.display = "block";
        }
        else {
            iconSuccess.style.display = "block";
        }
    }
}

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
            utilisateur.email = email.value;
            utilisateur.nom = nom.value;
            width = 0;
            sec = 0;
            questionCountDisplay.textContent = `${pageActive.indexQ + 1} / ${questions.length}`;
            loaderPage(pageActive.idPage + 1);
            break;
        }
    }
}

/* Function reset error and color warnings on logon form */
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

loaderPage();

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
            
            if(pageActive.indexQ < questions.length) {
                formulaire.reset();
                btnSuivant[pageActive.idPage].className = 'suivant';
                if(radioInputs[i].value == questions[pageActive.indexQ - 1].reponseIndex) {
                    utilisateur.points++;    
                    notification.style.display = 'block';
                    notification.className = ' notification notification-reussite';
                    notifContent.textContent = 'Félicitations! bonne reponse. +1';
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 1500);
                }
                else {
                    notification.style.display = 'block';
                    notification.className += 'notification notification-erreur';
                    notifContent.textContent = 'Désolé! mauvaise reponse.';
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 1500);
                }
                loaderPage(1, pageActive.indexQ);
                pageActive.indexQ++;
            }
            else {            
                if(radioInputs[i].value == questions[pageActive.indexQ - 1].reponseIndex) {
                    utilisateur.points++;    
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
    loaderPage(2);
    
});

document.querySelector('#retour-acceuil').addEventListener('click', () => {
    formulaire.reset();
    identifForm.reset();
    loaderPage(0);
});