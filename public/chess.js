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