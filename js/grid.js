class Grid {

	/*
		* about class: defines all measurements for extended classes to create a grid based game

		* constructor parameters:
			config: typeof Object {}
				required object origin: None
	*/

	__this__ () {
		/** set base object for all "this" keys **/
		var __self__ = {};
		/** iterate over keys of "this" class **/
		for (var key in this) {
			/** set key value pair **/
			__self__[key] = this[key];
		};
		/** return object of class self to prevent base inherited from being updated **/
		return __self__;
	}

	constructor (config) {
		/** set base object for constructor **/
		config = config || {};
		/** set class columns reference from config object **/
		this.columns = config.columns || window.columns || 30;
		/** set class rows reference from config object **/
		this.rows = config.rows || window.rows || 20;
		/** set class tile scale reference from config object **/
		this.scale =  config.scale || window.scale || 20;
		/** set class calculated width from instance data **/
		this.gridWidth = this.columns * this.scale;
		/** set class calculated height from instance data **/
		this.gridHeight = this.rows * this.scale;
	}
}