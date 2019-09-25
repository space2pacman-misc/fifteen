class Fifteen {
	constructor(className, map) {
		this._element = document.querySelector(className);
		this._map = map;
		this._init();
	}

	_createCells() {
		for(var i = 0; i < this._map.length; i++) {
			for(var j = 0; j < this._map[i].length; j++) {
				var element = document.createElement("div");

				if(this._map[i][j] === 0) {
					element.classList.add("empty");
					element.classList.add("free");
				} else {
					element.innerHTML = this._map[i][j];
					element.setAttribute("i", i);
					element.setAttribute("j", j);
				}

				element.classList.add("cell");
				
				this._element.appendChild(element);
			}
		}
	}

	_findFreeCell(i, j) {
		if(this._map[i - 1] && this._map[i - 1][j] === 0) {
			return { i: i - 1, j: j }; // up
		}
		if(this._map[i + 1] && this._map[i + 1][j] === 0) {
			return { i: i + 1, j: j }; // down
		}
		if(this._map[i][j - 1] === 0) {
			return { i: i, j: j - 1 }; // left
		}
		if(this._map[i][j + 1] === 0) {
			return { i: i, j: j + 1 }; // right
		}
	}

	_clearField() {
		this._element.innerHTML = "";
	}

	_clickHandler(e) {
		if(!e.target.classList.contains("empty")) {
			var i = e.target.getAttribute("i");
			var j = e.target.getAttribute("j");
			var currentCell = { i: Number(i), j: Number(j) };
			var freeCell = this._findFreeCell(Number(i), Number(j));

			if(freeCell) {
				this._map[freeCell.i][freeCell.j] = this._map[currentCell.i][currentCell.j];
				this._map[currentCell.i][currentCell.j] = 0;
				this._clearField();
				this._createCells();
			}
		}
	}

	_init() {
		this._createCells();
		this._element.addEventListener("click", this._clickHandler.bind(this));
	}
}