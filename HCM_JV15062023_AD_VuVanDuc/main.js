var time = document.getElementById("time");
var second = 60;
var data = JSON.parse(localStorage.getItem("userData")) ?? [];

function checkName (name) {
    let isCheck = Number(name) || Number(name) == 0
    if (!isCheck) {
       return true;
    }else {
        return false;
    }
}


function uuid() {
    var id = Math.floor(Math.random()*999999);
    return id;
}

function Person (name) {
    this.id = uuid();
    this.name = name;
    this.score = 0 ;
}

function render(data) {
    var table = document.getElementById("table");
    var totalPoint = 0;
    var text = '';
    data.sort((a,b) => b.score - a.score)    

    for (let i = 0; i < data.length; i++) {
        text += 
        `<tr>
            <td>
                <span class="icon-wrapper">
                    <i class="fa-solid fa-xmark icon icon-remove" onclick="deletePerson(${data[i].id})"></i>
                    <i class="fa-solid fa-crown icon"></i>
                </span>
                <label>
                    ${data[i].name}
                </label>
            </td>
            <td class="calculation-col">
                <div class="calculation">   
                    <span class="sign" onclick="minus(${data[i].id})">-</span>
                    <span class="score">${data[i].score}</span>
                    <span class="sign" onclick="plus(${data[i].id})">+</span>
                </div>
            
            </td>
        </tr>`
        totalPoint += Number(data[i].score);
    }
    
    table.innerHTML = text;
    document.getElementById('total').innerHTML = data.length;
    document.getElementById('totalPoint').innerHTML = totalPoint;
}

render(data);

function addPerson () {
    var name = document.getElementById('name').value;
    console.log(data == []);
    if (checkName(name)) {
        var person = new Person(name);
        data.push(person);
        localStorage.setItem("userData", JSON.stringify(data));
        document.getElementById('name').value = '';
        render(data);
    }else {
        alert("Nhập sai! Vui lòng nhập đúng tên, không được nhập số")
    }
}

function deletePerson (id) {
    for (let i =0 ; i < data.length; i++) {
        if (data[i].id == id) {
            data.splice(i,1)
        }
    }
    localStorage.setItem("userData", JSON.stringify(data));
    render(data);
}

function plus(id) {
    for (let i =0 ; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].score +=1
        }
    }
    
    localStorage.setItem("userData", JSON.stringify(data));
    render(data);
}



function minus(id) {
    for (let i =0 ; i < data.length; i++) {
        if (data[i].id == id) {
            if(data[i].score == 0){
                data[i].score = 0
            }else {
                data[i].score -=1
            }
        }
    }
    
    localStorage.setItem("userData", JSON.stringify(data));
    render(data)
}

function myTime () {
    if (second == 0) {
        time.innerHTML = 0;
    }else {
        time.innerHTML = second--
    }
}


let muInterVal = '';
  
function start () {
    let second = 60;
    muInterVal = setInterval(function() {
        if (second == 0) {
            time.innerHTML = 0;
        }else {
            time.innerHTML = second--
        }  
    }, 500);
}

function reset () {
    clearInterval(muInterVal);
    time.innerHTML = 0;    
}

document.getElementById("name").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        addPerson();
        document.getElementById("name").value = '';
    }
})
