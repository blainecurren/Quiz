var body = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startButton = document.getElementById("startbtn");
var startDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endBtn = document.getElementById("endGameBtns");
var submitBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var choiceA = document.getElementById("a");
var choiceB = document.getElementById("b");
var choiceC = document.getElementById("c");
var choiceD = document.getElementById("d");

var quizQuestions = [
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
