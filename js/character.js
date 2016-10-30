class Character extends Tile {

	tileCollision () {
		/** @description: function for confirmin whether the character has reached the supplied target x and y position **/
		/** confirm that the drawing coordinates for the character and the tile intersect **/
		return (this.x === this.targetX && this.y === this.targetY) ? true : false;
	}

	canMoveTop () {
	 	/** @description: function confirming whether the character can move towards y position target without overshooting **/
		/** @return: is type {boolean} **/
		/** confirm that the top side of the character has collided with the target tile **/
		return this.targetY <= (this.y + this.velocityY) ? true : false;
	}

	canMoveBottom () {
	 	/** @description: function confirming whether the character can move towards y position target without overshooting **/
		/** @return: is type {boolean} **/
		/** confirm that the bottom side of the character has collided with the target tile **/
		return ((this.y + this.gridTileHeight) + this.velocityY) <= this.targetY + this.gridTileHeight ? true : false;
	}

	canMoveLeft () {
	 	/** @description: function confirming whether the character can move towards x position target without overshooting **/
		/** @return: is type {boolean} **/
		/** confirm that the left side of the character has collided with the target tile **/
		return (this.x + this.velocityX) >= this.targetX ? true : false;
	}

	canMoveRight () {
	 	/** @description: function confirming whether the character can move towards x position target without overshooting **/
		/** @return: is type {boolean} **/
		/** confirm that the right side of the character has collided with the target tile **/
		return ((this.x + this.gridTileWidth) + this.velocityX) <= this.targetX + this.gridTileWidth ? true : false;
	}

	canMove () {
		/** @description: function for confirming whether the character can move towards the direction with supplied velocity **/
		/** @return: is type {boolean} **/
		if (!this.velocityX && !this.velocityY) return false;
		/** confirm which direction has velocity and return result of movement attempt **/
		return this.velocityX ? this.velocityX > 0 ? this.canMoveRight() : this.canMoveLeft() : this.velocityY > 0 ? this.canMoveBottom() : this.canMoveTop();
	}

	moveComplete () {
		/** @description: base movement handler for setting next movement **/
		/** confirm that character can still move and exit function after clearing, updating position and redrawing **/
		if (this.canMove()) return this.incrementCoordinatePosition(this.velocityX, this.velocityY);
		/** confirm that character has intersected its destination tile **/
		return this.tileCollision();
	}

	getVelocityIntegers (integers) {
	 	/** @description: function for obtaining character speed as an integer from direction integers **/
	 	/** @param: {integers} is type {object} **/
		/** set and return velocity object based on direction integers; object contains both x and y offsets **/
		return 0 !== integers.x ? integers.x < 0 ? integers.x = -this.speed : integers.x = this.speed : integers.y < 0 ? integers.y = -this.speed : integers.y = this.speed, integers;
	}

	getVelocityIntegersFromTile (position) {

		var x = this.column === position.column ? 0 : this.column > position.column ? -this.speed : this.speed;
		var y = this.row === position.row ? 0 : this.row > position.row ? -this.speed : this.speed;

		return { x: x, y: y };
	}

	setVelocityIntegers (velocityX, velocityY) {
	 	/** @description: function for setting characters velocity by supplied integers **/
	 	/** @param: {velocityX} is type {integer} **/
	 	/** @param: {velocityY} is type {integer} **/
		/** set this characters x velocity to defined integer or float **/
		this.velocityX = velocityX;
		/** set this characters y velocity to defined integer or float **/
		this.velocityY = velocityY;
	}

	setTargetCoordinatePosition (x, y) {
	 	/** @description: function for setting characters next target position by supplied integers **/
		/** @param: {x} is type {integer} **/
	 	/** @param: {y} is type {integer} **/
		/** set this current target x position to new target x position **/
		this.targetX = x;
		/** set this current target y position to new targety position **/
		this.targetY = y;
	}

	setGridReference (column, row) {
	 	/** @description: function for setting characters position within tile map grid by supplied integers **/
		/** @param: {column} is type {integer} **/
	 	/** @param: {row} is type {integer} **/
		/** set this characters column position within grid to new column position **/
		this.column = column;
		/** set this characters row position within grid to new row position **/
		this.row = row;
	}

	incrementCoordinatePosition (x, y) {
	 	/** @description: function for incrimenting characters position by supplied integers **/
	 	/** @param: {x} is type {integer} **/
	 	/** @param: {y} is type {integer} **/
		/** increment this current x position by the value of supplied x position **/
		this.x = this.x + x;
		/** increment this current y position by the value of supplied y position **/
		this.y = this.y + y;
	}

	randomNextTile (grid) {
		/** @description: function for letting character randomly path **/
		/** @param: {grid} is type {array} **/
		/** confirm that character can still move and exit function after clearing, updating position and redrawing **/
		if (this.moveComplete()) {
			/** reset character velocities to prevent additional movement **/
			this.setVelocityIntegers(0, 0);
			/** get and set direction for next tile selection **/
			var direction = Graph.getRandomDirectionString(this.directions);
			/** attempt to get tile from character position **/
			var tile = Graph.getSpecificAdjacentTile(grid, { x: this.x, y: this.y, column: this.column, row: this.row }, direction);
			/** exit function if tile cannot be found or used **/
			if (!tile || !tile.walkable) return;
			/** set velocity integers for corner check and movement **/
			var velocity = this.getVelocityIntegers(Graph.getDirectionIntegers(direction));
			/** set movement velocity **/
			this.setVelocityIntegers(velocity.x, velocity.y);
			/** set character position within grid columns and rows **/
			this.setGridReference(tile.column, tile.row);
			/** set tile to new destination tile **/
			this.setTargetCoordinatePosition(tile.x, tile.y);
		}
	}

	eatTiles () {
		/** @description: function for letting character path through supplied tiles **/
		/** @return: is type {boolean} **/
		/** confirm if path exists or path has been consumed return true for handler **/
		if (!this.path || !this.path.length) return true;
		/** contine **/
		if (this.moveComplete()) {
			/** attempt to get tile from character position **/
			var tile = this.path.shift();
			/** set velocity integers for corner check and movement **/
			var velocity = this.getVelocityIntegersFromTile(tile);
			/** set movement velocity **/
			this.setVelocityIntegers(velocity.x, velocity.y);
			/** set character position within grid columns and rows **/
			this.setGridReference(tile.column, tile.row);
			/** set tile to new destination tile **/
			this.setTargetCoordinatePosition(tile.x, tile.y);
		}
		/** return false for handler **/
		return false;
	}

	__character__ (config) {
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** set target x **/
		this.targetX = config.targetX ? config.targetX : this.targetX ? this.targetX : this.x;
		/** set target y **/
		this.targetY = config.targetY ? config.targetY : this.targetY ? this.targetY : this.y;
		/** set velocity x **/
		this.velocityX = config.velocityX ? config.velocityX : this.velocityX ? this.velocityX : 0;
		/** set velocity y **/
		this.velocityY = config.velocityY ? config.velocityY : this.velocityY ? this.velocityY : 0;
		/** set speed **/
		this.speed = config.speed ? config.speed : this.speed ? this.speed : 1;
		/** set directions **/
		this.directions = ["top", "right", "bottom", "left"];
		/** set base colour **/
		this.baseColour = config.baseColour ? config.baseColour : this.baseColour ? this.baseColour : Canvas.RGB(255, 0, 0);
		/** set path colour **/
		this.pathColour = config.pathColour ? config.pathColour : this.pathColour ? this.pathColour : Canvas.RGB(255, 255, 0);
		/** set starting tile colour **/
		this.startColour = config.startColour ? config.startColour : this.startColour ? this.startColour : Canvas.RGB(100, 255, 255);
		/** set target tile colour **/
		this.targetColour = config.targetColour ? config.targetColour : this.targetColour ? this.targetColour : Canvas.RGB(0, 255, 100);
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** ensure init **/
		config.__init__ = true;
		/** call super, but with trimmed object to avoid inherited map tile costs if assigned **/
		super(Base.__trim__(config, ["__class__", "f", "g", "closed", "cost", "open", "h", "visited", "opened", "parent", "walkable"]));
		/** set call to this definition handler **/
		this.__character__(config);
	}
}