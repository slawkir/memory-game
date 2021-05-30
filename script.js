const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //Блокировка(нельзя перевернуть > 2карт) когда нажимаю на вторую карту, то значение true
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
   
  if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
     return;
  }
   
  secondCard = this;
  lockBoard = true;

  checkForMath(); //метод проверки сравнения карт
}
function checkForMath() {
  if (firstCard.dataset.brand === secondCard.dataset.brand) {
      disableCards(); // при совпадении карт вызывается такой метод
      return;
  }
  unflipCards(); //при несовпадении карт 
}

// при совпадении карт 
function disableCards() { 
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

//при несовпадении карт
function unflipCards() {
    //lockBoard = true;
    
  setTimeout(() => {
      firstCard.classList.remove('flip') // удаление у 1-ой карты класса перевернутой карты
      secondCard.classList.remove('flip') // удаление у 2-ой 

      resetBoard();
  }, 1500)
}

// нажатие той же карты. Проверка равна ли вторая карта firstCard. Метод добавлю в disableCards() и unflipCards()
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard))

