import "./style.css";
import { Questions } from "./questions";

console.log(Questions);

const app = document.querySelector("#app");

const buttonStart = document.querySelector("#start");
buttonStart?.addEventListener("click", startQuiz);

function startQuiz(event) {
  event.stopPropagation();
  let currentQuestions = 0;
  let score = 0;

  clean();
  displayQuestion(currentQuestions);

  function clean() {
    while (app?.firstElementChild) {
      app.firstElementChild.remove();
    }
  }

  function displayQuestion(index) {
    const questions = Questions[index];

    if (!questions) {
      //finir le quiz
      showDisplayFinish();
      return;
    }

    const title = getTitleElement(questions.question);
    app?.appendChild(title);

    const answerDiv = createAnswer(questions.answers);
    app?.appendChild(answerDiv);

    const submittButton = getSubmitButton();
    submittButton.addEventListener("click", submit);
    app?.appendChild(submittButton);

    function showDisplayFinish() {
      const h1 = document.createElement("h1");
      h1.innerText = "Bravo la partie est terminee";
      const p = document.createElement("p");
      p.innerText = `Tu as obtenue ${score} sur ${Questions.length} point`;
      app?.appendChild(h1);
      app?.appendChild(p);
    }
  }

  function submit() {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );

    const value = selectedAnswer?.value;

    const questions = Questions[currentQuestions];

    const isCorrect = questions.correct === value;

    if (isCorrect) {
      score++;
    }

    showFeedback(isCorrect, questions.correct, value);
    const feedback = getFeedbagPhrase(isCorrect, questions.correct);
    app?.appendChild(feedback);

    setTimeout(() => {
      currentQuestions++;
      clean();
      displayQuestion(currentQuestions);
    }, 2000);
  }

  function createAnswer(answers) {
    const answerDiv = document.createElement("div");

    answerDiv.classList.add("answers");

    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answerDiv.appendChild(label);
    }
    return answerDiv;
  }
}

function formatId(text) {
  return text.replaceAll(" ", "-").toLowerCase();
}
function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);
  return label;
}

function getSubmitButton() {
  const submit = document.createElement("button");
  submit.innerText = "submit";
  return submit;
}

function showFeedback(isCorrect, correct, answer) {
  const correctAnswer = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswer}"]`
  );

  const selectedAnswer = formatId(answer);
  const selectedElemen = document.querySelector(
    `label[for="${selectedAnswer}"]`
  );
  if (isCorrect) {
    selectedElemen?.classList.add("correct");
  } else {
    selectedElemen?.classList.add("incorrect");
    correctElement?.classList.add("correct");
  }
}

function getFeedbagPhrase(isCorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect
    ? "Bravo tu as trouver la bonne reponse "
    : `oups... la bonne reponse est ${correct}`;

  return paragraph;
}
