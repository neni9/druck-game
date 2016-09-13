drunkApp.controller('HomeCtrl', function(AuthFactory, AuthService, QuizFactory, $location) {
	var home = this;

	home.userData = null;

	home.player = QuizFactory;

	home.signWithGoogle = function(){
		AuthFactory
		.$authWithOAuthPopup('google')
		.then(function(authData){
			console.log('Connexion', authData)
			home.userData = authData.google;// Stockage des infos de l'utilisation dans une variable
			AuthService.userName = authData.google;//verification pour rester connecter
		})
		.catch(function(error){
			console.error('Erreur de Connexion', error)
			home.authError = error;
		});
	};//fin de signWithGoogle

	home.signOut = function (){
		AuthFactory.$unauth();
	};////fin de signOut()

	AuthFactory.$onAuth(function(authData){
		if(!authData)
			home.userData = null;
	});//fin du $onAuth()

	home.addMessage = function() {
        home.player.$add({
            name : home.userData.displayName,
            score : home.score
        });
        home.messageText = '';
    }

    home.secure = function() {
        $location.path('/question');
    }
});