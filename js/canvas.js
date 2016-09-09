class canvas {

	draw (a) {
	}

	process (delta) {

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