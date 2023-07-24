// Countdown Timer

const inTime = document.getElementById("countTime");
const initialTime = parseInt(inTime.innerHTML);
let timeLeft = initialTime;
let timerId = null;

function start() {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    timeLeft -= 1;
    inTime.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      inTime.innerHTML = "Time out!!!!";
    }
  }, 1000);
}

function reset() {
  if (timerId) {
    clearInterval(timerId);
  }

  timeLeft = initialTime;
  inTime.innerHTML = timeLeft;
}

// Player Tracker

let playersArr = [];

function addPlayer() {
  const inputStr = document.getElementById("inputStr");
  const userName = inputStr.value.trim();
  inputStr.value = "";

  if (!userName) {
    alert("Vui lòng nhập tên người chơi!");
    return;
  }

  const playerInfo = {
    name: userName,
    point: 0,
    userID: createID(),
  };

  playersArr.push(playerInfo);
  localStorage.setItem("players", JSON.stringify(playersArr));
  renderPlayers();
}

function createID() {
  return Math.random().toString(36).substr(2, 9);
}

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
          <span class="material-symbols-outlined" id="delete" onclick="remove('${playersArr[i].userID}')">
            close
          </span>
          <i class="fa-solid fa-crown"></i>
          <p id="playerName">${playersArr[i].name}</p>
        </div>
        <div class="row-right">
          <span class="material-symbols-outlined" id="up" onclick="downPoints('${playersArr[i].userID}')">
            remove
          </span>
          <span id="personPoints">${playersArr[i].point}</span>
          <span class="material-symbols-outlined" id="down" onclick="upPoints('${playersArr[i].userID}')">
            add
          </span>
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

function savePlayers() {
  localStorage.setItem("players", JSON.stringify(playersArr));
}

function remove(playerID) {
  for (let i = 0; i < playersArr.length; i++) {
    if (playersArr[i].userID === playerID) {
      playersArr.splice(i, 1);
    }
  }
  savePlayers();
  renderPlayers();
}

function upPoints(playerID) {
  for (let i = 0; i < playersArr.length; i++) {
    if (playersArr[i].userID === playerID) {
      playersArr[i].point++;
    }
  }
  savePlayers();
  renderPlayers();
}

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

function getPlayers() {
  const retrievedPlayers = localStorage.getItem("players");
  if (retrievedPlayers !== null) {
    playersArr = JSON.parse(retrievedPlayers);
    renderPlayers();
  }
}

window.onload = getPlayers();
