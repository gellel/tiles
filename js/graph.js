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

	static getTile (grid, column, row, copy) {
		/** @description: returns item from this grid 2d array using column and row to locate items **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {copy} is type {boolean} **/
		/** handle arguments **/
		if (!grid instanceof Array || (isNaN(column) || isNaN(row))) return false;
		/** attempt to find item **/
		return (grid[column] && grid[column][row]) ? copy ? OBJECT.create(grid[column][row]) : grid[column][row] : false;
	}

	static getTiles (grid, callback, copy) {
		/** @description: returns item by item from this grid 2d array **/
		/** @param: {grid} is type {array} **/
		/** @param: {callback} is type {function} **/
		/** @param: {copy} is type {boolean} **/
		/** handle arguments **/
		if (!grid instanceof Array || typeof callback !== "function") return false;
		/** enumerate over this grid columns **/
		for (var i = 0, clen = grid.length; i < clen; i++) {
			/** enumerate over this grid rows **/
			for (var j = 0, rlen = grid[i].length; j < rlen; j++) {
				/** attempt to get tile **/
				var result = callback(Graph.getTile(grid, i, j, copy));
				/** optional break clause **/
				if (result) return result;
			}
		}
	} 

	static getRandomTile (grid, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {object} **/
		/** handle arguments **/
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
		/** handle arguments **/
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

	static getTileByCoordinates (grid, scaleX, scaleY, x, y, search) {
		/** @description: selects tile from x and y integers **/
		/** @param: {grid} is type {array} **/
		/** @param: {scale} is type {number} **/
		/** @param: {x} is type {integer} **/
		/** @param: {y} is type {integer} **/
		/** @param: {search} is type {boolean} **/
		/** @return: is type {object} or {boolean:false} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(scaleX) || isNaN(scaleY) || isNaN(x) || isNaN(y)) return false;
		/** add x coordinate to the scale then get the base of the number, then minus the offset from grid length to adjust for out of bounds **/
		var column = Math.floor((scaleX + x) / scaleX) - 1;
		/** add y coordinate to the scale then get the base of the number, then minus the offset from grid length to adjust for out of bounds **/
		var row = Math.floor((scaleY + y) / scaleY) - 1;
		/** attempt to locate tile **/
		var tile = Graph.getTile(grid, column, row);
		/** confirm tile found and is within bounds **/
		if (tile && tile.getWithinBounds(x, y)) return tile;
		/** attempt long search **/
		return search ? Graph.getTiles(grid, function (t) { if (t.getWithinBounds(x, y)) { tile = t; } }) : false;
	}

	static getTilesByCoordinates (grid, data, search) {
		/** @description: selects multiple tiles from x and y integers **/
		/** @param: {grid} is type {array} **/
		/** @param: {data} is type {array} **/
		/** @param: {search} is type {boolean} **/
		/** @return: is type {array} **/
		/** handle arguments **/
		if (!grid instanceof Array || !data instanceof Array) return [];
		/** set base container for tile results **/
		var tiles = [];
		/** enumerate over data **/
		for (var i = 0, len = data.length; i < len; i++) {
			/** attempt to locate tile and push result to array **/
			tiles.push(Graph.getTileByCoordinates(grid, data[i], search));
		}
		/** return populated array **/
		return tiles;
	}

	static getTilesByAttribute (grid, attributes, column) {
		/** @description: returns item from supplied grid 2d array with optional column **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {object} **/
		/** handle arguments **/
		if (!grid || !grid instanceof Array) return false;
		/** set base column or fetch from random **/
		column = !isNaN(column) ? grid[column] : column === "grid" ? [].concat.apply([], grid) : grid[Graph.getRandomColumnInt(grid)];
		/** filter **/
		var row = column.filter(function (tile) { if (OBJECT.contains(tile, attributes)) return tile; });
		/** return first **/
		return row;
	}

	static getTilesByColumn (grid, column, start, target) {
		/** @description: returns array of tiles from column from supplied starting point to target **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @return: is type {array} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(column) || isNaN(start) || isNaN(target)) return [];
		/** confirm grid in range and return subsection **/
		return grid[column] && grid[column][start] && grid[column][target] ? grid[column].slice(start, target) : [];
	}

	static getTilesByRow (grid, row, start, target) {
		/** @description: returns array of tiles from row from supplied starting point to target **/
		/** @param: {grid} is type {array} **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @return: is type {array} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(row) || isNaN(start) || isNaN(target)) return [];
		/** confirm that row item exists in range **/
		if (!grid[0][row] || !grid[start][row] || !grid[target][row]) return [];
		/** set base container for tiles **/
		var tiles = [];
		/** iterate over clipped length **/
		for (var i = start, len = target; i < len; i++) {
			/** push item to collection **/
			tiles.push(grid[i][row]);
		}
		/** return tiles **/
		return tiles;
	}

	static getAdjacentTiles (grid, tile, directions, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {array} **/
		/** @param: {tile} is type {object} **/
		/** @param: {directions} is type {array} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		/** handle arguments **/
		if (!grid instanceof Array || !tile instanceof Object || !directions instanceof Array) return false;
		/** set base array to hold found tiles **/
		var tiles = [];
		/** enumerate over grid **/
		for (var i = 0, len = directions.length; i < len; i++) {
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
		/** handle arguments **/
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

	static getRandomColumnInt (grid) {
		/** @description: returns random integer from grid length **/
		/** @param: {grid} is type {array} **/
		/** @return: is type {integer} **/
		/** handle arguments **/
		if (!grid instanceof Array) return false;
		/** return item from array length **/
		return MATH.rint(0, grid.length);
	}

	static getRandomRowInt (grid, column) {
		/** @description: returns random integer from grid length **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {integer} **/
		/** handle arguments **/
		if (!grid || !grid instanceof Array || isNaN(column)) return false;
		/** return array item integer **/
		return MATH.rint(0, column);
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
		/** handle arguments **/
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
		/** handle arguments **/
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
		/** handle arguments **/
		if (!typeof callback === "function") return false;
		/** enumrate over grid **/
		for (var i = 0, clen = grid.length; i < clen; i++) {
			/** enumate over column **/
			for (var j = 0, rlen = grid[i].length; j < rlen; j++) {
				/** fetch tile **/
				var tile = Graph.getTile(grid, i, j);
				/** response **/
				var response = callback(tile);
				/** perform edit **/
				Graph.editTile(grid, i, j, response);
			}
		}
	}

	static editTileKeyValue(grid, column, row, key, value) {
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
		/** handle arguments **/
		if (!grid instanceof Array) return;
		/** itearate through all tiles **/
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

	getTilesByColumn (column, start, target) {
		/** @description: returns item from this grid within subsection **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {start} **/
		/** @param: {target} is type {target} **/
		/** @return: is type {array} **/
		return Graph.getTilesByColumn(this.grid, column, start, target);	
	}

	getTilesByRow (row, start, target) {
		/** @description: returns item from this grid within subsection **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {start} **/
		/** @param: {target} is type {target} **/
		/** @return: is type {array} **/
		return Graph.getTilesByRow(this.grid, row, start, target);	
	}

	getAllAdjacentTiles (tile, copy) {
		/** @description: returns item from this grid **/
		/** @param: {tile} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		return Graph.getAdjacentTiles(this.grid, tile, [].concat.apply(this.directions, ["topleft", "topright", "bottomleft", "bottomright"]), copy);
	}

	getSpecificAdjacentTile (tile, direction, copy) {
		/** @description: returns item from this grid **/
		/** @param: {tile} is type {object} **/
		/** @param: {direction} is type {string} **/
		/** @param: {copy} is type {boolean} **/
		return Graph.getSpecificAdjacentTile(this.grid, tile, direction, copy);
	}

	getTileByCoordinates (x, y, search) {
		/** @description: returns item from grid using supplied x and y coordinates **/
		/** @param: {x} is type {integer} **/
		/** @param: {y} is type {integer} **/
		/** @param: {search} is type {boolean} **/
		/** @return: is type {object} or {boolean:false} **/
		return Graph.getTileByCoordinates(this.grid, this.gridTileWidth, this.gridTileHeight, x, y, search);
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

	setTileKeyValue(grid, column, row, key, value) {
		/** @description: sets found tile key to value **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {key} is type {string} **/
		/** @param: {value} is type {*} **/
		return Graph.setTileKeyValue(this.grid, column, row, key, value);
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