class canvas {

	draw (a) {
	}

	process (delta) {
	}

	drawRegExp (type) {
		var methods = [{ key: "fillRect", exp: new RegExp("fill?Rect", "gi") }, { key: "clearRect", exp: new RegExp("^clear?Rect$", "gi") }, { key: "strokeRect", exp: new RegExp("^stroke?Rect$", "gi" ) }];
		for (var i = 0; i < methods.length; i++) {
			var test = type.match(methods[i].exp);
			console.log(test, methods[i].exp, type)
			if (expressions[i].exp.match(type)) return expressions[i].key;
		}
		return undefined;
	}

	drawGeometry (type, positionX, positionY, width, height, attribute, style) {
		if (attribute && this.context[attribute] && style) this.context[attribute] = style;
		this.context[this.drawRegExp(type) || "fillRect"](positionX, positionY, width, height);
	}

	drawImage (image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight) {
		this.context.drawImage(image, sourceX, sourceY, souceWidth, sourceHeight, positionX, positionY, imageWidth, imageHeight)
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