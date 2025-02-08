const questions = [
    {question: "Which is the capital city of India ?",
     answers: [
        {text: "New Delhi", correct: true},
        {text: "Tokyo", correct: false},
        {text: "Mumbai", correct: false},
        {text: "New york", correct: false},
     ]
    },

    {question: "Which is the capital city of Japan ?",
     answers: [
        {text: "Kolkata", correct: false},
        {text: "Tokyo", correct: true},
        {text: "Delaware", correct: false},
        {text: "London", correct: false},
     ]
    },

    {question: "Which is the capital city of Russia ?",
        answers: [
           {text: "vladivostok", correct: false},
           {text: "Tokyo", correct: false},
           {text: "Moscow", correct: true},
           {text: "chicago", correct: false},
        ]
    },

    {question: "Which is the capital city of Germany ?",
        answers: [
           {text: "Vienna", correct: false},
           {text: "Tokyo", correct: false},
           {text: "Munich", correct: false},
           {text: "Berlin", correct: true},
        ]
    },

    {question: "Which is the capital city of Poland ?",
        answers: [
           {text: "Warsaw", correct: true},
           {text: "Prague", correct: false},
           {text: "Barcelona", correct: false},
           {text: "Rome", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

var currentQuestionIndex = 0;
var score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}

function resetState(){
    questionElement.classList.remove("pie-chart");
    questionElement.style.background = "";
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ===  "true";
    var wrongSound = new Audio("assets/wrong.mp3");
    var correctSound = new Audio("assets/correct.mp3");
    if(isCorrect){
        selectedBtn.classList.add("correct");
        correctSound.play();
        score++ ;
    }else{
        selectedBtn.classList.add("incorrect");
        wrongSound.play();
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++ ;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

function showScore(){
    resetState();
    questionElement.innerHTML = "you scored " + score + " out of " + questions.length ;

    questionElement.classList.add("pie-chart");
    var percentage = (score / questions.length) * 100; 
    var resultDegrees = (percentage / 100) * 360;

    var pieChart = document.querySelector(".pie-chart");
    pieChart.style.background = `conic-gradient(#d1d624 0deg ${resultDegrees}deg, #ecf0f1 ${resultDegrees}deg 360deg)`;
    
    nextButton.innerHTML = "PLay again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz();