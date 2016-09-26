'use strict';
const chess = {

    step: 1,

    pieces: ['<img class="piece" src="1.png">', '<img class="piece" src="2.png">'],

    width: 19,
    height: 19,
    stepInterval: null,
    currentUser: null,
    over: null,

    // Utility functions
    getCellCoords(cellElement) {
        return cellElement.id.split('-').map(Number);
    },

    selectCell(x, y) {
        return this.cells[x.toString() + '-' + y.toString()];
    },

    getCellNeighbors(cell) {

        const coords = this.getCellCoords(cell);
        const x = coords[0];
        const y = coords[1];

        const neighbors = [];

        // Direct left and right
        neighbors.push(this.selectCell(x - 1, y));
        neighbors.push(this.selectCell(x + 1, y));

        // Row above
        neighbors.push(this.selectCell(x - 1, y - 1));
        neighbors.push(this.selectCell(x, y - 1));
        neighbors.push(this.selectCell(x + 1, y - 1));

        // Row below
        neighbors.push(this.selectCell(x - 1, y + 1));
        neighbors.push(this.selectCell(x, y + 1));
        neighbors.push(this.selectCell(x + 1, y + 1));

        return neighbors.filter(cell => !!cell);

    },

    getAliveNeighbors(cell) {
        const allNeighbors = this.getCellNeighbors(cell);
        return allNeighbors.filter(neighbor => this.getCellStatus(neighbor) === 'alive');
    },

    getCellStatus(cell) {
        return cell.getAttribute('data-status');
    },

    setCellStatus(cell, status) {
        cell.setAttribute('data-status', status);
        cell.className = status;
    },

    toggleCellStatus(cell) {
        if (this.getCellStatus(cell) === 'dead' && this.step === this.currentUser.id && !this.over) {
            const coords = this.getCellCoords(cell);
            const x = coords[0];
            const y = coords[1];
                piece.create({
                    x: x,
                    y: y
                })
            
        }
    },

    forEachCell(iteratorFunc) {
        Array.from(this.cells).forEach(cell => {
            iteratorFunc(cell, ...this.getCellCoords(cell));
        });
    },

    // Initialization and gameplay functions

    createAndShowBoard() {

        const goltable = document.createElement("tbody");
        let tablehtml = '';
        this.step = 1;

        for (let h = 0; h < this.height; h++) {
            tablehtml += `<tr id="row-${h}"></tr>`
            for (var w = 0; w < this.width; w++) {
                tablehtml += `<td data-status='dead' id='${w}-${h}'></td>`;
            }
            tablehtml += "</tr>";
        }

        goltable.innerHTML = tablehtml;

        // add table to the #board element
        const board = document.getElementById('board');
        board.appendChild(goltable);

        this.cells = document.getElementsByTagName('td');

        // once html elements are added to the page, attach events to them
        this.setupBoardEvents();
    },



    setupBoardEvents() {

        this.forEachCell(cell => {
            cell.addEventListener('click', this.toggleCellStatus.bind(this, cell));
        });
        piece.remove(null, {});

        // document.getElementById('step_btn').addEventListener('click', this.step.bind(this));
        // document.getElementById('play_btn').addEventListener('click', this.enableAutoPlay.bind(this));
        // document.getElementById('clear_btn').addEventListener('click', this.clearBoard.bind(this));
        // document.getElementById('reset_btn').addEventListener('click', this.randomBoard.bind(this));
        // document.getElementById('shape_input').addEventListener('change', this.insertShape.bind(this));

    },

    clearBoard() {
        this.forEachCell(cell => {
            this.setCellStatus(cell, 'dead');
            cell.innerHTML = '';
            this.step = 1;
            $('#color').empty()
            $('#color').append('Stone for this step: ' + chess.pieces[chess.step-1 ])
        });
    }

};

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


// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }));
  
// Get the Feathers services we want to use
const piece = app.service('pieces');
const user = app.service('users')



function placePiece(piece) {
	const cell=chess.selectCell(piece.x, piece.y);
	const user=piece.sentBy
	chess.setCellStatus(cell, user.id);
	cell.innerHTML = '<img class="piece" src="'+user.id+'.png">';
	chess.step = 3-chess.step;
	$('#color').empty()
	$('#color').append('Stone for this step: ' + chess.pieces[chess.step-1])
}

function showWinner(piece) {
    chess.over = true;
    if(chess.currentUser.id === piece.sentBy.id){
        $('#result').append('<h2 style="color:#007A5B" class="animated tada">Yay, You Won!</h2>')
    } else {
        $('#result').append('<h2 style="color:#D20000" class="animated bounce">You Lose!</h2>')
    }

}

$('.room').on('click', function() {
	const input = $('#room').find('[name="name"]');
	roomName = input.val();
});

$('.logout').on('click', function() {
	piece.remove(null, {})
    .then(()=>app.logout())
    .then(() => window.location.href = '/');
});

$('.remove').on('click', function() {
	piece.remove(null, {})
});

app.authenticate().then((storage) => {

	chess.createAndShowBoard();

	chess.currentUser = storage.data;
    $('#your').append('You are holding:' + chess.pieces[chess.currentUser.id-1]);
    $('#color').empty()
    $('#color').append('Stone for this step: ' + chess.pieces[chess.step-1 ])


  // Listen to created events and add the new message in real-time
  piece.on('created', function(data){
        placePiece(data);
        if(winning.check(data)){
            showWinner(data);
        }

	})

  piece.on('removed', ()=>{
    chess.clearBoard();
    $('#result').empty();
    chess.over = false;
  })

})
// On unauthorized errors we just redirect back to the login page
.catch(error => {
  if(error.code === 401) {
    window.location.href = '/'
  }
});


