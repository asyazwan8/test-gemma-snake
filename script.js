const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 30,
    height: 40,
    speed: 5,
    img: new Image()
};

player.img.src = 'mario.png';

function drawPlayer() {
    ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();

    if (keys['ArrowRight']) {
        player.x += player.speed;
    }
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
    }

    requestAnimationFrame(update);
}

const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
});

update();