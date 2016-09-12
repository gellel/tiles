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
			map_data.i = this.randRange(0, 3);
		}
		return map_data;
	}

	createMapArray () {
		var map = [];
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				map.push(this.createTileObject(i, j, this.rows, this.cols));
			}
		}
		return map;
	}

	createExampleMap () {
		for (var i = 0; i < this.map.length; i++) {

			var tile = this.map[i];
			
			var style = {};

			switch (tile.i) {
				case 1:
					style.fillStyle = 'red';
					break;
				case 2:
					style.fillStyle = 'blue';
					break;
				case 3:
					style.fillStyle = 'green';
					break;
				default:
					style.fillStyle = 'white';
			}
			this.canvas.drawGeometry("fillRect", tile.x, tile.y, this.width, this.height, style);
		}
	}

	constructor (canvas, scale) {
		this.canvas = canvas; 
		this.width = scale;
		this.height = scale;
		this.rows = this.canvas.node.height / this.height;
		this.cols = this.canvas.node.width / this.width;
		this.map = this.createMapArray();
	}
}