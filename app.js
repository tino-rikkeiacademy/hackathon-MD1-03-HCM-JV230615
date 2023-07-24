// Get object div couting game
const inTime = document.getElementById("countTime");

// Set time remaining in seconds
const initialTime = parseInt(inTime.innerHTML);
let timeLeft = initialTime;

// Variable to hold the ID of the function
let timerId = null;

// Start the countdown timer
function start() {
    // Stop the countdown timer if it was started before
    if (timerId) {
        clearInterval(timerId);
    }

    // Update coundown time every second
    timerId = setInterval(() => {
        timeLeft -= 1;
        inTime.innerHTML = timeLeft;

        // Stop the countdown timer when the time is up
        if (timeLeft <= 0) {
            clearInterval(timerId);
            inTime.innerHTML = "Time out!!!!";
        }
    }, 1000);
}

// Countdown timer reset function
function reset() {
    // Stop the countdown timer if it was started before
    if (timerId) {
        clearInterval(timerId);
    }

    // Reset countdown time
    timeLeft = initialTime;
    inTime.innerHTML = timeLeft;
}

let playersArr = [];

// Add players to the scoreboard
function addPlayer() {
    // Get player name data
    const inputStr = document.getElementById("inputStr");
    const userName = inputStr.value.trim();
    inputStr.value = "";

    if (!userName) {
        alert("Vui lòng nhập tên người chơi!");
        return;
    }

    // Intialize object to hold date for player
    const playerInfo = {
        name: userName,
        point: 0,
        userID: createID(),
    };

    // Add players to the list
    playersArr.push(playerInfo);

    // Save player list to Local Storage
    localStorage.setItem("players", JSON.stringify(playersArr));

    // Re-render the list of players
    renderPlayers();
}

// Random ID generator function for players
function createID() {
    return Math.random().toString(36).substr(2, 9);
}

// The function renders the list of players to HTML
function renderPlayers() {
    let sumPlayer = 0;
    let sumPoint = 0;
    let outputPlayers = document.getElementById("countPlayer");
    let outputPoint = document.getElementById("totalPoints");
    const rowContainer = document.getElementById("content");
    let playerElements = "";
    playersArr.sort((a, b) => b.point - a.point);
    for (let i = 0; i < playersArr.length; i++) {
        playerElements += `
        <div id="content__row">
            <div class="row-left">
                        <i
                            class="fa-solid fa-ban"
                            id="delete"
                            onclick="remove('${playersArr[i].userID}')"
                        ></i>
                        <i class="fa-regular fa-chess-king"></i>
                        <p id="playerName">${playersArr[i].name}</p>
            </div>
            <div class="row-right">
                        <i
                            class="fa-regular fa-thumbs-down"
                            id="up"
                            onclick="downPoints('${playersArr[i].userID}')"
                        ></i>
                        <span id="personPoints">${playersArr[i].point}</span>
                        <i
                            class="fa-regular fa-thumbs-up"
                            id="down"
                            onclick="upPoints('${playersArr[i].userID}')"
                        ></i>
            </div>
        </div>
        <br>
    `;
        sumPoint += playersArr[i].point;
        sumPlayer += 1;
    }
    rowContainer.innerHTML = playerElements;
    outputPlayers.innerHTML = sumPlayer;
    outputPoint.innerHTML = sumPoint;
}

// Save player date to local Storage
function savePlayers() {
    localStorage.setItem("players", JSON.stringify(playersArr));
}

// Remove player from list
function remove(playerID) {
    for (let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].userID === playerID) {
            playersArr.splice(i, 1);
        }
    }
    savePlayers();
    renderPlayers();
}

// Extra points for players
function upPoints(playerID) {
    for (let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].userID === playerID) {
            playersArr[i].point++;
        }
    }
    savePlayers();
    renderPlayers();
}

// Deduct poins for players
function downPoints(playerID) {
    for (let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].userID === playerID) {
            if (playersArr[i].point > 0) {
                playersArr[i].point--;
            }
        }
    }
    savePlayers();
    renderPlayers();
}
// Get data from local storage
function getPlayers() {
    const retrievedPlayers = localStorage.getItem("players");
    if (retrievedPlayers !== null) {
        playersArr = JSON.parse(retrievedPlayers);
        renderPlayers();
    }
}
// Re-render local storage data
window.onload = getPlayers();
