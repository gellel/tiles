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
			tiles.push(this.getTile(tile.column + integers[i].x, tile.row + integers[i].y));
		}
		/** return tile data **/
		return tiles;
	}

	getTile () {
		  /***************************************************************************/
	 	 /** function for obtaining tile within grid using column and row integers **/
		/***************************************************************************/
		/** collect arguments and set to the instance **/
		var parameters = Array.prototype.slice.call(arguments);
		/** set map instance from supplied or local map **/
		var map = (typeof parameters[0] === "object") ? parameters.shift() : this.map;
		/** set column from arguments list **/
		var column = parameters.shift();
		/** set row from arguments list **/
		var row = parameters.shift();
		/** confirm map **/
		if (map) {
			/** confirm that object was found in map column **/
			if (map[column]) {
				/** confirm that object was found in map column and row and return object **/
				if (map[column][row]) return map[column][row];
			}
		}
		/** failed outcome **/
		return false;
	}

	getTiles () {
		  /************************************************************************************/
	 	 /** function for collecting all tiles within grid and processing them individually **/
		/************************************************************************************/
		/** collect arguments and set to the instance **/
		var parameters = Array.prototype.slice.call(arguments);
		/** fetch first argument **/
		var arg = parameters[0];
		/** assign array map to variable **/
		var map = (typeof arg !== "function") ? parameters[0] : this.map;
		/** assign function handler to variable **/
		if (typeof parameters.slice(-1)[0] === "function") {
			/** iterate over the defined columns of the map **/
			for (var column = 0; column < this.columns; column++) {
				/** iterate over the defined rows of the map **/
				for (var row = 0; row < this.rows; row++) {
					/** process the tile with callback **/
					parameters.slice(-1)[0](map[column][row]);
				}
			}
		}
	}

	getRandomColumn () {
		  /***************************************************************************/
	 	 /** function selecting a random tile within the supplied or base grid map **/
		/***************************************************************************/
		/** set map to argument or base map of class instance **/
		var map = map || this.map;
		/** set base variable for column from random number selected from tile map **/
		var column = (Math.floor(Math.random() * ((map.length - 1) - 0 + 1)) + 0);
		/** return result of random column selection **/
		return map[column];
	}

	getRandomRow () {
		  /*************************************************************************/
	 	 /** function for editing tile within grid using column and row integers **/
		/*************************************************************************/
		/** collect arguments and set to the instance **/
		var parameters = Array.prototype.slice.call(arguments);
		/** set map instance from supplied or local map **/
		var map = (typeof parameters[0] === "object") ? parameters.shift() : this.map;
		/** set column from arguments list **/
		var column = parameters.shift();
		/** set base variable for row from random number selected from tile map random column **/
		var row = (Math.floor(Math.random() * ((map[column].length -1) - 0 + 1)) + 0);
		/** return result of random tile selection **/
		return this.getTile(map, column, row);
	}

	getRandomTile (map) {
		  /***************************************************************************/
	 	 /** function selecting a random tile within the supplied or base grid map **/
		/***************************************************************************/
		/** set map to argument or base map of class instance **/
		var map = map || this.map;
		/** set base variable for column from random number selected from tile map **/
		var column = (Math.floor(Math.random() * ((map.length - 1) - 0 + 1)) + 0);
		/** set base variable for row from random number selected from tile map random column **/
		var row = (Math.floor(Math.random() * ((map[column].length -1) - 0 + 1)) + 0);
		/** return result of random tile selection **/
		return this.getTile(map, column, row);
	}

	editTile () {
		  /*************************************************************************/
	 	 /** function for editing tile within grid using column and row integers **/
		/*************************************************************************/
		/** collect arguments and set to the instance **/
		var parameters = Array.prototype.slice.call(arguments);
		/** set map instance from supplied or local map **/
		var map = (typeof parameters[0] === "object") ? parameters.shift() : this.map;
		/** set column from arguments list **/
		var column = parameters.shift();
		/** set row from arguments list **/
		var row = parameters.shift();
		/** set method from arguments list **/
		var method = parameters.shift();
		/** set map column row item to be the result of the returned data from the callback or the object **/
		map[column][row] = (typeof method === "function") ? method({ columns: this.columns, rows: this.rows, scale: this.scale, gridWidth: this.gridWidth, gridHeight: this.gridHeight, column: column, row: row, self: map[column][row] }) : method;
	}

	editTiles () {
		  /************************************************/
	 	 /** function for editing all tiles within grid **/
		/************************************************/
		/** collect arguments and set to the instance **/
		var parameters = Array.prototype.slice.call(arguments);
		/** fetch first argument **/
		var arg = parameters[0];
		/** assign array map to variable **/
		var map = (typeof arg !== "function") ? parameters[0] : this.map;
		/** assign function handler to variable **/
		if (typeof parameters.slice(-1)[0] === "function") {
			/** iterate over the defined columns of the map **/
			for (var column = 0; column < this.columns; column++) {
				/** iterate over the defined rows of the map **/
				for (var row = 0; row < this.rows; row++) {
					/** edit the tile **/
					this.editTile(map, column, row, parameters.slice(-1)[0]);
				}
			}
		}
	}

	create () {
		  /***************************************************************************/
	 	 /** function for creating tile map array with base or defined class tiles **/
		/***************************************************************************/
		/** collect arguments and set to the instance **/
		var parameters = Array.prototype.slice.call(arguments);
		/** set empty variable to hold potential constructor function **/
		var construct;
		/** set empty variable to hold potential config object **/
		var config;
		/** iterate over paramaters **/
		for (var key in parameters) {
			switch (typeof parameters[key]) {
				case "function":
					construct = parameters[key];
					break;
				case "object":
					config = parameters[key];
					break;
			};
		}
		/** set base container for returned map **/
		var gridarray = [];
		/** iterate over the defined columns of the map **/
		for (var column = 0; column < this.columns; column++) {
			/** set base container for column in process **/
			var position = [];
			/** iterate over the defined rows of the map **/
			for (var row = 0; row < this.rows; row++) {
				/** create temporary parameter object **/
				var para = Object.assign({ column: column, row: row }, this.__this__());
				/** confirm that config object exists **/
				if (config) {
					/** extend object with configuration object data **/
					para = Object.assign(para, config);
				}
				/** confirm that object constructor exists **/
				if (construct) {
					/** set para to be instance of constructor function **/
					para = new construct(para);
				}
				/** updated column with row data **/
				position.push(para);
			}
			/** append position array to main map **/
			gridarray.push(position);
		}
		/** completed array map returned for handler **/
		return gridarray;
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
		this.map = config.map || this.create(config.class, config.config);
		/** set class character moveable directions **/
		this.directions = config.directions || ["top", "right", "bottom", "left"];
	}
}