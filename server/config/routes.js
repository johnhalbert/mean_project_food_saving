// var questions = require("../controllers/questions.js");
// var answers = require("../controllers/answers.js");
// var comments = require("../controllers/comments.js");
module.exports = function(app){
	
	app.get('/question/:id', function(req, res){
		// console.log(req.params.id);
		questions.showQuestion(req, res);
	})
	app.get('/questions', function(req, res){
		questions.show(req, res);
	})
	app.post('/add_question', function(req, res){
		questions.add(req, res);
	})
	app.get('/answers', function(req, res){
		answers.show(req, res);
	})
	app.post('/add_answer', function(req, res){
		answers.add(req, res);
	})
	app.post('/like', function(req, res){
		answers.like(req, res);
	})
	
};
