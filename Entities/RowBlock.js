class RowBlock extends Block{
    constructor(rotation, xPos, yPos, speed) {
        super(rotation, xPos, yPos, speed);
        this.color = "cyan";
    }

    draw(blockSize) {
        if(blockSize === undefined) {
            blockSize = 40;
        }
        fill(this.color);

        if(this.rotation % 180 == 0) {
            rect(this.xPos * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect((this.xPos+2) * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect((this.xPos+3) * blockSize, this.yPos * blockSize, blockSize, blockSize);
        } else {
            rect(this.xPos * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect(this.xPos * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect(this.xPos * blockSize, (this.yPos+2) * blockSize, blockSize, blockSize);
            rect(this.xPos * blockSize, (this.yPos+3) * blockSize, blockSize, blockSize);
        }

    }

    onEdge() {
        if(this.rotation % 180 == 0) {
            if(this.yPos >= size-1) {

                return true;
            } else if(board[this.xPos][this.yPos+1] != 0) {

                return true;
            } else if(board[this.xPos+1][this.yPos+1] != 0) {

                return true;
            } else if(board[this.xPos+2][this.yPos+1] != 0) {

                return true;
            } else if(board[this.xPos+3][this.yPos+1] != 0) {

                return true;
            }
        } else {
            if(this.yPos >= size-4) {

                return true;
            } else if(board[this.xPos][this.yPos+4] != 0) {

                return true;
            }
        }
        return false;
    }

    canRotate(newAngle) {
        if(newAngle % 180 == 0) {
            if (board[this.xPos][(this.yPos)] == 0 &&
                board[this.xPos+1][(this.yPos)] == 0 &&
                board[this.xPos+2][(this.yPos)] == 0 &&
                board[(this.xPos+3)][(this.yPos)] == 0) {
                return true;
            }
        } else {
            if (board[this.xPos][this.yPos] == 0 &&
                board[this.xPos][(this.yPos+1)] == 0 &&
                board[(this.xPos)][(this.yPos+2)] == 0 &&
                board[(this.xPos)][(this.yPos+3)] == 0) {
                return true;
            }
        }
    }

    end() {
        this.speed = 0;

        if(this.rotation % 180 == 0) {
            for (let i = 0; i < 4; i++) {
                board[this.xPos+i][this.yPos] = this.color;
            }
        } else {
            for (let i = 0; i < 4; i++) {
                board[this.xPos][this.yPos+i] = this.color;
            }
        }
    }

    updateX(direction) {
        if(direction == 1) {
            if(this.rotation % 180 == 0) {
                if(this.xPos+4 != size && board[this.xPos+4][this.yPos] == 0) {
                    this.xPos += direction;
                }
            } else {
                if(this.xPos+1 != size
                    && board[this.xPos+1][this.yPos] == 0
                    && board[this.xPos+1][this.yPos+1] == 0
                    && board[this.xPos+1][this.yPos+2] == 0
                    && board[this.xPos+1][this.yPos+3] == 0) {
                    this.xPos += direction;
                }
            }
        } else if(direction == -1) {
            if(this.rotation % 180 == 0) {
                if (this.xPos != 0 && board[this.xPos - 1][this.yPos] == 0) {
                    this.xPos += direction;
                }
            } else {
                if (this.xPos != 0
                    && board[this.xPos - 1][this.yPos] == 0
                    && board[this.xPos - 1][this.yPos + 1] == 0
                    && board[this.xPos - 1][this.yPos + 2] == 0
                    && board[this.xPos - 1][this.yPos + 3] == 0) {
                    this.xPos += direction;
                }
            }
        }
    }


}