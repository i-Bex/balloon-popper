let startGame;
let difficulty = 1000;

function changeDifficulty(){
     const balloonContainer = document.querySelector('body'); 
     allBalloons(balloon => balloonContainer.removeChild(balloon))
     clearInterval(startGame);
     difficulty = Number(this.value);
     restart();
  }


function generateBalloon() {
  const difficultyOptions = document.querySelector('.difficulty-options');
  difficultyOptions.addEventListener('change',changeDifficulty);
  startGame = setInterval(() => balloon(startGame),difficulty);
}

function balloon(time) {
  const balloonContainer = document.querySelector("body");
  const balloonElement = document.createElement("div");
  const balloonText = document.createElement("p");
  balloonText.textContent = letter().toUpperCase();
  balloonElement.setAttribute("class", "balloon __center");
  balloonText.setAttribute("class", "__text");
  balloonElement.style.left = position() + "%";
  balloonElement.style.animationName = "float";
  balloonElement.append(balloonText);
  balloonElement.addEventListener('click',balloonClick);
  balloonContainer.append(balloonElement);
  balloonPosition(time);
}

function allBalloons(func){
  const balloons =  document.querySelectorAll('.balloon');
  balloons.forEach(func);
  return balloons;
}

function letter() {
  const letters = "abcdefghijklmnopqrstuvwxyyz";
  const letterIndex = Math.floor(Math.random() * letters.length);
  return letters.split("")[letterIndex];
}

function position() {
  const balloonPosition = Math.floor(Math.random() * 80);
  return balloonPosition;
}

function balloonPosition(time) {
  allBalloons((balloon) => {
    const balloonTopViewportDistance = balloon.getBoundingClientRect().top;
      //remove the balloon when it reaches the pop of the viewport without getting popped and decrement the value of life.
    if (balloonTopViewportDistance < 0) {
      removeBalloon(balloon,time);
    }
  })
}

function removeBalloon(balloon,time) {
  const life = document.querySelector('.life');
  const heartIcon = document.querySelector('.heart-icon');
  const balloonContainer = document.querySelector("body");
  balloonContainer.removeChild(balloon);
  heartIcon.classList.add("decrement");
  setTimeout(() => heartIcon.classList.remove("decrement"),300); 
  life.textContent = Number(life.textContent) - 1;
  if(Number(life.textContent) === 0) restartGame(time,balloonContainer);
}

function restartGame(time,balloonContainer){
    const gameOverBoard = document.querySelector('.game-over-board');
    const restartButton = document.querySelector('.restart-button'); 
    const currentScore  = document.querySelector('.current-score');
    const gainScore = document.querySelector('.score');
    allBalloons(balloon => balloonContainer.removeChild(balloon))
    clearInterval(time);
    gainScore.textContent = currentScore.textContent;
    gameOverBoard.style.display = "flex";
    restartButton.addEventListener('click',restart);
}

function restart(){
  const life = document.querySelector('.life');
  const score = document.querySelector('.current-score');
  const gameOverBoard = document.querySelector('.game-over-board');
  life.textContent = "3";
  score.textContent = "0";
  gameOverBoard.style.display  = "none";
  generateBalloon();
}

function balloonClick(){
     popBalloon(this);
}

function popBalloon(balloon){
  const balloonContainer = document.querySelector('body'); 
  const currentScore = document.querySelector('.current-score');
  currentScore.textContent = Number(currentScore.textContent) + 1;
   balloon.classList.add('pop');
   balloon.style.animationPlayState = "paused";
}

function mode(){
  const darkMode = document.querySelector('.dark');
  const lightMode = document.querySelector('.light');
  const mainBackground = document.querySelector('.background');
  const boardText = document.querySelectorAll('._board-text');
  const firstCloud = document.querySelector('.__first-cloud');
  const secondCloud = document.querySelector('.__second-cloud');
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');

  darkMode.addEventListener('click',(e) => {
    mainBackground.style.background = "linear-gradient(180deg, #292929 54.61%, #263F13 54.62%)";
    boardText.forEach(text => text.style.color = "white");
    firstCloud.style.left = '-50%';
    secondCloud.style.right = '-50%';
    sun.style.left = "-50%";
    moon.style.left = "-5%";
  });

  lightMode.addEventListener("click",(e) => {
    mainBackground.style.background = "linear-gradient(180deg, #4A93D6 53.11%, #3C9D51 53.12%, #107D28 84.37%)";
    boardText.forEach(text => text.style.color = "rgb(45, 45, 45)");
    firstCloud.style.left = '50px';
    secondCloud.style.right = '100px'; 
    sun.style.left = "-5%";
    moon.style.left = "-50%"; 
  });
}

function gameStart(){
  const gameInstruction = document.querySelector('.start-game-container');
  gameInstruction.style.display = "none";
  generateBalloon();
  
}


window.addEventListener('keydown',(e) => {
  allBalloons(balloon => {
    if(balloon.children[0].textContent.toLowerCase() === e.key.toLowerCase()){
      popBalloon(balloon); 
    }
  })
})

mode();
