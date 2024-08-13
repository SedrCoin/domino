const left = document.querySelector(".left");
const right = document.querySelector(".right");
const sumLeft = document.querySelector(".sum-left");
const sumRight = document.querySelector(".sum-right");

const nums = document.querySelectorAll(".key");
const leftScore = document.querySelector(".left-score");
const rightScore = document.querySelector(".right-score");
const game = document.querySelector(".game");
const restart = document.querySelector(".btn-restart");
const deleteBtn = document.querySelector(".btn-delete");

let leftNumbers = [];
let rightNumbers = [];

let selected = null;

// Event listeners for selecting the left or right block
left.addEventListener("click", () => {
  left.classList.add("left-border");
  right.classList.remove("right-border");
  selected = "left";
  console.log("Selected left");
});

right.addEventListener("click", () => {
  right.classList.add("right-border");
  left.classList.remove("left-border");
  selected = "right";
  console.log("Selected right");
});

// Function to update the display and sums
function updateDisplay() {
  leftScore.innerHTML = leftNumbers.map((num) => `+${num}`).join("<br>");
  rightScore.innerHTML = rightNumbers.map((num) => `+${num}`).join("<br>");
  sumLeft.textContent = leftNumbers.reduce((a, b) => a + b, 0);
  sumRight.textContent = rightNumbers.reduce((a, b) => a + b, 0);

  if (
    parseInt(sumLeft.textContent) >= 100 ||
    parseInt(sumRight.textContent) >= 100
  ) {
    game.style.display = "block";
  }
}

// Event listeners for number buttons
nums.forEach((num) => {
  num.addEventListener("click", () => {
    if (!selected) {
      console.log("No side selected");
      return;
    }

    let number = parseInt(num.textContent.trim());

    if (selected === "left") {
      leftNumbers.push(number);
      console.log(`Added ${number} to left`);
    } else if (selected === "right") {
      rightNumbers.push(number);
      console.log(`Added ${number} to right`);
    }

    updateDisplay();
  });
});

// Function to delete the last added number and update the total
deleteBtn.addEventListener("click", () => {
  if (!selected) {
    console.log("No side selected for deletion");
    return;
  }

  if (selected === "left" && leftNumbers.length > 0) {
    let removed = leftNumbers.pop();
    console.log(`Removed ${removed} from left`);
  } else if (selected === "right" && rightNumbers.length > 0) {
    let removed = rightNumbers.pop();
    console.log(`Removed ${removed} from right`);
  }

  updateDisplay();
});

// Restart game event listener
restart.addEventListener("click", () => {
  game.style.display = "none";
  leftNumbers = [];
  rightNumbers = [];
  updateDisplay();
  console.log("Game restarted");
});
