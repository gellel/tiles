window.keyframe = {};

keyframe.request = function () {
	this.proccess = (typeof this.context === "function") ? function (delta) { this.context(delta, this) } : function (delta) { for (var i = 0; i < this.context.length; i++) { this.context[i](delta, this)}; };
};

keyframe.start = function (context) {
	this.context = context || function () {console.log('hi')};
	this.request();
	this.animate();
};

keyframe.end = function () {
	window.cancelAnimationFrame(keyframe.id);
};

keyframe.animate = function (delta) {
	keyframe.proccess(delta);
	if (keyframe.abort) return; 
	keyframe.id = window.requestAnimationFrame(keyframe.animate);
};