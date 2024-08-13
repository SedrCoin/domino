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
const refresh = document.querySelector('.refresh')
const totalLeft = document.querySelector('.left-total')
const totalRight = document.querySelector('.right-total')


let leftNumbers = [];
let rightNumbers = [];

let totalLeftCounter = 0;
let totalRightCounter = 0; 

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


    if(   number === 35 ) {
    


      countTotal()
    
      if (selected === 'left' ) {
        totalLeftCounter += 2 
        totalLeft.innerHTML = totalLeftCounter
      } else if (selected === 'right') {
        totalRightCounter += 2
        totalRight.innerHTML = totalRightCounter
      }

      
    } else if ( selected === "left") {
      leftNumbers.unshift(number);
    }  else if (selected === "right") {
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







function countTotal() {
    
    leftNumbers = [];
    rightNumbers = [];
    updateDisplay();
}


endBtn.addEventListener("click", () => {
  end.style.display = "none";
  if(+sumLeft.textContent > +sumRight.textContent ) {


    if(+sumRight.textContent < 150 ) {
      totalLeftCounter += 2
      totalLeft.innerHTML = totalLeftCounter;
      leftNumbers = [];
      rightNumbers = [];
      updateDisplay();
    } else {
      totalLeftCounter += 1
      totalLeft.innerHTML = totalLeftCounter;
      leftNumbers = [];
      rightNumbers = [];
      updateDisplay();
    }
  
  } else if (+sumLeft.textContent < +sumRight.textContent ) {
    
      if(+sumLeft.textContent < 150 ) {
        totalRightCounter += 2;
        totalRight.innerHTML = totalRightCounter;
        leftNumbers = [];
        rightNumbers = [];
        updateDisplay();
      } else {
        totalRightCounter += 1;
        totalRight.innerHTML = totalRightCounter;
        leftNumbers = [];
        rightNumbers = [];
        updateDisplay();
      }


  }
  

});



  refresh.addEventListener("click", () => {
    game.style.display = "none";
    leftNumbers = [];
    rightNumbers = [];
    updateDisplay();
    end.style.display = "none";
  
    totalLeft.innerHTML = 0;
    totalRight.innerHTML = 0;
    totalLeftCounter = 0;
    totalRightCounter = 0;
  
  });



document.addEventListener('click', (event) => {
  if (!card.contains(event.target)) {
    removeHighlight();
    selected = null;
  }
})

