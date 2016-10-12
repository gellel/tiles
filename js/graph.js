class Graph extends Grid {

	/** @description: obtain tiles in grid based on inherited grid measurement **/

	static node (column, row, x, y, squareWidth, squareHeight, g, h, f, walkable, opened, closed, parent, __class__) {
		/** @description: initialises graph node from arguments and clones possible instances **/
		/** @param: column @type: {integer} **/
		/** @param: row @type: {integer} **/
		/** @param: x @type: {integer} **/
		/** @param: y @type: {integer} **/
		/** @param: squareWidth @type: {integer} **/
		/** @param: squareHeight @type: {integer} **/
		/** @param: g @type: {integer} **/
		/** @param: h @type: {integer} **/
		/** @param: f @type: {integer} **/
		/** @param: walkable @type: {boolean} **/
		/** @param: opened @type: {boolean} **/
		/** @param: closed @type: {boolean} **/
		/** @param: parent @type: {object} **/
		/** @param: __class__ @type: {class} **/
		/** @return: @type: {object} **/
		/** call static method of base and copy object from created incase inherited **/
		return Base.__object__({ column: column, row: row, x: x, y: y, squareWidth: squareWidth, squareHeight: squareHeight, g: g, h: h, f: f, walkable: walkable || true, opened: opened, closed: closed, parent: parent, __class__: __class__ });
	}

	static getRandomColumnInt (array) {
		/** @description: returns random integer from grid length **/
		/** @param: array @type: {array} **/
		/** @return: @type: {integer} **/
		if (!array || !array instanceof Array) return false;
		/** return item from array length **/
		return Base.__random__(0, array.length);
	}

	static getRandomRowInt (array, column) {
		/** @description: returns random integer from grid length **/
		/** @param: array @type: {array} **/
		/** @param: column @type: {integer} **/
		/** @return: @type: {integer} **/
		if ((!array || !array instanceof Array) || (isNaN(column))) return false;
		/** return array item integer **/
		return Base.__random__(0, column);
	}

	static getTileCopy (array, column, row) {
		/** @description: returns copied item from supplied grid 2d array using column and row to locate items **/
		/** @param: array @type: {array} **/
		/** @param: column @type: {integer} **/
		/** @param: row @type: {integer} **/
		/** handle arguments **/
		if ((!array || !array instanceof Array) || (isNaN(column) || isNaN(row))) return false;
		/** attempt to find item **/
		return (array[column] && array[column][row]) ? Base.__object__(array[column][row]) : false;
	}

	static getRandomTileCopy (array) {
		/** @description: returns copied item from supplied grid 2d array random column and row to locate items **/
		/** @param: array @type: {array} **/
		/** @return: @type: {object} **/
		/** handle arguments **/
		if (!array || !array instanceof Array) return false;
		/** set base column integer **/
		var column = Graph.getRandomColumnInt(array);
		/** set base row integer **/
		var row = Graph.getRandomRowInt(array, column);
		/** return copied object **/
		return Base.__object__(array[column][row]);
	}

	static getDirectionIntegers (direction) {
		/** @description: returns object with offset column and row integers **/
		/** @param: direction @type: {string} **/
		/** @return: @type: {object} **/
		/** return object **/
		return "top" === direction ? {x: 0, y: -1} : "right" === direction ? {x: 1, y: 0} : "bottom" === direction ? {x: 0, y: 1} : {x: -1, y: 0};
	}

	static getRandomDirectionString (directions) {
		/** @description: returns string for direction lookup **/
		/** @param: direction @type: {array} **/
		/** @return: @type: {object} **/
		/** handle directions requirement **/
		if (!directions || !directions instanceof Array) return false;
		/** return random string from directions **/
		return Base.__random__(0, directions.length, directions);
	}

	editTile (column, row, config, grid) {
		/** @description: edits array items in 2d array using supplied coordinates and optional array **/
		/** @param: array @type: {array} **/
		/** @param: column @type: {integer} **/
		/** @param: config @type: {object} **/
		/** @param: callback @type: {function} **/
		/** handle grid requirement **/
		if (isNaN(column) || isNaN(row) || !config instanceof Object) return false;
		/** fetch tile from copied or this instance **/
		var tile = grid instanceof Array ? Graph.getTileCopy(grid, column, row) : this.getTile(column, row);
		/** confirm tile found **/
		if (tile) {
			/** update tile **/
			tile = Object.assign(tile, config);
			/** set grid reference to supplied or this instance **/
			grid = grid instanceof Array ? grid : this.grid;
			/** update tile reference in grid **/
			grid[column][row] = config.__class__ ? new config.__class__(tile) : tile;
		}
	}

	editTiles (callback, grid) {
		/** @description: edits all tiles **/
		/** @param: {callback} @type: {function} **/
		/** @param: {grid} @type: {array} **/
		/** handle requirements **/
		if (!typeof callback === "function") return false;
		/** set grid reference **/
		var g = grid instanceof Array ? grid : this.grid;
		/** enumrate over grid **/
		for (var i = 0; i < g.length; i++) {
			/** enumate over column **/
			for (var j = 0; j < g[i].length; j++) {
				/** fetch tile **/
				var tile = grid instanceof Array ? Graph.getTileCopy(grid, i, j) : this.getTile(i, j);
				/** response **/
				var response = callback(tile);
				/** perform edit **/
				this.editTile(i, j, response, grid);
			}
		}
	}

	getTile (column, row) {
		/** @description: returns item from this grid 2d array using column and row to locate items **/
		/** @param: array @type: {array} **/
		/** @param: column @type: {integer} **/
		/** handle grid requirement **/
		if (!this.grid || (isNaN(column) || isNaN(row))) return false;
		/** attempt to find item **/
		return (this.grid[column] && this.grid[column][row]) ? this.grid[column][row] : false;
	}

	getTiles (callback, copy) {
		/** @description: returns item by item from this grid 2d array **/
		/** @param: callback @type: {function} **/
		/** @param: copy @type: {boolean} **/
		/** handle grid requirement **/
		if (!this.grid || !callback) return false;
		/** enumerate over this grid columns **/
		for (var i = 0; i < this.grid.length; i++) {
			/** enumerate over this grid rows **/
			for (var j = 0; j < this.grid[i].length; j++) {
				/** confirm callback is type function **/
				if (typeof callback === "function") {
					/** attempt to get tile **/
					callback(this.getTile(i, j, copy));
				}
			}
		}
	} 

	getRandomTile () {
		/** @description: returns item from this grid **/
		/** @return: @type: {object} **/
		/** handle grid requirement **/
		if (!this.grid) return false;
		/** set base column integer **/
		var column = Base.__random__(0, this.grid.length);
		/** set base row integer **/
		var row = Base.__random__(0, this.grid[column].length);
		/** attempt to find item **/
		return this.getTile(column, row);
	}

	getAdjacentTiles (tile, copy) {
		/** @description: returns item from this grid **/
		/** @param: tile @type: {object} **/
		/** @param: copy @type: {boolean} **/
		/** @return: @type: {array} **/
		/** handle grid requirement **/
		if (!tile || !this.grid || !this.directions instanceof Array) return false;
		/** set base array to hold found tiles **/
		var tiles = [];
		/** enumerate over grid **/
		for (var i = 0; i < this.directions.length; i++) {
			/** find direction direction **/
			tiles.push(this.getSpecificAdjacentTile(tile, this.directions[i], copy));
		}
		/** return complete tiles **/
		return tiles;
	}

	getSpecificAdjacentTile (tile, direction, copy) {
		/** @description: returns item from this grid **/
		/** @param: tile @type: {object} **/
		/** @param: direction @type: {string} **/
		/** @param: copy @type: {boolean} **/
		/** handle grid requirement **/
		if (!tile || !direction || !this.grid || !this.directions instanceof Array) return false;
		/** set offset integers to find tile next to supplied tile **/
		var integers = Graph.getDirectionIntegers(direction);
		/** set base column **/
		var column = tile.column + integers.x;
		/** set base row **/
		var row = tile.row + integers.y;
		/** attempt to find tile **/
		return copy ? Graph.getTileCopy(this.grid, column, row) : this.getTile(column, row);
	}

	setTileUsed (column, row) {
		/** @description: sets found tile to unwalkable **/
		/** @param: {column} @type: {integer} **/
		/** @param: {row} @row: {integer} **/
		/** handle arguments **/
		if (isNaN(column) || isNaN(row)) return false;
		/** attempt to find tile **/
		var tile = this.getTile(column, row);
		/** confirm found and set tile unwalkable **/
		if (tile) tile.walkable = false;
	}

	setRandomTileUsed () {
		/** @description: sets a random tile in grid to unwalkable **/
		/** fetch random tile **/
		var tile = this.getRandomTile();
		/** set tile set tile unwalkable **/
		tile.walkable = false;
	}

	setRandomTilesUsed (frequencyMin, frequencyMax, target) {
		/** @description: sets random tiles within grid to unwalkable **/
		/** @param: {frequencyMin} @type: {integer} **/
		/** @param: {frequencyMax} @type: {integer} **/
		/** @param: {target} @type: {integer} **/
		/** enumerate over grid columns **/
		for (var i = 0; i < this.grid.length; i++) {
			/** enumerate over grid rows **/
			for (var j = 0; j < this.grid[i].length; j++) {
				/** set base random **/
				var result = Base.__random__(frequencyMin, frequencyMax);
			}
		}
	}

	setColumnTilesUsed (column, start, end) {
		/** @description: sets in column in grid to unwalkable from start to offset **/
		/** @param: {column} @type: {integer} **/
		/** @param: {start} @type: {integer} **/
		/** @param: {end} @type: {integer} **/
		/** handle arguments **/
		if (isNaN(column) || isNaN(start) || isNaN(end)) return false;
		/** set column reference **/
		var column = this.grid[column];
		/** iterate over column **/
		/** confirm start and end points in range **/
		if (column[start] && column[end]) {
			/** enumerate over column **/
			for (var i = start; i < end; i++) {
				/** set tile unsuable **/
				column[i].walkable = false;
			}
		}
	}

	setRowTilesUsed (row, start, end) {
		/** @description: sets row in grid to unwalkable from start to offset **/
		/** @param: {row} @type: {integer} **/
		/** @param: {start} @type: {integer} **/
		/** @param: {end} @type: {integer} **/
		/** handle arguments **/
		if (isNaN(row) || isNaN(start) || isNaN(end)) return false;
		/** confirm row base reference **/
		if (!this.grid[0][row]) return false;
		/** confirm column start and end point in range **/
		if (!this.grid[start] || !this.grid[end]) return false;
		/** iterate over columns until end, but update row **/
		for (var i = start; i < end; i++) {
			/** set this row within column as unusable **/
			this.grid[i][row].walkable = false;
		}
	}
	
	graph (columns, rows, __class__) {
		/** @description: initialises graph from defined columns and rows **/
		/** set base grid array **/
		var grid = [];
		/** set base columns **/
		columns = columns ? columns : this.columns;
		/** set base rows **/
		rows = rows ? rows : this.rows;
		/** enumerate over columns **/
		for (var i = 0; i < columns; i++) {
			/** set base column container **/
			var column = [];
			/** enumrate over rows **/
			for (var j = 0; j < rows; j++) {
				/** update column with row item using graph node **/
				column.push(Graph.node(i, j, i * this.squareWidth, j * this.squareHeight, this.squareWidth, this.squareHeight, undefined, undefined, undefined, true, undefined, undefined, undefined, __class__));
			}
			/** update column **/
			grid.push(column);
		}
		/** complete returned grid **/
		return grid;
	}

	__graph__ (config) {
		/** @description: initialises graph node from arguments and clones possible instances **/
		/** @param: config @type: {object} : config.grid @type {array}{array} **/
		/** set base config **/
		config = config || {};
		/** set base column size **/
		config.columns = config.columns || this.columns;
		/** set base row size **/
		config.rows = config.rows || this.rows;
		/** set base grid or build **/
		this.grid = config.grid || this.graph(config.columns, config.rows, config.__class__);
		/** update grid reference **/
		this.__grid__({ columns: this.grid.length, rows: this.grid[0].length });

	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: config @type: {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
		/** set call to this definition handler **/
		this.__graph__({ grid: config.grid });
		/** set base directions for this grid lookup **/
		this.directions = ["top", "right", "bottom", "left"];
	}
}