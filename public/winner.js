const winning = {
	find: function(piece){
		var user = piece.sentBy;
		var count = 1;
		var left = piece.x - 1;
		var right = piece.x + 1
		//go left
		while(+chess.selectCell(left, piece.y)===user.id && count < 5){
			left--;
			count++;
		}
		//go right
		while (count < 5 && +chess.selectCell(right, piece.y)===user.id){
			right++;
			count++;
		}

		if(count === 5){return true;}
		else {return false}
	}
}