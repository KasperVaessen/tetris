let speed;
let blocks = [];
let size;
let board = [];

function setup() {
    size = 15;
    for (let i = 0; i < size; i++) {
        board[i] = [];
    }
    speed = 1;
    createCanvas(size*40, size*40);
    blocks.push(new LBlock(0, 0, 0, speed));
}

function draw() {
    background(220);
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].update(frameCount);
        blocks[i].draw();
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

    }
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