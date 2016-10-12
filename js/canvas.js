class Canvas extends Grid {

	static RGB (red, green, blue) {
		/** @description: creates a rgb string using supplied arguments **/
		/** @param: red @type {integer} or {string} **/
		/** @param: blue @type {integer} or {string} **/
		/** @param: green @type {integer} or {string} **/
		/** @return: @type {string} **/
		return "rgb(" + red + "," + green + "," + blue + ")";
	}

	static RGBA (red, green, blue, alpha) {
		/** @description: creates a rgb string using supplied arguments **/
		/** @param: red @type {integer} or {string} **/
		/** @param: blue @type {integer} or {string} **/
		/** @param: green @type {integer} or {string} **/
		/** @param: alpha @type {integer} or {string} **/
		/** @return: @type {string} **/
		return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
	}

	static RandomRBGInt (min) {
		/** @description: creates a rgb integer using supplied arguments with 255 as ceiling **/
		/** @param: int @type {integer} **/
		/** @return: @type {integer} **/
		return Base.__random__(min, 255);
	}

	static RandomAlphaInt (pmin, pmax, smin, smax) {
		/** @description: creates a alpha channel integer using supplied arguments with 1.0 as ceiling **/
		/** @param: pmin @type {integer} **/
		/** @param: pmax @type {integer} **/
		/** @param: smin @type {integer} **/
		/** @param: smax @type {integer} **/
		/** @return: @type {string} **/
		return "0" + "." + Base.__random__(pmin, pmax) + Base.__random__(smin, smax);
	}

	static attributes (grid) {
		/** @description: returns base object for calculation **/
		/** @param: grid @type {object} **/
		/** @return: @type {object} **/
		/** handle arguments **/
		return grid && grid instanceof Object ? { width: grid.gridWidth, height: grid.gridHeight } : {};
	}

	save () {
		/** @description: store this classes instance of the canvas state **/
		this.context.save();
	}

	restore () {
		/** @description: restore this classes instance of the canvas state **/
		this.context.restore();
	}

	clear () {
	 	/** @description: function for clearing the entire width and height of canvas **/
		/** draw clearing rectangle across entire canvas instance **/
		this.drawGeometry("clearRect", 0, 0, this.node.clientWidth, this.node.clientHeight);
	}

	drawGridLines (style, offset) {
		/** @description: function for drawing grid layout to canvas context **/
		/** @param: {style} @type: {object} **/
		/** @param: {offset} @type: {boolean} **/
		/** enumerate over columns **/
		for (var i = 0; i < this.columns; i++) {
			/** enumerate over rows **/
			for (var j = 0; j < this.rows; j++) {
				/** draw current column line **/
				this.drawLine(i * this.squareWidth, (j * this.squareHeight), (i * this.squareWidth) + this.squareWidth, (j * this.squareHeight), style, offset);
				/** draw current row line **/
				this.drawLine((i * this.squareWidth) , j * this.squareHeight, (i * this.squareWidth), (j * this.squareHeight) + this.squareHeight, style, offset);
			}
		}
		/** draw end column line **/
		this.drawLine(this.gridWidth - 1, 0, this.gridWidth - 1, this.gridHeight, style, offset);
		/** draw end row line **/
		this.drawLine(0, this.gridHeight - 1, this.gridWidth, this.gridHeight - 1, style, offset);
	}

	drawGridSquare (config) {
		/** @description: function for drawing object as grid square to canvas instance **/
		/** @param: {config} @type: {object} **/
		/** apply drawing styles for canvas **/
		this.drawApplyStyle(config.style);
		/** draw tile to canvas from object details **/
		this.drawGeometry(config.fill, config.x, config.y, config.squareWidth, config.squareHeight);
	}

	drawRegExp (type) {
		/** @description: for selecting the correct drawing method from regular expression **/
		/** @param type @type {string} **/
		/** define types of rectangle drawing methods with their expression and system definitions **/
		var methods = [{ key: "fillRect", exp: new RegExp("^fill(Rect)?$", "gi") }, { key: "clearRect", exp: new RegExp("^clear(Rect)?$", "gi") }, { key: "strokeRect", exp: new RegExp("^stroke?Rect$", "gi" ) }];	
		/** iterate over defined method data **/
		for (var i = 0, len = methods.length; i < len; i++) {
			/** return system definition of fill method **/
			if (type && type.match(methods[i].exp)) return methods[i].key;
		};
		return "fillRect";
	}

	drawGeometry (type, positionX, positionY, width, height, style) {
	 	/** @description: function drawing rectangular shape of defined fill type to canvas **/
	 	/** @param: {type} @type: {string} **/
	 	/** @param: {positionX} @type: {integer} **/
	 	/** @param: {positionY} @type: {integer} **/
	 	/** @param: {width} @type: {integer} **/
	 	/** @param: {height} @type: {integer} **/
	 	/** @param: {style} @type: {object} **/
		/** apply drawing styles for rectangle **/
		if (style) this.drawApplyStyle(style);
		/** draw rectangle using system method **/
		this.context[this.drawRegExp(type) || "fillRect"](positionX, positionY, width, height);
	}

	drawImage (image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight) {
	 	/** @description: function drawing image to canvas using full clipping and position **/
	 	/** @param: {image} @type: {string} **/
	 	/** @param: {sourceX} @type: {integer} **/
	 	/** @param: {sourceY} @type: {integer} **/
	 	/** @param: {sourceWidth} @type: {integer} **/
	 	/** @param: {sourceHeight} @type: {integer} **/
	 	/** @param: {positionX} @type: {integer} **/
	 	/** @param: {positionY} @type: {integer} **/
	 	/** @param: {imageWidth} @type: {integer} **/
	 	/** @param: {imageHeight} @type: {integer} **/
		/** draw image to canvas from image source **/
		this.context.drawImage(image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight)
	}

	drawApplyStyle (style) {
	 	/** @description: function for applying drawing styles to context of canvas **/
	 	/** @param: {style} @type: {object} **/
		/** iterate over keys in style object **/
		for (var key in style) {
			/** apply 'style' to canvas context if key matches system definition **/
			if (this.context[key]) this.context[key] = style[key];
		};
	}

	drawBezier (curveXStart, curveYStart, curveXEnd, curveYEnd, positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
	 	/** @description: function for drawing a single curved line to canvas **/
	 	/** @param: {curveXStart} @type: {integer} **/
	 	/** @param: {curveYStart} @type: {integer} **/
	 	/** @param: {curveXEnd} @type: {integer} **/
	 	/** @param: {curveYEnd} @type: {integer} **/
	 	/** @param: {positionXStart} @type: {integer} **/
	 	/** @param: {positionYStart} @type: {integer} **/
	 	/** @param: {positionXEnd} @type: {integer} **/
	 	/** @param: {positionYEnd} @type: {integer} **/
	 	/** @param: {style} @type: {object} **/
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
	 	/** @description: function for drawing multiple curved lines to canvas **/
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

	drawLine (positionXStart, positionYStart, positionXEnd, positionYEnd, style, offset) {
	 	/** @description: function for drawing a single straight line to canvas **/
	 	/** @param: {positionXStart} @type: {integer} **/
	 	/** @param: {positionYStart} @type: {integer} **/
	 	/** @param: {positionXEnd} @type: {integer} **/
	 	/** @param: {positionYEnd} @type: {integer} **/
	 	/** @param: {style} @type: {object} **/
	 	/** @param: {offset} @type: {boolean} **/
		/** start line path **/
		this.context.beginPath();
		/** apply drawing styles for strokes **/
		if (style) this.drawApplyStyle(style);
		/** set offset width if required **/
		var offset = offset ? this.context.lineWidth : 0;
		/** set line starting position **/
		this.context.moveTo(positionXStart + offset + 0.5, positionYStart + offset + 0.5);
		/** draw line **/
		this.context.lineTo(positionXEnd + offset + 0.5, positionYEnd + offset + 0.5);
		/** produce stroked line across line **/
		this.context.stroke();
	}

	drawLines () {
	 	/** @description: function for drawing multiple straight lines to canvas **/
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
	 	/** @description: function for creating concatenated css font string from font object **/
	 	/** @param: {font} @type {object} **/
		/** create single line string as defined css standard for shorthand font **/
		return (font.style || 'normal') + ' ' + (font.variant || 'normal') + ' ' + (font.weight || 'normal') + ' ' + (font.stretch || 'normal') + ' ' + (font.size || '14px') + '/' + (font.line || 'inherit') + ' ' + (font.family || 'sans-serif');
	}

	drawFillText (positionX, positionY, fontString, fontAttributes, fontStyle) {
	 	/** @description: function for drawing filled text to canvas element **/
	 	/** @param: {positionX} @type: {integer} **/
	 	/** @param: {positionY} @type: {integer} **/
	 	/** @param: {fontString} @type: {string} **/
	 	/** @param: {fontAttributes} @type: {string} or {object} **/
	 	/** @param: {fontStyle} @type: {object} **/
		/** set font for canvas based on string as argument or object formatted to string **/
		if (fontAttributes) this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		/** apply drawing styles for font **/
		if (fontStyle) this.drawApplyStyle(fontStyle);
		/** draw filled text **/
		this.context.fillText(fontString, positionX, positionY);
	}

	drawStrokeText (positionX, positionY, fontString, fontAttributes, fontStyle) {
	 	/** @description: function drawing stroked text to canvas element **/
		/** @param: {positionX} @type: {integer} **/
		/** @param: {positionY} @type: {integer} **/
		/** @param: {fontString} @type: {string} **/
		/** @param: {fontAttributes} @type: {object} **/
		/** @param: {fontStyle} @type: {object} **/
		/** set font for canvas based on string as argument or object formatted to string **/
		this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		/** apply drawing styles for font **/
		if (fontStyle) this.drawApplyStyle(fontStyle);
		/** draw stroked text **/
		this.context.strokeText(fontString, positionX, positionY);
	}

	__canvas__ (config) {
		/** @description: initialises html canvas dom element and drawing methods **/
		/** @param: {config} @type: {object} **/
		/** set base config **/
		config = config || {};
		/** set canvas element for drawing context **/
		this.node = config.canvas ? config.canvas : this.node ? this.node : config.parent ? config.parent.insertNode("canvas") : document.body.insertNode("canvas");
		/** set context for drawing **/
		this.context = this.node.getContext("2d");
		/** set attributes for grid **/
		this.__grid__(config);
		/** set attributes for node **/
		this.node.setMultipleAttributes(Object.assign(Canvas.attributes(this.__this__()), config.attributes));
	}
	
	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: {config} @type: {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
		/** set call to this definition handler **/
		this.__canvas__(config);
	}
}