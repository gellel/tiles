class Graph extends Grid {

	/** @description: obtain tiles in grid based on inherited grid measurement **/

	static node (columns, rows, column, row, x, y, gridTileWidth, gridTileHeight, g, h, f, cost, walkable, opened, closed, visited, parent, __class__) {
		/** @description: initialises graph node from arguments and clones possible instances **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {x} is type {integer} **/
		/** @param: {y} is type {integer} **/
		/** @param: {gridTileWidth} is type {integer} **/
		/** @param: {gridTileHeight} is type {integer} **/
		/** @param: {g} is type {integer} **/
		/** @param: {h} is type {integer} **/
		/** @param: {f} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {walkable} is type {boolean} **/
		/** @param: {opened} is type {boolean} **/
		/** @param: {closed} is type {boolean} **/
		/** @param: {parent} is type {object} **/
		/** @param: {__class__} is type {class} **/
		/** @return: is type {object} **/
		/** call static method of base and copy object from created incase inherited **/
		return OBJECT.create({ columns: columns, rows: rows, column: column, row: row, x: x, y: y, gridTileWidth: gridTileWidth, gridTileHeight: gridTileHeight, g: g, h: h, f: f, cost: cost || 0, walkable: walkable || true, opened: opened, closed: closed, visited: visited || false, parent: parent, __class__: __class__, __init__: true });
	}

	static getRandomColumnInt (grid) {
		/** @description: returns random integer from grid length **/
		/** @param: {grid} is type {array} **/
		/** @return: is type {integer} **/
		if (!grid instanceof Array) return false;
		/** return item from array length **/
		return MATH.rint(0, grid.length);
	}

	static getRandomRowInt (grid, column) {
		/** @description: returns random integer from grid length **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {integer} **/
		if (!grid || !grid instanceof Array || isNaN(column)) return false;
		/** return array item integer **/
		return MATH.rint(0, column);
	}

	static getTilesByAttribute (grid, attributes, column) {
		/** @description: returns item from supplied grid 2d array with optional column **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {object} **/
		if (!grid || !grid instanceof Array) return false;
		/** set base column or fetch from random **/
		column = !isNaN(column) ? grid[column] : column === "grid" ? [].concat.apply([], grid) : grid[Graph.getRandomColumnInt(grid)];
		/** filter **/
		var row = column.filter(function (tile) { if (OBJECT.contains(tile, attributes)) return tile; });
		/** return first **/
		return row;
	}

	static getDirectionIntegers (direction) {
		/** @description: returns object with offset column and row integers **/
		/** @param: {direction} is type {string} **/
		/** @return: is type {object} **/
		/** return object **/
		return "top" === direction ? { x: 0, y: -1} : "topleft" === direction ? { x: -1, y: -1 } : "topright" === direction ? { x: 1, y: -1 } : "right" === direction ? { x: 1, y: 0 } : "bottom" === direction ? { x: 0, y: 1 } :  "bottomleft" === direction ? { x: -1, y: 1 } : "bottomright" === direction ? { x: 1, y: 1 } : { x: -1, y: 0 };
	}

	static getRandomDirectionString (directions) {
		/** @description: returns string for direction lookup **/
		/** @param: {direction} is type {array} **/
		/** @return: is type {object} **/
		/** handle directions requirement **/
		if (!directions || !directions instanceof Array) return false;
		/** return random string from directions **/
		return MATH.rint(0, directions.length, directions);
	}

	static editTile (grid, column, row, config) {
		/** @description: edits array items in 2d array using supplied coordinates and optional array **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** handle requirements **/
		if (!grid instanceof Array || isNaN(column) || isNaN(row) || !config instanceof Object) return false;
		/** fetch tile from copied or this instance **/
		var tile = Graph.getTile(grid, column, row);
		/** confirm tile found **/
		if (tile) {
			/** update tile **/
			tile = Object.assign(tile, config);
			/** update tile reference in grid **/
			grid[column][row] = config.__class__ ? new config.__class__(tile) : tile;
		}
	}

	static editTiles (grid, callback) {
		/** @description: edits all tiles **/
		/** @param: {grid} is type {array} **/
		/** @param: {callback} is type {function} **/
		/** handle requirements **/
		if (!typeof callback === "function") return false;
		/** enumrate over grid **/
		for (var i = 0, collen = grid.length; i < collen; i++) {
			/** enumate over column **/
			for (var j = 0, rowlen = grid[i].length; j < rowlen; j++) {
				/** fetch tile **/
				var tile = Graph.getTile(grid, i, j);
				/** response **/
				var response = callback(tile);
				/** perform edit **/
				Graph.editTile(grid, i, j, response);
			}
		}
	}

	static getTile (grid, column, row, copy) {
		/** @description: returns item from this grid 2d array using column and row to locate items **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {copy} is type {boolean} **/
		/** handle requirements **/
		if (!grid instanceof Array || (isNaN(column) || isNaN(row))) return false;
		/** attempt to find item **/
		return (grid[column] && grid[column][row]) ? copy ? OBJECT.create(grid[column][row]) : grid[column][row] : false;
	}

	static getTiles (grid, callback, copy) {
		/** @description: returns item by item from this grid 2d array **/
		/** @param: {grid} is type {array} **/
		/** @param: {callback} is type {function} **/
		/** @param: {copy} is type {boolean} **/
		/** handle requirements **/
		if (!grid instanceof Array || typeof callback !== "function") return false;
		/** enumerate over this grid columns **/
		for (var i = 0, collen = grid.length; i < collen; i++) {
			/** enumerate over this grid rows **/
			for (var j = 0, rowlen = grid[i].length; j < rowlen; j++) {
				/** attempt to get tile **/
				callback(Graph.getTile(grid, i, j, copy));
			}
		}
	} 

	static getRandomTile (grid, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {object} **/
		/** handle requirements **/
		if (!grid instanceof Array) return false;
		/** set base column integer **/
		var column = MATH.rint(0, grid.length);
		/** set base row integer **/
		var row = MATH.rint(0, grid[column].length);
		/** attempt to find item **/
		return Graph.getTile(grid, column, row, copy);
	}

	static getRandomTiles (grid, number, copy) {
		/** @description: returns items from this grid base on defined number of items to fetch **/
		/** @param: {grid} is type {object} **/
		/** @param: {number} is type {number}
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		/** handle requirements **/
		if (!grid instanceof Array || isNaN(number)) return false;
		/** set base array to contain tiles **/
		var tiles = [];
		/** perform fetch **/
		for (var i = 0; i < number; i++) {
			/** collect tiles **/
			tiles.push(Graph.getRandomTile(grid, copy));
		}
		/** return collection **/
		return tiles;
	}

	static getAdjacentTiles (grid, tile, directions, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {array} **/
		/** @param: {tile} is type {object} **/
		/** @param: {directions} is type {array} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		/** handle requirements **/
		if (!grid instanceof Array || !tile instanceof Object || !directions instanceof Array) return false;
		/** set base array to hold found tiles **/
		var tiles = [];
		/** enumerate over grid **/
		for (var i = 0; i < directions.length; i++) {
			/** find direction direction **/
			tiles.push(Graph.getSpecificAdjacentTile(grid, tile, directions[i], copy));
		}
		/** return complete tiles **/
		return tiles;
	}

	static getSpecificAdjacentTile (grid, tile, direction, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {array} **/
		/** @param: {tile} is type {object} **/
		/** @param: {direction} is type {string} **/
		/** @param: {copy} is type {boolean} **/
		/** handle requirements **/
		if (!grid instanceof Array || !tile instanceof Object || !direction instanceof String) return false;
		/** set offset integers to find tile next to supplied tile **/
		var integers = Graph.getDirectionIntegers(direction);
		/** set base column **/
		var column = tile.column + integers.x;
		/** set base row **/
		var row = tile.row + integers.y;
		/** attempt to find tile **/
		return Graph.getTile(grid, column, row, copy);
	}

	static setTile(grid, column, row, key, value) {
		/** @description: sets found tile key to value **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {key} is type {string} **/
		/** @param: {value} is type {*} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(column) || isNaN(row) || !key instanceof String) return false;
		/** attempt to find tile **/
		var tile = Graph.getTile(grid, column, row);
		/** confirm found and set attribute **/
		if (tile) tile[key] = value;
	}

	static reset (grid) {
		/** @description: resets calculations on graph **/
		/** @param: {grid} is type {array} **/
		/** edit all tiles in grid **/
		Graph.editTiles(grid, function (tile) {
			/** iterate over keys in found tile **/
			for (var key in tile) {
				/** set switch case to key in tile **/
				switch (key) {
					case "g":
					case "h":
					case "f":
					case "opened":
					case "closed":
					case "parent":
					case "visited":
						tile[key] = undefined;
						break;
				}
			}
			/** return edited tile **/
			return tile;
		});
	}

	editTile (column, row, config) {
		/** @description: edits array items in 2d array using supplied coordinates and optional array **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {config} is type {object} **/
		/** @param: {callback} is type {function} **/
		return Graph.editTile(this.grid, column, row, config);
	}

	editTiles (callback) {
		/** @description: edits all tiles **/
		/** @param: {callback} is type {function} **/
		/** @param: {grid} is type {array} **/
		return Graph.editTiles(this.grid, callback);
	}

	getTile (column, row, copy) {
		/** @description: returns item from this grid 2d array using column and row to locate items **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		return Graph.getTile(this.grid, column, row, copy);
	}

	getTiles (callback, copy) {
		/** @description: returns item by item from this grid 2d array **/
		/** @param: {callback} is type {function} **/
		/** @param: {copy} is type {boolean} **/
		return Graph.getTiles(this.grid, callback, copy);
	} 

	getRandomTile (copy) {
		/** @description: returns item from this grid **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {object} **/
		return Graph.getRandomTile(this.grid, copy);
	}

	getRandomTiles (number, copy) {
		/** @description: returns an array of items from this grid **/
		/** @param: {number} is type {number} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		return Graph.getRandomTiles(this.grid, number, copy);
	}

	getAdjacentTiles (tile, copy) {
		/** @description: returns item from this grid **/
		/** @param: {tile} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		return Graph.getAdjacentTiles(this.grid, tile, this.directions, copy);
	}

	getAllAdjacentTiles (tile, copy) {
		/** @description: returns item from this grid **/
		/** @param: {tile} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		var directions = this.directions.slice();
		/** update directions to contain all possible angles **/
		directions.push("topleft", "topright", "bottomleft", "bottomright");
		return Graph.getAdjacentTiles(this.grid, tile, directions, copy);
	}

	getSpecificAdjacentTile (tile, direction, copy) {
		/** @description: returns item from this grid **/
		/** @param: {tile} is type {object} **/
		/** @param: {direction} is type {string} **/
		/** @param: {copy} is type {boolean} **/
		return Graph.getSpecificAdjacentTile(this.grid, tile, direction, copy);
	}

	getTilesByAttribute (attributes, column) {
		/** @description: returns item from supplied grid 2d array with optional column **/
		/** @param: {attributes} is type {object} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {object} **/
		return Graph.getTilesByAttribute(this.grid, attributes, column)
	}

	getRandomColumnInt () {
		/** @description: returns random integer from grid length **/
		/** @return: is type {integer} **/
		/** return item from array length **/
		return Graph.getRandomColumnInt(this.grid);
	}

	getRandomRowInt (column) {
		/** @description: returns random integer from grid length **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {integer} **/
		/** return array item integer **/
		return Graph.getRandomRowInt(this.grid, column);
	}

	reset () {
		/** @description: resets calculations on graph **/
		return Graph.reset(this.grid);
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
				column.push(Graph.node(this.columns, this.rows, i, j, i * this.gridTileWidth, j * this.gridTileHeight, this.gridTileWidth, this.gridTileHeight, undefined, undefined, undefined, undefined, true, undefined, undefined, false, undefined, __class__));
			}
			/** update column **/
			grid.push(column);
		}
		/** complete returned grid **/
		return grid;
	}

	__graph__ (config) {
		/** @description: initialises graph node from arguments and clones possible instances **/
		/** @param: {config} is type {object} : {config.grid} is type {array}{array} **/
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
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
		/** set call to this definition handler **/
		this.__graph__(config);
		/** set base directions for this grid lookup **/
		this.directions = ["top", "right", "bottom", "left"];
	}
}