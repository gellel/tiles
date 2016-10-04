class Character extends Tile {

	/*
		* about class: character object for game characters building on Grid instance data and Tiles base class

		* constructor parameters:
			config: typeof Object {}
				required object origin: [GridClassInstance].__this__();

		* example initialisation:
			config:
				var config = Object.assign(new Grid().__this__(), { imageSource: "path/to/img/file/pic.jpg", tileBaseColour: "orange", directions: ["top", "right", "bottom", "left"], speed: 1, plotted: [{tileMapObject}] });
			class:
				var grid = new Character(config);
	*/


	tileCollision () {
		  /***************************************************************************************************/
	 	 /** function for confirmin whether the character has reached the supplied target x and y position **/
		/***************************************************************************************************/
		/** confirm that the drawing coordinates for the character and the tile intersect **/
		return (this.x === this.targetX && this.y === this.targetY) ? true : false;
	}

	canMoveTop () {
		  /*******************************************************************************************************/
	 	 /** function confirming whether the character can move towards y position target without overshooting **/
		/*******************************************************************************************************/
		/** confirm that the top side of the character has collided with the target tile **/
		return this.targetY <= (this.y + this.velocityY) ? true : false;
	}

	canMoveBottom () {
		  /*******************************************************************************************************/
	 	 /** function confirming whether the character can move towards y position target without overshooting **/
		/*******************************************************************************************************/
		/** confirm that the bottom side of the character has collided with the target tile **/
		return ((this.y + this.height) + this.velocityY) <= this.targetY + this.height ? true : false;
	}

	canMoveLeft () {
		  /*******************************************************************************************************/
	 	 /** function confirming whether the character can move towards x position target without overshooting **/
		/*******************************************************************************************************/
		/** confirm that the left side of the character has collided with the target tile **/
		return (this.x + this.velocityX) >= this.targetX ? true : false;
	}

	canMoveRight () {
		  /*******************************************************************************************************/
	 	 /** function confirming whether the character can move towards x position target without overshooting **/
		/*******************************************************************************************************/
		/** confirm that the right side of the character has collided with the target tile **/
		return ((this.x + this.width) + this.velocityX) <= this.targetX + this.width ? true : false;
	}

	canMove () {
		  /*********************************************************************************************************/
	 	 /** function for confirming whether the character can move towards the direction with supplied velocity **/
		/*********************************************************************************************************/
		/** confirm for the axis that the character can move **/
		return this.velocityX || this.velocityY ? 0 !== this.velocityX ? this.velocityX < 0 ? this.canMoveLeft() : this.canMoveRight() : this.velocityY < 0 ? this.canMoveTop() : this.canMoveBottom() : false;
	}

	getRandomDirectionString () {
		  /*****************************************************************************************/
	 	 /** function for selecting direction string for assigning character movement assignment **/
		/*****************************************************************************************/
		/** set and return random string from selection **/
		return this.directions[Math.floor(Math.random() * this.directions.length)];
	}

	getDirectionIntegers (direction) {
		  /**************************************************************************/
	 	 /** function for obtaining character direction as an integer from string **/
		/**************************************************************************/
		/** set and return direction object based on direction string; object contains both x and y offsets **/
		return "top" === direction ? {x: 0, y: -1} : "right" === direction ? {x: 1, y: 0} : "bottom" === direction ? {x: 0, y: 1} : {x: -1, y: 0};
	}

	getVelocityIntegers (integers) {
		  /**********************************************************************************/
	 	 /** function for obtaining character speed as an integer from direction integers **/
		/**********************************************************************************/
		/** set and return velocity object based on direction integers; object contains both x and y offsets **/
		return 0 !== integers.x ? integers.x < 0 ? integers.x = -this.speed : integers.x = this.speed : integers.y < 0 ? integers.y = -this.speed : integers.y = this.speed, integers;
	}

	getNextTileDirection (tile) {
		  /**************************************************************************************/
	 	 /** function for obtaining character direction as a string from supplied tile object **/
		/**************************************************************************************/
		/** set and return result from tile position **/
		return tile.column === this.column ? tile.row < this.row ? "top" : "bottom" : tile.column < this.column ? "left" : "right";
	}

	getAdjacentTiles (map) {
		  /***************************************************************************************************/
	 	 /** function for obtaining tiles surrounding character as current position from supplied tile map **/
		/***************************************************************************************************/
		/** set base array to hold found tiles **/
		var tiles = [];
		/** iterate over direction options **/
		for (var i = 0, len = this.directions.length; i < len; i++) {
			/** append tile data to array **/
			tiles.push(this.getSpecificAdjacentTile(map, this.directions[i]));
		};
		/** return tiles and their data **/
		return tiles;
	}

	getSpecificAdjacentTile (map, direction) {
		  /****************************************************************************/
	 	 /** function for selecting nearby tile with direction string from tile map **/
		/****************************************************************************/
		/** set offset integers to find tile next to character **/
		var integers = this.getDirectionIntegers(direction);
		/** attempt to find tile **/
		var tile = map.getTile(this.column + integers.x, this.row + integers.y);
		/** return tile data **/
		return tile;
	}

	getRandomAjacentTile (map) {
		  /***********************************************************************/
	 	 /** function for selecting random nearby adjacent tiles from tile map **/
		/***********************************************************************/
		/** collect array of tiles near character **/
		var tiles = this.getAdjacentTiles(map).filter(function (i) { if (i) return i });
		/** set temporary array to hold filtered from object values **/
		var filtered = [];
		/** iterate over tiles object **/
		for (var key in tiles) {
			/** confirm that tile was found for direction **/
			if (tiles[key]) {
				/** confirm that tile can be used **/
				if (tiles[key].canUseTile) {
					/** add item to array of usable items **/
					filtered.push(tiles[key]);
				}
			}
		};
		/** set and return object from filtered array with random direction from length **/
		return filtered[Math.floor(Math.random() * filtered.length)];
	}

	incrementCoordinatePosition (x, y) {
		  /************************************************************************/
	 	 /** function for incrimenting characters position by supplied integers **/
		/************************************************************************/
		/** increment this current x position by the value of supplied x position **/
		this.x = this.x + x;
		/** increment this current y position by the value of supplied y position **/
		this.y = this.y + y;
	}

	setTargetCoordinatePosition (x, y) {
		  /*******************************************************************************/
	 	 /** function for setting characters next target position by supplied integers **/
		/*******************************************************************************/
		/** set this current target x position to new target x position **/
		this.targetX = x;
		/** set this current target y position to new targety position **/
		this.targetY = y;
	}

	setVelocityIntegers (velocityX, velocityY) {
		  /*******************************************************************/
	 	 /** function for setting characters velocity by supplied integers **/
		/*******************************************************************/
		/** set this characters x velocity to defined integer or float **/
		this.velocityX = velocityX;
		/** set this characters y velocity to defined integer or float **/
		this.velocityY = velocityY;
	}

	setCoordinatePosition (x, y) {
		  /*******************************************************************/
	 	 /** function for setting characters position by supplied integers **/
		/*******************************************************************/
		/** set this current x position to new x position **/
		this.x = x;
		/** set this current y position to new y position **/
		this.y = y;
	}

	setGridReference (column, row) {
		  /****************************************************************************************/
	 	 /** function for setting characters position within tile map grid by supplied integers **/
		/****************************************************************************************/
		/** set this characters column position within grid to new column position **/
		this.column = column;
		/** set this characters row position within grid to new row position **/
		this.row = row;
	}

	g (map) {
		  /***************************************************************************/
	 	 /** function for plotting characters movement using random tile selection **/
		/***************************************************************************/
		/** confirm that character can still move and exit function after clearing, updating position and redrawing **/
		if (this.canMove()) return this.incrementCoordinatePosition(this.velocityX, this.velocityY);
		/** confirm that character has intersected its destination tile **/
		if (this.tileCollision()) {
			/** reset character velocities to prevent additional movement **/
			this.setVelocityIntegers(0, 0);
			/** get and set direction for next tile selection **/
			var direction = this.getRandomDirectionString();
			/** attempt to get tile from character position **/
			var tile = this.getSpecificAdjacentTile(map, direction);
			/** exit function if tile cannot be found or used **/
			if (!tile || !tile.canUseTile) return;
			/** set velocity integers for corner check and movement **/
			var velocity = this.getVelocityIntegers(this.getDirectionIntegers(direction));
			/** set movement velocity **/
			this.setVelocityIntegers(velocity.x, velocity.y);
			/** set character position within grid columns and rows **/
			this.setGridReference(tile.column, tile.row);
			/** set tile to new destination tile **/
			this.setTargetCoordinatePosition(tile.x, tile.y);
		}
	}

	p (map) {
		  /****************************************************************************************/
	 	 /** function for plotting characters movement towards target position using path class **/
		/****************************************************************************************/
		/** confirm that character can still move and exit function after clearing, updating position and redrawing **/
		if (this.canMove()) return this.incrementCoordinatePosition(this.velocityX, this.velocityY);
		/** confirm that character has intersected its destination tile **/
		if (this.tileCollision()) {
			/** reset character velocities to prevent additional movement **/
			this.setVelocityIntegers(0, 0);
			/** collect tiles relative to character position **/
			var tiles = this.getAdjacentTiles(map).filter(function (i) { return i && i.canUseTile ? i : false });
			/** reduce heuristic value **/
			var res = Math.min.apply(Math, tiles.map(function(i){ return i.heuristic; }))
			/** reduce tiles from heuristic **/
			var tile = tiles.find(function(i) { return i.heuristic === res; });

			if (!tile || tile.heuristic === 0) return;

			/** set velocity integers for corner check and movement **/
			var velocity = this.getVelocityIntegers(this.getDirectionIntegers(this.getNextTileDirection(tile)));
			/** set movement velocity **/
			this.setVelocityIntegers(velocity.x, velocity.y);
			/** set character position within grid columns and rows **/
			this.setGridReference(tile.column, tile.row);
			/** set tile to new destination tile **/
			this.setTargetCoordinatePosition(tile.x, tile.y);
		}
	}

	c () {
		  /************************************************************************************************/
	 	 /** function for consuming characters movement path towards target position using defined path **/
		/************************************************************************************************/
		if (this.canMove()) return this.incrementCoordinatePosition(this.velocityX, this.velocityY);
		/** confirm that character has intersected its destination tile **/
		if (this.tileCollision()) {
			/** reset character velocities to prevent additional movement **/
			this.setVelocityIntegers(0, 0);
			/** **/
			if (!this.path || !this.path.length) return;
			/** set tile from plotted path **/
			var tile = this.path.shift();
			/** set velocity integers for corner check and movement **/
			var velocity = this.getVelocityIntegers(this.getDirectionIntegers(this.getNextTileDirection(tile)));
			/** set movement velocity **/
			this.setVelocityIntegers(velocity.x, velocity.y);
			/** set character position within grid columns and rows **/
			this.setGridReference(tile.column, tile.row);
			/** set tile to new destination tile **/
			this.setTargetCoordinatePosition(tile.x, tile.y);
		}
	}
	
	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** set base object for constructor **/
		config = config || {};
		/** super will configure the matrix if not defined **/
		super(config);
		/** set class image source reference from config object **/
		this.imageSource = config.imageSource || "";
		/** set class tile type from config object **/
		this.tileType = "character";
		/** set class base colour from config object **/
		this.tileBaseColour = config.tileBaseColour || Canvas.RGB(Canvas.INT(), Canvas.INT(), Canvas.INT()) || "rgb(0, 255, 255)";
		/** set class path colour from config object **/
		this.tilePathColour = config.tilePathColour || Canvas.RGBA(Canvas.INT(), Canvas.INT(), Canvas.INT(), "0.5") || "rgba(255, 0, 255, 0.5)";
		/** set class path colour from config object **/
		this.tileStartColour = config.tileStartColour || Canvas.RGBA(Canvas.INT(), Canvas.INT(), Canvas.INT(), "1") || "rgba(155, 220, 155, 1)";
		/** set class target colour from config object **/
		this.tileTargetColour = config.tileTargetColour || Canvas.RGBA(Canvas.INT(), Canvas.INT(), Canvas.INT(), "1") || "rgba(255, 110, 55, 1)";
		/** set class character moveable directions **/
		this.directions = config.directions || ["top", "right", "bottom", "left"];
		/** set class character base movement speed **/
		this.speed = config.speed || 1;
		/** set class character base x velocity **/
		this.velocityX = 0;
		/** set class character base y velocity **/
		this.velocityY = 0;
		/** set class character base target x position **/
		this.targetX = this.x;
		/** set class character base target y position **/
		this.targetY = this.y;
		/** set class character base path **/
		this.path = config.path || [];
		/** set class character first tile **/
		this.startTile = config.startTile || "startTileIsGridPosition";
		/** set class target tile **/
		this.targetTile = config.targetTile || "targetTileIsUnknown"; 
	}
}