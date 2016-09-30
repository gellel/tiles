class Canvas extends Grid {

	/*
		* about class: creates a HTML canvas with bound drawing attributes for that canvas

		* constructor parameters:
			config: typeof Object {}
				required object origin: [GridClassInstance].__this__();

		* example initialisation:
			config:
				var config = Object.assign(Grid().__this__(), { node: document.getElementById("canvas"), attributes: { class: "hello" } });
			class:
				var canvas = new Canvas(config);
	*/

	static ALPHA (minimum, maximum, floatminimum, floatmaximum) {
		  /***********************************************************************/
	 	 /** creates a 0 indexed floating point integer for alpha transparency **/
		/***********************************************************************/
		/** set default maximum if not defined **/
		maximum = maximum || 0;
		/** set default minimum if not defined **/
		minimum = minimum || 0;
		/** set default floatmaximum if not defined **/
		floatmaximum = floatmaximum || 0;
		/** set default minimum if not defined **/
		floatminimum = floatmaximum || 0;
		/** return value for alpha item **/
		return "0" + "." + (Math.floor(Math.random() * (maximum - minimum + 1)) + minimum) + (Math.floor(Math.random() * (floatmaximum - floatminimum + 1)) + floatminimum);
	}

	static INT (minimum, maximum) {
		  /********************************************************************/
	 	 /** creates integer used for RGB colour channels between 0 and 255 **/
		/********************************************************************/
		/** set default maximum if not defined **/
		maximum = maximum || 255;
		/** set default minimum if not defined **/
		minimum = minimum || 0;
		/** adjust maximum if it is outside 255 (ceiling for RGB) **/
		if (maximum > 255) maximum = maximum - (maximum - 255);
		/** return value for RGB item **/
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

	static RGB (red, green, blue) {
		  /****************************************************************************/
	 	 /** creates concatenated rgb string for use as a fill colour within canvas **/
		/****************************************************************************/
		/** public function: create RGB colour string for used as fillStyle **/
		return "rgb(" + String(red) + "," + String(green) + "," + String(blue) + ")";
	}

	static RGBA (red, green, blue, alpha) {
		  /*********************************************************************************************/
	 	 /** function for creating a concatenated rgba string for use as a fill colour within canvas **/
		/*********************************************************************************************/
		/** public function: create RGBA colour string for used as fillStyle **/
		return "rgba(" + String(red) + "," + String(green) + "," + String(blue) + "," + String(alpha) + ")";
	}

	save () {
		  /*************************************************************************************************/
	 	 /** function for saving the context configuration for canvas element as it is presently defined **/
		/*************************************************************************************************/
		/** store this classes instance of the canvas state **/
		this.context.save();
	}

	restore () {
		  /*****************************************************************************************************/
	 	 /** function for restoring the context configuration for canvas element as it was presently defined **/
		/*****************************************************************************************************/
		/** restore this classes instance of the canvas state **/
		this.context.restore();
	}

	clear () {
		  /*****************************************************************/
	 	 /** function for clearing the entire width and height of canvas **/
		/*****************************************************************/
		/** draw clearing rectangle across entire canvas instance **/
		this.drawGeometry("clearRect", 0, 0, this.node.clientWidth, this.node.clientHeight);
	}

	drawRegExp (type) {
		  /*******************************************************************************/
	 	 /** function for selecting the correct drawing method from regular expression **/
		/*******************************************************************************/
		/** define types of rectangle drawing methods with their expression and system definitions **/
		var methods = [{ key: "fillRect", exp: new RegExp("^fill(Rect)?$", "gi") }, { key: "clearRect", exp: new RegExp("^clear(Rect)?$", "gi") }, { key: "strokeRect", exp: new RegExp("^stroke?Rect$", "gi" ) }];	
		/** iterate over defined method data **/
		for (var i = 0, len = methods.length; i < len; i++) {
			/** return system definition of fill method **/
			if (type.match(methods[i].exp)) return methods[i].key;
		};
		return undefined;
	}

	drawGeometry (type, positionX, positionY, width, height, style) {
		  /***********************************************************************/
	 	 /** function drawing rectangular shape of defined fill type to canvas **/
		/***********************************************************************/
		/** apply drawing styles for rectangle **/
		if (style) this.drawApplyStyle(style);
		/** draw rectangle using system method **/
		this.context[this.drawRegExp(type) || "fillRect"](positionX, positionY, width, height);
	}

	drawImage (image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight) {
		  /***********************************************************************/
	 	 /** function drawing image to canvas using full clipping and position **/
		/***********************************************************************/
		/** draw image to canvas from image source **/
		this.context.drawImage(image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight)
	}

	drawApplyStyle (style) {
		  /***************************************************************/
	 	 /** function for applying drawing styles to context of canvas **/
		/***************************************************************/
		/** iterate over keys in style object **/
		for (var key in style) {
			/** apply 'style' to canvas context if key matches system definition **/
			if (this.context[key]) this.context[key] = style[key];
		};
	}

	drawBezier (curveXStart, curveYStart, curveXEnd, curveYEnd, positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
		  /*********************************************************/
	 	 /** function for drawing a single curved line to canvas **/
		/*********************************************************/
		/** start line path **/
		this.context.beginPath();
		/** apply drawing styles for strokes **/
		if (style) this.drawApplyStyle(style);
		/** set line starting position **/
		this.context.moveTo(positionXStart, positionYStart);
		/** draw bezier **/
		this.context.bezierCurveTo(curveXStart, curveYStart, curveXEnd, curveYEnd, positionXEnd, positionYEnd);
		/** produce stroked line across bezier **/
		this.context.stroke();
	}

	drawBeziers () {
		  /**********************************************************/
	 	 /** function for drawing multiple curved lines to canvas **/
		/**********************************************************/
		/** capture arguments to function **/
		var parameters = Array.prototype.slice.call(arguments);
		/** confirm if item can be iterated over **/
		if (parameters[0].length) {
			/** iterate over assumed array **/
			for (var i = 0, beziers = parameters[0], len = beziers.length; i < len; i++) {
				/** cache bezier item data **/
				var bezier = beziers[i];
				/** pass data to single bezier function **/
				this.drawBezier(bezier.curve.x.s, bezier.curve.y.s, bezier.curve.x.e, bezier.curve.y.e, bezier.position.x.s, bezier.position.y.s, bezier.position.x.e, bezier.position.y.e, bezier.style);
			};
		}
		else {
			/** pass data to single bezier function **/
			this.drawBezier(parameters);
		};
	}

	drawLine (positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
		  /***********************************************************/
	 	 /** function for drawing a single straight line to canvas **/
		/***********************************************************/
		/** start line path **/
		this.context.beginPath();
		/** apply drawing styles for strokes **/
		if (style) this.drawApplyStyle(style);
		/** set line starting position **/
		this.context.moveTo(positionXStart, positionYStart);
		/** draw line **/
		this.context.lineTo(positionXEnd, positionYEnd);
		/** produce stroked line across line **/
		this.context.stroke();
	}

	drawLines () {
		  /************************************************************/
	 	 /** function for drawing multiple straight lines to canvas **/
		/************************************************************/
		/** capture arguments to function **/
		var parameters = Array.prototype.slice.call(arguments);
		/** confirm if item can be iterated over **/
		if (parameters[0].length) {
			/** iterate over assumed array **/
			for (var i = 0, lines = parameters[0], len = lines.length; i < len; i++) {
				/** cache line item data **/
				var line = lines[i];
				/** pass data to single line function **/
				this.drawLine(line.x.s, line.y.s, line.x.e, (line.y.e || line.y.s), line.style);
			};
		}
		else {
			/** pass data to single line function **/
			this.drawLine(parameters);
		};
	}

	fontApplyAttributes (font) {
		  /*************************************************************************/
	 	 /** function for creating concatenated css font string from font object **/
		/*************************************************************************/
		/** create single line string as defined css standard for shorthand font **/
		return (font.style || 'normal') + ' ' + (font.variant || 'normal') + ' ' + (font.weight || 'normal') + ' ' + (font.stretch || 'normal') + ' ' + (font.size || '14px') + '/' + (font.line || 'inherit') + ' ' + (font.family || 'sans-serif');
	}

	drawFillText (positionX, positionY, fontString, fontAttributes, fontStyle) {
		  /********************************************************/
	 	 /** function for drawing filled text to canvas element **/
		/********************************************************/
		/** set font for canvas based on string as argument or object formatted to string **/
		if (fontAttributes) this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		/** apply drawing styles for font **/
		if (fontStyle) this.drawApplyStyle(fontStyle);
		/** draw filled text **/
		this.context.fillText(fontString, positionX, positionY);
	}

	drawStrokeText (positionX, positionY, fontString, fontAttributes, fontStyle) {
		  /*****************************************************/
	 	 /** function drawing stroked text to canvas element **/
		/*****************************************************/
		/** set font for canvas based on string as argument or object formatted to string **/
		this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		/** apply drawing styles for font **/
		if (fontStyle) this.drawApplyStyle(fontStyle);
		/** draw stroked text **/
		this.context.strokeText(fontString, positionX, positionY);
	}

	setCanvasWidth () {
		  /**********************************************/
	 	 /** function for setting inline canvas width **/
		/**********************************************/
		/** set canvas to have required bitmap scale for width **/
		this.node.width = this.columns * this.scale;
	}

	setCanvasHeight () {
		  /***********************************************/
	 	 /** function for setting inline canvas height **/
		/***********************************************/
		/** set canvas to have required bitmap scale for height **/
		this.node.height = this.rows * this.scale;
	}

	setAttributes (attributes) {
		  /*************************************************************/
	 	 /** function for creating attributes object for HTML canavs **/
		/*************************************************************/
		/** set base object for defining attributes for canvas **/
		attributes = attributes || {};
		/** defined required width for node constructor **/
		attributes.width = this.gridWidth || this.columns * this.scale;
		/** defined required height for node constructor **/
		attributes.height = this.gridHeight || this.rows * this.scale;
		/** set and return formatted object for constructor **/
		return attributes;
	}

	create (node, attributes) {
		  /************************************************************/
	 	 /** function for inserting canvas element into target node **/
		/************************************************************/
		/** set base attributes object if none supplied **/
		attributes = attributes || {};
		/** create html canvas element with attributes (requires prototypes.js) **/
		return node.insertNode("canvas", attributes);
	}

	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** set base object for constructor **/
		config = config || {};
		/** super will configure the matrix if not defined **/
		super(config);
		/** set class canvas node from config data **/
		this.node = (config.target) ? config.target.insertNode("canvas", this.setAttributes(config.attributes || config.attr)) : (config.node) ? config.node.setMultipleAttributes(this.setAttributes(config.attributes || config.attr)) : document.body.insertNode("canvas", this.setAttributes(config.attributes || config.attr));
		/** set class canvas context from class node **/
		this.context = this.node.getContext("2d");
	}

};