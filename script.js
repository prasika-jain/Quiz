const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Hyper Transfer Markup Language",
      "Hyperloop Machine Language",
      "Hypertext Markdown Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "define"],
    answer: "const",
  },
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const timeSpan = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreSpan = document.getElementById("score");

function startTimer() {
  timeLeft = 15;
  timeSpan.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timer);
  startTimer();
  nextBtn.disabled = true;
  const q = questions[currentQ];
  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selectedBtn, correctAnswer) {
  clearInterval(timer);
  const allBtns = document.querySelectorAll("#options button");
  allBtns.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "#a5d6a7";
    }
  });
  if (selectedBtn.textContent === correctAnswer) {
    score++;
  } else {
    selectedBtn.style.backgroundColor = "#ef9a9a";
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function disableOptions() {
  document.querySelectorAll("#options button").forEach((btn) => {
    btn.disabled = true;
  });
}

function showScore() {
  document.getElementById("question-box").style.display = "none";
  resultBox.classList.remove("hidden");
  scoreSpan.textContent = score;
}

// Start the quiz
loadQuestion();
