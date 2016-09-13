drunkApp.controller('ScoreCtrl', function(QuizFactory) {
	var score = this;

	score.player = QuizFactory;
});