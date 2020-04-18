class SquareBlock extends Block{
    constructor(rotation, xPos, yPos, speed) {
        super(rotation, xPos, yPos, speed);
        this.color = "yellow";
    }

    draw() {
        fill(this.color);

        rect(this.xPos * 40, this.yPos * 40, 40, 40);
        rect((this.xPos+1) * 40, this.yPos * 40, 40, 40);
        rect(this.xPos * 40, (this.yPos+1) * 40, 40, 40);
        rect((this.xPos+1) * 40, (this.yPos+1) * 40, 40, 40);

    }

    onEdge() {
        if(this.yPos >= size-2) {
            this.end();
            return true;
        } else if(board[this.xPos][this.yPos+2] != 0) {
            this.end();
            return true;
        } else if(board[this.xPos+1][this.yPos+2] != 0) {
            this.end();
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