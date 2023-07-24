// Thư viện hàm
function creatId () {
    return Math.floor(Math.random() * 9999999999999) + new Date().getMilliseconds();
}











// Chạy chương trình
let listPlayers = JSON.parse(localStorage.getItem("listPlayers")) || [];
renderPlayers()

function add(){
    let playerName = document.getElementById("inputName").value ;
    document.getElementById("inputName").value = "";

    if(!playerName){
        alert("Mời nhập lại tên");
        return;
    }

    let playerInfor = {
        name: playerName,
        id: creatId(),
        point: 0
    }

    listPlayers.push(playerInfor);
    localStorage.setItem("listPlayers",JSON.stringify(listPlayers));
    renderPlayers();
}


// Hàm render
function renderPlayers() {  
    let element = "";
    let count = 0;
    let sum = 0;

    listPlayers.sort((a,b)=>{return b.point - a.point});

    for (let i = 0; i < listPlayers.length; i++) {
        count++;
        sum += listPlayers[i].point;
        
        element +=
        ` 
        <div class="content">
                <div id="content-left">
                    <button onclick="remove('${listPlayers[i].id}')">X</button>
                    <p>${listPlayers[i].name}</p>
                 </div>
         
                 <div id="content-right">
                     <button onclick="decrease('${listPlayers[i].id}')">-</button>
                     <span id="point">${listPlayers[i].point}</span>
                     <button onclick="increase('${listPlayers[i].id}')">+</button>
                </div>
        </div>
        `

    }
    document.getElementById("container-middle").innerHTML = element

    document.getElementById("quantityPlayers").innerHTML = count;
    document.getElementById("totalPoints").innerHTML= sum;
}


// Hàm remove
function remove(playerId){
    for(let i = 0; i < listPlayers.length; i++ ){

        if (listPlayers[i].id == playerId ){
            listPlayers.splice(i,1);
        }
    }
    localStorage.setItem("listPlayers",JSON.stringify(listPlayers));
    renderPlayers();
}


// Hàm increase
function increase(playerId){
    for(let i = 0; i < listPlayers.length; i++ ){

        if (listPlayers[i].id == playerId ){
            listPlayers[i].point++;
        }
    }
    localStorage.setItem("listPlayers",JSON.stringify(listPlayers));
    renderPlayers();
}


// Hàm increase
function decrease(playerId){
    for(let i = 0; i < listPlayers.length; i++ ){

        if (listPlayers[i].id == playerId){
            if (listPlayers[i].point > 0){
                listPlayers[i].point--;
            }
        }
    }
    localStorage.setItem("listPlayers",JSON.stringify(listPlayers));
    renderPlayers();
}


//Hàm đếm ngược
let time = 60;
let flag = false;

function start(){ 

    if (time == -1){
        alert('Hết giờ');
        return document.getElementById("time").innerHTML = 0;
    }

    timeout = setTimeout(function(){
        time--;
        document.getElementById("time").innerHTML = time;
        start();
    }, 1000);
  
}

// Hàm reset thời gian
function reset(){
    clearTimeout(timeout);
    document.getElementById("time").innerHTML = 60;
}



