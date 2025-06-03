// ------------- QUIZ LOGIC -------------

const quizData = [
  {
    question: "Which exercise is best for building chest muscles?",
    options: ["Squats", "Push-ups", "Plank", "Jumping Jacks"],
    answer: "Push-ups",
  },
  {
    question: "What does HIIT stand for?",
    options: [
      "High-Intensity Interval Training",
      "Heavy Intense Interval Training",
      "High Impact Interval Training",
      "Heart Intensity Interval Training",
    ],
    answer: "High-Intensity Interval Training",
  },
  {
    question: "Which nutrient is essential for muscle growth?",
    options: ["Carbohydrates", "Proteins", "Fats", "Vitamins"],
    answer: "Proteins",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const nextBtn = document.getElementById("next-question");
const resultEl = document.getElementById("quiz-result");
const scoreEl = document.getElementById("quiz-score");

// Add restart button element (make sure your HTML has this button)
const restartBtn = document.getElementById("restart-quiz");

// Shuffle function to randomize quiz questions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.style.display = "none";
  restartBtn.style.display = "none";

  const current = quizData[currentQuestionIndex];
  questionEl.textContent = current.question;

  current.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.style.cursor = "pointer";
    li.onclick = () => selectAnswer(li, current.answer);
    optionsEl.appendChild(li);
  });
}

function selectAnswer(selectedLi, correctAnswer) {
  // Disable all options
  Array.from(optionsEl.children).forEach(li => {
    li.style.pointerEvents = "none";
    if (li.textContent === correctAnswer) {
      li.style.color = "green";
      li.style.fontWeight = "bold";
    } else {
      li.style.color = "red";
    }
  });

  if (selectedLi.textContent === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

restartBtn.onclick = () => {
  score = 0;
  currentQuestionIndex = 0;
  shuffle(quizData); // Shuffle questions to get different order
  resultEl.style.display = "none";
  restartBtn.style.display = "none";
  loadQuestion();
};

function showResult() {
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = score;
  restartBtn.style.display = "inline-block"; // Show restart button when quiz ends
}

// Load first question on page load
shuffle(quizData); // Optional shuffle for initial load
loadQuestion();


// ------------- DAILY FITNESS DADDY JOKES LOGIC -------------

const tipEl = document.getElementById("api-joke");
const newTipBtn = document.getElementById("new-tip-btn");

function fetchFitnessTip() {
  tipEl.textContent = "Loading...";

  fetch("https://official-joke-api.appspot.com/jokes/general/random")
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        tipEl.textContent = data[0].setup + " — " + data[0].punchline;
      } else {
        tipEl.textContent = "Keep pushing your limits every day! 💪";
      }
    })
    .catch(() => {
      tipEl.textContent = "Stay hydrated and don’t skip your warm-up! 🚰";
    });
}

// Load first joke when page loads
fetchFitnessTip();

// Load new joke when button clicked
newTipBtn.addEventListener("click", fetchFitnessTip);


// ------------- TODO LIST LOGIC -------------

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Optional: clicking task removes it
  li.onclick = () => li.remove();

  taskList.appendChild(li);
  taskInput.value = "";
}
