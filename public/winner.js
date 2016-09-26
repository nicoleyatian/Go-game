const winning = {
    getColor: function(x, y){
        return +chess.getCellStatus(chess.selectCell(x, y));
    },

    find1: function(piece){
        var user = piece.sentBy;
        var count = 1;
        var left = piece.x - 1;
        var right = piece.x + 1
        //go left
        while(this.getColor(left, piece.y)===user.id && count < 5){
            left--;
            count++;
        }
        //go right
        while (count < 5 && this.getColor(right, piece.y)===user.id){
            right++;
            count++;
        }

        if(count === 5){ return true; }
        else return false
    },
    find2: function(piece){
        var user = piece.sentBy;
        var count = 1;
        var x = piece.x - 1;
        var y = piece.y - 1;
        //go left
        while(this.getColor(x,y)===user.id && count < 5){
            x--;
            y--;
            count++;
        }
        x = piece.x + 1;
        y = piece.y + 1
        //go right
        while (count < 5 && this.getColor(x,y)===user.id){
            x++;
            y++;
            count++;
        }

        if(count === 5){return true;}
        else return false
    },
    find3: function(piece){
        var user = piece.sentBy;
        var count = 1;
        var left = piece.y - 1;
        var right = piece.y + 1
        //go left
        while(this.getColor(piece.x, left)===user.id && count < 5){
            left--;
            count++;
        }
        //go right
        while (count < 5 && this.getColor(piece.x, right)===user.id){
            right++;
            count++;
        }

        if(count === 5){return true;}
        else return false
    },
    find4: function(piece){
        var user = piece.sentBy;
        var count = 1;
        var x = piece.x - 1;
        var y = piece.y + 1;
        //go left
        while(this.getColor(x,y)===user.id && count < 5){
            x--;
            y++;
            count++;
        }
        x = piece.x + 1;
        y = piece.y - 1
        //go right
        while (count < 5 && this.getColor(x,y)===user.id){
            x++;
            y--;
            count++;
        }

        if(count === 5){return true;}
        else return false;
    },

    check: function(piece) {
        return this.find1(piece) || this.find2(piece) ||this.find3(piece)||this.find4(piece)
    }
    
};

// module.exports = winning;