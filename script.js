// Gathering HTML elements for manipulation
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");

// Questions
var questions = [
  {
    question: "What is the biggest animal in the world?",
    choiceA: "Orca",
    choiceB: "Blue Whale",
    choiceC: "Giraffe",
    choiceD: "Mouse",
    correctAnswer: "b",
  },
  {
    question:
      "In what franchise would you find the character Katniss Everdeen?",
    choiceA: "The Hunger Games",
    choiceB: "Frozen",
    choiceC: "Harry Potter",
    choiceD: "Fast and Furious",
    correctAnswer: "a",
  },
  {
    question: "What year was Heinz established?",
    choiceA: "1944",
    choiceB: "1776",
    choiceC: "1844",
    choiceD: "1869",
    correctAnswer: "d",
  },
  {
    question: "To a single decimal point, many kilometers in a mile?",
    choiceA: ".47km",
    choiceB: "3.3km",
    choiceC: "1.6km",
    choiceD: "1.9km",
    correctAnswer: "c",
  },
  {
    question: "What was the most streamed show on Netflix in 2020?",
    choiceA: "Frontier",
    choiceB: "The Umbrella Academy season 2",
    choiceC: "Lucifer",
    choiceD: "Kingdom",
    correctAnswer: "b",
  },
];

var correct;
var currentQuestionIndex = 0;
var timerInterval;
var score = 0;
var answersIndex = questions.length;
var timeLeft = 76;

// Start quiz function
function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}

// Genereate questions function
function generateQuizQuestion() {
  if (currentQuestionIndex === answersIndex) {
    return showScore();
  }
  var currentQuestion = questions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

// Function to check answers
function checkAnswer(answer) {
  correct = questions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== answersIndex) {
    score++;
    alert("That Is Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (answer !== correct && currentQuestionIndex !== answersIndex) {
    alert("That Is Incorrect.");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

// Score sumbission
submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

// generate high score Function
function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

// high score Function
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 76;
  score = 0;
  currentQuestionIndex = 0;
}

// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + questions.length + " correct!";
}

// This button starts the quiz!
startQuizButton.addEventListener("click", startQuiz);
