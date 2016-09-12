class canvas {

	drawRegExp (type) {
		var methods = [{ key: "fillRect", exp: new RegExp("^fill(Rect)?$", "gi") }, { key: "clearRect", exp: new RegExp("^clear(Rect)?$", "gi") }, { key: "strokeRect", exp: new RegExp("^stroke?Rect$", "gi" ) }];	
		for (var i = 0; i < methods.length; i++) {
			if (type.match(methods[i].exp)) return methods[i].key;
		};
		return undefined;
	}

	drawGeometry (type, positionX, positionY, width, height, attribute, style) {
		if (attribute && this.context[attribute] && style) this.context[attribute] = style;
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
			for (var i = 0, beziers = parameters[0]; i < beziers.length; i++) {
				this.drawBezier(beziers[i].curve.x.s, beziers[i].curve.y.s, beziers[i].curve.x.e, beziers[i].curve.y.e, beziers[i].position.x.s, beziers[i].position.y.s, beziers[i].position.x.e, beziers[i].position.y.e, beziers[i].style);
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
			for (var i = 0, lines = parameters[0]; i < lines.length; i++) {
				this.drawLine(lines[i].x.s, lines[i].y.s, lines[i].x.e, (lines[i].y.e || lines[i].y.s), lines[i].style);
			}
		}
		else {
			this.drawLine(parameters);
		}
	}

	fontApplyAttributes (font) {
		return font.style + ' ' + font.variant + ' ' + font.weight + ' ' + font.stretch + ' ' + font.size + '/' + font.line + ' ' + font.family;
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
		this.id = "canvas" + new Date().getMilliseconds();
		this.node = this.create(node || document.body, attributes || { id: 'canvas', style: 'border: 1px solid #e1e1e1;' });
		this.context = this.node.getContext("2d");
	}

};