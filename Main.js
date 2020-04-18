let speed;
let blocks = [];
let size;
let board = [];
let moveSpace;
let score = 0;

function setup() {
    size = 20;
    moveSpace = 5;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for(let j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }
    speed = 2;
    createCanvas(size*40, size*40);
    createRandom();
}

function draw() {
    background(220);
    writeScore();
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
        createRandom();
    }

    if(checkGameOver()) {
        fill("red");
        textAlign(CENTER);
        textSize(50);
        text("GAME OVER", size*20, moveSpace*20);
        noLoop();
    }
}

function createRandom() {
    let number = random();
    let rotationOptions = [0, 90, 180, 270];
    let rotation = random(rotationOptions);
    if(number < 1/7) {
        blocks.unshift(new RowBlock(rotation, floor(size/2)-1, 0, speed))
    } else if(number < 2/7) {
        blocks.unshift(new SquareBlock(rotation, floor(size/2)-1, 0, speed))
    } else if(number < 3/7){
        blocks.unshift(new LBlock(rotation, floor(size/2)-1, 0, speed))
    } else if(number < 4/7){
        blocks.unshift(new ZBlock(rotation, floor(size/2)-1, 0, speed))
    } else if(number < 5/7){
        blocks.unshift(new SBlock(rotation, floor(size/2)-1, 0, speed))
    } else if(number < 6/7){
        blocks.unshift(new JBlock(rotation, floor(size/2)-1, 0, speed))
    } else {
        blocks.unshift(new TBlock(rotation, floor(size/2)-1, 0, speed))
    }
    for (let i = 0; i < size; i++) {
        if(checkComplete(i)) {
            score += size;
            removeRow(i);
        }
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
        if(board[i][moveSpace-1] != 0) {
            return true;
        }
    }
    return false;
}

function writeScore() {
    fill("black");
    textAlign(RIGHT, TOP);
    textSize(20);
    text("Score: " + score, size*40-2, 2);
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