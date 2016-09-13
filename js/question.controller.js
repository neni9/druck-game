drunkApp.factory('QuizFactory', function($firebaseArray) {
    return $firebaseArray(drunkRef);
});

drunkApp.controller('QuestionCtrl', function(QuizFactory, AuthFactory, $location, AuthService, $interval) {

	if( !AuthService.userName ) {
        $location.path('/home');
    }

	var quizapp = this;

    quizapp.players = QuizFactory;

    quizapp.question = [
        { 
            q : 'Calculez 2 + 10 ?: ',
            a : [
                {
                    reponse : '22',
                    vrai : false,
                },
                {
                    reponse : '12',
                    vrai : true,
                },
                {
                    reponse : '8',
                    vrai : false,
                }],
        },{ 
            q : 'Qu\'est ce que la normalité?',
            a : [
                {
                    reponse : 'un peu de philosophie',
                    vrai : true,
                },
                {
                    reponse : 'anti-marginalité',
                    vrai : false,
                },
                {
                    reponse : 'vie dans les normes de la société',
                    vrai : true,
                }],
        },{ 
            q : 'Le père de mon oncle a un petit fils. Donc c\'est mon :',
            a : [
                {
                    reponse : 'cousin',
                    vrai : true,
                },
                {
                    reponse : 'Neveu',
                    vrai : false,
                },
                {
                    reponse : 'Frère',
                    vrai : false,
                }],
        },{ 
            q : 'Dans une course à pieds, je double le 2ème ! Je suis donc : ',
            a : [
                {
                    reponse : 'Le 2ème',
                    vrai : false,
                },
                {
                    reponse : 'Le 1er',
                    vrai : true,
                },
                {
                    reponse : 'Le 3ème',
                    vrai : false,
                }],
        },{ 
            q : 'Question 5 : ',
            a : [
                {
                    reponse : 'Le 1er',
                    vrai : false,
                },
                {
                    reponse : 'Le 2ème',
                    vrai : true,
                },
                {
                    reponse : 'Le 3ème',
                    vrai : false,
                }],
        },{ 
            q : 'Question 6 : ',
            a : [
                {
                    reponse : 'Le 1er',
                    vrai : false,
                },
                {
                    reponse : 'Le 2ème',
                    vrai : true,
                },
                {
                    reponse : 'Le 3ème',
                    vrai : false,
                }],
        },{ 
            q : 'Question 7 : ',
            a : [
                {
                    reponse : 'Le 1er',
                    vrai : false,
                },
                {
                    reponse : 'Le 2ème',
                    vrai : true,
                },
                {
                    reponse : 'Le 3ème',
                    vrai : false,
                }],
        },{ 
            q : 'Question 8 : ',
            a : [
                {
                    reponse : 'Le 1er',
                    vrai : false,
                },
                {
                    reponse : 'Le 2ème',
                    vrai : true,
                },
                {
                    reponse : 'Le 3ème',
                    vrai : false,
                }],
        },{ 
            q : 'Question 9 : ',
            a : [
                {
                    reponse : 'Le 1er',
                    vrai : false,
                },
                {
                    reponse : 'Le 2ème',
                    vrai : true,
                },
                {
                    reponse : 'J\'ai gagné',
                    vrai : false,
                }],
        },{ 
            q : 'Question 10 : ',
            a : [
                {
                    reponse : 'Le 1er',
                    vrai : false,
                },
                {
                    reponse : 'Le 2ème',
                    vrai : true,
                },
                {
                    reponse : 'J\'ai gagné',
                    vrai : false,
                }],
        }
    ]


    var i = 0,
        max = 5,
        questionsUtilisees = [];

    quizapp.score = 0;
    quizapp.maxQuestion = quizapp.question.length;
    quizapp.index = Math.floor(Math.random() * quizapp.maxQuestion);
    quizapp.resultat = null;

    quizapp.time = 0;
    quizapp.maxTime = 7;

    $interval( function() {
        if(quizapp.time < quizapp.maxTime) {
            quizapp.time++;
        }else{
            i++;
            quizapp.index = Math.floor(Math.random() * quizapp.maxQuestion); 
            quizapp.time = 0;
            quizapp.score = quizapp.score - 2;
        }
    }, 1000);

    quizapp.validation = function() {
        quizapp.time = 0;
        var randomQuestion = true;
        if( quizapp.question[quizapp.index].a[quizapp.reponse].vrai) {

            if(quizapp.time <= quizapp.maxTime / 2) {
                quizapp.score = quizapp.score + 2;
            }else{
                quizapp.score++;
            }

        }else{
            quizapp.score = quizapp.score - 2;
        }

        if( i < 4) {
            i++;
            while( randomQuestion ) {
                quizapp.index = Math.floor(Math.random() * quizapp.maxQuestion);

                if( questionsUtilisees.indexOf( quizapp.index ) === -1 ) {
                    randomQuestion = false;
                }
            }
            questionsUtilisees.push(quizapp.index);
        }else{
            quizapp.resultat = quizapp.score;

            quizapp.players.$add({
                name : AuthService.userName.displayName,
                score : quizapp.resultat
            });

            if(quizapp.resultat > 4) {
                quizapp.result = "Même Chuck Norris n'a jamais été aussi sobre que vous ! Bonne route !";
                quizapp.ok = true;
            }else if(quizapp.resultat >= 0) {
                quizapp.result = "Vous semblez peu stressé. Détendez-vous, tout va bien ! Vous pouvez-y aller, et surtout roulez tranquillement !";
                quizapp.ok = true;
            }else if(quizapp.resultat < 0) {
                quizapp.result = "Avec des réponses pareilles, mieux vaut être prudent . Attendez un peu avant de reprendre la route";
                quizapp.nope = true;
            }else if(quizapp.resultat < -2) {
                quizapp.result = "Bon, il est définivement temps d'aller cuver votre alcool !!! Jetez immédiatement ces clés de voiture !";
                quizapp.nope = true;
            }
        }
    }
});