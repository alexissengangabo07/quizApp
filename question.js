let question = [
    {

        id: 1,
        titre : "Comment inverser un tableau T1 ?",
        assertions: ["T1.transpose()", "T1.inverse()", "T1.rollout", "T1.reverse()"],
        reponseIndex: 3
    },
    {
        id: 2,
        titre : "Le mot clé 'var' permet de déclarer des variables  : ",
        assertions: ["locales uniquement", "globales uniquement", "n'existe pas en JavaScript", "locales ou globales"],
        reponseIndex: 3
    },
    {
        id: 3,
        titre : "Comment supprimer les espaces en début et fin de la chaîne ch1 ?",
        assertions: ["ch1.supprespaces()", "supprespaces(ch1)", "ch1.trim()", "trim(ch1)"],
        reponseIndex: 2
    },
    {
        id: 4,
        titre : "Une variable locale déclarée dans une fonction peut être utilisée :",
        assertions: ["dans toutes les fonctions mais pas dans le script appelant", "dans toutes les fonctions du document HTML", "dans cette fonction uniquement", "dans cette fonction et dans le script appelant"],
        reponseIndex: 2
    },
    {
        id: 5,
        titre : "window.prompt() sert à :",
        assertions: ["faire défiler un texte en scrolling", "faire défiler une fenêtre", "afficher une boite de dialogue de saisie", "modifier le caractère de prompt de la console"],
        reponseIndex: 2
    },
    {
        id: 6,
        titre : "Pour tester de nombreuses conditions sur la même variable on utilise ",
        assertions: ["if()", "while()", "for()", "switch()"],
        reponseIndex: 3
    },
    {
        id: 7,
        titre : "Quelle est la syntaxe correcte pour tester la valeur de ch1 ?",
        assertions: ['if (ch1=="Chat") { } else { }', 'if (ch1="Chat") { } else { }', 'if (ch1=="Chat") then { } else { }', 'if (ch1="Chat") then { } else { }'],
        reponseIndex: 0
    },
    {
        id: 8,
        titre : "Comment renvoyer un nombre aléatoire compris entre 0 et 1 ?",
        assertions: ["random()", "rnd()", "Math.rnd()", "Math.random()"],
        reponseIndex: 3
    },
    {
        id: 9,
        titre : "Quel est l'utilité de 'unsigned' ?",
        assertions: ["déclarer un entier non signé", "déclarer un plugin sans certificat", "prendre la valeur absolue d'un nombre", "n'existe pas en JavaScript"],
        reponseIndex: 3
    },
    {
        id: 10,
        titre : "Que retourne isNaN('ABC'); ?",
        assertions: ["une erreur", "AbC", "true", "false"],
        reponseIndex: 2
    },
    {
        id: 11,
        titre : "Que renvoie ch1.slice(-3, -1) si ch1='ABCDE' ?",
        assertions: ["AB", "CD", "BC", "ABCDE"],
        reponseIndex: 1
    },
    {
        id: 12,
        titre : "Comment passer à l'itération suivante dans une boucle for() ?",
        assertions: ["continue", "break", "next", "return"],
        reponseIndex: 0
    },
    {
        id: 13,
        titre : "Comment mettre un commentaire sur une seule ligne ?",
        assertions: ["##", "//", "\\\\", "<!-- -->"],
        reponseIndex: 1
    },
    {
        id: 14,
        titre : "Qu'est-ce que JSON par rapport au JavaScript ?",
        assertions: ["une variable d'environnement système", "un langage de requêtes", "un format d'échange de données texte", "un langage de programmation dérivé"],
        reponseIndex: 2
    },
    {
        id: 15,
        titre : "Si ch1='ABCED', que retourne ch1.charAt(3)",
        assertions: ["true", "E", "C", "une erreur"],
        reponseIndex: 1
    }
];