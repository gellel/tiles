class Tile extends Grid {

	/*
		* about class: base class for map tiles and character tiles building on Grid instance data

		* constructor parameters:
			config: typeof Object {}
				required object inclusion: [GridClassInstance].__this__();

		* this class is designed as an extension class for maptiles.js and character.js
		* please see those files for init
	*/

	getLeftPoint () {
		  /**************************************************/
	 	 /** function for getting tiles left x coordinate **/
		/**************************************************/
		/** return this base x position **/
		return this.x;
	}

	getRightPoint () {
		  /***************************************************/
	 	 /** function for getting tiles right x coordinate **/
		/***************************************************/
		/** return this base x position from right side **/
		return this.x + this.width;
	}

	getTopPoint () {
		  /*************************************************/
	 	 /** function for getting tiles top y coordinate **/
		/*************************************************/
		/** return this base y position **/
		return this.y;
	}

	getBottomPoint () {
		  /****************************************************/
	 	 /** function for getting tiles bottom y coordinate **/
		/****************************************************/
		/** return this base x position from bottom side **/
		return this.y + this.height;
	}

	getPoints () {
		  /*************************************************************/
	 	 /** function for getting all corner coordinates of the tile **/
		/*************************************************************/
		/** return all points **/
		return { top: this.getTopPoint(), right: this.getRightPoint(), bottom: this.getBottomPoint(), left: this.getLeftPoint() };
	}

	getTopLeftInsideQuarter () {
		  /*********************************************************************/
	 	 /** function for getting tiles top left inside quarter measurements **/
		/*********************************************************************/
		/** return top left hand side starting inside quarter square; does not calculate x position from canvas position **/
		return { top: 0, right: this.halfWidth, bottom: this.halfHeight, left: 0, width: this.halfWidth, height: this.halfHeight };
	}

	getTopRightInsideQuarter () {
		  /**********************************************************************/
	 	 /** function for getting tiles top right inside quarter measurements **/
		/*****************************************&****************************/
		/** return top right hand side starting inside quarter square; does not calculate x position from canvas position; starts calculation from middle of square **/
		return { top: 0, right: this.width, bottom: this.halfHeight, left: this.halfWidth, width: this.halfWidth, height: this.halfHeight };
	}

	getBottomLeftInsideQuarter () {
		  /************************************************************************/
	 	 /** function for getting tiles bottom left inside quarter measurements **/
		/************************************************************************/
		/** return bottom left hand side starting inside quarter square; does not calculate x position from canvas position **/
		return { top: this.halfHeight, right: this.halfWidth, bottom: this.height, left: 0, width: this.halfWidth, height: this.halfHeight };
	}

	getBottomRightInsideQuarter () {
		  /*************************************************************************/
	 	 /** function for getting tiles bottom right inside quarter measurements **/
		/*************************************************************************/
		/** return bottom right hand side starting inside quarter square; does not calculate x position from canvas position; starts calculation from middle of square **/
		return { top: this.halfHeight, right: this.width, bottom: this.halfHeight, left: this.halfWidth, width: this.halfWidth, height: this.halfHeight };
	}

	getTopLeftOutsideQuarter () {
		  /**********************************************************************/
	 	 /** function for getting tiles top left outside quarter measurements **/
		/**********************************************************************/
		/** return top left hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y, right: this.getRightPoint() - this.halfWidth, bottom: this.y + this.halfHeight, left: this.x, width: this.halfWidth, height: this.halfHeight };
	}

	getTopRightOutsideQuarter () {
		  /***********************************************************************/
	 	 /** function for getting tiles top right outside quarter measurements **/
		/***********************************************************************/
		/** return top right hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y, right: this.getRightPoint(), bottom: this.y + this.halfHeight, left: this.x + this.halfWidth, width: this.halfWidth, height: this.halfHeight };
	}

	getBottomLeftOutsideQuarter () {
		  /*************************************************************************/
	 	 /** function for getting tiles bottom left outside quarter measurements **/
		/*************************************************************************/
		/** return bottom left hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y + this.halfHeight, right: this.getRightPoint() - this.halfWidth, bottom: this.getBottomPoint(), left: this.x, width: this.halfWidth, height: this.halfHeight };
	}

	getBottomRightOutsideQuarter () {
		  /**************************************************************************/
	 	 /** function for getting tiles bottom right outside quarter measurements **/
		/**************************************************************************/
		/** return bottom right hand side starting inside quarter square; calculates x position from canvas position **/
		return { top: this.y + this.halfHeight, right: this.getRightPoint(), bottom: this.getBottomPoint(), left: this.x + this.halfWidth, width: this.halfWidth, height: this.halfHeight };
	}

	getOutsideQuarters () {
		  /*******************************************************************/
	 	 /** function for getting all outside quarter coordinates for tile **/
		/*******************************************************************/
		return { q1: this.getTopLeftOutsideQuarter(), q2: this.getTopRightOutsideQuarter(), q3: this.getBottomLeftOutsideQuarter(), q4: this.getBottomRightOutsideQuarter() };
	}

	getRandomOutsideQuarter () {
		  /*********************************************************************/
	 	 /** function for getting random outside quarter coordinate for tile **/
		/*********************************************************************/
		/** set array of all internal quarters **/
		var quarters = ["getTopLeftOutsideQuarter", "getTopRightOutsideQuarter", "getBottomLeftOutsideQuarter", "getBottomRightOutsideQuarter"];
		/** retrieved selected coordinates constructor **/
		var quarter = quarters[Math.floor(Math.random() * quarters.length)];
		/** return selected coordinates **/
		return this[quarter]();
	}

	setPositionX (x) {
		  /***************************************************************/
	 	 /** function for setting tiles x position by supplied integer **/
		/***************************************************************/
		/** set position of tile coordinate x **/
		this.x = (x || 0) * this.scale;
	}

	setPositionY (y) {
		  /***************************************************************/
	 	 /** function for setting tiles y position by supplied integer **/
		/***************************************************************/
		/** set position of tile coordinate y **/
		this.y = (y || 0) * this.scale;
	}

	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** set base object for constructor **/
		config = config || {};
		/** super will configure the matrix if not defined **/
		super(config);
		/** set the context for drawing from canvas for constructor config object **/
		this.context = config.canvas;
		/** set class column reference from config object **/
		this.column = config.column;
		/** set class row reference from config object **/
		this.row = config.row;
		/** set class tile scale reference from config object **/
		this.scale = config.scale;
		/** set class width from scale **/
		this.width = this.scale;
		/** set class height from scale **/
		this.height = this.scale;
		/** set class half width from width **/
		this.halfWidth = this.width / 2;
		/** set class half height from height **/
		this.halfHeight = this.height / 2;
		/** set class x position from column and scale **/
		this.x = this.column * this.scale;
		/** set class y position from row and scale **/
		this.y = this.row * this.scale;
	}
}