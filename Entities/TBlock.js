class TBlock extends Block{
    constructor(rotation, xPos, yPos, speed) {
        super(rotation, xPos, yPos, speed);
        this.color = "purple";
    }

    draw(blockSize) {
        if(blockSize === undefined) {
            blockSize = 40;
        }
        fill(this.color);

        if(this.rotation == 0) {
            rect(this.xPos * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect(this.xPos * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect(this.xPos * blockSize, (this.yPos+2) * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
        } else if(this.rotation == 90) {
            rect(this.xPos * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, (this.yPos) * blockSize, blockSize, blockSize);
            rect((this.xPos+2) * blockSize, (this.yPos) * blockSize, blockSize, blockSize);
        } else if(this.rotation == 180) {
            rect(this.xPos * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, this.yPos * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, (this.yPos+2) * blockSize, blockSize, blockSize);
        } else if(this.rotation == 270) {
            rect(this.xPos * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect((this.xPos+2) * blockSize, (this.yPos+1) * blockSize, blockSize, blockSize);
            rect((this.xPos+1) * blockSize, this.yPos * blockSize, blockSize, blockSize);
        }

    }

    onEdge() {
        if(this.rotation == 0) {
            if(this.yPos+2 >= size-1) {

                return true;
            } else if(board[this.xPos][this.yPos+3] != 0) {

                return true;
            } else if(board[this.xPos+1][this.yPos+2] != 0) {

                return true;
            }
        } else if(this.rotation == 90) {
            if(this.yPos+1 >= size-1) {

                return true;
            } else if(board[this.xPos][this.yPos+1] != 0) {

                return true;
            } else if(board[this.xPos+1][this.yPos+2] != 0) {

                return true;
            } else if(board[this.xPos+2][this.yPos+1] != 0) {

                return true;
            }
        }  else if(this.rotation == 180) {
            if(this.yPos+2 >= size-1) {

                return true;
            } else if(board[this.xPos][this.yPos+2] != 0) {

                return true;
            } else if(board[this.xPos+1][this.yPos+3] != 0) {

                return true;
            }
        }  else if(this.rotation == 270) {
            if(this.yPos+1 >= size-1) {

                return true;
            } else if(board[this.xPos][this.yPos+2] != 0) {

                return true;
            } else if(board[this.xPos+1][this.yPos+2] != 0) {

                return true;
            } else if(board[this.xPos+2][this.yPos+2] != 0) {

                return true;
            }
        }
        return false;
    }

    canRotate(newAngle) {
        if(newAngle == 0) {
            if (board[this.xPos][(this.yPos)] == 0 &&
                board[this.xPos][(this.yPos+1)] == 0 &&
                board[this.xPos][(this.yPos+2)] == 0 &&
                board[(this.xPos+1)][(this.yPos+1)] == 0) {
                return true;
            }
        } else if(newAngle == 90) {
            if (board[this.xPos][this.yPos] == 0 &&
                board[this.xPos+1][(this.yPos+1)] == 0 &&
                board[(this.xPos+1)][(this.yPos)] == 0 &&
                board[(this.xPos+2)][(this.yPos)] == 0) {
                return true;
            }
        } else if(newAngle == 180) {
            if (board[(this.xPos)][this.yPos+1] == 0 &&
                board[(this.xPos+1)][this.yPos] == 0 &&
                board[(this.xPos+1)][(this.yPos+1)] == 0 &&
                board[(this.xPos+1)][(this.yPos+2)] == 0) {
                return true;
            }
        } else if(newAngle == 270) {
            if(board[this.xPos][(this.yPos+1)] == 0 &&
                board[(this.xPos+1)][(this.yPos+1)] == 0 &&
                board[(this.xPos+2)][(this.yPos+1)] == 0 &&
                board[(this.xPos+1)][(this.yPos)] == 0) {
                return true;
            }
        }
    }

    end() {
        this.speed = 0;

        if(this.rotation == 0) {
            for (let i = 0; i < 3; i++) {
                board[this.xPos][this.yPos+i] = this.color;
            }
            board[this.xPos+1][this.yPos+1] = this.color;
        } else if(this.rotation == 90) {
            for (let i = 0; i < 3; i++) {
                board[this.xPos+i][this.yPos] = this.color;
            }
            board[this.xPos+1][this.yPos+1] = this.color;
        } else if(this.rotation == 180) {
            for (let i = 0; i < 3; i++) {
                board[this.xPos+1][this.yPos+i] = this.color;
            }
            board[this.xPos][this.yPos+1] = this.color;
        } else if(this.rotation == 270) {
            for (let i = 0; i < 3; i++) {
                board[this.xPos+i][this.yPos+1] = this.color;
            }
            board[this.xPos+1][this.yPos] = this.color;
        }

    }

    updateX(direction) {
        if(direction == 1) {
            if(this.rotation == 0) {
                if(this.xPos+1 != size
                    && board[this.xPos+1][this.yPos] == 0
                    && board[this.xPos+2][this.yPos+1] == 0
                    && board[this.xPos+1][this.yPos+2] == 0) {
                    this.xPos += direction;
                }
            } else if(this.rotation == 90) {
                if(this.xPos+1 != size
                    && board[this.xPos+3][this.yPos] == 0
                    && board[this.xPos+2][this.yPos+1] == 0) {
                    this.xPos += direction;
                }
            } else if(this.rotation == 180) {
                if(this.xPos+1 != size
                    && board[this.xPos+2][this.yPos] == 0
                    && board[this.xPos+2][this.yPos+1] == 0
                    && board[this.xPos+2][this.yPos+2] == 0) {
                    this.xPos += direction;
                }
            } else if(this.rotation == 270) {
                if(this.xPos+1 != size
                    && board[this.xPos+2][this.yPos] == 0
                    && board[this.xPos+3][this.yPos+1] == 0) {
                    this.xPos += direction;
                }
            }
        } else if(direction == -1) {
            if(this.rotation == 0) {
                if(this.xPos != 0
                    && board[this.xPos-1][this.yPos] == 0
                    && board[this.xPos-1][this.yPos+1] == 0
                    && board[this.xPos-1][this.yPos+2] == 0) {
                    this.xPos += direction;
                }
            } else if(this.rotation == 90) {
                if(this.xPos != 0
                    && board[this.xPos-1][this.yPos] == 0
                    && board[this.xPos][this.yPos+1] == 0) {
                    this.xPos += direction;
                }
            } else if(this.rotation == 180) {
                if(this.xPos != 0
                    && board[this.xPos][this.yPos] == 0
                    && board[this.xPos-1][this.yPos+1] == 0
                    && board[this.xPos][this.yPos+2] == 0) {
                    this.xPos += direction;
                }
            } else if(this.rotation == 270) {
                if(this.xPos != 0
                    && board[this.xPos][this.yPos] == 0
                    && board[this.xPos-1][this.yPos+1] == 0) {
                    this.xPos += direction;
                }
            }
        }
    }


}