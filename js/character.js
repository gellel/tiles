class Character extends Tile {


	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: config @type: {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
	}
}