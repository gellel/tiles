/** set request keyframe animation object **/
window.keyframe = {};

keyframe.start = function (functions) {
	  /**************************************************/
	 /** function for running request animation frame **/
	/**************************************************/
	/** set function to supplied or use default for testing **/
	this.functions = functions || function (delta) { console.log(delta); };
	/** set animation function to single function or function stack **/
	this.animate = (keyframe.functions.length) ? function (delta) { if (keyframe.abort) return; for (var i = 0, f = keyframe.functions; i < f.length; i++) { f[i](delta); }; keyframe.id = window.requestAnimationFrame(keyframe.animate); } : function (delta) { if (keyframe.abort) return; keyframe.functions(delta); keyframe.id = window.requestAnimationFrame(keyframe.animate); };
	/** run request animation frames **/
	this.animate();
};

keyframe.end = function (callback) {
	  /*************************************************/
	 /** function for ending request animation frame **/
	/*************************************************/
	/** cancel instance of animation frame **/
	window.cancelAnimationFrame(keyframe.id);
	/** callback if supplied **/
	if (callback) callback();
};