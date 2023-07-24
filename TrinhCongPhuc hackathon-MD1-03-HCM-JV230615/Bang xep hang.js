(() => {
    let players = [];
    const bodyContainer = document.querySelector('.bodyContainer');
    const input = document.querySelector('input[type="text"]');
    const addButton = document.querySelector('.add-button');

    // Gọi hàm để khởi tạo danh sách người chơi từ localStorage
    loadPlayersFromLocalStorage();

    function loadPlayersFromLocalStorage() {
        const savedPlayers = localStorage.getItem('players');
        if (savedPlayers) {
            players = JSON.parse(savedPlayers);
            updatePlayerList();
        }
    }

    // Sự kiện khi click vào nút thêm người chơi
    addButton.addEventListener('click', themNguoiChoi);

    // Hàm load và render danh sách người chơi từ local storage
    function loadAndRenderPlayers() {
        const savedPlayers = localStorage.getItem('players');
        if (savedPlayers) {
            players = JSON.parse(savedPlayers);
            updatePlayerList();
        }
    }

    // Gọi hàm để load và render danh sách người chơi ngay khi trang được tải lại
    loadAndRenderPlayers();

    function demSoNguoiChoi() {
        const totalPlayers = players.length;
        const countContainer = document.querySelector('.headerContainer > div:first-child > div:first-child');
        countContainer.textContent = `Players: ${totalPlayers}`;
    }

    function tinhTongDiem() {
        let totalPoints = 0;
        for (let i = 0; i < players.length; i++) {
            totalPoints += players[i].points;
        }

        const countContainer = document.querySelector('.headerContainer > div:first-child > div:last-child');
        countContainer.textContent = `Total points: ${totalPoints}`;
    }

    function batDauDemThoiGian() {
        const seconds = parseInt(prompt("Nhập số giây:"));

        if (!isNaN(seconds) && seconds > 0) {
            const countdownElement = document.querySelector('.countdown');
            countdownElement.textContent = seconds;

            const countdownInterval = setInterval(() => {
                const secondsRemaining = parseInt(countdownElement.textContent);

                if (secondsRemaining === 0) {
                    clearInterval(countdownInterval);
                    // alert('Hết giờ!');
                } else {
                    countdownElement.textContent = secondsRemaining - 1;
                }
            }, 1000);
        } else {
            alert('Số giây không hợp lệ!');
        }
    }

    const stopButton = document.querySelector('.stop-button');
    stopButton.addEventListener('click', dungDemThoiGian);

    let countdownInterval;

    function dungDemThoiGian() {
        const countdownElement = document.querySelector('.countdown');
        countdownElement.textContent = '0'; // Đặt giá trị countdown về mặc định

        clearInterval(countdownInterval); // Xóa interval để dừng thời gian đếm ngược
    }

    function themNguoiChoi() {
        const playerName = input.value.trim();

        if (playerName !== '') {
            // Tạo một đối tượng mới đại diện cho người chơi
            const newPlayer = {
                name: playerName,
                points: 0,
            };

            // Thêm người chơi vào danh sách người chơi
            players.push(newPlayer);

            // Lưu danh sách người chơi mới vào localStorage
            savePlayersToLocalStorage();

            // Render thông tin người chơi mới
            renderPlayer(newPlayer);

            input.value = '';
            demSoNguoiChoi();
            tinhTongDiem();
        }
    }

    function savePlayersToLocalStorage() {
        localStorage.setItem('players', JSON.stringify(players));
    }

    function increasePoints(event) {
        const playerElement = event.target.closest('.player');
        const playerIndex = Array.from(bodyContainer.children).indexOf(playerElement);
        if (playerIndex !== -1) {
            players[playerIndex].points += 1;
            savePlayersToLocalStorage();
            updatePlayerList();
            tinhTongDiem();
        }
    }

    function decreasePoints(event) {
        const playerElement = event.target.closest('.player');
        const playerIndex = Array.from(bodyContainer.children).indexOf(playerElement);
        if (playerIndex !== -1 && players[playerIndex].points > 0) {
            players[playerIndex].points -= 1;
            savePlayersToLocalStorage();
            updatePlayerList();
            tinhTongDiem();
        }
    }

    function removePlayer(event) {
        const playerElement = event.target.closest('.player');
        const playerIndex = Array.from(bodyContainer.children).indexOf(playerElement);
        if (playerIndex !== -1) {
            players.splice(playerIndex, 1);
            savePlayersToLocalStorage();
            updatePlayerList();
            demSoNguoiChoi();
            tinhTongDiem();
        }
    }

    function renderPlayer(player) {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');

        playerElement.innerHTML = `
            <div class="row-player">
                <i class="fa-solid fa-xmark fa-lg remove-button"></i>
                <div class="player-name">${player.name}</div>
                <div class="player-points">
                    <button class="decrease-button">-</button>
                    <span class="points">${player.points}</span>
                    <button class="increase-button">+</button>
                </div>
            </div>
        `;

        bodyContainer.appendChild(playerElement);

        const increaseButton = playerElement.querySelector('.increase-button');
        increaseButton.addEventListener('click', increasePoints);

        const decreaseButton = playerElement.querySelector('.decrease-button');
        decreaseButton.addEventListener('click', decreasePoints);

        const removeButton = playerElement.querySelector('.remove-button');
        removeButton.addEventListener('click', removePlayer);
    }

    function updatePlayerList() {
        bodyContainer.innerHTML = '';
        for (let i = 0; i < players.length; i++) {
            renderPlayer(players[i]);
        }
    }

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', batDauDemThoiGian);

    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', () => {
        bodyContainer.innerHTML = '';
        players = [];
        demSoNguoiChoi();
        tinhTongDiem();
        savePlayersToLocalStorage();
    });
    function updatePlayerList() {
    // Sắp xếp danh sách người chơi giảm dần theo số điểm
    players.sort((a, b) => b.points - a.points);

    bodyContainer.innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        renderPlayer(players[i]);
    }
}
function updatePlayerList() {
    // Sắp xếp danh sách người chơi giảm dần theo số điểm
    players.sort((a, b) => b.points - a.points);

    bodyContainer.innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        renderPlayer(players[i]);
    }
}
})();