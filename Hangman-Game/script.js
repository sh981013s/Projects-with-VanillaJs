const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrongLetters');
const playAgainBtn = document.getElementById('playAgainButton');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('finalMessage');
const livesCnt = document.getElementById('livesCnt');
const figureParts = document.querySelectorAll('.figure-part');

let EntireWords = [];
let targetWord = '';
let correctLetters = [];
let wrongLetters = [];
let lives = 6;

// getRandomWord
const getRandomWord = async() => {
    const res = await fetch('https://random-word-api.herokuapp.com/all');
    const data = await res.json();
    EntireWords = data;
    targetWord = EntireWords[Math.floor(Math.random() * EntireWords.length)]
    targetWord = 'wizard'
}

// show hidden word
const displayWord = () => {
    console.log(targetWord,'tar')
    wordEl.innerHTML = `
    ${targetWord
        .split('')
        .map(letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
</span>
        `)
        .join('')
    }
    `
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    console.log(wordEl.innerText);
    console.log(innerWord)

    if (innerWord === targetWord) {
        finalMessage.innerText = `Congrats! You won 😆
        the answer was \'${targetWord}\'`
        popup.style.display = 'flex';
    }
}

// displayWord();

const init = async() => {
    await getRandomWord();
    await displayWord();
}

init();

// life counter

const lifeCounter = () => {
    if (lives === 6) {
        return `❤️❤️❤️❤️❤️❤️`
    } else if (lives === 5) {
        return `❤️❤️❤️❤️❤️`
    } else if (lives === 4) {
        return `❤️❤️❤️❤️`
    } else if (lives === 3) {
        return `❤️❤️❤️`
    } else if (lives === 2) {
        return `❤️❤️️`
    } else {
        return `❤️`
    }
}

// Update the wrong letters
const updateWrongLettersEl = () => {
    // Display Wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `${letter}`)}
    `

    // Display Parts
    figureParts.forEach((part, idx) => {
        const errors = wrongLetters.length;
        if(idx < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `Unfortunately you lost. 🥲
        the answer was \'${targetWord}\'`;
        popup.style.display = 'flex';
        console.log(popup.style.display);
    }

    // lives Cnt
    lives -= 1
    livesCnt.innerText = `
    lives : ${lifeCounter()}
    `
}

// show notification
const showNotification = (msg) => {
    notification.innerText = msg;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(targetWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification(`You have already used \"${letter.toUpperCase()}\"`);
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                console.log(wrongLetters, 'wronglist')
                updateWrongLettersEl();
            } else {
                showNotification(`You have already used \"${letter.toUpperCase()}\"`);
            }
        }
    }
})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    targetWord = EntireWords[Math.floor(Math.random() * EntireWords.length)];

    displayWord();

    updateWrongLettersEl();
    lives = 6;
    livesCnt.innerText = `
    lives : ${lifeCounter()}
    `

    popup.style.display = 'none';
});



