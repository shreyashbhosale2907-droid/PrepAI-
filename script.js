const $ = id => document.getElementById(id);

function startLearning() {
    window.location.href = "dashboard.html";
}

function openModule(name) {
    alert(name + " module will be developed next!");
}

// ==============================
// QUIZ GENERATOR
// ==============================

const questionBank = {
    Python: [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "fun", "define"],
            answer: 1,
            explanation: "The def keyword defines a function."
        },
        {
            question: "What is the output of print(2 ** 3)?",
            options: ["6", "8", "9", "5"],
            answer: 1,
            explanation: "The ** operator performs exponentiation. Answer: 8."
        },
        {
            question: "Which loop iterates over a sequence?",
            options: ["if", "while only", "for", "switch"],
            answer: 2,
            explanation: "A for loop iterates over sequences."
        },
        {
            question: "What is the output of len('Hello')?",
            options: ["4", "5", "6", "Hello"],
            answer: 1,
            explanation: "Hello contains five characters."
        },
        {
            question: "Which data type stores True or False?",
            options: ["int", "str", "bool", "float"],
            answer: 2,
            explanation: "The bool data type stores Boolean values."
        }
    ],

    Mathematics: [
        {
            question: "What is 5 × 6?",
            options: ["11", "25", "30", "35"],
            answer: 2,
            explanation: "5 multiplied by 6 equals 30."
        },
        {
            question: "What is the square of 9?",
            options: ["18", "72", "81", "99"],
            answer: 2,
            explanation: "9 × 9 = 81."
        },
        {
            question: "What is 100 / 4?",
            options: ["20", "25", "40", "50"],
            answer: 1,
            explanation: "100 divided by 4 equals 25."
        }
    ],

    Science: [
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Venus", "Jupiter"],
            answer: 1,
            explanation: "Mars is called the Red Planet."
        },
        {
            question: "What is the chemical formula of water?",
            options: ["CO2", "O2", "H2O", "NaCl"],
            answer: 2,
            explanation: "Water contains two hydrogen and one oxygen atom."
        },
        {
            question: "Which gas do plants absorb during photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answer: 2,
            explanation: "Plants absorb carbon dioxide."
        }
    ]
};

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizSubmitted = false;

function generateQuiz() {
    const subject = $("subject").value;
    const topic = $("topic").value.trim();
    const difficulty = $("difficulty").value;

    if (!topic) return alert("Please enter a topic first!");

    quizQuestions = [...(questionBank[subject] || [])]
        .sort(() => Math.random() - 0.5);

    if (!quizQuestions.length) return alert("No questions available!");

    currentQuestion = 0;
    score = 0;

    $("quizSetup").style.display = "none";
    $("resultArea").style.display = "none";
    $("quizArea").style.display = "block";
    $("quizSubject").textContent = subject + " | " + difficulty;

    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];

    selectedAnswer = null;
    quizSubmitted = false;

    $("questionCount").textContent =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    $("quizProgress").style.width =
        `${(currentQuestion + 1) / quizQuestions.length * 100}%`;

    $("questionContainer").innerHTML = `
        <h2 class="question-title">${q.question}</h2>
        ${q.options.map((option, i) => `
            <button class="option" onclick="selectAnswer(${i})">
                ${String.fromCharCode(65 + i)}. ${option}
            </button>
        `).join("")}
    `;

    $("nextButton").textContent = "Submit Answer";
    $("nextButton").onclick = nextQuestion;
}

function selectAnswer(index) {
    if (quizSubmitted) return;

    selectedAnswer = index;

    document.querySelectorAll(".option").forEach((option, i) => {
        option.classList.toggle("selected", i === index);
    });
}

function nextQuestion() {
    if (selectedAnswer === null)
        return alert("Please select an answer!");

    if (quizSubmitted) return;

    quizSubmitted = true;

    const q = quizQuestions[currentQuestion];

    if (selectedAnswer === q.answer) score++;

    document.querySelectorAll(".option").forEach((option, i) => {
        option.disabled = true;

        if (i === q.answer) option.classList.add("correct");
        else if (i === selectedAnswer) option.classList.add("wrong");
    });

    $("questionContainer").innerHTML += `
        <div class="explanation">
            <b>Explanation:</b> ${q.explanation}
        </div>
    `;

    $("nextButton").textContent =
        currentQuestion === quizQuestions.length - 1
        ? "View Results"
        : "Next Question →";

    $("nextButton").onclick = continueQuiz;
}

function continueQuiz() {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    $("quizArea").style.display = "none";
    $("resultArea").style.display = "block";

    $("finalScore").textContent =
        `${score}/${quizQuestions.length}`;

    const percentage = score / quizQuestions.length * 100;

    $("resultMessage").textContent =
        percentage >= 80 ? "Excellent work! 🌟" :
        percentage >= 50 ? "Good effort! Keep practicing. 💪" :
        "Keep learning. You can improve! 📚";
}

// ==============================
// FLASHCARDS
// ==============================

const flashcards = [
    {
        question: "What is HTML?",
        answer: "HTML creates the structure of a website."
    },
    {
        question: "What is CSS?",
        answer: "CSS styles and designs a website."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript makes websites interactive."
    },
    {
        question: "What is a variable?",
        answer: "A variable stores data."
    },
    {
        question: "What is a function?",
        answer: "A function is a block of code that performs a task."
    }
];

