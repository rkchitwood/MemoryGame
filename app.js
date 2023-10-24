const gameContainer = document.getElementById("game");
let score=0;
let totalUp=0;
let highScore = localStorage.getItem("highScore") || 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.style.backgroundColor="white";
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}
let cardsUp=0;
let matches =[];
function handleCardClick(event) {
  if(cardsUp<2 && event.target!==matches[0]){
    event.target.style.backgroundColor=event.target.className;
    cardsUp++;
    matches.push(event.target);
    score++;
    document.querySelector('#score-value').textContent = score;
  }
  if(cardsUp==2 && matches[0].className==matches[1].className){
    cardsUp=0;
    matches=[];
    totalUp+=2;
  }
  else if(cardsUp==2){
    setTimeout(function(){
        matches[0].style.backgroundColor="white";
        matches[1].style.backgroundColor="white";
        matches=[];
        cardsUp=0;
    },1000)
  }
  if(totalUp==10 && highScore<score){
    highScore=score;
    localStorage.setItem("highScore", highScore);
    let hselement = document.querySelector('#high-score-value');
    hselement.textContent = highScore;
  }
}
createDivsForColors(shuffledColors);
document.getElementById("reset").addEventListener("click", function () {
  score = 0;
  document.querySelector('#score-value').textContent = score;
  totalUp = 0;
  cardsUp = 0;
  matches = [];
  shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = "";
  createDivsForColors(shuffledColors);
});