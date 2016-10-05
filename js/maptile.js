class MapTile extends Tile {

	/*
		* about class: tile object for map tiles building on Grid instance data and Tiles base class

		* constructor parameters:
			config: typeof Object {}
				required object origin: [GridClassInstance].__this__();

		* example initialisation:
			config:
				var config = Object.assign(new Grid().__this__(), { imageSource: "path/to/img/file/pic.jpg", canUseTile: true, tileType: "example", tileBaseColour: "orange" });
			class:
				var maptile = new MapTile(config);
	*/

	static getRandomUsed (min, max, used) {
		  /*************************************************************************************/
	 	 /** function for setting tiles chance to be randomly set as a used or free map tile **/
		/*************************************************************************************/
		/** return boolean based on whether integer 0 was randomed from pseudo random number generator **/
		return ((Math.floor(Math.random() * (max - min + 1)) + min) === used) ? false : true;
	}
	
	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** set base object for constructor **/
		config = config || {};
		/** super will configure the matrix if not defined **/
		super(config);
		/** set class image source reference from config object **/
		this.imageSource = config.imageSource || "";
		/** set class useable status from config object **/
		this.canUseTile = config.canUseTile || MapTile.getRandomUsed(1, 4, 1);
		/** set class tile type from config object **/
		this.tileType = config.tileType || this.canUseTile === true ? "emptyTile" : "occupiedTile";
		/** set class base colour from config object **/
		this.tileBaseColour = config.tileBaseColour || "transparent";
	}
}