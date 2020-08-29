// variables to keep track of quiz state
var currentQuestionIndex = 0;
var currentScores = 0;
var correctQuestionsNumber = 10;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endscreenEl = document.getElementById("end-screen");
var finalscoreEl = document.getElementById("final-score");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  startScreenEl.classList.add("hide");

  // un-hide questions section
  questionsEl.classList.remove("hide");

  // start timer
  clockTick();

  // show starting time
  timerEl.innerHTML=time;
  
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  document.getElementById("question-title").innerHTML=currentQuestion.title;
  // clear out any old question choices
  choicesEl.innerHTML="";

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var newBtn = document.createElement("button");
    newBtn.innerHTML=currentQuestion.choices[i];
    newBtn.value=currentQuestion.choices[i];

    // attach click event listener to each choice
    newBtn.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(newBtn);
  }
}

function questionClick() {
  // check if user guessed wrong
  if(this.value!=questions[currentQuestionIndex].answer){
    // penalize time
    time = (time-15);

    // display new time on page
    timerEl.innerHTML=time;

    // play "wrong" sound effect
    sfxWrong.play();

    // flash right/wrong feedback on page for half a second
    var feedbackVal = "Wrong!";
  }else{
    // play "right" sound effect
    sfxRight.play();

    // flash right/wrong feedback on page for half a second
    var feedbackVal = "Correct!";

    // add score to currentScores
    currentScores = (currentScores+correctQuestionsNumber);
  }
  // flash right/wrong feedback on page for half a second
  feedbackEl.innerHTML=feedbackVal;
  feedbackEl.classList.remove("hide");
  setTimeout(function(){
    feedbackEl.classList.add("hide");
  }, 500);
  
  // move to next question
  currentQuestionIndex = currentQuestionIndex+1;

  // check if we've run out of questions
  if((currentQuestionIndex+1)>questions.length){
    // quizEnd
    quizEnd();
  }else{
    // getQuestion
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  endscreenEl.classList.remove("hide");

  // show final score
  finalscoreEl.innerHTML=currentScores;

  // hide questions section
  questionsEl.classList.add("hide");
}

function clockTick() {
  // update time
  timerId = setInterval(function(){
    time = (time-1);
    timerEl.innerHTML=time;

    // check if user ran out of time
    if(time<=0){
      quizEnd();
    }
  }, 1000);
}

function saveHighscore() {
  // get value of input box
  var initialsVal = initialsEl.value;

  // make sure value wasn't empty
  if(initialsVal!=""){
    // get saved scores from localstorage, or if not any, set to empty array
    if(localStorage.getItem("scores")){
      var scoresArray = JSON.parse(localStorage.getItem("scores"));
    }else{
      var scoresArray = [];
    }
    // format new score object for current user
    var newScores = {
                      initials: initialsVal,
                      score: currentScores
                    };
    scoresArray.push(newScores);

    // save to localstorage
    localStorage.setItem("scores", JSON.stringify(scoresArray));
    
    // redirect to next page
    window.location.replace("highscores.html");
  }
}

function checkForEnter(event) {
  // check if event key is enter
  var code = event.keyCode || event.which;
  if(code == 13) {
    // saveHighscore
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
