let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");

const userScorepara=document.querySelector("#user-score");
const compScorepara=document.querySelector("#comp-score");

const winSound=document.querySelector('#win');

const loseSound=document.querySelector('#lose');

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  //rock,paper,scissors

  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  console.log("game was drawn");
  msg.innerText = "game draw";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin,userChoice,compChoice) => {
  if (userWin) {
    userScore++;
    userScorepara.innerText=userScore;
    winSound.play();
    console.log("you win");
    msg.innerText = `You won: ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "purple";
  } else {
    console.log("you lose");
    compScore++;
    compScorepara.innerText=compScore;
    loseSound.play();
    msg.innerText = `You lost: ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  console.log("user choice = ", userChoice);

  //generate computer choice
  const compChoice = genCompChoice();
  console.log("comp choice= ", compChoice);

  if (userChoice === compChoice) {
    //drawGame
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin,userChoice,compChoice);
  }
};

choices.forEach((choice) => {
  console.log(choice);
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
