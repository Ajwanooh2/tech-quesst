
const questions = [
    {
        category: "🧠 المنطق",
        question: "ما الرقم التالي في هذا النمط؟",
        hint: "2، 4، 6، 8، ؟",
        options: ["9", "10", "12", "14"],
        answer: 1,
        explanation: "الإجابة 10، لأننا نضيف 2 في كل مرة."
    },
    {
        category: "💻 البرمجة",
        question: "ما ناتج هذا الكود؟",
        hint: "int x = 7;\nint y = 3;\nSystem.out.println(x + y);",
        options: ["4", "10", "21", "73"],
        answer: 1,
        explanation: "الإجابة 10، لأن علامة + تجمع العددين."
    },
    {
        category: "🐛 اكتشاف الأخطاء",
        question: "نريد أن يكون الناتج 15. أي عملية نختار؟",
        hint: "int a = 10;\nint b = 5;\nSystem.out.println(a ? b);",
        options: ["-", "+", "/", "%"],
        answer: 1,
        explanation: "نستخدم + لجمع 10 و5 والحصول على 15."
    },
    {
        category: "🔐 الأمن السيبراني",
        question: "وصلتك رسالة تطلب كلمة مرورك عبر رابط مجهول. ماذا تفعلين؟",
        hint: "اختاري التصرف الأكثر أمانًا.",
        options: [
            "أضغط الرابط وأدخل بياناتي",
            "أرسل الرسالة لصديقاتي",
            "أتجاهل الرابط وأتحقق من المصدر الرسمي",
            "أعطيهم كلمة المرور فقط"
        ],
        answer: 2,
        explanation: "لا تدخلي بياناتك عبر روابط مجهولة، وتحققي من الجهة عبر قنواتها الرسمية."
    }
];

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCategory = document.getElementById("questionCategory");
const questionCount = document.getElementById("questionCount");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const questionHint = document.getElementById("questionHint");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("finalScore");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

let currentQuestion = 0;
let score = 0;
let answered = false;

// الانتقال بين صفحات الموقع
function showScreen(screen) {
    home.classList.remove("active");
    quiz.classList.remove("active");
    result.classList.remove("active");

    screen.classList.add("active");
}

// بدء اللعبة
function startGame() {
    currentQuestion = 0;
    score = 0;

    showScreen(quiz);
    displayQuestion();
}

// عرض السؤال الحالي
function displayQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionCategory.textContent = question.category;
    questionCount.textContent =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionText.textContent = question.question;
    questionHint.textContent = question.hint;

    optionsContainer.replaceChildren();

    feedback.textContent = "";
    feedback.className = "feedback";

    nextBtn.hidden = true;

    // إنشاء زر لكل إجابة
    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

// التحقق من الإجابة
function checkAnswer(selectedIndex) {
    if (answered) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];
    const optionButtons = optionsContainer.querySelectorAll(".option");

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === question.answer) {
        score++;

        feedback.textContent =
            "إجابة صحيحة! 🎉 " + question.explanation;

        feedback.classList.add("success");
    } else {
        optionButtons[selectedIndex].classList.add("wrong");

        feedback.textContent =
            "مو مشكلة! " + question.explanation;

        feedback.classList.add("error");
    }

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "عرض النتيجة 🏆"
            : "السؤال التالي ←";

    nextBtn.hidden = false;
}

// الانتقال للسؤال التالي
function nextQuestion() {
    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// عرض النتيجة النهائية
function showResult() {
    showScreen(result);

    finalScore.textContent = score;

    if (score === 4) {
        resultTitle.textContent = "مذهلة! 👑";
        resultMessage.textContent =
            "أجبتِ عن جميع الأسئلة بشكل صحيح! لديكِ بداية رائعة في عالم التقنية.";
    } else if (score >= 2) {
        resultTitle.textContent = "أحسنتِ! 💜";
        resultMessage.textContent =
            "نتيجة جميلة! واصلي التعلم والتجربة، فكل تحدٍ فرصة لاكتساب مهارة جديدة.";
    } else {
        resultTitle.textContent = "بداية موفقة! 🚀";
        resultMessage.textContent =
            "كل مبرمجة تبدأ بالتعلم. جربي مرة أخرى واكتشفي أشياء جديدة!";
    }
}

// ربط الأزرار بوظائفها
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startGame);