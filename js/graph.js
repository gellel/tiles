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
		return Base.__object__({ columns: columns, rows: rows, column: column, row: row, x: x, y: y, gridTileWidth: gridTileWidth, gridTileHeight: gridTileHeight, g: g, h: h, f: f, cost: cost || 0, walkable: walkable || true, opened: opened, closed: closed, visited: visited || false, parent: parent, __class__: __class__, __init__: true });
	}

	static getRandomColumnInt (grid) {
		/** @description: returns random integer from grid length **/
		/** @param: {grid} is type {array} **/
		/** @return: is type {integer} **/
		if (!grid instanceof Array) return false;
		/** return item from array length **/
		return Base.__random__(0, grid.length);
	}

	static getRandomRowInt (grid, column) {
		/** @description: returns random integer from grid length **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @return: is type {integer} **/
		if (!grid || !grid instanceof Array || isNaN(column)) return false;
		/** return array item integer **/
		return Base.__random__(0, column);
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
		var row = column.filter(function (tile) { if (Base.__contains__(tile, attributes)) return tile; });
		/** return first **/
		return row;
	}

	static getTileCopy (grid, column, row) {
		/** @description: returns copied item from supplied grid 2d array using column and row to locate items **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(column) || isNaN(row)) return false;
		/** attempt to find item **/
		return (grid[column] && grid[column][row]) ? Base.__object__(grid[column][row]) : false;
	}

	static getRandomTileCopy (grid) {
		/** @description: returns copied item from supplied grid 2d array random column and row to locate items **/
		/** @param: {grid} is type {array} **/
		/** @return: is type {object} **/
		/** handle arguments **/
		if (!grid || !grid instanceof Array) return false;
		/** set base column integer **/
		var column = Graph.getRandomColumnInt(grid);
		/** set base row integer **/
		var row = Graph.getRandomRowInt(grid, column);
		/** return copied object **/
		return Base.__object__(grid[column][row]);
	}

	static getDirectionIntegers (direction) {
		/** @description: returns object with offset column and row integers **/
		/** @param: {direction} is type {string} **/
		/** @return: is type {object} **/
		/** return object **/
		return "top" === direction ? {x: 0, y: -1} : "right" === direction ? {x: 1, y: 0} : "bottom" === direction ? {x: 0, y: 1} : {x: -1, y: 0};
	}

	static getRandomDirectionString (directions) {
		/** @description: returns string for direction lookup **/
		/** @param: {direction} is type {array} **/
		/** @return: is type {object} **/
		/** handle directions requirement **/
		if (!directions || !directions instanceof Array) return false;
		/** return random string from directions **/
		return Base.__random__(0, directions.length, directions);
	}

	static editTile (grid, column, row, config) {
		/** @description: edits array items in 2d array using supplied coordinates and optional array **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {config} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** set base config **/
		config = config || {};
		/** handle requirements **/
		if (!grid instanceof Array || isNaN(column) || isNaN(row) || !config instanceof Object) return false;
		/** fetch tile from copied or this instance **/
		var tile = Graph.getTileCopy(grid, column, row);
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
		for (var i = 0; i < grid.length; i++) {
			/** enumate over column **/
			for (var j = 0; j < grid[i].length; j++) {
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
		return (grid[column] && grid[column][row]) ? copy ? Graph.getTileCopy(grid, column, row) : grid[column][row] : false;
	}

	static getTiles (grid, callback, copy) {
		/** @description: returns item by item from this grid 2d array **/
		/** @param: {grid} is type {array} **/
		/** @param: {callback} is type {function} **/
		/** @param: {copy} is type {boolean} **/
		/** handle requirements **/
		if (!grid instanceof Array || typeof callback !== "function") return false;
		/** enumerate over this grid columns **/
		for (var i = 0; i < grid.length; i++) {
			/** enumerate over this grid rows **/
			for (var j = 0; j < grid[i].length; j++) {
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
		var column = Base.__random__(0, grid.length);
		/** set base row integer **/
		var row = Base.__random__(0, grid[column].length);
		/** attempt to find item **/
		return Graph.getTile(grid, column, row, copy);
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

	static setTileFree (grid, column, row) {
		/** @description: sets found tile to walkable **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		Graph.setTile(grid, column, row, "walkable", true);
	}

	static setTileUsed (grid, column, row) {
		/** @description: sets found tile to unwalkable **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		Graph.setTile(grid, column, row, "walkable", false);
	}

	static setRandomTileUsed () {
		/** @description: sets a random tile in grid to unwalkable **/
		/** fetch random tile **/
		var tile = Graph.getRandomTile(grid);
		/** set tile set tile unwalkable **/
		tile.walkable = false;
	}

	static setRandomTilesUsed (grid, frequencyMax) {
		/** @description: sets random tiles within grid to unwalkable **/
		/** @param: {grid} is type {array} **/
		/** @param: {frequencyMax} is type {integer} **/
		/** set defaults for distribution **/
		/** handle arguments **/
		if (!grid instanceof Array) return false;
		/** set max distribution **/
		frequencyMax = !isNaN(frequencyMax) ? frequencyMax : 5;
		/** enumerate over grid columns **/
		for (var i = 0; i < grid.length; i++) {
			/** enumerate over grid rows **/
			for (var j = 0; j < grid[i].length; j++) {
				/** set base random **/
				var result = Base.__random__(0, frequencyMax);
				/** confirm target was hit **/
				if (result === 0) {
					/** set tile to used **/
					Graph.setTileUsed(grid, i, j);
				}
			}
		}
	}

	static setColumnTilesUsed (grid, column, start, end) {
		/** @description: sets in column in grid to unwalkable from start to offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(column) || isNaN(start) || isNaN(end)) return false;
		/** set column reference **/
		var c = grid[column];
		/** iterate over column **/
		/** confirm start and end points in range **/
		if (c[start] && c[end]) {
			/** enumerate over column **/
			for (var i = start; i < end; i++) {
				/** set tile unsuable **/
				c[i].walkable = false;
			}
		}
	}

	static setRowTilesUsed (grid, row, start, end) {
		/** @description: sets row in grid to unwalkable from start to offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(row) || isNaN(start) || isNaN(end)) return false;
		/** confirm row base reference **/
		if (!grid[0][row]) return false;
		/** confirm column start and end point in range **/
		if (!grid[start] || !grid[end]) return false;
		/** iterate over columns until end, but update row **/
		for (var i = start; i < end; i++) {
			/** set this row within column as unusable **/
			grid[i][row].walkable = false;
		}
	}

	static setTileCost (grid, column, row, cost, overwrite) {
		/** @description: sets found tile to include a cost of movement **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(column) || isNaN(row) || isNaN(cost)) return false;
		/** attempt to find tile **/
		var tile = Graph.getTile(grid, column, row);
		/** confirm found and overwriting is allowed set tile to have cost **/
		if (tile) {
			if (overwrite !== undefined && typeof overwrite === "boolean") {
				tile.cost = cost;
			}
			else if (overwrite !== undefined && typeof overwrite === "number") {
				if (tile.cost === 0 || tile.cost !== overwrite) tile.cost = cost;
			}
		}
	}

	static setRandomTileCost (grid, cost) {
		/** @description: sets a random tile to include a cost of movement **/
		/** @param: {grid} is type {array} **/
		/** @param: {cost} is type {integer} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(cost)) return false;
		/** attempt to find tile **/
		var tile = Graph.getRandomTile(grid);
		/** confirm found and set tile unwalkable **/
		if (tile) tile.cost = cost;
	}

	static setRandomTilesCost (grid, frequencyMax, cost, overwrite) {
		/** @description: sets random tiles within grid to include cost **/
		/** @param: {grid} is type {array} **/
		/** @param: {frequencyMax} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		if (!grid instanceof Array) return false;
		/** set defaults for distribution **/
		frequencyMax = !isNaN(frequencyMax) ? frequencyMax : 5;
		/** set cost tile **/
		cost = !isNaN(cost) ? cost : 1;
		/** enumerate over grid columns **/
		for (var i = 0; i < grid.length; i++) {
			/** enumerate over grid rows **/
			for (var j = 0; j < grid[i].length; j++) {
				/** set base random **/
				var result = Base.__random__(0, frequencyMax);
				/** confirm target was hit **/
				if (result === 0) {
					/** set tile to used **/
					Graph.setTileCost(grid, i, j, cost, overwrite);
				}
			}
		}
	}

	static setColumnTilesCost (grid, column, start, end, cost, overwrite) {
		/** @description: sets in column in grid to inclust cost from grid start to grid offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(column) || isNaN(start) || isNaN(end) || isNaN(cost)) return false;
		/** set column reference **/
		var col = grid[column];
		/** iterate over column **/
		/** confirm start and end points in range **/
		if (col[start] && col[end]) {
			/** enumerate over column **/
			for (var i = start; i < end; i++) {
				/** set tile cost **/
				Graph.setTileCost(grid, column, i, cost, overwrite);
			}
		}
	}

	static setRowTilesCost (grid, row, start, end, cost, overwrite) {
		/** @description: sets row in grid to include cost from grid start to grid offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		/** handle arguments **/
		if (!grid instanceof Array || isNaN(row) || isNaN(start) || isNaN(end) || isNaN(cost)) return false;
		/** confirm row base reference **/
		if (!grid[0][row]) return false;
		/** confirm column start and end point in range **/
		if (!grid[start] || !grid[end]) return false;
		/** iterate over columns until end, but update row **/
		for (var i = start; i < end; i++) {
			/** set this row within column cost **/
			Graph.setTileCost(grid, i, row, columns, overwrite);
		}
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

	getAdjacentTiles (tile, copy) {
		/** @description: returns item from this grid **/
		/** @param: {tile} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		return Graph.getAdjacentTiles(this.grid, tile, this.directions, copy);
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

	setTileFree (column, row) {
		/** @description: sets found tile to unwalkable **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		return Graph.setTileFree(this.grid, column, row);
	}

	setTileUsed (column, row) {
		/** @description: sets found tile to unwalkable **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		return Graph.setTileUsed(this.grid, column, row);
	}

	setRandomTileUsed () {
		/** @description: sets a random tile in grid to unwalkable **/
		return Graph.setRandomTilesUsed(this.grid);
	}

	setRandomTilesUsed (frequencyMax) {
		/** @description: sets random tiles within grid to unwalkable **/
		/** @param: {frequencyMax} is type {integer} **/
		return Graph.setRandomTilesUsed(this.grid, frequencyMax);
	}

	setColumnTilesUsed (column, start, end) {
		/** @description: sets in column in grid to unwalkable from start to offset **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		return Graph.setColumnTilesUsed(this.grid, column, start, end);
	}

	setRowTilesUsed (row, start, end) {
		/** @description: sets row in grid to unwalkable from start to offset **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		return Graph.setRowTilesUsed(this.grid, row, start, end);
	}

	setTileCost (column, row, cost, overwrite) {
		/** @description: sets found tile to include a cost of movement **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		Graph.setTileCost(this.grid, column, row, cost, overwrite);
	}

	setRandomTileCost (cost, overwrite) {
		/** @description: sets a random tile to include a cost of movement **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		return Graph.setRandomTilesCost(this.grid, cost, overwrite);
	}

	setRandomTilesCost (frequencyMax, cost, overwrite) {
		/** @description: sets random tiles within grid to include cost **/
		/** @param: {frequencyMax} is type {integer} **/
		/** @param: {target} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		return Graph.setRandomTilesCost(this.grid, frequencyMax, cost, overwrite);
	}

	setColumnTilesCost (column, start, end, cost, overwrite) {
		/** @description: sets in column in grid to inclust cost from grid start to grid offset **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		return Graph.setColumnTilesCost(this.grid, column, start, end, cost, overwrite);
	}

	setRowTilesCost (row, start, end, cost, overwrite) {
		/** @description: sets row in grid to include cost from grid start to grid offset **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		/** @param: {overwrite} is type {boolean} **/
		return Graph.setRowTilesCost(this.grid, row, start, end, cost, overwrite);
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