const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction.x === 0) {
        direction = { x: -1, y: 0 };
    }
    if (keyPressed === 38 && direction.y === 0) {
        direction = { x: 0, y: -1 };
    }
    if (keyPressed === 39 && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
    if (keyPressed === 40 && direction.y === 0) {
        direction = { x: 0, y: 1 };
    }
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        score += 10;
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // Wrap around the edges of the canvas
    head.x = (head.x + tileCount) % tileCount;
    head.y = (head.y + tileCount) % tileCount;

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Game Over');
            document.location.reload();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

gameLoop();