let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for O, false for X
let count = 0; // To track the number of moves

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  console.log("Resetting game");
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const gameDraw = () => {
  console.log("Game is a draw");
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  console.log("Winner is:", winner);
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern.map(index => boxes[index].innerText);
    console.log(`Checking pattern: ${pattern} - Values: ${pos1}, ${pos2}, ${pos3}`);
    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box clicked");
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      box.disabled = true;
      count++;
      console.log("Move count:", count);
      
      if (checkWinner()) return;
      if (count === 9) {
        gameDraw();
      }
      turnO = !turnO; // Switch turn
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
