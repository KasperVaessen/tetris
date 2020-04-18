class Block {
    constructor(rotation, xPos, yPos, speed) {
        this.rotation = rotation;
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
    }

    update(frameRate) {
        if(frameRate % (60/speed) == 0) {
            this.yPos += 1;
        }
    }

    draw() {
        rect(this.xPos * 40, this.yPos * 40, 40, 40);
    }

    updateX(direction) {
        this.xPos += direction;
    }
}