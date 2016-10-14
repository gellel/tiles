class Tile extends Base {

	/** @description: base class for grid based items such as map tiles or characters **/

	editTile (grid, column, row, config) {
		/** @description: edits array items in 2d array using supplied coordinates and optional array **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {config} is type {object} **/
		/** @param: {callback} is type {function} **/
		return Graph.editTile(grid, column, row, config);
	}

	editTiles (grid, callback) {
		/** @description: edits all tiles **/
		/** @param: {grid} is type {array} **/
		/** @param: {callback} is type {function} **/
		return Graph.editTiles(grid, callback);
	}

	getTile (grid, column, row, copy) {
		/** @description: returns item from this grid 2d array using column and row to locate items **/
		/** @param: {grid} is type {array} **/
		/** @param: {array} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {copy} is type {boolean} **/
		return Graph.getTile(grid, column, row, copy);
	}

	getTiles (grid, callback, copy) {
		/** @description: returns item by item from this grid 2d array **/
		/** @param: {grid} is type {array} **/
		/** @param: {callback} is type {function} **/
		/** @param: {copy} is type {boolean} **/
		return Graph.getTiles(grid, callback, copy);
	} 

	getRandomTile (grid, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {array} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {object} **/
		return Graph.getRandomTile(grid, copy);
	}

	getAdjacentTiles (grid, tile, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {array} **/
		/** @param: {tile} is type {object} **/
		/** @param: {copy} is type {boolean} **/
		/** @return: is type {array} **/
		return Graph.getAdjacentTiles(grid, tile, this.directions, copy);
	}

	getSpecificAdjacentTile (grid, tile, direction, copy) {
		/** @description: returns item from this grid **/
		/** @param: {grid} is type {array} **/
		/** @param: {tile} is type {object} **/
		/** @param: {direction} is type {string} **/
		/** @param: {copy} is type {boolean} **/
		return Graph.getSpecificAdjacentTile(grid, tile, direction, copy);
	}

	setTileUsed (grid, column, row) {
		/** @description: sets found tile to unwalkable **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		return Graph.setTileUsed(grid, column, row);
	}

	setRandomTileUsed (grid) {
		/** @description: sets a random tile in grid to unwalkable **/
		/** @param: {grid} is type {array} **/
		return Graph.setRandomTilesUsed(grid);
	}

	setRandomTilesUsed (grid, frequencyMax) {
		/** @description: sets random tiles within grid to unwalkable **/
		/** @param: {grid} is type {array} **/
		/** @param: {frequencyMax} is type {integer} **/
		return Graph.setRandomTilesUsed(grid, frequencyMax);
	}

	setColumnTilesUsed (grid, column, start, end) {
		/** @description: sets in column in grid to unwalkable from start to offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		return Graph.setColumnTilesUsed(grid, column, start, end);
	}

	setRowTilesUsed (grid, row, start, end) {
		/** @description: sets row in grid to unwalkable from start to offset **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		return Graph.setRowTilesUsed(grid, row, start, end);
	}

	setTileCost (grid, column, row, cost) {
		/** @description: sets found tile to include a cost of movement **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {row} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		Graph.setTileCost(grid, column, row, cost);
	}

	setRandomTileCost (grid, cost) {
		/** @description: sets a random tile to include a cost of movement **/
		/** @param: {grid} is type {array} **/
		/** @param: {cost} is type {integer} **/
		return Graph.setRandomTilesCost(grid, cost);
	}

	setRandomTilesCost (grid, frequencyMax, cost) {
		/** @description: sets random tiles within grid to include cost **/
		/** @param: {grid} is type {array} **/
		/** @param: {frequencyMax} is type {integer} **/
		/** @param: {target} is type {integer} **/
		return Graph.setRandomTilesCost(grid, frequencyMax, cost);
	}

	setColumnTilesCost (grid, column, start, end, cost) {
		/** @description: sets in column in grid to inclust cost from grid start to grid offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {column} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		return Graph.setColumnTilesCost(grid, column, start, end, cost);
	}

	setRowTilesCost (grid, row, start, end, cost) {
		/** @description: sets row in grid to include cost from grid start to grid offset **/
		/** @param: {grid} is type {array} **/
		/** @param: {row} is type {integer} **/
		/** @param: {start} is type {integer} **/
		/** @param: {end} is type {integer} **/
		/** @param: {cost} is type {integer} **/
		return Graph.setRowTilesCost(grid, row, start, end, cost);
	}

	getLeftPoint () {
	 	/** @description: function for getting tiles left x coordinate **/
		/** return this base x position **/
		return this.x;
	}

	getRightPoint () {
	 	/** @description: function for getting tiles right x coordinate **/
		/** return this base x position from right side **/
		return this.x + this.width;
	}

	getTopPoint () {
	 	/** @description: function for getting tiles top y coordinate **/
		/** return this base y position **/
		return this.y;
	}

	getBottomPoint () {
	 	/** @description: function for getting tiles bottom y coordinate **/
		/** return this base x position from bottom side **/
		return this.y + this.height;
	}

	getPoints () {
	 	/** @description: function for getting all corner coordinates of the tile **/
		/** return all points **/
		return { top: this.getTopPoint(), right: this.getRightPoint(), bottom: this.getBottomPoint(), left: this.getLeftPoint() };
	}

	getTopLeftInsideQuarter () {
	 	/** @description: function for getting tiles top left inside quarter measurements **/
		/** return top left hand side starting inside quarter square; does not calculate x position from canvas position **/
		return { top: 0, right: this.squareWdith / 2, bottom: this.gridTileHeight / 2, left: 0, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getTopRightInsideQuarter () {
	 	/** @description: function for getting tiles top right inside quarter measurements **/
		/** return top right hand side starting inside quarter square; does not calculate x position from canvas position; starts calculation from middle of square **/
		return { top: 0, right: this.width, bottom: this.gridTileHeight / 2, left: this.squareWdith / 2, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getBottomLeftInsideQuarter () {
	 	/** @description: function for getting tiles bottom left inside quarter measurements **/
		/** return bottom left hand side starting inside quarter square; does not calculate x position from canvas position **/
		return { top: this.gridTileHeight / 2, right: this.squareWdith / 2, bottom: this.height, left: 0, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getBottomRightInsideQuarter () {
	 	/** @description: function for getting tiles bottom right inside quarter measurements **/
		/** return bottom right hand side starting inside quarter square; does not calculate x position from canvas position; starts calculation from middle of square **/
		return { top: this.gridTileHeight / 2, right: this.width, bottom: this.gridTileHeight / 2, left: this.squareWdith / 2, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getTopLeftOutsideQuarter () {
	 	/** @description: function for getting tiles top left outside quarter measurements **/
		/** return top left hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y, right: this.getRightPoint() - this.squareWdith / 2, bottom: this.y + this.gridTileHeight / 2, left: this.x, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getTopRightOutsideQuarter () {
	 	/** @description: function for getting tiles top right outside quarter measurements **/
		/** return top right hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y, right: this.getRightPoint(), bottom: this.y + this.gridTileHeight / 2, left: this.x + this.squareWdith / 2, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getBottomLeftOutsideQuarter () {
	 	/** @description: function for getting tiles bottom left outside quarter measurements **/
		/** return bottom left hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y + this.gridTileHeight / 2, right: this.getRightPoint() - this.squareWdith / 2, bottom: this.getBottomPoint(), left: this.x, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getBottomRightOutsideQuarter () {
	 	/** @description: function for getting tiles bottom right outside quarter measurements **/
		/** return bottom right hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y + this.gridTileHeight / 2, right: this.getRightPoint(), bottom: this.getBottomPoint(), left: this.x + this.squareWdith / 2, width: this.squareWdith / 2, height: this.gridTileHeight / 2 };
	}

	getOutsideQuarters () {
	 	/** @description: function for getting all outside quarter coordinates for tile **/
		return { q1: this.getTopLeftOutsideQuarter(), q2: this.getTopRightOutsideQuarter(), q3: this.getBottomLeftOutsideQuarter(), q4: this.getBottomRightOutsideQuarter() };
	}

	getRandomOutsideQuarter () {
	 	/** @description: function for getting random outside quarter coordinate for tile **/
		/** set array of all internal quarters **/
		var quarters = ["getTopLeftOutsideQuarter", "getTopRightOutsideQuarter", "getBottomLeftOutsideQuarter", "getBottomRightOutsideQuarter"];
		/** retrieved selected coordinates constructor **/
		var quarter = quarters[Math.floor(Math.random() * quarters.length)];
		/** return selected coordinates **/
		return this[quarter]();
	}

	setPositionX (x) {
	 	/** @description: function for setting tiles x position by supplied integer **/
	 	/** @param: {x} is type {integer} **/
		/** set position of tile coordinate x **/
		this.x = (x || 0) * (this.gridTileHeight || this.scale);
	}

	setPositionY (y) {
	 	/** @description: function for setting tiles y position by supplied integer **/
	 	/** @param: {y} is type {integer} **/
		/** set position of tile coordinate y **/
		this.y = (y || 0) * (this.gridTileHeight || this.scale);
	}

	__tile__ (config) {
		/** @description: initialised copied grid **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** set base position x **/
		this.x = config.x ? config.x : this.x ? this.x : 0;
		/** set base position y **/
		this.y = config.y ? config.y : this.y ? this.y : 0;
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: config is type {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
		/** set call to this definition handler **/
		this.__tile__(config);
	}
}