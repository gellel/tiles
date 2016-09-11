window.keyframe = {};

keyframe.start = function (functions) {
	this.functions = functions || function (delta) { console.log(delta) };
	this.animate = (keyframe.functions.length) ? function (delta) { if (keyframe.abort) return; for (var i = 0, f = keyframe.functions; i < f.length; i++) { f[i](delta); }; keyframe.id = window.requestAnimationFrame(keyframe.animate); } : function (delta) { if (keyframe.abort) return; keyframe.function(delta); keyframe.id = window.requestAnimationFrame(keyframe.animate); };
	this.animate();
};
keyframe.end = function (callback) {
	window.cancelAnimationFrame(keyframe.id);
	if (callback) callback();
};