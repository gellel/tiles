class tiles {

	randRange (minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

	tileInt (row, col, totalRows, totalColumns) {
		var map_data = { x: (col * this.width), y: (row * this.height) };

		if (row === 0 || row === totalRows - 1) {
			map_data.i = 1;
		}
		else if (col === 0) {
			map_data.i = 2;
		}
		else if (col === totalColumns - 1) {
			map_data.i = 3;
		}
		else {
			map_data.i = this.randRange(0, 3);
		}
		return map_data;
	}

	create () {
		var map = []
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				map.push(this.tileInt(i, j, this.rows, this.cols));
			}
		}
		return map;
	}

	constructor (canvas, scale) {
		this.canvas = canvas; 
		this.width = scale;
		this.height = scale;
		this.rows = this.canvas.height / this.height;
		this.cols = this.canvas.width / this.width;
		this.maps = [this.create()];
	}
}