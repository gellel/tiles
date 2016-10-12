class Grid extends Base {
	
	/** @description: set grid measurements for use as configuration within graphs and tiles **/

	__grid__ (config) {
		/** @description: private method for grid to organise expected {this} data **/
		/** @param: config @type: {object} **/
		/** set base object **/
		config = config || {};
		/** confirm that a base scale for width was defined or set default **/
		this.squareWidth = config.squareWidth ? config.squareWidth : this.scale || 10;
		/** confirm that a base scale for height was defined or set default **/
		this.squareHeight = confirm.squareHeight ? config.squareHeight : this.scale || 10;
		/** confirm that a config column length was defined or set default **/
		this.columns = config.columns ? config.columns : this.columns || 30;
		/** confirm that a config row length was define or set default **/
		this.rows = config.rows ? config.rows : this.rows || 30;
		/** confirm that columns and scale for width was defined and set the pixel size for grid **/
		if (this.columns && this.squareWidth) this.gridWidth = this.columns * this.squareWidth;
		/** confirm that columns and scale for width was defined and set the pixel size for grid **/
		if (this.rows && this.squareHeight) this.gridHeight = this.rows * this.squareHeight;
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: config @type: {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
		/** set call to this definition handler **/
		this.__grid__();
	}
}