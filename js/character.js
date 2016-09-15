class character {

	getTrueCorners (direction) {
		/** set and return intger based on string if it equates to defined direction **/
		return "top" === direction ? { x: this.x, y: this.y } : "right" === direction ? { x: this.width, y: this.y } : "bottom" === direction ? { x: this.x, y: this.height } : { x: this.x, y: this.y };
	}

	getDirectionIntegers (direction) {
		/** set and return object based on direction string; object contains both x and y offsets **/
		return "top" === direction ? {offsetX: 0, offsetY: -1} : "right" === direction ? {offsetX: 1, offsetY: 0} : "bottom" === direction ? {offsetX:0, offsetY:1} : "left" === direction ? {offsetX: -1, offsetY: 0} : {offsetX: 0, offsetY: 0};
	}

	getTilePosition (offsetX, offsetY) {
		/** convert position to base 1 or 0 if NaN from 0 int division **/
		var row = (this.y / this.y) || 0;
		var col = (this.x / this.x) || 0;
		/** set and return object based on characters position within grid (based on base 1 scale x and y position) **/
		return { row: row + offsetY, col: col + offsetX };
	}

	getAdjacentTiles (tilesInstance) {
		/** set and return object based on characters position within grid (based on base 1 x and y position) and increment this position based on four point direction **/
		return { top: tilesInstance.getTile(this.getTilePosition(-1, 0)), right: tilesInstance.getTile(this.getTilePosition(0, 1)), bottom: tilesInstance.getTile(this.getTilePosition(1, 0)), left: tilesInstance.getTile(this.getTilePosition(0, -1)) };
	}

	getSpecificAdjacentTile (tilesInstance, direction) {
		/** set direction to object containing offset integers **/
		direction = this.getDirectionIntegers(direction);
		/** set and return object based on offset integers and character position (beware: can return current position) **/
		return tilesInstance.getTile(this.getTilePosition(direction.offsetX, direction.offsetY));
	}

	selectRandomTile (tilesObject) {
		/** set temporary array to hold filtered from object values **/
		var filtered = [];
		/** iterate over tiles object **/
		for (var key in tilesObject) {
			/** populate array with object key value if it is not false (assumed missing or unavailable tile) **/
			if (tilesObject[key]) filtered.push(tilesObject[key]);
		};
		/** set and return object from filtered array with random direction from length **/
		return filtered[Math.floor(Math.random() * filtered.length)];
	}

	selectSpecificTile (tilesObject, direction) {
		/** set and return single item from object; intended to be used with the object that would be passed to selectRandomTile **/
		return (direction) ? tilesObject[direction] : false;
	}

	selectRandomDirectionString () {
		/** set base direction strings **/
		var directions = ["top", "right", "bottom", "left"];
		/** set and return random string from selection **/
		return directions[Math.floor(Math.random() * directions.length)];
	}

	getNextMovement (tilesInstance) {
		/** set temporary string of direction to move toward (used for velocity and axis) **/
		var direction = this.selectRandomDirectionString();
		/** set direction velocities **/
		var offset = this.getDirectionIntegers(direction);
		/** set temporary object of specific adjacent tile based on direction variable **/
		var tile = this.getSpecificAdjacentTile(tilesInstance, direction);
		/** confirm that tile was found in grid **/
		/** set and return context movement data **/
		return { offset, tile, direction };
	}

	hasReachedTile () {
		/** confirm true corner has reached target **/
		if (this.tcx !== this.tx && this.tcy !== this.ty) return false;
		/** reset velocity intgers **/
		this.setVelocity(0, 0);
		/** set and return true **/
		return true;
	}

	setTargetPosition (tx, ty) {
		this.tx = tx;
		this.ty = ty;
	}

	setTargetCorners (tcx, tcy) {
		this.tcx = tcx;
		this.tcy = tcy;
	}

	setVelocity (vx, vy) {
		this.vx = vx;
		this.vy = vy;
	}

	move (tilesInstance, method) {
		/** clear drawing from item canvas instance using non updated coordinates **/
		this.clear();

		if (this.hasReachedTile()) {

			var context = this.getNextMovement(tilesInstance);

			var tile = context.tile;

			if (tile.canuse) {

				var direction = context.direction;

				var offset = context.offset;

				var truecorners = this.getTrueCorners(context.direction);

				console.log('direction to move:', direction);
				console.log('true corner to check:', truecorners);
				console.log('tile corner to reach:', {x: tile.x, y:tile.y})
			}
			
			this.position();

			keyframe.abort = true;

		}
		else {
			this.incrementPosition();
		}

		this.draw();

	}

	incrementPosition () {
		this.x = this.x + this.vx || 0;
		this.y = this.y + this.vy || 0;
	}

	updatePosition (x, y) {
		this.x = x;
		this.y = y;
	}

	clear () {
		/** remove current image data from canvas **/
		this.canvas.drawGeometry("clearRect", this.x, this.y, this.width, this.height, { fillStyle: undefined });
	}

	draw () {
		/** draw sample shape to test character position as fillRect **/
		this.canvas.drawGeometry("fillRect", this.x, this.y, this.width, this.height, { fillStyle: this.color || "cyan" });
	}

	init (print) {
		this.setVelocity(0, 0);
		this.setTargetCorners(this.x, this.y);
		this.setTargetPosition(this.x, this.y);

		if (print) this.position();
	}

	position () {
		console.log('x:', this.x, 'y:', this.y);
		console.log('vx:', this.vx, 'vy:', this.vy);
		console.log('tcx:', this.tcx, 'tcy:', this.tcy);
	}

	constructor (canvas, x, y, scale, image) {
		/** create self instance of html canvas element **/
		this.canvas = canvas;
		/** create self instance x position **/
		this.x = x;
		/** create self instance y position **/
		this.y = y;
		/** create self instance scale measurement **/
		this.scale = scale;
		/** create self instance scale width **/
		this.width = scale;
		/** create self instance scale height **/
		this.height = scale;
		/** create self instance image resource **/
		this.image = image;
		/** create base attributes **/
	}
}