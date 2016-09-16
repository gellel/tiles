class tiles {

	getRandomInt (minimum, maximum) {
		/** set and return random number based on minimum and maximum values as arguments **/
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

	createTile (row, col, totalRows, totalColumns) {
		/** set the base coordinates for tile item for the array **/
		var map_data = { x: (col * this.width), y: (row * this.height), row: row, col: col, width: this.width, height: this.height };
		/** set tile type to be 1 if it is along the top or bottom row **/
		if (row === 0 || row === totalRows - 1) {
			map_data.image = 1;
			map_data.canuse = false;
		}
		/** set tile type to be 2 if it is along the left column **/
		else if (col === 0) {
			map_data.image = 2;
			map_data.canuse = true;
		}
		/** set tile type to be 3 if it is along the right column **/
		else if (col === totalColumns - 1) {
			map_data.image = 3;
			map_data.canuse = true;
		}
		/** set tile type to be either 0,3 if it is any other position if the random occurance check returns 0 **/
		else {
			map_data.image = (!this.getRandomInt(0, 2)) ? this.getRandomInt(0, 3) : 0;
			map_data.canuse = (map_data.image === 0) ? true : false;
		}
		/** return complete object **/
		return map_data;
	}

	createArray () {
		/** set base container to hold 2d array **/
		var grid = [];
		/** iterate over defined rows for this size of grid **/
		for (var i = 0; i < this.rows; i++) {
			/** set a base container to hold the current rows data **/
			var row = [];
			/** iterate over the defined columns for the current row **/
			for (var j = 0; j < this.cols; j++) {
				/** push current tile data to row array **/
				row.push(this.createTile(i, j, this.rows, this.cols));
			};
			/** push complete row to main 2d array **/
			grid.push(row);
		};
		/** set and return complete 2d array for class **/
		return grid;
	}

	draw () {
		/** iterate over length of 2d array rows **/
		for (var i = 0, rowlength = this.map.length; i < rowlength; i++) {
			/** iterate over array row columns **/
			for (var j = 0, columnlength = this.map[i].length; j < columnlength; j++) {
				/** cache current row and column data **/
				var data = this.map[i][j];
				/** draw a simple rectangle using the canvas class defined method and supplied data **/
				this.canvas.drawGeometry("fillRect", data.x, data.y, this.width, this.height, { fillStyle: 1 === data.image ? "red" : 2 === data.image ? "blue" : 3 === data.image ? "green" : "transparent" });	
			};
		};
	}

	getTile (column, row) {
		/** set and return grid array object if available otherwise return false **/
		return (this.map[row] && this.map[row][column]) ? this.map[row][column] : false;
	}

	constructor (canvas, scale) {
		/** create self instance of canvas class (requires canvas.js) (uses it to draw to canvas element) **/
		this.canvas = canvas; 
		/** create self instance tile sprite size width **/
		this.width = scale;
		/** create self instance tile sprite size height **/
		this.height = scale;
		/** create self instance scale measurement **/
		this.scale = scale;
		/** create self instance number of rows based on physical canvas element size width **/
		this.rows = this.canvas.node.height / this.height;
		/** create self instance number of rows based on physical canvas element size height **/
		this.cols = this.canvas.node.width / this.width;
		/** create self instance of canvas grid 2d map **/
		this.map = this.createArray();
	}
}