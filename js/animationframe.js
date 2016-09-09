window.keyframe = {};

keyframe.start = function (functions) {
	this.functions = functions;
	this.animate();
};

keyframe.end = function (callback) {
	window.cancelAnimationFrame(keyframe.id);
	if (callback) callback();
}

keyframe.animate = function (delta) {
	if (keyframe.functions) {
		for (var i = 0; i < keyframe.functions.length; i++) {
			keyframe.functions[i](delta)
		}
	}
	window.keyframe.id = window.requestAnimationFrame(keyfram.animate);
};