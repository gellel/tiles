class Character extends Tile {

	incrementCoordinatePosition (x, y) {
	 	/** @description: function for incrimenting characters position by supplied integers **/
	 	/** @param: {x} is type {integer} **/
	 	/** @param: {y} is type {integer} **/
		/** increment this current x position by the value of supplied x position **/
		this.x = this.x + x;
		/** increment this current y position by the value of supplied y position **/
		this.y = this.y + y;
	}

	getVelocityIntegers (integers) {
	 	/** @description: function for obtaining character speed as an integer from direction integers **/
	 	/** @param: {integers} is type {object} **/
		/** set and return velocity object based on direction integers; object contains both x and y offsets **/
		return 0 !== integers.x ? integers.x < 0 ? integers.x = -this.speed : integers.x = this.speed : integers.y < 0 ? integers.y = -this.speed : integers.y = this.speed, integers;
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

	setVelocityIntegers (velocityX, velocityY) {
	 	/** @description: function for setting characters velocity by supplied integers **/
	 	/** @param: {velocityX} is type {integer} **/
	 	/** @param: {velocityY} is type {integer} **/
		/** set this characters x velocity to defined integer or float **/
		this.velocityX = velocityX;
		/** set this characters y velocity to defined integer or float **/
		this.velocityY = velocityY;
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** call super, but with trimmed object to avoid inherited map tile costs if assigned **/
		super(Base.__trim__(config, ["__class__", "f", "g", "closed", "cost", "open", "h", "opened", "parent", "walkable"]));
	}
}