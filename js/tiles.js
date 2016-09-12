class tiles {

	randRange (minimum, maximum) {
		/** generate randon number based on min and max values **/
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

	createTileObject (row, col, totalRows, totalColumns) {
		/** set the base coordinates for tile item for the array **/
		var map_data = { x: (col * this.width), y: (row * this.height) };
		/** set tile type to be 1 if it is along the top or bottom row **/
		if (row === 0 || row === totalRows - 1) {
			map_data.i = 1;
		}
		/** set tile type to be 2 if it is along the left column **/
		else if (col === 0) {
			map_data.i = 2;
		}
		/** set tile type to be 3 if it is along the right column **/
		else if (col === totalColumns - 1) {
			map_data.i = 3;
		}
		/** set tile type to be either 0,3 if it is any other position if the random occurance check returns 0 **/
		else {
			map_data.i = (!this.randRange(0, 2)) ?  this.randRange(0, 3) : 0;
		}
		/** return complete object **/
		return map_data;
	}

	createMapArray () {
		/** set base container to hold 2d array **/
		var map_full = [];
		/** iterate over defined rows for this size of grid **/
		for (var i = 0; i < this.rows; i++) {
			/** set a base container to hold the current rows data **/
			var map_array_line = [];
			/** iterate over the defined columns for the current row **/
			for (var j = 0; j < this.cols; j++) {
				/** push current tile data to row array **/
				map_array_line.push(this.createTileObject(i, j, this.rows, this.cols));
			};
			/** push complete row to main 2d array **/
			map_full.push(map_array_line);
		};
		/** return complete 2d array **/
		return map_full;
	}

	createExampleMap () {
		/** iterate over length of 2d array rows **/
		for (var i = 0, rlen = this.maps.length; i < rlen; i++) {
			/** cache current array row **/
			var map_array_line = this.maps[i];
			/** iterate over array row columns **/
			for (var j = 0, clen = map_array_line.length; j < clen; j++) {
				/** cache current row and column data **/
				var data = this.maps[i][j];
				/** draw a simple rectangle using the canvas class defined method and supplied data **/
				this.canvas.drawGeometry("fillRect", data.x, data.y, this.width, this.height, { fillStyle: 1 === data.i ? "red" : 2 === data.i ? "blue" : 3 === data.i ? "green" : "transparent" });	
			}
		}
	}

	constructor (canvas, scale) {
		/** create self instance of canvas class (requires canvas.js) **/
		this.canvas = canvas; 
		/** create self instance tile sprite size width **/
		this.width = scale;
		/** create self instance tile sprite size height **/
		this.height = scale;
		/** create self instance number of rows based on physical canvas element size width **/
		this.rows = this.canvas.node.height / this.height;
		/** create self instance number of rows based on physical canvas element size height **/
		this.cols = this.canvas.node.width / this.width;
		/** create self instance of canvas grid 2d map **/
		this.maps = this.createMapArray();
	}
}