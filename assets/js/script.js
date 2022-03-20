var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var h1Title = document.getElementById('h1-title');
var pInstructions = document.getElementById('p-instructions');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerEl = document.getElementById('countdown');

var shuffledQuestions, currentQuestionIndex;
currentQuestionIndex ++;

var questions = [
    {
       question: "Commonly used data types Do Not Include:",
       answers: [
           {text: "strings", correct:false},
           {text: "booleans", correct:false },
           {text: "alerts", correct:true},
           {text: "numbers", correct:false}  
       ] 
    },
    {
        question: "The condition in an if / else statement is enclosed with_________.",
        answers: [
            {text: "quotes", correct:false},
            {text: "curly brackets", correct:false},
            {text: "parenthesis", correct:true},
            {text: "square brackets", correct:false}  
        ] 
     },
     {
        question: "Arrays in JavaScript can be used to store________.",
        answers: [
            {text: "numbers and strings", correct:false},
            {text: "other arrays", correct:false},
            {text: "booleans", correct:false},
            {text: "all of the above", correct:true}  
        ] 
     },
     {
        question: "String values must be enclosed within____when being assigned to variables.",
        answers: [
            {text: "commas", correct:false},
            {text: "curly brackets", correct:false},
            {text: "quotes", correct:true},
            {text: "parenthesis", correct:false}  
        ] 
     },
     {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {text: "JavaScript", correct:false},
            {text: "terminal/bash", correct:false},
            {text: "for loops", correct:false},
            {text: "console log", correct:true}  
        ] 
     }
    
];
function countdown() {
    var timeLeft = 75;
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
  
      if (timeLeft > 0) {
  
        timeLeft--;
        timerEl.textContent = timeLeft;
  
      } else {
        timerEl.textContent = (" ")
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }

nextButton.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion();
})
function startGame() {
    console.log("Started");
    startButton.classList.add('hide');
    questionContainerElement.classList.add('show');
    h1Title.classList.add('hide');
    pInstructions.classList.add('hide');
    currentQuestionIndex = 0;
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    setNextQuestion();
    console.log(answerButtonsElement)
    countdown();
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer =>{
        var button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState(){
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)  
    });
    if(shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerHTML = 'Restart'
        startButton.classList.remove('hide')

    }
}



function setStatusClass(element, correct){
    clearStatusClass(element)

    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');

}

startButton.addEventListener('click', startGame);
answerButtonsElement.addEventListener('click', setNextQuestion );