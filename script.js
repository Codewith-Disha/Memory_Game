const symbols = ['🙂', '❤️', '😎', '🤩', '😭', '😬', '😵‍💫', '🫣'];
        let cards = [...symbols, ...symbols];
        let firstCard = null;
        let secondCard = null;
        
        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }
        
        function createBoard() {
            cards = shuffle(cards);
            const board = document.getElementById('gameBoard');
            board.innerHTML = '';
            cards.forEach(symbol => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.symbol = symbol;
                card.addEventListener('click', flipCard);
                board.appendChild(card);
            });
        }
        
        function flipCard() {
            if (this.classList.contains('flipped') || secondCard) return;
            this.textContent = this.dataset.symbol;
            this.classList.add('flipped');
            if (!firstCard) {
                firstCard = this;
            } else {
                secondCard = this;
                setTimeout(checkMatch, 500);
            }
        }
        
        function checkMatch() {
            if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
                firstCard = null;
                secondCard = null;
            } else {
                firstCard.textContent = '';
                secondCard.textContent = '';
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
            }
        }
        
        createBoard();