class Character extends Tile {

	/*
		* about class: character object for game characters building on Grid instance data and Tiles base class

		* constructor parameters:
			config: typeof Object {}
				required object origin: [GridClassInstance].__this__();
	*/


	tileCollision () {
		/** confirm that the drawing coordinates for the character and the tile intersect **/
		return (this.x === this.targetX && this.y === this.targetY) ? true : false;
	}

	canMoveTop () {
		/** confirm that the top side of the character has collided with the target tile **/
		return this.targetY <= (this.y + this.velocityY) ? true : false;
	}

	canMoveBottom () {
		/** confirm that the bottom side of the character has collided with the target tile **/
		return ((this.y + this.height) + this.velocityY) <= this.targetY + this.height ? true : false;
	}

	canMoveLeft () {
		/** confirm that the left side of the character has collided with the target tile **/
		return (this.x + this.velocityX) >= this.targetX ? true : false;
	}

	canMoveRight () {
		/** confirm that the right side of the character has collided with the target tile **/
		return ((this.x + this.width) + this.velocityX) <= this.targetX + this.width ? true : false;
	}

	canMove () {
		/** confirm for the axis that the character can move **/
		return this.velocityX || this.velocityY ? 0 !== this.velocityX ? this.velocityX < 0 ? this.canMoveLeft() : this.canMoveRight() : this.velocityY < 0 ? this.canMoveTop() : this.canMoveBottom() : false;
	}

	getRandomDirectionString () {
		/** set and return random string from selection **/
		return this.directions[Math.floor(Math.random() * this.directions.length)];
	}

	getDirectionIntegers (direction) {
		/** set and return direction object based on direction string; object contains both x and y offsets **/
		return "top" === direction ? {x: 0, y: -1} : "right" === direction ? {x: 1, y: 0} : "bottom" === direction ? {x: 0, y: 1} : {x: -1, y: 0};
	}

	getVelocityIntegers (integers) {
		/** set and return velocity object based on direction integers; object contains both x and y offsets **/
		return 0 !== integers.x ? integers.x < 0 ? integers.x = -this.speed : integers.x = this.speed : integers.y < 0 ? integers.y = -this.speed : integers.y = this.speed, integers;
	}

	getAdjacentTiles (map) {
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
		/** set offset integers to find tile next to character **/
		var integers = this.getDirectionIntegers(direction);
		/** attempt to find tile **/
		var tile = map.getTile(this.column + integers.x, this.row + integers.y);
		/** return tile data **/
		return tile;
	}

	getRandomAjacentTile (map) {
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
		/** increment this current x position by the value of supplied x position **/
		this.x = this.x + x;
		/** increment this current y position by the value of supplied y position **/
		this.y = this.y + y;
	}

	setTargetCoordinatePosition (x, y) {
		/** set this current target x position to new target x position **/
		this.targetX = x;
		/** set this current target y position to new targety position **/
		this.targetY = y;
	}

	setVelocityIntegers (velocityX, velocityY) {
		/** set this characters x velocity to defined integer or float **/
		this.velocityX = velocityX;
		/** set this characters y velocity to defined integer or float **/
		this.velocityY = velocityY;
	}

	setCoordinatePosition (x, y) {
		/** set this current x position to new x position **/
		this.x = x;
		/** set this current y position to new y position **/
		this.y = y;
	}

	setGridReference (column, row) {
		/** set this characters column position within grid to new column position **/
		this.column = column;
		/** set this characters row position within grid to new row position **/
		this.row = row;
	}

	g (map) {
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
	
	constructor (config) {
		/** set base object for constructor **/
		config = config || {};
		/** super will configure the matrix if not defined **/
		super(config);
		/** set class image source reference from config object **/
		this.imageSource = config.imageSource || "";
		/** set class tile type from config object **/
		this.tileType = "character";
		/** set class base colour from config object **/
		this.tileBaseColour = config.tileBaseColour || "rgb(0, 255, 255)";
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
	}
}