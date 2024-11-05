const newsContainer = document.getElementById('news-container');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const realNewsLink = document.getElementById('real-news-link');
const soundToggleBtn = document.getElementById('sound-toggle');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');
const popupOverlay = document.getElementById('popup-overlay');
const timerContainer = document.getElementById('timer-container');
const timerDisplay = document.getElementById('timer');
const playAgainButton = document.getElementById('play-again'); //same button to play again and continue
const pointsDisplay = document.getElementById("points");
const gameOverContainer = document.getElementById('game-over-container');
const finalScoreDisplay = document.getElementById('final-score');

const continueButton = document.getElementById('continue-game'); //continue button
const warningOverlay = document.getElementById('warning-overlay');
const acceptWarningButton = document.getElementById('accept-warning');


const creditsButton = document.getElementById('credits-button');
const purposeButton = document.getElementById('purpose-button');
const trustButton = document.getElementById('trust-button');
const tipsButton = document.getElementById('tips-button');
const infoModal = document.getElementById('info-modal');
const modalText = document.getElementById('modal-text');
const closeModal = document.querySelector('.close-modal');

let soundEnabled = true;
let realHeadlineClicked = false;
let timeLeft = 30;
let timerInterval;
let points = 0;
let headlines;
let highScore = localStorage.getItem('highScore') || 0; 


const correctSound = new Audio('correct.mp3'); 
const wrongSound = new Audio('wrong.mp3'); 

acceptWarningButton.addEventListener('click', () => {
    warningOverlay.classList.remove('visible');
    warningOverlay.classList.add('hidden')
});



soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = soundToggleBtn.querySelector('i');
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-volume-mute');
});


function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame("Time's up!");
        }
    }, 1000);
}

function displayHeadlines(data) {
    headlines = data;
    shuffleArray(headlines);

    headlines.forEach(headline => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.textContent = headline.headline;
        newsItem.addEventListener('click', () => checkAnswer(headline, newsItem));
        newsContainer.appendChild(newsItem);
    });
}

function checkAnswer(selectedHeadline, newsItem) {
    if (realHeadlineClicked) return;

    if (selectedHeadline.link !== undefined) {
        clearInterval(timerInterval);
        if (soundEnabled) correctSound.play();
        resultText.textContent = "Correct! You found the real news.";
        points += (timeLeft * 2)+5;
        pointsDisplay.textContent = "Points: " + points ;
        realNewsLink.href = selectedHeadline.link;
        realNewsLink.style.display = 'block';
        showResult();
        realHeadlineClicked = true;


    } else {
        if (soundEnabled) wrongSound.play();

        timeLeft -= 12;
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            endGame("Time's up!")
        }
        timerDisplay.textContent = timeLeft; 
        popup.classList.remove('hidden');
        popupOverlay.classList.add("visible");
        newsItem.classList.add('disabled');
    }
}

function showResult() {
    resultContainer.style.display = 'block';
    newsContainer.style.display = 'none';
    timerContainer.style.display = 'none';
}

function endGame(message) {
    if (message === "Time's up!") {
        gameOverContainer.style.display = 'block'; 
        finalScoreDisplay.textContent = points;     
        newsContainer.style.display = 'none';       
        timerContainer.style.display = 'none';      
        resultContainer.style.display = "none"

    } else {
        resultText.textContent = message;
        resultContainer.style.display = 'block';
        newsContainer.style.display = 'none';
        timerContainer.style.display = 'none';
    }
}


closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupOverlay.classList.remove("visible");
});

popupOverlay.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupOverlay.classList.remove('visible');
});



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

playAgainButton.addEventListener('click', () => {
    gameOverContainer.style.display = 'none';
    realHeadlineClicked = false;
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timerContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    newsContainer.style.display = '';
    realNewsLink.style.display = 'none';

    highScore = Math.max(points, highScore);
    localStorage.setItem('highScore', highScore);

    pointsDisplay.textContent = "Points: 0   High score: " + highScore; 


    points = 0; 

    fetchNewHeadlinesAndStartGame();
});
continueButton.addEventListener('click', () => { 
    realHeadlineClicked = false;
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timerContainer.style.display = 'block'; 
    resultContainer.style.display = 'none';
    newsContainer.style.display = '';
    realNewsLink.style.display = 'none'; 
    localStorage.setItem("highscore", points);
    fetchNewHeadlinesAndStartGame(); 
});
fetchNewHeadlinesAndStartGame();

function fetchNewHeadlinesAndStartGame() {
    fetch('/get_headlines')
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = '';
            displayHeadlines(data);
            startTimer();
            realHeadlineClicked = false;
        })
        .catch(error => {
            console.error("Error fetching headlines:", error);
            resultText.textContent = "Error loading headlines. Please try again later.";
            resultContainer.style.display = 'block';
        });
}



window.addEventListener('load', () => {
    const highScore = localStorage.getItem('highScore') || 0;
    pointsDisplay.textContent = "Points: " + points + "   High score: " + highScore;
});



creditsButton.addEventListener('click', () => showModal("Credits", "Created with ❤️ by Jeffrey!<br> https://github.com/jeffreywangDev"));
purposeButton.addEventListener('click', () => showModal("Purpose", "This game was made to highlight how easily fake news can be mistaken for real news.<br> It's important to develop critical thinking skills and be aware of the potential for misinformation.<br>Press on Trustworthiness to learn more about how to evaluate a website's credibility. <br>Press on Tips & Tricks to learn how to spot fake news."));
trustButton.addEventListener('click', () => showModal("Trustworthiness", "Look for these signs to evaluate a website's trustworthiness: <br> - Check the domain (.gov, .edu are generally reliable).<br> - Look for \"About Us\" sections and author information.<br> - Be wary of sensationalized headlines.<br>- Cross-reference information with multiple sources."));
tipsButton.addEventListener('click', () => showModal("Tips & Tricks", "Consider these tips for spotting fake news:<br>- Read beyond headlines. <br>- Check the source.<br> - Look for unusual formatting or excessive ads.<br> - Be skeptical of information that confirms your biases"));



function showModal(title, content) {
    modalText.innerHTML = `<h3>${title}</h3>${content}`;
    infoModal.style.display = "block";
}


closeModal.addEventListener('click', () => {
    infoModal.style.display = "none";
});


window.addEventListener('click', (event) => {
    if (event.target == infoModal) {
        infoModal.style.display = "none";
    }
});