const express = require('express');

//Create a new express instance
const app = express();
var json = require('./questions.json');

//Listen at this port
app.listen(80);
app.use(express.static('public'))

//Home route to the quiz html file
app.get('/', function(req,res){
    
    res.redirect("Quiz.html");
    
})

//Route to sent the questions to the frontend
app.get('/questions', function(req,res){

    let questions = json.map(function(x) {
        return {
        stem:x.stem,
        options:x.options,}
    });

    res.send(JSON.stringify(questions))
    
})

//Route to resolve a singular question 
app.get('/answer', function(req,res){
    //Check if question is correct   
    
    if (json.find(({stem}) => stem === req.query.q).answerIndex == req.query.a) {
        res.send(JSON.stringify({answer:"Correct Answer!", "question": req.query.q}))

    }
    else {
        res.send(JSON.stringify({answer:"Incorrect Answer!", "question": req.query.q}))
    }
})

//Route to resovle the entire quiz, we ret
app.get('/answers', function(req,res){

    let allAnswers = Object.entries(req.query) 

    let correct = 0;

    allAnswers.forEach((value) => {
  
        let currentQ = json.find(({stem}) => stem == value[0]);

        if (currentQ.options[currentQ.answerIndex] === value[1]) {
           correct++;
    
        }
    });

    let percent = (correct / json.length)*100;
    
    //Return percentas well as number of correct questions out of total
    res.send("You achieved a " + percent + "% , which was a score of " + correct + " / " +  json.length)
})


