const emojis = [
  "🐱", "🐱", "🦝", "🦝", "🦊", "🦊",
  "🐶", "🐶", "🐵", "🐵", "🦁", "🦁"
];

let openCards = [];
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Cria o tabuleiro
function createBoard() {
  const game = document.querySelector(".game");
  game.innerHTML = ""; 

  const shuffled = shuffle([...emojis]);

  shuffled.forEach(emoji => {
    const box = document.createElement("div");
    box.className = "item";
    box.dataset.emoji = emoji;
    box.innerHTML = ""; 
    box.addEventListener("click", handleClick);
    game.appendChild(box);
  });
}

function handleClick() {
  if (lockBoard || openCards.includes(this) || this.classList.contains("boxMatch")) return;

  this.classList.add("boxOpen");
  this.innerHTML = this.dataset.emoji;
  openCards.push(this);

  if (openCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 600);
  }
}

function checkMatch() {
  const [first, second] = openCards;

  if (first.dataset.emoji === second.dataset.emoji) {
    first.classList.add("boxMatch");
    second.classList.add("boxMatch");
  } else {
    first.classList.remove("boxOpen");
    second.classList.remove("boxOpen");
    first.innerHTML = "";
    second.innerHTML = "";
  }

  openCards = [];
  lockBoard = false;

}
createBoard();