let cardIndex = 0;
let showingAnswer = false;

function showCard() {
    const card = flashcards[cardIndex];

    $("card-label").textContent =
        showingAnswer ? "ANSWER" : "QUESTION";

    $("card-text").textContent =
        showingAnswer ? card.answer : card.question;

    $("card-number").textContent =
        `${cardIndex + 1} / ${flashcards.length}`;

    document.querySelector(".show-answer").textContent =
        showingAnswer ? "Show Question" : "Show Answer";
}

function flipCard() {
    showingAnswer = !showingAnswer;
    showCard();
}

function changeCard(step) {
    cardIndex =
        (cardIndex + step + flashcards.length) % flashcards.length;

    showingAnswer = false;
    showCard();
}

function nextCard() {
    changeCard(1);
}

function previousCard() {
    changeCard(-1);
}

if ($("flashcard")) showCard();

// ==============================
// AI SUMMARIZER
// ==============================

function summarizeNotes() {
    const notes = $("notesInput").value.trim();

    if (!notes) {
        $("summaryOutput").textContent =
            "Please paste your notes first.";
        return;
    }

    const sentences = notes.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

    $("summaryOutput").textContent = sentences
        .map(s => s.trim())
        .filter(Boolean)
        .slice(0, 3)
        .join(" ") || "Could not create a summary.";
}

function clearNotes() {
    $("notesInput").value = "";
    $("summaryOutput").textContent =
        "Your summary will appear here.";
}

// ==============================
// STUDY PLANNER
// ==============================

let studyTasks = [];

try {
    const savedTasks = JSON.parse(
        localStorage.getItem("prepAITasks")
    );

    studyTasks = Array.isArray(savedTasks) ? savedTasks : [];
} catch (error) {
    studyTasks = [];
}

function saveTasks() {
    localStorage.setItem(
        "prepAITasks",
        JSON.stringify(studyTasks)
    );
}

function addTask() {
    const name = $("taskInput").value.trim();
    const subject = $("subjectInput").value.trim();
    const date = $("dateInput").value;

    if (!name || !subject || !date) {
        return alert("Please enter the task, subject and date.");
    }

    studyTasks.push({
        id: Date.now(),
        name,
        subject,
        date,
        completed: false
    });

    saveTasks();
    displayTasks();
    updatePrepAIDashboard();

    ["taskInput", "subjectInput", "dateInput"].forEach(id => {
        $(id).value = "";
    });
}

function displayTasks() {
    const list = $("taskList");

    if (!list) return;

    list.innerHTML = "";

    studyTasks.forEach(task => {
        const item = document.createElement("div");

        item.className =
            `task-item ${task.completed ? "completed" : ""}`;

        const details = document.createElement("div");

        details.innerHTML = `<h3></h3><p></p>`;

        details.querySelector("h3").textContent = task.name;

        details.querySelector("p").textContent =
            `${task.subject} | ${task.date}`;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const complete = document.createElement("button");

        complete.className = "complete-btn";
        complete.textContent = task.completed ? "Undo" : "Complete";
        complete.onclick = () => toggleTask(task.id);

        const remove = document.createElement("button");

        remove.className = "delete-btn";
        remove.textContent = "Delete";
        remove.onclick = () => deleteTask(task.id);

        actions.append(complete, remove);
        item.append(details, actions);

        list.appendChild(item);
    });

    // Update planner statistics only when those elements exist
    if ($("totalTasks")) {
        $("totalTasks").textContent = studyTasks.length;
    }

    if ($("completedTasks")) {
        $("completedTasks").textContent =
            studyTasks.filter(task => task.completed).length;
    }
}

function toggleTask(id) {
    studyTasks = studyTasks.map(task =>
        task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    saveTasks();
    displayTasks();
    updatePrepAIDashboard();
}

function deleteTask(id) {
    studyTasks = studyTasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
    updatePrepAIDashboard();
}

if ($("taskList")) {
    displayTasks();
}

// ==============================
// PREPAI DASHBOARD PROGRESS
// ==============================

function updatePrepAIDashboard() {
    // Run only on pages containing the progress bar
    const progressBar = $("progressBar");

    if (!progressBar) return;

    const total = studyTasks.length;

    const completed = studyTasks.filter(
        task => task.completed
    ).length;

    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

    // Update progress percentage
    if ($("progressText")) {
        $("progressText").textContent = percentage + "%";
    }

    // Update progress bar width
    progressBar.style.width = percentage + "%";

    // Update progress message
    if ($("progressMessage")) {
        $("progressMessage").textContent =
            !total
            ? "Add your first task in the Study Planner to begin!"
            : percentage === 100
            ? "Excellent! You have completed all your study tasks!"
            : `Keep going! You have completed ${completed} out of ${total} tasks.`;
    }
}

// Update progress when the page loads
updatePrepAIDashboard();

// Update when tasks change in another browser tab
window.addEventListener("storage", function(event) {
    if (event.key === "prepAITasks") {
        try {
            const updatedTasks = JSON.parse(event.newValue);
            studyTasks = Array.isArray(updatedTasks) ? updatedTasks : [];
        } catch (error) {
            studyTasks = [];
        }

        displayTasks();
        updatePrepAIDashboard();
    }
});