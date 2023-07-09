const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = document.querySelector(".qts-btn .quit");
const continue_btn = document.querySelector(".qts-btn .restart");
const reset_btn = document.querySelector(".button .reset");
const exit_btn2 = document.querySelector(".button .exit");
const quiz_box = document.querySelector(".quiz_box");
const que_list = document.querySelector(".question_list");
const time_line = document.querySelector("header .time_line");
const result_box = document.querySelector(".result-box");
const cur_answer = document.querySelector(".result div");
const next_btn = quiz_box.querySelector(".next-btn");

let inteval;
let timeLine_instance;
let question_num = questions.length;

// if click start button
start_btn.onclick = () => {
  info_box.classList.add("active");
};
// if click exit button
exit_btn.onclick = () => {
  info_box.classList.remove("active");
};
// if click continue button
continue_btn.onclick = () => {
  if (document.querySelector(".active")) {
    info_box.classList.remove("active");
  }
  quiz_box.classList.add("active");
  getQuestions(0);
  timmer(time_count);
  timeLine(loadingWidth);
};
//chainging variable
let question_count = 0;
let time_count = 30;
let loadingWidth = 0;
let currentAnsCount = 0;

//if click next button
next_btn.onclick = () => {
  next_btn.style.transform = `scale(0)`;
  if (question_count == questions.length - 1) {
    result_box.classList.add("active");
    quiz_box.classList.remove("active");

    if (currentAnsCount == 5) {
      cur_answer.innerHTML = `and Lovely<span style='color:red;'>❤❤</span>!, You got <span> ${currentAnsCount} </span> out of <span>${questions.length}</span>`;
    } else if (currentAnsCount > 2) {
      cur_answer.innerHTML = `and Congrass!, You got <span> ${currentAnsCount} </span> out of <span>${questions.length}</span>`;
    } else {
      cur_answer.innerHTML = `and sorry!, You got <span> ${currentAnsCount} </span> out of <span>${questions.length}</span>`;
    }

    return false;
  } else {
    question_count++;
    question_num--;
    getQuestions(question_count);
    getQuestions_counter(question_num);
    clearInterval(inteval);
    timmer(time_count);
    clearInterval(timeLine_instance);
    timeLine(loadingWidth);
  }
};

//show or load questions
function getQuestions(index) {
  let que_text = document.querySelector(".que_text");
  let qus_tag = `<span>${questions[index].num}. ${questions[index].question}</span>`;
  var option_tag = "";
  questions[index].option.forEach((element) => {
    option_tag += `<div class="option" onclick="optionSelect(this)"><span>${element}</span></div>`;
  });

  que_text.innerHTML = qus_tag;
  que_list.innerHTML = option_tag;
}

//bottom question counter
function getQuestions_counter(index) {
  let bottom_qus_counter = quiz_box.querySelector(".total_que p");
  bottom_qus_counter.innerHTML = `<span>${index}</span> Of <span>${questions.length}</span> Questions`;
}

//if user chose any option
function optionSelect(opt) {
  let user_ans = opt.textContent;
  let current_ans = questions[question_count].answer;
  let allopton = que_list.children.length;
  next_btn.style.transform = `scale(1)`;
  clearInterval(inteval);
  clearInterval(timeLine_instance);

  if (user_ans == current_ans) {
    opt.insertAdjacentHTML("beforeend", "<div class='icon tick'>&check;</div>");
    opt.classList.add("currect");
    currentAnsCount += 1;
  } else {
    opt.classList.add("wrong");
    opt.insertAdjacentHTML(
      "beforeend",
      "<div class='icon cross'>&cross;</div>"
    );
    //if ans is then autometically select the right answer
    for (let a = 0; a < allopton; a++) {
      if (que_list.children[a].textContent == current_ans) {
        que_list.children[a].insertAdjacentHTML(
          "beforeend",
          "<div class='icon tick'>&check;</div>"
        );
        que_list.children[a].classList.add("currect");
      }
    }
  }

  for (let i = 0; i < allopton; i++) {
    que_list.children[i].classList.add("disabled");
  }
}

//timmer
function timmer(time_count) {
  let timer = document.querySelector(".timer .time_sec");
  inteval = setInterval(tick, 1000);

  function tick() {
    time_count--;
    let timeValu = time_count;
    if (time_count <= 9) {
      timeValu = timer.innerText = "0" + timeValu;
    }
    timer.innerText = timeValu;

    if (time_count < 0) {
      clearInterval(inteval);
      timer.innerText = "00";
    }
  }
}

// time_line
function timeLine(time) {
  timeLine_instance = setInterval(tick, 50);

  function tick() {
    time += 1;
    time_line.style.width = time + "px";
    if (time == 540) {
      clearInterval(timeLine_instance);
      loadingWidth = 0;
    }
  }
}
//restart
reset_btn.onclick = () => {
  result_box.classList.remove("active");

  question_count = 0;
  time_count = 15;
  loadingWidth = 0;
  currentAnsCount = 0;
  question_num = questions.length;

  getQuestions(question_count);
  getQuestions_counter(question_num);

  timmer(time_count);
  clearInterval(inteval);
  clearInterval(timeLine_instance);
};
exit_btn2.onclick = () => {
  window.location.reload();
};
