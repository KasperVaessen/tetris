let speed;
let blocks = [];
let size;
let board = [];
let moveSpace;

function setup() {
    size = 20;
    moveSpace = 5;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for(let j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }
    speed = 1;
    createCanvas(size*40, size*40);
    blocks.push(new LBlock(0, 0, 0, speed));
}

function draw() {
    background(220);
    line(0, moveSpace*40, size*40, moveSpace*40)
    blocks[0].update(frameCount);
    blocks[0].draw();
    for (let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if(board[i][j] != 0) {
                fill(board[i][j]);
                rect(i*40,j*40,40,40);
            }
        }
    }
    if(blocks[0].onEdge()) {
        let number = random();
        if(number < 0.33) {
            blocks.unshift(new RowBlock(0, 0, 0, speed))
        } else if(number < 0.67) {
            blocks.unshift(new SquareBlock(0, 0, 0, speed))
        } else {
            blocks.unshift(new LBlock(0, 0, 0, speed))
        }
        for (let i = 0; i < size; i++) {
            if(checkComplete(i)) {
                console.log(i);
                removeRow(i);
            }
        }
    }

    if(checkGameOver()) {
        fill("red");
        textAlign(CENTER);
        textSize(50);
        text("GAME OVER", size*20, moveSpace*20);
        noLoop();
    }
}

function checkComplete(row) {
    for (let i = 0; i < size; i++) {
        if(board[i][row] == 0) {
            return false;
        }
    }
    return true;
}

function removeRow(row) {
    for (let i = 0; i < size; i++) {
        for (let j = row; j > 1; j--) {
            board[i][j] = board[i][j-1];
        }
    }
}

function checkGameOver() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < moveSpace; j++) {
            if(board[i][j] != 0) {
                return true;
            }
        }
    }
    return false;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        blocks[0].updateX(-1);
    } else if (keyCode === RIGHT_ARROW) {
        blocks[0].updateX(1);
    } else if (keyCode === 32) {
        if(blocks[0].rotation == 270) {
            blocks[0].rotation = 0;
        } else {
            blocks[0].rotation += 90;
        }
    } else if (keyCode === DOWN_ARROW) {
        blocks[0].yPos += 1;
    }
}