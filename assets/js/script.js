const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if clicked start
start_btn.onclick = () => {
  start_btn.onclick = () => {
    // Show quiz
    quiz_box.classList.add("activeQuiz");
    //call showQestions function
    showQuetions(0);
    //pass 1 to queCounter
    queCounter(1);
    //call startTimer function
    startTimer(15);
    //call startTimerLine function
    startTimerLine(0);
  };
};
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if clicked restart
restart_quiz.onclick = () => {
  //show quiz box
  quiz_box.classList.add("activeQuiz");
  //hide result box
  result_box.classList.remove("activeResult");
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  //call showQestions function
  showQuetions(que_count);
  //pass que_numb value to queCounter
  queCounter(que_numb);
  //clear counter
  clearInterval(counter);
  //clear counterLine
  clearInterval(counterLine);
  //call startTimer function
  startTimer(timeValue);
  //call startTimerLine function
  startTimerLine(widthValue);
  //change the text of timeText to Time Left
  timeText.textContent = "Time Left";
  //hide the next button
  next_btn.classList.remove("show");
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  //reload the current window
  window.location.reload();
};
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    //increment the que_count value
    que_count++;
    //increment the que_numb value
    que_numb++;
    //call showQestions function
    showQuetions(que_count);
    //pass que_numb value to queCounter
    queCounter(que_numb);
    //clear counter
    clearInterval(counter);
    //clear counterLine
    clearInterval(counterLine);
    //call startTimer function
    startTimer(timeValue);
    //call startTimerLine function
    startTimerLine(widthValue);
    //change the timeText to Time Left
    timeText.textContent = "Time Left";
    //hide the next button
    next_btn.classList.remove("show");
  } else {
    //clear counter
    clearInterval(counter);
    //clear counterLine
    clearInterval(counterLine);
    //calling showResult function
    showResult();
  }
};

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  //create a new span and div tag for question and option passing the value using array index
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  //add new span tag inside que_tag
  que_text.innerHTML = que_tag;
  //add new div tag inside option_tag
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// create the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  //clear counter
  clearInterval(counter);
  //clear counterLine
  clearInterval(counterLine);
  //get user selected option
  let userAns = answer.textContent;
  //get correct answer from array
  let correcAns = questions[que_count].answer;
  //get all option items
  const allOptions = option_list.children.length;

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer increase score value with 1
    userScore += 1;
    //add color to correct selected option
    answer.classList.add("correct");
    //adding tick icon to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    //add color to correct selected option
    answer.classList.add("incorrect");
    //add icon to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    console.log("Wrong Answer");
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer add color to matched option
        option_list.children[i].setAttribute("class", "option correct");
        //add icon to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    //once user select an option then disable all options
    option_list.children[i].classList.add("disabled");
  }
  //show the next button if user selected any option
  next_btn.classList.add("show");
}
function showResult() {
  //hide info box
  info_box.classList.remove("activeInfo");
  //hide quiz box
  quiz_box.classList.remove("activeQuiz");
  //show result box
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    // if user scored more than 3 create a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>Wow congrats, you got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    //adding new span tag inside score_Text
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>oof, you got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    //changing the value of timeCount with time value
    timeCount.textContent = time;
    //decrement the time value
    time--;
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      //add a 0 before time value
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      //if timer is less than 0
      //clear counter
      clearInterval(counter);
      //change the time text to time off
      timeText.textContent = "Time Off";
      //getting all option items
      const allOptions = option_list.children.length;
      //getting correct answer from array
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          //add color to matched option
          option_list.children[i].setAttribute("class", "option correct");
          //adding tick icon to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        //once user select an option then disabled all options
        option_list.children[i].classList.add("disabled");
      }
      //show the next button if user selected any option
      next_btn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    //upgrading time value with 1
    time += 1;
    //increasing width of time_line with px by time value
    time_line.style.width = time + "px";
    if (time > 549) {
      //if time value is greater than 549
      //clear counterLine
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  //adding new span tag inside bottom_ques_counter
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
