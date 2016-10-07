class Tiles extends Grid {

	/*
		* about class: create map array containing object data based on Grid data

		* constructor parameters:
			config: typeof Object {}
				required object origin: [GridClassInstance].__this__();

		* example initialisation:
			config:
				var config = Object.assign(new Grid().__this__(), { map: [[]], directions: ["top", "right", "bottom", "left"] });
			class:
				var tiles = new Tiles(config);
	*/

	getRandomDirectionString () {
		  /****************************************************************************/
	 	 /** function for selecting random direction string from defined directions **/
		/****************************************************************************/
		/** set and return random string from selection **/
		return this.directions[Math.floor(Math.random() * this.directions.length)];
	}

	getDirectionIntegers (direction) {
		  /***********************************************************************************/
	 	 /** function for obtaining tiles column and row offsets as an integer from string **/
		/***********************************************************************************/
		/** set and return direction object based on direction string; object contains both x and y offsets **/
		return "top" === direction ? {x: 0, y: -1} : "right" === direction ? {x: 1, y: 0} : "bottom" === direction ? {x: 0, y: 1} : {x: -1, y: 0};
	}

	getAdjacentTiles (tile) {
		  /***************************************************************/
	 	 /** function for obtaining tiles surrounding tile within grid **/
		/***************************************************************/
		/** set base array to hold found tiles **/
		var tiles = [];
		/** iterate over direction options **/
		for (var i = 0, len = this.directions.length; i < len; i++) {
			/** append tile data to array **/
			tiles.push(this.getSpecificAdjacentTile(this.directions[i], tile));
		};
		/** return tiles and their data **/
		return tiles;
	}

	getSpecificAdjacentTile (direction, tile) {
		  /******************************************************************************************************/
	 	 /** function for obtaining specific tile within grid from supplied direction string adjacent to tile **/
		/******************************************************************************************************/
		/** set offset integers to find tile next to supplied tile **/
		var integers = this.getDirectionIntegers(direction);
		/** attempt to find tile **/
		var tile = this.getTile(tile.column + integers.x, tile.row + integers.y);
		/** return tile data **/
		return tile;
	}

	getAdjacentFilteredTiles (tile) {
		  /******************************************************************************************************/
	 	 /** function for reducing array of tiles based on whether they were found in the grid and are usable **/
		/******************************************************************************************************/
		/** return reduced filtered array from adjacent tiles from tile source **/
		return this.getAdjacentTiles(tile).filter(function (i) { return i && i.canUseTile ? i : !1; });
	}

	getAdjacentHeuristicTiles (tile) {
		  /******************************************************************************************************************************************/
	 	 /** function for reducing array of tiles based on whether they were found in the grid and are usable as well as heuristically calculated **/
		/******************************************************************************************************************************************/
		/** return reduced filtered array from adjacent tiles from tile source **/
		return this.getAdjacentTiles(tile).filter(function (i) { return i && i.canUseTile && i.heuristic !== undefined ? i : !1; });
	}

	getSurroundingTiles (tile) {
		  /*******************************************************************/
	 	 /** function for obtaining all tiles surrounding tile within grid **/
		/*******************************************************************/
		/** set offset integers to fine tile next to supplied tile **/
		var integers = [{x: -1, y:-1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}];
		/** set base array to hold found tiles **/
		var tiles = [];
		/** iteraver over directions **/
		for (var i = 0, len = integers.length; i < len; i++) {
			/** append item to tiles array **/
			tiles.push(this.getTile(tile.column + integers[i].x, tile.row + integers[i].y));
		}
		/** return tile data **/
		return tiles;
	}

	getTile (column, row) {
		  /***************************************************************************/
	 	 /** function for obtaining tile within grid using column and row integers **/
		/***************************************************************************/
		/** confirm that object was found in map column **/
		if (this.map[column]) {
			/** confirm that object was found in map column and row and return object **/
			if (this.map[column][row]) return this.map[column][row];
		}
		/** failed outcome **/
		return false;
	}

	getTiles (callback) {
		  /************************************************************************************/
	 	 /** function for collecting all tiles within grid and processing them individually **/
		/************************************************************************************/
		/** iterate over the defined columns of the map **/
		for (var column = 0; column < this.columns; column++) {
			/** iterate over the defined rows of the map **/
			for (var row = 0; row < this.rows; row++) {
				/** process the tile with callback **/
				if (callback) callback(this.map[column][row]);
			}
		}
	}

	getTileDepthSearch (column, index) {
		  /***************************************************************/
	 	 /** function to search row for usable tile until out of range **/
		/***************************************************************/
		if (!Queue || isNaN(column) || isNaN(index)) return false;
		/** ensure within search **/
		if (!this.map[column] || !this.map[column][index]) return false;
		/** process queue **/
		return new Queue(this.map[column].slice(index, this.map.length)).process(function (tile) { return typeof tile === "object" && tile.canUseTile ? tile : !1; });
	}

	getRandomColumn () {
		  /***************************************************************************/
	 	 /** function selecting a random tile within the supplied or base grid map **/
		/***************************************************************************/
		/** return result of random column selection **/
		return this.map[(Math.floor(Math.random() * ((this.columns - 1) - 0 + 1)) + 0)];
	}

	getRandomColumnInt () {
		  /**********************************************************************/
	 	 /** function returning random column integer from length of grid map **/
		/**********************************************************************/
		return (Math.floor(Math.random() * ((this.columns - 1) - 0 + 1)) + 0);
	}

	getRandomRow (column) {
		  /*************************************************************************/
	 	 /** function for editing tile within grid using column and row integers **/
		/*************************************************************************/
		/** return result of random tile selection **/
		return this.getTile(column, (Math.floor(Math.random() * ((this.rows - 1) - 0 + 1)) + 0));
	}

	getRandomRowInt () {
		  /*******************************************************************/
	 	 /** function returning random row integer from height of grid map **/
		/*******************************************************************/
		return (Math.floor(Math.random() * ((this.rows - 1) - 0 + 1)) + 0);
	}

	getRandomTile () {
		  /***************************************************************************/
	 	 /** function selecting a random tile within the supplied or base grid map **/
		/***************************************************************************/
		/** return result of random tile selection **/
		return this.getTile((Math.floor(Math.random() * ((this.columns - 1) - 0 + 1)) + 0), (Math.floor(Math.random() * ((this.rows - 1) - 0 + 1)) + 0));
	}

	editTile (column, row, method) {
		  /*************************************************************************/
	 	 /** function for editing tile within grid using column and row integers **/
		/*************************************************************************/
		/** set map column row item to be the result of the returned data from the callback or the object **/
		this.map[column][row] = (typeof method === "function") ? method({ columns: this.columns, rows: this.rows, scale: this.scale, gridWidth: this.gridWidth, gridHeight: this.gridHeight, column: column, row: row, self: this.map[column][row] }) : method;
	}

	editTiles (callback) {
		  /************************************************/
	 	 /** function for editing all tiles within grid **/
		/************************************************/
		/** iterate over the defined columns of the map **/
		for (var column = 0; column < this.columns; column++) {
			/** iterate over the defined rows of the map **/
			for (var row = 0; row < this.rows; row++) {
				/** edit the tile **/
				if (callback) this.editTile(column, row, callback);
			}
		}
	}

	create (config) {
		  /***************************************************************************/
	 	 /** function for creating tile map array with base or defined class tiles **/
		/***************************************************************************/
		/** set base config object if undefined **/
		config = config || {};
		/** set base tile object if undefined **/
		config.tile = config.tile || {};
		/** set base class object if undefined; attempt to use map tile otherwise use nothing **/
		config.tile.class = config.tile.class || MapTile || false;
		/** set base config object for class if undefined **/
		config.tile.config = config.tile.config || {};
		/** set array for collection of columns based on grid columns total **/
		var columns = [];
		/** iterate over columns total **/
		for (var column = 0; column < this.columns; column++) {
			/** set array for rows within current column **/
			var rows = [];
			/** iterate over rows total **/
			for (var row = 0; row < this.rows; row++) {
				/** set base config for use within row array position **/
				var c = Object.assign({ column: column, row: row }, this.__this__());
				/** extend c with config object **/
				c = Object.assign(c, config.tile.config);
				/** confirm the existence of a tile class and redefine c to class instance **/
				if (config.tile.class) c = new config.tile.class(c);
				/** append c to row position **/
				rows.push(c);
			}
			/** append rows to columns **/
			columns.push(rows);
		}
		/** return complete 2d array (grid [column[row]]) **/
		return columns;
	}

	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** set base object for constructor **/
		config = config || {};
		/** super will configure the matrix if not defined **/
		super(config);
		/** set class map array data from super config **/
		this.map = config.map || this.create({ tile: { class: config.class, config: config.config } });
		/** set class character moveable directions **/
		this.directions = config.directions || ["top", "right", "bottom", "left"];
	}
}