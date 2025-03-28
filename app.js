const elements = {
  startBtn: document.querySelector(".start"),
  timeElem: document.querySelector(".time span b"),
  input: document.querySelector(".input-field"),
  text: document.querySelector(".typing-text p"),
  content_box: document.querySelector(".content-box"),
  result_box: document.querySelector(".result_box"),
  wpm: document.querySelector(".WPM")

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
  wrongLetterPositions: []
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

function stopGame() {
  elements.content_box.classList.add("hide");
  elements.result_box.classList.remove("hide");
  const WPM = calcWPM()
  elements.wpm.innerHTML = `WPM: ${WPM}`

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

    state.wrongLetterPositions.push(state.letterPosition)

    

  }
  setText();
  
}
// ================== Letter Forword ==================
function letterIncrement(){
  if(state.letterPosition === null){
    state.letterPosition = 0
  
  } else {
    state.letterPosition++
    
  }
}

// ================== Word functions ==================

function wordCheck(typedWord) {
  const actualWordsArr = state.text.split(" ");
  if (actualWordsArr[state.wordPosition] != typedWord) {
    state.wrongWords++;
  }
}

function calcLastWord(){
    const writtenWordsArr = elements.input.value.split(" ");
    const lastWord = writtenWordsArr[writtenWordsArr.length - 1];
    return lastWord
}
// ================== Word Forword (contains space handle also) ==================

function handleSpace(){
  let spaceHaventCome = state.lettersArr[state.letterPosition] != " ";
    
  do {
    letterCheck(null)
    letterIncrement()
    forword();
    
    if (state.lettersArr[state.letterPosition] === " ") {

      spaceHaventCome = false;

      letterCheck(null)
      letterIncrement()
      forword();

    }
  } while (spaceHaventCome);

}
function incrementWord(){
  if(state.wordPosition === null ){
    state.wordPosition = 0
  } else {
    state.wordPosition++
  }
}
// ================== WPM ==================
function calcWPM(){
  const WPM = ((state.wordPosition + 1) - state.wrongWords)

  return WPM
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
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "Shift" ||
    e.key === "Delete"
  ) {
    return;
  } 
  
  else if(e.key === "Backspace") {

    state.editedLettersArr[
      state.letterPosition
    ] = state.lettersArr[state.letterPosition];
  
    state.letterPosition--
    forword() 
    // if(state.wordPosition === null) return;

    let thatWordsArr = []

    let mediumArr= []

    state.lettersArr.forEach((letter, i)=>{
      if(letter != " "){
        mediumArr.push(i)
      } else {
        thatWordsArr.push(mediumArr)
        mediumArr = []
      }
    })

    let wasWrongLetter;

    const letterDeletedPosition = state.letterPosition + 1

    state.wrongLetterPositions.forEach((letterPostion, i)=>{
      if(letterPostion === letterDeletedPosition){
        wasWrongLetter = true
        // state.wrongLetterPositions.splice(i, 1)
      }
    })
    


    if (!wasWrongLetter) return;

    let wrongWordArr;

    thatWordsArr.forEach((insideWordArr)=>{
      insideWordArr.forEach((letter)=>{
        
        
        if(letter === letterDeletedPosition){
          wrongWordArr = insideWordArr
        }
      })
    })
   

    if (!wrongWordArr) return;

    let isAllWrongLettersOfWordDeleted = true


    wrongWordArr.forEach((letterPostion)=>{
      state.wrongLetterPositions.forEach((wrongLetterPostion, i)=>{
        if (letterPostion === wrongLetterPostion){
          isAllWrongLettersOfWordDeleted = false
        }
      })

    })

    console.log(isAllWrongLettersOfWordDeleted);
    

    if(isAllWrongLettersOfWordDeleted){
      state.wrongWords--
    }
    

    
    return
  }
  
  else if (e.key === " ") {
    const lastWord = calcLastWord()

    incrementWord()
    handleSpace()
    wordCheck(lastWord);
    
    return 
  }
  
  letterCheck(e.key);
  letterIncrement()
  forword();
  
  
});

// ================== On app start ==================
document.addEventListener("DOMContentLoaded", () => {
  setTextsArr();
  letterIncrement()
  forword()

  elements.input.focus();

});


