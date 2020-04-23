let speed;
let blocks = [];
let size;
let board = [];
let moveSpace;
let score = 0;
let next;

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
    blocks.unshift(createRandom());
    next = createRandom();
}

function draw() {
    background(220);
    writeScore();
    drawNext();
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
        blocks[0].speed = 0;
        if(frameCount % 60/speed === 0) {
            blocks[0].end();
            blocks.unshift(next);
            next = createRandom();
            for (let i = 0; i < size; i++) {
                if(checkComplete(i)) {
                    score += size;
                    removeRow(i);
                }
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

function createRandom() {
    let number = random();
    let rotationOptions = [0, 90, 180, 270];
    let rotation = random(rotationOptions);
    if(number < 1/7) {
        return new RowBlock(rotation, floor(size/2)-1, 0, speed)
    } else if(number < 2/7) {
        return new SquareBlock(rotation, floor(size/2)-1, 0, speed)
    } else if(number < 3/7){
        return new LBlock(rotation, floor(size/2)-1, 0, speed)
    } else if(number < 4/7){
        return new ZBlock(rotation, floor(size/2)-1, 0, speed)
    } else if(number < 5/7){
        return new SBlock(rotation, floor(size/2)-1, 0, speed)
    } else if(number < 6/7){
        return new JBlock(rotation, floor(size/2)-1, 0, speed)
    } else {
        return new TBlock(rotation, floor(size/2)-1, 0, speed)
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

function drawNext() {
    fill("black");
    textAlign(RIGHT, TOP);
    textSize(20);
    text("Next block: ", size*40-2, 32);

    push();
    translate((size-5)*40, 60);
    next.draw(15);
    pop();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        blocks[0].updateX(-1);
    } else if (keyCode === RIGHT_ARROW) {
        blocks[0].updateX(1);
    } else if (keyCode === 32) {
        if(blocks[0].rotation == 270 && blocks[0].canRotate(0)) {
            blocks[0].rotation = 0;
        } else if(blocks[0].canRotate(blocks[0].rotation + 90)){
            blocks[0].rotation += 90;
        }
    } else if (keyCode === DOWN_ARROW) {
        if(!blocks[0].onEdge()) {
            blocks[0].yPos += 1;
        }
    }
}