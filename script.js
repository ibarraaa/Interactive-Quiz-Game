// Quiz data (questions and answers)
const quizData = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },

   {
    question: "Which country is home to the Great Barrier Reef?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Brazil", correct: false },
      { text: "Canada", correct: false },
      { text: "India", correct: false },
    ],
  },
  {
    question: "What is the largest organ in the human body?",
    answers: [
      { text: "Liver", correct: false },
      { text: "Heart", correct: false },
      { text: "Brain", correct: false },
      { text: "Skin", correct: true },
    ],
  },
  {
    question: "In which year did World War II end?",
    answers: [
      { text: "1943", correct: false },
      { text: "1945", correct: true },
      { text: "1950", correct: false },
      { text: "1960", correct: false },
    ],
  },
  
];

// Get necessary DOM elements
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

// Function to initialize the quiz
const initializeQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;
  nextButton.style.display = "none";
  showQuestion();
};

// Function to show the current question
const showQuestion = () => {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  clearAnswerButtons();

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-button");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
};

// Function to clear answer buttons
const clearAnswerButtons = () => {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

// Function to handle answer selection
const selectAnswer = (event) => {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;

  if (correct) {
    score++;
    scoreElement.textContent = score;
  }

  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;
  });

  if (currentQuestionIndex < quizData.length - 1) {
    nextButton.style.display = "block";
  } else {
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
};

// Function to set the status class of an answer button
const setStatusClass = (element, correct) => {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
};

// Function to clear the status class of an answer button
const clearStatusClass = (element) => {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};

// Function to handle next button click
const handleNextButtonClick = () => {
  if (nextButton.textContent === "Restart") {
    initializeQuiz();
  } else {
    currentQuestionIndex++;
    showQuestion();
  }
};

// Event listener for next button click
nextButton.addEventListener("click", handleNextButtonClick);

// Initialize the quiz
initializeQuiz();
