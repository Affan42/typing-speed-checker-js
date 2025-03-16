const elements = {
  startBtn: document.querySelector('.start'),
  timeElem: document.querySelector('.time span b'),
  input:  document.querySelector('.input-field')
}
// Fetch Text

// Timer
function startTimer () {
  let sec = 60
 let countDown =  setInterval(() => {
    sec--
    elements.timeElem.innerHTML = sec
  
  
    if(sec <= 0){
    clearInterval(countDown)
  }
  
  }, 1000)
}
// Event Listeners
elements.startBtn.addEventListener('click', () => {
  startTimer()

})

elements.input.addEventListener('keydown', () => {
// fetchRandomText()
})
fetchRandomText()
function fetchRandomText(){
let text = "lorem ipsum"
let wordPosition = 0
const lettersArr = Array.from(text)



}

