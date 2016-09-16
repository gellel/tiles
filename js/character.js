class character {

	getDirectionCheck (direction) {
		return "top" === direction ? "canMoveTop" : "right" === direction ? "canMoveRight" : "bottom" === direction ? "canMoveBottom" : "canMoveLeft";	
	}

	getDirectionIntegers (direction) {
		/** set and return object based on direction string; object contains both x and y offsets **/
		return "top" === direction ? {x: 0, y: -1} : "right" === direction ? {x: 1, y: 0} : "bottom" === direction ? {x: 0, y: 1} : {x: -1, y: 0};
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
		var tile = map.getTile(this.col + integers.x, this.row + integers.y);
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
				if (tiles[key].canuse) {
					/** add item to array of usable items **/
					filtered.push(tiles[key]);
				}
			}
		};
		/** set and return object from filtered array with random direction from length **/
		return filtered[Math.floor(Math.random() * filtered.length)];
	}

	selectRandomDirectionString () {
		/** set and return random string from selection **/
		return this.directions[Math.floor(Math.random() * this.directions.length)];
	}

	canMoveTop () {
		return this.y + this.velocityY > this.tile.y ? true : false;
	}

	canMoveBottom () {
		return this.tile.y + this.tile.height > this.y + this.height + this.velocityX ? true : false;
	}
	canMoveLeft () {
		return this.x + this.velocityX > this.tile.x ? true : false;
	}

	canMoveRight () {
		return this.tile.x + this.tile.width >= this.x + this.width + this.velocityX ? true : false;
	}

	canMove () {
		return (this.x !== this.tile.x) ? ((this.x < this.tile.x) ? this.canMoveLeft() : this.canMoveRight()) : ((this.y > this.tile.y) ? this.canMoveTop() : this.canMoveBottom());		
	}


	tileCorners (tile) {
		/** get true corners according to canvas for tile suppled **/
		return { top: tile.y, right: tile.x + tile.width, bottom: tile.y + tile.height, left: tile.x };
	}

	tileCollision () {
		return (this.x === this.tile.x && this.y === this.tile.y) ? true : false;
	}

	move (map) {

		this.clear();
		
		this.tile = this.getRandomAjacentTile(map);
		//this.tile = this.getSpecificAdjacentTile(map, "bottom");

		this.updatePosition(this.tile.x, this.tile.y);

		this.updateGrid(this.tile.col, this.tile.row);

		this.draw();
	}

	incrementPosition (x, y) {
		/** increment this current x position by the value of supplied x position **/
		this.x = this.x + x;
		/** increment this current y position by the value of supplied y position **/
		this.y = this.y + y;
	}


	updateVelocity (velocityX, velocityY) {
		/** set this characters x velocity to defined integer or float **/
		this.velocityX = velocityX;
		/** set this characters y velocity to defined integer or float **/
		this.velocityY = velocityY;
	}

	updatePosition (x, y) {
		/** set this current x position to new x position **/
		this.x = x;
		/** set this current y position to new y position **/
		this.y = y;
	}

	updateGrid (col, row) {
		/** set this characters column position within grid to new column position **/
		this.col = col;
		/** set this characters row position within grid to new row position **/
		this.row = row;
	}

	clear () {
		/** remove current image data from canvas **/
		this.canvas.drawGeometry("clearRect", this.x, this.y, this.width, this.height, { fillStyle: undefined });
	}

	draw () {
		/** draw sample shape to test character position as fillRect **/
		this.canvas.drawGeometry("fillRect", this.x, this.y, this.width, this.height, { fillStyle: this.color || "cyan" });
	}

	constructor (canvas, tile, attributes) {
		/** create self instance of html canvas element **/
		this.canvas = canvas;
		/** create self instance x position **/
		this.x = tile.x;
		/** create self instance y position **/
		this.y = tile.y;
		/** create self instance character width **/
		this.width = tile.width;
		/** create self instance character height **/
		this.height = tile.height;
		/** create self instance x velocity **/
		this.velocityX = attributes.velocityX || 0;
		/** create self instance y velocity **/
		this.velocityY = attributes.velocityY || 0;
		/** create self instance of moveable directions **/
		this.directions = ["top", "right", "bottom", "left"];
		/** create self instance image resource **/
		this.image = attributes.image || "none";
		/** create reference to starting tile **/
		this.tile = tile;
		/** create reference to column in grid **/
		this.col = tile.col;
		/** create reference to row in grid **/
		this.row = tile.row;
	}
}