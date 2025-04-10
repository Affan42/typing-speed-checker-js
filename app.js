// 








// Problem: in middle of a word type space the

const elements = {
  startBtn: document.querySelector(".start"),
  timeElem: document.querySelector(".time span b"),
  input: document.querySelector(".input-field"),
  text: document.querySelector(".typing-text p"),
  content_box: document.querySelector(".content-box"),
  result_box: document.querySelector(".result_box"),
  wpm: document.querySelector(".WPM"),
};
// ================== State ==================

const state = {
  text: "this is some other text for niceness",
  lettersArr: [],
  editedLettersArr: [],
  letterPosition: null,
  wordPosition: null,
  timerOn: false,
  wrongWords: 0,
  wrongLetterPositions: [],
  sentenceStructure: [],
};

//   ================== Configure ==================

function setText() {
  elements.text.innerHTML = state.editedLettersArr.join("");
}

function setTextsArr() {
  const text = fetchText();
  state.text = text;
  state.lettersArr = state.text.split("");
  state.editedLettersArr = state.text.split("");


}

// ================== Fetch Text ==================

function fetchText() {
  return "this is some other text for niceness";
}
// ================== Timer ==================

function startTimer() {
  let sec = 3;
  let countDown = setInterval(() => {
    sec--;
    elements.timeElem.innerHTML = sec;

    if (sec <= 0) {
      clearInterval(countDown);

      stopGame();
    }
  }, 1000);
}

// ================== Stop Game ==================
function stopGame() {
  elements.content_box.classList.add("hide");
  elements.result_box.classList.remove("hide");
  const WPM = calcWPM();

  elements.wpm.innerHTML = `WPM: ${WPM}`;
}

// ================== Sentence Structure ==================
function setSentenceStructure() {
  let currentWord = [];

  state.lettersArr.forEach((letter, i) => {
    if (letter != " ") {
      currentWord.push(i);
    } else {
      state.sentenceStructure.push(currentWord);
      currentWord = [];
    }
  });
}
// ================== Letter functions ==================

function forword() {
  const currentLetter = state.lettersArr[state.letterPosition];

  state.editedLettersArr[
    state.letterPosition
  ] = `<span class="active" >${currentLetter}</span>`;

  setText();
}

function letterCheck(keyPressed) {
  let currentLetter = state.lettersArr[state.letterPosition]; // Letter Position was increased by forword



  if (currentLetter === keyPressed) {
    
    state.editedLettersArr[
      state.letterPosition
    ] = `<span class="correct" >${currentLetter}</span>`;
  } else {
    state.editedLettersArr[
      state.letterPosition
    ] = `<span class="incorrect" >${currentLetter}</span>`;

    state.wrongLetterPositions.push(state.letterPosition);
  }
  setText();
}
// ================== Letter Forword ==================
function letterIncrement() {
  if (state.letterPosition === null) {
    state.letterPosition = 0;
  } else {
    state.letterPosition++;
  }
}

// ================== Word functions ==================

function wordCheck(typedWord) {
  const actualWordsArr = state.text.split(" ");
  if (actualWordsArr[state.wordPosition] != typedWord) {
    state.wrongWords++;
  }
}

function calcLastWord() {
  const writtenWordsArr = elements.input.value.split(" ");
  const lastWord = writtenWordsArr[writtenWordsArr.length - 1];
  return lastWord;
}
// ================== Word Forword (contains space handle also) ==================

function handleSpace(keyPressed) {
  let spaceHaventCome = state.lettersArr[state.letterPosition] != " ";

  do {
    letterCheck(spaceHaventCome === true? null : " ");
    letterIncrement();
    forword();

    if (state.lettersArr[state.letterPosition] === " ") {
      spaceHaventCome = false;

      letterCheck(" ");
      letterIncrement();
      forword();
    }
  } while (spaceHaventCome);
}
function incrementWord() {
  if (state.wordPosition === null) {
    state.wordPosition = 0;
  } else {
    state.wordPosition++;
  }
}
// ================== Backspace ==================
function handleBackspace() {
  state.editedLettersArr[state.letterPosition] =
    state.lettersArr[state.letterPosition];

  state.letterPosition--;
  forword(); // Makes active

  let wasWrongLetter = checkWrongLetter();

  if (!wasWrongLetter) return;

  let wrongWordArr = getWrongWordArr();

  if (!wrongWordArr) return;

  let isWrongWordCleared = checkWrongWordCleared(wrongWordArr);

  if (isWrongWordCleared) {
    state.wrongWords--;
  }
}

function checkWrongLetter() {
  const letterDeletedPosition = state.letterPosition;

  let wasWrongLetter = false;

  state.wrongLetterPositions.forEach((letterPostion, i) => {
    if (letterPostion === letterDeletedPosition) {
      state.wrongLetterPositions.splice(i, 1);
      wasWrongLetter = true;
    }
  });
  return wasWrongLetter;
}
function getWrongWordArr() {
  const letterDeletedPosition = state.letterPosition;
  let wrongWordArr;
  state.sentenceStructure.forEach((insideWordArr) => {
    insideWordArr.forEach((letterPosition) => {
      if (letterPosition === letterDeletedPosition) {
        wrongWordArr = insideWordArr;
      }
    });
  });
  return wrongWordArr;
}
function checkWrongWordCleared(wrongWordArr) {
  let isWrongWordCleared = true;
  wrongWordArr.forEach((letterPostion) => {
    state.wrongLetterPositions.forEach((wrongLetterPostion, i) => {
      if (letterPostion === wrongLetterPostion) {
        isWrongWordCleared = false;
      }
    });
  });
  return isWrongWordCleared;
}
// ================== WPM ==================
function calcWPM() {
  const WPM = Math.round(
    (state.letterPosition - state.wrongLetterPositions.length) / 5
  );

  return WPM;
}

// ================== Event Listeners ==================
elements.startBtn.addEventListener("click", () => {
  startTimer();
});

// Input

elements.input.addEventListener("keydown", (e) => {
  // if (!state.timerOn) startTimer();

  if (
    e.key === "CapsLock" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Shift" ||
    e.key === "Delete"
  ) {
    return;
  } else if (e.key === "Backspace") {
    handleBackspace();
    return;
  } else if (e.key === " ") {
    const lastWord = calcLastWord();

    incrementWord();
    handleSpace();
    wordCheck(lastWord);

    return;
  }

  letterCheck(e.key);
  letterIncrement();
  forword();
});

// ================== On app start ==================
document.addEventListener("DOMContentLoaded", () => {
  setTextsArr();
  setSentenceStructure();
  letterIncrement();
  forword();

  elements.input.focus();
});
