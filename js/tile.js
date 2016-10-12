class Tile extends Base {

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
		return { top: 0, right: this.squareWdith / 2, bottom: this.squareHeight / 2, left: 0, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getTopRightInsideQuarter () {
	 	/** @description: function for getting tiles top right inside quarter measurements **/
		/** return top right hand side starting inside quarter square; does not calculate x position from canvas position; starts calculation from middle of square **/
		return { top: 0, right: this.width, bottom: this.squareHeight / 2, left: this.squareWdith / 2, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getBottomLeftInsideQuarter () {
	 	/** @description: function for getting tiles bottom left inside quarter measurements **/
		/** return bottom left hand side starting inside quarter square; does not calculate x position from canvas position **/
		return { top: this.squareHeight / 2, right: this.squareWdith / 2, bottom: this.height, left: 0, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getBottomRightInsideQuarter () {
	 	/** @description: function for getting tiles bottom right inside quarter measurements **/
		/** return bottom right hand side starting inside quarter square; does not calculate x position from canvas position; starts calculation from middle of square **/
		return { top: this.squareHeight / 2, right: this.width, bottom: this.squareHeight / 2, left: this.squareWdith / 2, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getTopLeftOutsideQuarter () {
	 	/** @description: function for getting tiles top left outside quarter measurements **/
		/** return top left hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y, right: this.getRightPoint() - this.squareWdith / 2, bottom: this.y + this.squareHeight / 2, left: this.x, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getTopRightOutsideQuarter () {
	 	/** @description: function for getting tiles top right outside quarter measurements **/
		/** return top right hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y, right: this.getRightPoint(), bottom: this.y + this.squareHeight / 2, left: this.x + this.squareWdith / 2, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getBottomLeftOutsideQuarter () {
	 	/** @description: function for getting tiles bottom left outside quarter measurements **/
		/** return bottom left hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y + this.squareHeight / 2, right: this.getRightPoint() - this.squareWdith / 2, bottom: this.getBottomPoint(), left: this.x, width: this.squareWdith / 2, height: this.squareHeight / 2 };
	}

	getBottomRightOutsideQuarter () {
	 	/** @description: function for getting tiles bottom right outside quarter measurements **/
		/** return bottom right hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y + this.squareHeight / 2, right: this.getRightPoint(), bottom: this.getBottomPoint(), left: this.x + this.squareWdith / 2, width: this.squareWdith / 2, height: this.squareHeight / 2 };
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
	 	/** @param: {x} @type: {integer} **/
		/** set position of tile coordinate x **/
		this.x = (x || 0) * (this.squareWidth || this.scale);
	}

	setPositionY (y) {
	 	/** @description: function for setting tiles y position by supplied integer **/
	 	/** @param: {y} @type: {integer} **/
		/** set position of tile coordinate y **/
		this.y = (y || 0) * (this.squareHeight || this.scale);
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: config @type: {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
	}
}