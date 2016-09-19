class character {

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
				if (tiles[key].canuse) {
					/** add item to array of usable items **/
					filtered.push(tiles[key]);
				}
			}
		};
		/** set and return object from filtered array with random direction from length **/
		return filtered[Math.floor(Math.random() * filtered.length)];
	}

	getPlottedAdjacentTile (map) {
		/** return next item object **/
		return this.plotted[0];
	}

	selectRandomDirectionString () {
		/** set and return random string from selection **/
		return this.directions[Math.floor(Math.random() * this.directions.length)];
	}

	canMoveTop () {
		/** confirm that the top side of the character has collided with the target tile **/
		return this.tile.y <= (this.y + this.velocityY) ? true : false;
	}

	canMoveBottom () {
		/** confirm that the bottom side of the character has collided with the target tile **/
		return ((this.y + this.height) + this.velocityY) <= this.tile.y + this.tile.height ? true : false;
	}

	canMoveLeft () {
		/** confirm that the left side of the character has collided with the target tile **/
		return (this.x + this.velocityX) >= this.tile.x ? true : false;
	}

	canMoveRight () {
		/** confirm that the right side of the character has collided with the target tile **/
		return ((this.x + this.width) + this.velocityX) <= this.tile.x + this.tile.width ? true : false;
	}

	canMove () {
		/** confirm for the axis that the character can move **/
		return this.velocityX || this.velocityY ? 0 !== this.velocityX ? this.velocityX < 0 ? this.canMoveLeft() : this.canMoveRight() : this.velocityY < 0 ? this.canMoveTop() : this.canMoveBottom() : false;
	}

	tileCorners (tile) {
		/** get true corners according to canvas for tile suppled **/
		return { top: tile.y, right: (tile.x + tile.width), bottom: (tile.y + tile.height), left: tile.x };
	}

	tileCollision () {
		/** confirm that the drawing coordinates for the character and the tile intersect **/
		return (this.x === this.tile.x && this.y === this.tile.y) ? true : false;
	}

	setTileUsed (map, column, row, tile) {
		tile.canuse = false;
		map.editTile(column, row, tile);
	}

	snapPosition (map) {
		/** clear character illustration from map at base position **/
		this.clear();
		/** get random tile from character position **/
		var tile = this.getRandomAjacentTile(map);
		/** confirm that tile exists and can be used **/
		if (!tile || !tile.canuse) return;
		/** set found tile to base tile **/
		this.tile = tile;
		/** update coordinates by new tile x and y position **/
		this.updatePosition(this.tile.x, this.tile.y);
		/** set character position within grid columns and rows **/
		this.updateGrid(this.tile.column, this.tile.row);
		/** redraw item to stage **/
		this.draw();
	}

	glidePosition (map) {
		/** confirm that character can still move and exit function after clearing, updating position and redrawing **/
		if (this.canMove()) return this.incrementMove();
		/** confirm that character has intersected its destination tile **/
		if (this.tileCollision()) {
			/** reset character velocities to prevent additional movement **/
			this.updateVelocity(0, 0);
			/** get and set direction for next tile selection **/
			var direction = this.selectRandomDirectionString();
			/** attempt to get tile from character position **/
			var tile = this.getSpecificAdjacentTile(map, direction);
			/** exit function if tile cannot be found or used **/
			if (!tile || !tile.canuse) return;
			/** set velocity integers for corner check and movement **/
			var velocity = this.getVelocityIntegers(this.getDirectionIntegers(direction));

			this.updateTile(map, this.tile, { canuse: true });
			/** set movement velocity **/
			this.updateVelocity(velocity.x, velocity.y);
			/** set character position within grid columns and rows **/
			this.updateGrid(tile.column, tile.row);
			/** set tile to new destination tile **/
			this.tile = tile;

			this.updateTile(map, this.tile, { canuse: false });
		}
	}

	move (map) {
		/** movement method **/
		this.glidePosition(map);
	}

	incrementMove () {
		/** clear character illustration from map at base position **/
		this.clear();
		/** increment coordinates by position velocity integer **/
		this.incrementPosition(this.velocityX, this.velocityY);
		/** redraw item to stage **/
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

	updateGrid (column, row) {
		/** set this characters column position within grid to new column position **/
		this.column = column;
		/** set this characters row position within grid to new row position **/
		this.row = row;
	}

	updateTile (map, tile, edits) {
		if (edits) {
			for (var key in edits) {
				tile[key] = edits[key];
			}
		}
		map.editTile(tile.column, tile.row, tile);
	}

	clear () {
		/** remove current image data from canvas **/
		this.canvas.drawGeometry("clearRect", this.x, this.y, this.width, this.height, { fillStyle: undefined });
	}

	draw () {
		/** draw sample shape to test character position as fillRect **/
		this.canvas.drawGeometry("fillRect", this.x, this.y, this.width, this.height, { fillStyle: this.color || "cyan" });
	}

	init (map) {
		/** set used status to tile **/
		
		this.setTileUsed(map, this.column, this.row, this.tile);
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
		this.velocityX = 0;
		/** create self instance y velocity **/
		this.velocityY = 0;
		/** create self instance of moveable directions **/
		this.directions = ["top", "right", "bottom", "left"];
		/** create self instance of plotted tiles **/
		this.plotted = [];
		/** create self instance of movement based speed **/
		this.speed = 1;
		/** create self instance image resource **/
		this.image = attributes.image || "none";
		/** create self instance colour resource **/
		this.color = "rgb(" +  Math.floor(Math.random() * (255 - 0) + 0) + ", " + Math.floor(Math.random() * (255 - 0) + 0) + ", " + Math.floor(Math.random() * (255 - 0) + 0) + ")";
		/** create reference to starting tile **/
		this.tile = tile;
		/** create reference to column in grid **/
		this.column = tile.column;
		/** create reference to row in grid **/
		this.row = tile.row;
	}
}