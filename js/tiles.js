class tiles {

	randRange (minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

	createTileObject (row, col, totalRows, totalColumns) {
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
			map_data.i = (!this.randRange(0, 2)) ?  this.randRange(0, 3) : 0;
		}
		return map_data;
	}

	createMapArray () {
		var map_full = [];
		for (var i = 0; i < this.rows; i++) {
			var map_array_line = [];
			for (var j = 0; j < this.cols; j++) {
				map_array_line.push(this.createTileObject(i, j, this.rows, this.cols));
			}
			map_full.push(map_array_line);
		}
		return map_full;
	}

	createExampleMap () {
		for (var i = 0, rlen = this.maps.length; i < rlen; i++) {
			var map_array_line = this.maps[i];
			for (var j = 0, clen = map_array_line.length; j < clen; j++) {
				var data = this.maps[i][j];
				this.canvas.drawGeometry("fillRect", data.x, data.y, this.width, this.height, { fillStyle: 1 === data.i ? "red" : 2 === data.i ? "blue" : 3 === data.i ? "green" : "transparent" });	
			}
		}
	}

	constructor (canvas, scale) {
		this.canvas = canvas; 
		this.width = scale;
		this.height = scale;
		this.rows = this.canvas.node.height / this.height;
		this.cols = this.canvas.node.width / this.width;
		this.maps = this.createMapArray();
	}
}