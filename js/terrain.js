class Terrain {
	
	static img (s, width, height, scale, colour, dithers, RGB) {
		/** @description: proceedurally creates colour texture **/
		/** @param: {s} is type {object} **/
		/** @param: {width} is type {integer} **/
		/** @param: {height} is type {integer} **/
		/** @param: {scale} is type {integer} **/
		/** @param: {colour} is type {string} **/
		/** @param: {dithers} is type {integer} **/
		/** @return: is type {string} **/
		/** set base simplex config object **/
		s = s instanceof Object ? s : {};
		/** set base width for x attribute **/
		width = !isNaN(width) ? width : 10;
		/** set base height for y attribte **/
		height = !isNaN(height) ? height : 10;
		/** set base scale for size of texture **/
		scale = !isNaN(scale) ? scale : 10;
		/** set base colour string **/
		colour = typeof colour === "string" ? colour : "blue";

		/** set dithers for texture **/
		dithers = !isNaN(dithers) ? dithers : MATH.rint(5, 15);
		/** set dithers container **/
		var dd = [];
		/** enumerate over required dithers **/
		for (var d = 0; d < dithers; d++) {
			/** create RGB value in the white spectrum **/
			var RGB = MATH.rint(220, 255);
			/** push value to dithers **/
			dd.push(Canvas.RGBA(RGB, RGB, RGB, MATH.rfloat(0.1, 0.3) ));
		}

		/** sort dithers for distribution **/
		dd.sort();

		/** create canvas for painting simplex texture **/
		var c = document.createElement("canvas");
		/** assign rendering bitmap **/
		c.setMultipleAttributes({ width: width * scale, height: height * scale })
		/** set drawing context **/
		var ctx = c.getContext("2d");
		/** paint base coat to stage **/
		ctx.fillStyle = colour;
		/** paint base colour to canvas **/
		ctx.fillRect(0, 0, width * scale, height * scale);

		/** enumerate over x distance **/
		for (var i = 0; i < width; i++) {
			/** enumerate over y distance **/
			for (var j = 0; j < height; j++) {
				/** generate noise **/
				var n = Simplex.N2D(s.perm, s.permMod12, i - Math.floor(width / 2), j - Math.floor(height / 2), s.amplitude, s.frequency, s.persistence, s.octaves, 0, dd.length);
				/** set to passable value for array index **/
				n = Math.abs(parseInt(n));
				/** clamp value between array length **/
				n = MATH.clip(n, 0, dd.length - 1);
				/** set fill **/
				ctx.fillStyle = dd[n];
				/** fill square **/
				ctx.fillRect(i * scale, j * scale, width, height);
			}
		}
		/* return data string **/
		return c.toDataURL();
	}

}