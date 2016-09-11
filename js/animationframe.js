window.keyframe = {};

keyframe.start = function (functions) {
	this.functions = functions;
	console.log(this.functions, 'asdsads')
	//this.animate = (keyframe.functions.length) ? function (delta) { for (var i = 0, i < keyframe.functions.length; i++) {keyframe.functions[i](delta)} window.keyframe.id = window.requestAnimationFrame(keyfram.animate);} : function (delta) { keyframe.functions(delta) }();
};

keyframe.end = function (callback) {
	window.cancelAnimationFrame(keyframe.id);
	if (callback) callback();
};