class SBlock extends Block{
    constructor(rotation, xPos, yPos, speed) {
        super(rotation, xPos, yPos, speed);
        this.color = "green";
    }

    draw() {
        fill(this.color);

        if(this.rotation % 180 == 0) {
            rect((this.xPos+1) * 40, this.yPos * 40, 40, 40);
            rect((this.xPos+2) * 40, this.yPos * 40, 40, 40);
            rect((this.xPos) * 40, (this.yPos+1) * 40, 40, 40);
            rect((this.xPos+1) * 40, (this.yPos+1) * 40, 40, 40);
        } else {
            rect(this.xPos * 40, (this.yPos) * 40, 40, 40);
            rect(this.xPos * 40, (this.yPos+1) * 40, 40, 40);
            rect((this.xPos+1) * 40, (this.yPos+1) * 40, 40, 40);
            rect((this.xPos+1) * 40, (this.yPos+2) * 40, 40, 40);
        }

    }

    onEdge() {
        if(this.rotation % 180 == 0) {
            if(this.yPos+1 >= size-1) {
                this.end();
                return true;
            } else if(board[this.xPos][this.yPos+2] != 0) {
                this.end();
                return true;
            } else if(board[this.xPos+1][this.yPos+2] != 0) {
                this.end();
                return true;
            } else if(board[this.xPos+2][this.yPos+1] != 0) {
                this.end();
                return true;
            }
        } else {
            if(this.yPos+2 >= size-1) {
                this.end();
                return true;
            } else if(board[this.xPos][this.yPos+2] != 0) {
                this.end();
                return true;
            } else if(board[this.xPos+1][this.yPos+3] != 0) {
                this.end();
                return true;
            }
        }
        return false;
    }

    end() {
        this.speed = 0;

        if(this.rotation % 180 == 0) {
            for (let i = 0; i < 2; i++) {
                board[this.xPos+i][this.yPos+1] = this.color;
            }
            for (let i = 1; i < 3; i++) {
                board[this.xPos+i][this.yPos] = this.color;
            }
        } else {
            for (let i = 1; i < 3; i++) {
                board[this.xPos+1][this.yPos+i] = this.color;
            }
            for (let i = 0; i < 2; i++) {
                board[this.xPos][this.yPos+i] = this.color;
            }
        }
    }

    updateX(direction) {
        if(direction == 1) {
            if(this.rotation % 180 == 0) {
                if(this.xPos+3 != size
                    && board[this.xPos+3][this.yPos] == 0
                    && board[this.xPos+2][this.yPos+1] == 0) {
                    this.xPos += direction;
                }
            } else {
                if(this.xPos+1 != size
                    && board[this.xPos+1][this.yPos] == 0
                    && board[this.xPos+2][this.yPos+1] == 0
                    && board[this.xPos+2][this.yPos+2] == 0) {
                    this.xPos += direction;
                }
            }
        } else if(direction == -1) {
            if(this.rotation % 180 == 0) {
                if (this.xPos != 0
                    && board[this.xPos][this.yPos] == 0
                    && board[this.xPos-1][this.yPos+1] == 0) {
                    this.xPos += direction;
                }
            } else {
                if (this.xPos != 0
                    && board[this.xPos -1][this.yPos] == 0
                    && board[this.xPos - 1][this.yPos + 1] == 0
                    && board[this.xPos][this.yPos + 2] == 0) {
                    this.xPos += direction;
                }
            }
        }
    }


}