class canvas {

	save () {
		/** store this classes instance of the canvas state **/
		this.context.save();
	}

	restore () {
		/** restore this classes instance of the canvas state **/
		this.context.restore();
	}

	drawRegExp (type) {
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
		/** apply drawing styles for rectangle **/
		if (style) this.drawApplyStyle(style);
		/** draw rectangle using system method **/
		this.context[this.drawRegExp(type) || "fillRect"](positionX, positionY, width, height);
	}

	drawImage (image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight) {
		/** draw image to canvas from image source **/
		this.context.drawImage(image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight)
	}

	drawApplyStyle (style) {
		/** iterate over keys in style object **/
		for (var key in style) {
			/** apply 'style' to canvas context if key matches system definition **/
			if (this.context[key]) this.context[key] = style[key];
		}
	}

	drawBezier (curveXStart, curveYStart, curveXEnd, curveYEnd, positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
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
			}
		}
		else {
			/** pass data to single bezier function **/
			this.drawBezier(parameters);
		};
	}

	drawLine (positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
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
			}
		}
		else {
			/** pass data to single line function **/
			this.drawLine(parameters);
		}
	}

	fontApplyAttributes (font) {
		/** create single line string as defined css standard for shorthand font **/
		return (font.style || 'normal') + ' ' + (font.variant || 'normal') + ' ' + (font.weight || 'normal') + ' ' + (font.stretch || 'normal') + ' ' + (font.size || '14px') + '/' + (font.line || 'inherit') + ' ' + (font.family || 'sans-serif');
	}

	drawFillText (positionX, positionY, fontString, fontAttributes, fontStyle) {
		/** set font for canvas based on string as argument or object formatted to string **/
		this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		/** apply drawing styles for font **/
		if (fontStyle) this.drawApplyStyle(fontStyle);
		/** draw filled text **/
		this.context.fillText(fontString, positionX, positionY);
	}

	drawStrokeText (positionX, positionY, fontString, fontAttributes, fontStyle) {
		/** set font for canvas based on string as argument or object formatted to string **/
		this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		/** apply drawing styles for font **/
		if (fontStyle) this.drawApplyStyle(fontStyle);
		/** draw stroked text **/
		this.context.strokeText(fontString, positionX, positionY);
	}

	create (node, attributes) {
		/** create html canvas element with attributes (requires prototypes.js) **/
		return node.insertNode("canvas", attributes);
	}

	constructor (node, attributes) {
		/** create self instance of html canvas element **/
		this.node = this.create(node || document.body, attributes || { id: 'canvas', width: 600, height: 400, style: 'border: 1px solid #e1e1e1;' });
		/** create self instance of canvas context 2d **/
		this.context = this.node.getContext("2d");
	}

};