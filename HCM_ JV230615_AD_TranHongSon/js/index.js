let intervalTime;

function uuid() {
    return Math.floor(Math.random() * 9999999999999) + new Date().getMilliseconds()
}

function decreaseTime() {
    let time = +document.getElementById("time").innerHTML;
    while (time == 0) {
        return;
    }
    time--;
    document.getElementById("time").innerHTML = time;
}

function start() {
    document.getElementById("start").setAttribute("disabled", "");
    intervalTime = setInterval(decreaseTime, 100);
}

function resetTime() {
    document.getElementById("start").removeAttribute("disabled", "");
    clearInterval(intervalTime)
    document.getElementById("time").innerHTML = 60;
}

//mảng rỗng
let listPlayers = JSON.parse(localStorage.getItem("players")) ?? [];

function addPlayer() {
    let score = 0;
    let name = document.getElementById("name").value;
    let list = {
        namePlayer: name,
        scorePlayer: score,
        idPlayer: uuid(),
    };

    if (name == "") {
        warning("Vui lòng nhập tên người chơi");
        return;
    }
    for (let i = 0; i < listPlayers.length; i++) {
        if (listPlayers[i].namePlayer == name) {
            warning("Không được nhập trùng tên người chơi!")
            return;
        }

    }
    listPlayers.push(list);
    document.getElementById("name").value = "";
    localStorage.setItem("players", JSON.stringify(listPlayers));
    render(listPlayers);
}

function render(list) {
    let players = "";
    let totalPoints = 0;

    for (let i = 0; i < list.length; i++) {
        players +=
        `
            <div class="container__item">
                <i class="fa-solid fa-xmark remove" onclick="removePlayer(${list[i].idPlayer})"></i>
                <i class="fa-solid fa-crown"></i>
                <div class="container__item--name">${list[i].namePlayer}</div>
                <div class="container__item--score">
                    <i class="fa-solid fa-minus" onclick="minusScore(${list[i].scorePlayer}, ${list[i].idPlayer})"></i>
                    <span id="score">${list[i].scorePlayer}</span>
                    <i class="fa-solid fa-plus" onclick="plusScore(${list[i].scorePlayer}, ${list[i].idPlayer})"></i>
                </div>
            </div>
        `;
        totalPoints += list[i].scorePlayer;
        listPlayers.sort((a, b) => b.scorePlayer - a.scorePlayer);
       
    }


        
    document.getElementById("display").innerHTML = players;
    document.getElementById("playerQuantity").innerHTML = list.length;
    document.getElementById("totalPoints").innerHTML = totalPoints;
}

render(listPlayers);

function minusScore(score, id) {
    score--;
    //Điểm cuối là 0
    // if (score == -1) {
    //     return;
    // }
    for (let i = 0; i < listPlayers.length; i++) {
        if (id == listPlayers[i].idPlayer) {
            listPlayers[i].scorePlayer = score;
        }
    }
    localStorage.setItem("players", JSON.stringify(listPlayers));
    sortScore();
}

function plusScore(score, id) {
    score++;
    for (let i = 0; i < listPlayers.length; i++) {
        if (id == listPlayers[i].idPlayer) {
            listPlayers[i].scorePlayer = score;
        }
    }
    localStorage.setItem("players", JSON.stringify(listPlayers));
    sortScore();
}

function removePlayer(id) {
    for (let i = 0; i < listPlayers.length; i++) {
        if (listPlayers[i].idPlayer == id) {
            listPlayers.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("players", JSON.stringify(listPlayers));
    render(listPlayers);
}

function sortScore() {
    for (let i = 0; i < listPlayers.length; i++) {
        listPlayers.sort((a, b) => b.scorePlayer - a.scorePlayer);

    }
    render(listPlayers);
}