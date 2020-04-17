class RowBlock extends Block{
    constructor(rotation, xPos, yPos, speed) {
        super(rotation, xPos, yPos, speed);
        this.color = "blue";
    }

    draw() {
        fill(this.color);

        if(this.rotation % 180 == 0) {
            rect(this.xPos * 40, this.yPos * 40, 40, 40);
            rect((this.xPos+1) * 40, this.yPos * 40, 40, 40);
            rect((this.xPos+2) * 40, this.yPos * 40, 40, 40);
            rect((this.xPos+3) * 40, this.yPos * 40, 40, 40);
        } else {
            rect(this.xPos * 40, this.yPos * 40, 40, 40);
            rect(this.xPos * 40, (this.yPos+1) * 40, 40, 40);
            rect(this.xPos * 40, (this.yPos+2) * 40, 40, 40);
            rect(this.xPos * 40, (this.yPos+3) * 40, 40, 40);
        }

    }

    onEdge() {
        if(this.rotation % 180 == 0) {
            if(this.yPos >= size-1) {
                this.end();
                return true;
            } else if(board[this.xPos][this.yPos+1] != 0) {
                this.end();
                return true;
            } else if(board[this.xPos+1][this.yPos+1] != 0) {
                this.end();
                return true;
            } else if(board[this.xPos+2][this.yPos+1] != 0) {
                this.end();
                return true;
            } else if(board[this.xPos+3][this.yPos+1] != 0) {
                this.end();
                return true;
            }
        } else {
            if(this.yPos >= size-4) {
                this.end();
                return true;
            } else if(board[this.xPos][this.yPos+4] != 0) {
                this.end();
                return true;
            }
        }
        return false;
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
                if(this.xPos+4 != size && board[this.xPos+4][this.yPos] != 1) {
                    this.xPos += direction;
                }
            } else {
                if(this.xPos+1 != size
                    && board[this.xPos+1][this.yPos] != 1
                    && board[this.xPos+1][this.yPos+1] != 1
                    && board[this.xPos+1][this.yPos+2] != 1
                    && board[this.xPos+1][this.yPos+3] != 1) {
                    this.xPos += direction;
                }
            }
        } else if(direction == -1) {
            if(this.xPos != 0
                && board[this.xPos-1][this.yPos] != 1
                && board[this.xPos-1][this.yPos+1] != 1
                && board[this.xPos-1][this.yPos+2] != 1
                && board[this.xPos-1][this.yPos+3] != 1) {
                this.xPos += direction;
            }
        }
    }


}