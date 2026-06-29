const gameSVG = document.getElementById('gameSVG');
const tileCount = 40;
const gridSize = 10;

let snake = [{ x: 20, y: 20 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let score = 0;
let speed = 150;

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
    setTimeout(gameLoop, speed);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        score += 10;
        speed -= 5; // Increase speed
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {
        alert('Game Over');
        document.location.reload();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Game Over');
            document.location.reload();
        }
    }
}

function draw() {
    gameSVG.innerHTML = ''; // Clear canvas

    // Draw snake
    snake.forEach(segment => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', segment.x * gridSize);
        rect.setAttribute('y', segment.y * gridSize);
        rect.setAttribute('width', gridSize - 1);
        rect.setAttribute('height', gridSize - 1);
        rect.classList.add('snake-segment');
        gameSVG.appendChild(rect);
    });

    // Draw food
    const foodRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    foodRect.setAttribute('x', food.x * gridSize);
    foodRect.setAttribute('y', food.y * gridSize);
    foodRect.setAttribute('width', gridSize - 1);
    foodRect.setAttribute('height', gridSize - 1);
    foodRect.classList.add('food');
    gameSVG.appendChild(foodRect);

    // Draw score
    const scoreText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    scoreText.setAttribute('x', 5);
    scoreText.setAttribute('y', 15);
    scoreText.textContent = `Score: ${score}`;
    gameSVG.appendChild(scoreText);
}

gameLoop();