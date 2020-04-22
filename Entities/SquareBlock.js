class SquareBlock extends Block{
    constructor(rotation, xPos, yPos, speed) {
        super(rotation, xPos, yPos, speed);
        this.color = "yellow";
    }

    draw(blockSize) {
        if(blockSize === undefined) {
            blockSize = 40;
        }
        fill(this.color);

        rect(this.xPos * blockSize, this.yPos * blockSize, blockSize, blockSize);
        rect((this.xPos+1) * blockSize, this.yPos * blockSize, blockSize, blockSize);
        rect(this.xPos * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
        rect((this.xPos+1) * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);

    }

    onEdge() {
        if(this.yPos >= size-2) {

            return true;
        } else if(board[this.xPos][this.yPos+2] != 0) {

            return true;
        } else if(board[this.xPos+1][this.yPos+2] != 0) {

            return true;
        }

        return false;
    }

    end() {
        this.speed = 0;
        for (let i = 0; i < 2; i++) {
            for(let j = 0; j < 2; j++) {
                board[this.xPos+i][this.yPos+j] = this.color;
            }
        }

    }

    updateX(direction) {
        if(direction == 1) {
            if(this.xPos+2 != size && board[this.xPos+2][this.yPos] == 0 && board[this.xPos+2][this.yPos+1] == 0) {
                this.xPos += direction;
            }
        } else if(direction == -1) {
            if(this.xPos != 0 && board[this.xPos-1][this.yPos] == 0 && board[this.xPos-1][this.yPos+1] == 0) {
                this.xPos += direction;
            }
        }
    }


}