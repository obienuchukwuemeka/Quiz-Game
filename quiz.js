const quizBox     = document.querySelector('.quiz-box');
const nextBtn     = document.querySelector('.next-btn');

let scoreCount    = 0;
let questionCount = 0;
let questionNumb  = 1;

// Load first question when page opens
showQuestions(0);
questionCounter(1);

// ── NEXT BUTTON ───────────────────────────────────────────────────────────────
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        document.querySelector('.next-btn').classList.remove('enabled');
    } else {
        showResult();
    }
};

// ── SHOW RESULT ───────────────────────────────────────────────────────────────
function showResult() {
    const message = scoreCount === questions.length ? '🎉 Perfect Score!' :
                    scoreCount >= 3 ? '👏 Well Done!' : '📚 Keep Practising!';

    quizBox.innerHTML = `
        <h1 style="margin-bottom: 20px;">Quiz Completed!</h1>

        <p style="text-align:center; font-size:20px; margin: 20px 0;">
            Your Score: <strong style="color:#0047ff">${scoreCount} / ${questions.length}</strong>
        </p>

        <p style="text-align:center; font-size:16px; opacity:0.7; margin-bottom:35px;">
            ${message}
        </p>

        <div style="display:flex; justify-content:space-between; gap:15px;">

            <button onclick="tryAgain()" style="
                flex: 1;
                height: 50px;
                background: transparent;
                border: 2px solid #0047ff;
                border-radius: 6px;
                font-size: 16px;
                color: #0047ff;
                font-weight: 600;
                cursor: pointer;
                transition: .5s;
                font-family: Poppins, sans-serif;"
                onmouseover="this.style.background='#0047ff'; this.style.color='#fff';"
                onmouseout="this.style.background='transparent'; this.style.color='#0047ff';">
                🔁 Try Again
            </button>

            <button onclick="goHome()" style="
                flex: 1;
                height: 50px;
                background: #0047ff;
                border: 2px solid #0047ff;
                border-radius: 6px;
                font-size: 16px;
                color: #fff;
                font-weight: 600;
                cursor: pointer;
                transition: .5s;
                font-family: Poppins, sans-serif;
                box-shadow: 0 0 10px #0047ff;"
                onmouseover="this.style.background='#00001d'; this.style.boxShadow='none';"
                onmouseout="this.style.background='#0047ff'; this.style.boxShadow='0 0 10px #0047ff';">
                🏠 Return Home
            </button>

        </div>`;
}

// ── TRY AGAIN ─────────────────────────────────────────────────────────────────
function tryAgain() {
    scoreCount    = 0;
    questionCount = 0;
    questionNumb  = 1;

    quizBox.innerHTML = `
        <h1>Codehal Quiz</h1>
        <div class="quiz-header">
            <span>Quiz Website</span>
            <span class="header-score">Score: 0/${questions.length}</span>
        </div>
        <h2 class="question-text"></h2>
        <div class="option-list"></div>
        <div class="quiz-footer">
            <span class="question-total">1 of ${questions.length} Questions</span>
            <button class="next-btn">Next</button>
        </div>`;

    // Re-bind next button after innerHTML rebuild
    document.querySelector('.next-btn').onclick = () => {
        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumb++;
            questionCounter(questionNumb);
            document.querySelector('.next-btn').classList.remove('enabled');
        } else {
            showResult();
        }
    };

    showQuestions(0);
    questionCounter(1);
    updateScore();
}

// ── GO HOME ───────────────────────────────────────────────────────────────────
function goHome() {
    window.location.href = 'index.html';
}

// ── SHOW QUESTIONS ────────────────────────────────────────────────────────────
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `
        <div class="option">${questions[index].options[0]}</div>
        <div class="option">${questions[index].options[1]}</div>
        <div class="option">${questions[index].options[2]}</div>
        <div class="option">${questions[index].options[3]}</div>`;

    document.querySelector('.option-list').innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('click', function () {
            optionSelected(this);
        });
    }
}

// ── OPTION SELECTED ───────────────────────────────────────────────────────────
function optionSelected(answer) {
    let userAnswer    = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions    = document.querySelector('.option-list').children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        scoreCount++;
        updateScore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) {
            if (document.querySelector('.option-list').children[i].textContent === correctAnswer) {
                document.querySelector('.option-list').children[i].classList.add('correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        document.querySelector('.option-list').children[i].style.pointerEvents = 'none';
    }

    document.querySelector('.next-btn').classList.add('enabled');
}

// ── QUESTION COUNTER ──────────────────────────────────────────────────────────
function questionCounter(index) {
    document.querySelector('.question-total').textContent =
        `${index} of ${questions.length} Questions`;
}

// ── SCORE DISPLAY ─────────────────────────────────────────────────────────────
function updateScore() {
    document.querySelector('.header-score').textContent =
        `Score: ${scoreCount}/${questions.length}`;
}