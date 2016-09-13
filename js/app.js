var drunkApp = angular.module('DrunkApp', ['ui.router','firebase']);

var drunkRef = new Firebase('https://incandescent-heat-5797.firebaseio.com/');


drunkApp.factory('AuthFactory' , function($firebaseAuth){
	return $firebaseAuth(drunkRef);
});


drunkApp.factory('AuthService', function() {
    return {
        userName : null
    };
});


drunkApp.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home' , {
			url: '/',
			templateUrl: 'view/home.html',
			controller :'HomeCtrl' ,
			controllerAs : 'home'
		})

		.state('score', {
			url:'/score',
			templateUrl:'view/score.html',
			controller : 'ScoreCtrl',
			controllerAs : 'score'
		})
		.state('question', {
	        url : '/question',
	        templateUrl: 'view/question.html',
	        controller: 'QuestionCtrl',
	        controllerAs: 'questionApp'
    });

		$urlRouterProvider.otherwise('/');
});


