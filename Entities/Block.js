class Block {
    constructor(rotation, xPos, yPos, speed) {
        this.rotation = rotation;
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
    }

    update(frameRate) {
        if(frameRate % (60/this.speed) == 0) {
            this.yPos += 1;
        }
    }

    draw(blockSize) {
        if(blockSize === undefined) {
            blockSize = 40;
        }
        rect(this.xPos * blockSize, this.yPos * blockSize, blockSize, blockSize);
    }

    updateX(direction) {
        this.xPos += direction;
    }
}