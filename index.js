const left = document.querySelector(".left");
const right = document.querySelector(".right");
const sumLeft = document.querySelector(".sum-left");
const sumRight = document.querySelector(".sum-right");
const card = document.querySelector('.card');
const keys = document.querySelector(".keys");
const leftScore = document.querySelector(".left-score");
const rightScore = document.querySelector(".right-score");
const game = document.querySelector(".game");
const restart = document.querySelector(".btn-restart");
const deleteBtn = document.querySelector(".btn-delete");
const end = document.querySelector(".end");
const endBtn = document.querySelector('.btn-end')

let leftNumbers = [];
let rightNumbers = [];

let selected = null;


function removeHighlight() {
  left.classList.remove('left-border')
  right.classList.remove('right-border')
}


left.addEventListener("click", (event) => {
  event.stopPropagation();
  left.classList.add("left-border");
  right.classList.remove("right-border");
  selected = "left";

});

right.addEventListener("click", (event) => {
  event.stopPropagation();
  right.classList.add("right-border");
  left.classList.remove("left-border");
  selected = "right";

});


function updateDisplay() {
  leftScore.innerHTML = leftNumbers.map((num) => `+${num}`).join("<br>");
  rightScore.innerHTML = rightNumbers.map((num) => `+${num}`).join("<br>");
  sumLeft.textContent = leftNumbers.reduce((a, b) => a + b, 0);
  sumRight.textContent = rightNumbers.reduce((a, b) => a + b, 0);

  if (
    parseInt(sumLeft.textContent) >= 365 ||
    parseInt(sumRight.textContent) >= 365
  ) {
    end.style.display = "block";
  }
}

keys.addEventListener("click", (event) => {
  if (event.target.classList.contains("key")) {
    if (!selected) {
      
      return;
    }

    let number = parseInt(event.target.textContent.trim());

    if (selected === "left") {
      leftNumbers.unshift(number);
     
    } else if (selected === "right") {
      rightNumbers.unshift(number);
    
    }

    updateDisplay();
  }
});

deleteBtn.addEventListener("click", () => {
  if (!selected) {
    
    return;
  }

  if (selected === "left" && leftNumbers.length > 0) {
    let removed = leftNumbers.shift();
 
  } else if (selected === "right" && rightNumbers.length > 0) {
    let removed = rightNumbers.shift();
    
  }

  updateDisplay();
});

endBtn.addEventListener("click", () => {
  game.style.display = "none";
  leftNumbers = [];
  rightNumbers = [];
  updateDisplay();
  end.style.display = "none";

});


document.addEventListener('click', (event) => {
  if (!card.contains(event.target)) {
    removeHighlight();
    selected = null;
  }
})