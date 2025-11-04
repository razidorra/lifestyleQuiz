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
    const message = document.getElementById("result-message");
    const image = document.getElementById("result-image");

    image.src = "images/medi.jpg";

    if (result === "Healthy") {
      message.textContent =
        "Congratulations! You have a Healthy Lifestyle - keep it up!";
      image.src = "images/healthy.jpg";
    } else if (result === "Active") {
      message.textContent = "You love being active and full of energy!";
      image.src = "images/active.jpg";
    } else if (result === "Sedentary") {
      message.textContent = "You are a bit too relaxed, try to move more!";
      image.src = "images/sedentary.jpg";
    } else if (result === "Minimalist") {
      message.textContent = "You enjoy simple and calm living, beautiful!";
      image.src = "images/minimalist.jpg";
    }
  }
});
