class canvas {

	save () {
		this.context.save();
	}

	restore () {
		this.context.restore();
	}

	drawRegExp (type) {
		var methods = [{ key: "fillRect", exp: new RegExp("^fill(Rect)?$", "gi") }, { key: "clearRect", exp: new RegExp("^clear(Rect)?$", "gi") }, { key: "strokeRect", exp: new RegExp("^stroke?Rect$", "gi" ) }];	
		for (var i = 0, len = methods.length; i < len; i++) {
			if (type.match(methods[i].exp)) return methods[i].key;
		};
		return undefined;
	}

	drawGeometry (type, positionX, positionY, width, height, style) {
		if (style) this.drawApplyStyle(style);
		this.context[this.drawRegExp(type) || "fillRect"](positionX, positionY, width, height);
	}

	drawImage (image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight) {
		this.context.drawImage(image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight)
	}

	drawApplyStyle (style) {
		for (var key in style) {
			if (this.context[key]) this.context[key] = style[key];
		}
	}

	drawBezier (curveXStart, curveYStart, curveXEnd, curveYEnd, positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
		this.context.beginPath();
		if (style) this.drawApplyStyle(style);
		this.context.moveTo(positionXStart, positionYStart);
		this.context.bezierCurveTo(curveXStart, curveYStart, curveXEnd, curveYEnd, positionXEnd, positionYEnd);
		this.context.stroke();
	}

	drawBeziers () {
		var parameters = Array.prototype.slice.call(arguments);
		if (parameters[0].length) {
			for (var i = 0, beziers = parameters[0], len = beziers.length; i < len; i++) {
				var bezier = beziers[i];
				this.drawBezier(bezier.curve.x.s, bezier.curve.y.s, bezier.curve.x.e, bezier.curve.y.e, bezier.position.x.s, bezier.position.y.s, bezier.position.x.e, bezier.position.y.e, bezier.style);
			}
		}
		else {
			this.drawBezier(parameters);
		}
	}

	drawLine (positionXStart, positionYStart, positionXEnd, positionYEnd, style) {
		this.context.beginPath();
		if (style) this.drawApplyStyle(style);
		this.context.moveTo(positionXStart, positionYStart);
		this.context.lineTo(positionXEnd, positionYEnd);
		this.context.stroke();
	}

	drawLines () {
		var parameters = Array.prototype.slice.call(arguments);
		if (parameters[0].length) {
			for (var i = 0, lines = parameters[0], len = lines.length; i < len; i++) {
				var line = lines[i];
				this.drawLine(line.x.s, line.y.s, line.x.e, (line.y.e || line.y.s), line.style);
			}
		}
		else {
			this.drawLine(parameters);
		}
	}

	fontApplyAttributes (font) {
		return (font.style || 'normal') + ' ' + (font.variant || 'normal') + ' ' + (font.weight || 'normal') + ' ' + (font.stretch || 'normal') + ' ' + (font.size || '14px') + '/' + (font.line || 'inherit') + ' ' + (font.family || 'sans-serif');
	}

	drawFillText (positionX, positionY, fontString, fontAttributes, fontStyle) {
		this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		if (fontStyle) this.drawApplyStyle(fontStyle);
		this.context.fillText(fontString, positionX, positionY);
	}

	drawStrokeText (positionX, positionY, fontString, fontAttributes, fontStyle) {
		this.context.font = (typeof fontAttributes === 'string') ? fontAttributes : this.fontApplyAttributes(fontAttributes);
		if (fontStyle) this.drawApplyStyle(fontStyle);
		this.context.strokeText(fontString, positionX, positionY);
	}

	create (node, attributes) {
		return node.insertNode("canvas", attributes);
	}

	constructor (node, attributes) {
		this.node = this.create(node || document.body, attributes || { id: 'canvas', width: 600, height: 400, style: 'border: 1px solid #e1e1e1;' });
		this.context = this.node.getContext("2d");
	}

};