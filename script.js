document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start-btn");
  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "quiz.html";
    });
  }

  const quizPage = document.getElementById("quiz-form");
  if (quizPage) {
    const questions = document.querySelectorAll(".quiz-question");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    let currentQuestion = 0;

    function showQuestion() {
      questions.forEach((q, i) => {
        q.style.display = i === currentQuestion ? "flex" : "none";
      });
      prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
      nextBtn.style.display =
        currentQuestion === questions.length - 1 ? "none" : "inline-block";
      submitBtn.style.display =
        currentQuestion === questions.length - 1 ? "inline-block" : "none";
    }

    showQuestion();

    nextBtn.addEventListener("click", function () {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
      }
    });

    prevBtn.addEventListener("click", function () {
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
      }
    });

    quizPage.addEventListener("submit", function (event) {
      event.preventDefault();

      const questionNames = [
        "lifestyle",
        "freeTime",
        "sleep",
        "eat",
        "exercise",
        "stress",
        "phone",
      ];

      const scores = {
        Sedentary: 0,
        Healthy: 0,
        Minimalist: 0,
        Active: 0,
      };

      questionNames.forEach((name) => {
        const selected = quizPage.querySelector(
          `input[name="${name}"]:checked`
        );
        if (selected) {
          scores[selected.value]++;
        }
      });

      let topLifestyle = "";
      let topScore = 0;
      for (let type in scores) {
        if (scores[type] > topScore) {
          topScore = scores[type];
          topLifestyle = type;
        }
      }

      localStorage.setItem("quizResult", topLifestyle);
      window.location.href = "result.html";
    });
  }

  const resultPage = document.getElementById("result-message");
  if (resultPage) {
    const result = localStorage.getItem("quizResult");
    const title = document.getElementById("result-title");
    const message = document.getElementById("result-message");
    const image = document.getElementById("result-image");
    const highlights = document.getElementById("result-highlights");

    const resultData = {
      Healthy: {
        title: "Healthy Lifestyle",
        message:
          "Your answers show a balanced routine with strong everyday habits. Keep protecting your energy with nourishing food, rest, movement and time to recharge.",
        image: "images/healthy.jpg",
        alt: "Fresh healthy food and lifestyle items",
        highlights: [
          "Maintain your consistent routines instead of chasing perfection.",
          "Use small weekly goals to keep your progress visible.",
          "Balance healthy choices with enough rest and enjoyment.",
        ],
      },
      Active: {
        title: "Active Lifestyle",
        message:
          "You seem energized by movement, structure and activity. Your result suggests a dynamic lifestyle with plenty of motivation to stay on the move.",
        image: "images/active.jpg",
        alt: "Active lifestyle and exercise scene",
        highlights: [
          "Plan recovery days so your energy stays sustainable.",
          "Mix strength, cardio and flexibility for a balanced routine.",
          "Keep activities enjoyable so consistency feels natural.",
        ],
      },
      Sedentary: {
        title: "Relaxed Lifestyle",
        message:
          "Your answers point to a slower, more low-movement routine. A few gentle changes can make your days feel more balanced without changing everything at once.",
        image: "images/sedentary.jpg",
        alt: "Relaxed indoor lifestyle scene",
        highlights: [
          "Start with short walks or light stretching during the day.",
          "Set one realistic movement goal you can repeat easily.",
          "Reduce long sitting periods with small active breaks.",
        ],
      },
      Minimalist: {
        title: "Minimalist Lifestyle",
        message:
          "You value simplicity, calm and intentional choices. Your result suggests that you thrive when your routines feel focused and uncluttered.",
        image: "images/minimalist.jpg",
        alt: "Minimal calm lifestyle setting",
        highlights: [
          "Keep routines simple enough to maintain during busy weeks.",
          "Protect quiet time for reflection, rest or meditation.",
          "Choose habits that support clarity instead of adding pressure.",
        ],
      },
    };

    const emptyResult = {
      title: "Complete the quiz to see your result",
      message:
        "It looks like no answer was selected yet. Return to the quiz and answer the questions to receive your lifestyle profile.",
      image: "images/medi.jpg",
      alt: "Calm lifestyle scene",
      highlights: [
        "Answer seven quick lifestyle questions.",
        "Get a result based on your strongest pattern.",
        "Use the result as a starting point for healthier habits.",
      ],
    };

    const selectedResult = resultData[result] || emptyResult;

    title.textContent = selectedResult.title;
    message.textContent = selectedResult.message;
    image.src = selectedResult.image;
    image.alt = selectedResult.alt;

    if (highlights) {
      highlights.innerHTML = "";
      selectedResult.highlights.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        highlights.appendChild(listItem);
      });
    }
  }
});
