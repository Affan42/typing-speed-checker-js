const elements = {
  startBtn: document.querySelector(".start"),
  timeElem: document.querySelector(".time span b"),
  input: document.querySelector(".input-field"),
  text: document.querySelector(".typing-text p"),
};
// Game State

const state = {
  lettersArr: [],
  wordPosition: 0,
};

// Set Texts

function setText() {
  let readyText = "";

  state.lettersArr.map((letter) => (readyText += letter));

  elements.text.innerHTML = readyText;
}

// Set Texts Arr

function setTextsArr() {
  const text = fetchText();

  state.lettersArr = Array.from(text);
}

// Fetch Text

function fetchText() {
  return "lorem ipsum";
}
// Timer

function startTimer() {
  let sec = 60;
  let countDown = setInterval(() => {
    sec--;
    elements.timeElem.innerHTML = sec;

    if (sec <= 0) {
      clearInterval(countDown);
    }
  }, 1000);
}

function forword() {
  let currentLetter = state.lettersArr[state.wordPosition];

  state.lettersArr[
    state.wordPosition
  ] = `<span class="active" >${currentLetter}</span>`;

  setText();

  state.lettersArr[state.wordPosition] = currentLetter;
  
  state.wordPosition++;
}

function letterCheck(keyPressed) {
  let currentLetter = state.lettersArr[state.wordPosition - 1];

  if (currentLetter === keyPressed) {
    state.lettersArr[
      state.wordPosition - 1
    ] = `<span class="correct" >${currentLetter}</span>`;
  } else {
    state.lettersArr[
      state.wordPosition - 1
    ] = `<span class="incorrect" >${currentLetter}</span>`;
  }

  setText();
}
// Event Listeners
elements.startBtn.addEventListener("click", () => {
  startTimer();
});

elements.input.addEventListener("keydown", (e) => {
  console.log(e.key);

  if (
    e.key === "Backspace" ||
    e.key === "CapsLock" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "Shift" ||
    e.key === "Delete" 
  )
    return;
  letterCheck(e.key);
  forword();
});
// On app start
document.addEventListener("DOMContentLoaded", () => {
  setTextsArr();
  setText();
  forword();
});
