document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const resetButton = document.getElementById('reset-button');
    const symbols = ['🐻', '🐺', '🐷', '🐣', '🦇', '🐼', '🦉', '🐱', '🐻', '🐺', '🐷', '🐣', '🦇', '🐼', '🦉', '🐱'];
    let flippedCards = [];
    let matchedCards = [];
    let lockBoard = false;
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Fungsi untuk membuat kartu
    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        return card;
    }

    // Fungsi untuk menampilkan kartu-kartu di board
    function setupBoard() {
        shuffleArray(symbols);
        symbols.forEach(symbol => {
            const card = createCard(symbol);
            gameBoard.appendChild(card);
        });
    }

    // Fungsi untuk membalik kartu
    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.symbol;

        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Fungsi untuk memeriksa kecocokan kartu
    function checkForMatch() {
        lockBoard = true;
        const [card1, card2] = flippedCards;
        const symbol1 = card1.dataset.symbol;
        const symbol2 = card2.dataset.symbol;

        if (symbol1 === symbol2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            matchedCards.push(card1, card2);
            resetFlippedCards();
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                resetFlippedCards();
            }, 1000);
        }

        // Cek apakah semua kartu sudah cocok
        if (matchedCards.length === symbols.length) {
            setTimeout(() => {
                alert('Selamat, Anda menang!');
            }, 1000);
        }
    }

    // Fungsi untuk mereset array kartu yang dibalik
    function resetFlippedCards() {
        flippedCards = [];
        lockBoard = false;
    }

    // Fungsi untuk mereset game
    function resetGame() {
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        lockBoard = false;
        setupBoard();
    }

    resetButton.addEventListener('click', resetGame);

    // Inisialisasi game
    setupBoard();
});