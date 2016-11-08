class Editor {

	static input (parent, properties, functs) {
		/** @description: inserts formatted HTML input for value adjustment **/
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {functs} is type {object} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		properties = properties || {};
		/** create input element and assign its attributes **/
		parent.insertNode("input", properties, function (input) {
			/** iterate over functions object **/
			for (var key in functs) {
				/** bind events **/
				if (functs.hasOwnProperty(key)) input.bind(key, functs[key]);
			}
		});
	}

	static title (parent, properties) {
		/** @description: inserts formatted HTML for adjustment title **/
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		properties = properties || {};
		/** create padding for y axis **/
		parent.insertNode("div", { class: "tp-xs-2 bp-xs-2" }, function (div) {
			/** create padding for x axis **/
			div.insertNode("div", { class: "rp-xs-2 lp-xs-2" }, function (div) {
				/** create padding for y axis **/
				div.insertNode("div", { class: "tp-xs-2 bp-xs-2" }, function (div) {
					/** create padding for x axis **/
					div.insertNode("div", { class: "rp-xs-2 lp-xs-2" }, function (div) {
						/** create heading element **/
						div.insertNode("h5", { class: "font-xs-6" }, function (heading) {
							/** insert title text **/
							heading.insertNode("span", properties.title || "test", { class: "font-weight-400" });
						});
					});
				});
			});
		});
	}

	static field (parent, properties, functs) {
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {functs} is type {object} **/
		/** set item to grow in size where available **/
		parent.insertNode("div", { class: "col-xs-grow" }, function (div) {
			/** set y axis padding **/
			div.insertNode("div", { class: "tp-xs-2 bp-xs-2" }, function (div) {
				/** set x axis padding **/
				div.insertNode("div", { class: "rp-xs-2 lp-xs-2" }, function (div) {
					/** create flex container **/
					div.insertNode("div", { class: "flex-xs dir-xs-row align-xs-center" }, function (div) {
						/** confirm they key is to be included **/
						if (properties.key) {
							/** remove key from item **/
							delete properties.key;
							/** set item to 22% of container size **/
							div.insertNode("div", { class: "col-xs-4", style: "background-color: whitesmoke;" }, function (div) {
								/** set y axis padding **/
								div.insertNode("div", { class: "tp-xs-2 bp-xs-2" }, function (div) {
									/** set x axis padding **/
									div.insertNode("div", { class: "rp-xs-2 lp-xs-2" }, function (div) {
										/** create paragraph **/
										div.insertNode("p", { class: "font-xs-6 font-align-center" }, function (p) {
											/** insert field title **/
											p.insertNode("span", properties.reference || properties.name, { class: "font-weight-400" });
										});
									});
								});
							});
						}
						/** set item to grow size **/
						div.insertNode("div", { class: "col-xs-grow" }, function (div) {
							/** set y axis padding **/
							div.insertNode("div", { class: "tp-xs-0 bp-xs-0" }, function (div) {
								/** set x axis padding **/
								div.insertNode("div", { class: "rp-xs-0 lp-xs-0" }, function (div) {
									/** create input element **/
									Editor.input(div, Object.assign(properties, { type: properties.type || "number", style: "background-color: #e8e8e8;", class: "col-xs-12 tp-xs-2 rp-xs-2 bp-xs-2 lp-xs-2 font-xs-6" }), functs);
								});
							});
						});
					});
				});
			});
		});
	}

	static noise (parent, properties, noise, update) {
		/** @description: static method to generate noise editor for map **/
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {noise} is type {object} **/
		/** @param: {update} is type {function} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		properties = properties || {};
		/** iterate over properties **/
		for (var key in properties) {
			/** set reference id for field **/
			parent.insertNode("div", { id: key }, function (div) {
				/** set container for title **/
				div.insertNode("div", { class: "title-container" }, function (div) {
					/** create title **/
					Editor.title(div, { title: key });
				});
				/** set container for noise adjustors **/
				div.insertNode("div", { class: "edits-container" }, function (div) {
					/** create flex container **/
					div.insertNode("div", { class: "flex-xs dir-xs-row" }, function (div) {
						/** iterate over keys of property object **/
						for (var prop in properties[key]) {
							/** confirm is own type **/
							if (properties[key].hasOwnProperty(prop)) {
								/** prevent dupilcate value editor **/
								if (prop !== "value") {
									/** create field for either min, max or step with change event listener (updates simplex object) **/
									Editor.field(div, { key: true, name: prop, value: properties[key][prop], "data-parent": key }, { change: function () {
										/** get node parent for this field **/
										var node = document.getElementById(this.getAttribute("data-parent"));
										/** get value adjustor **/
										var input = node.querySelector("input[name='value']");
										/** update adjustor key property to this value **/
										input[this.name] = this.value;
									}});
								}
							}
						}
					});
					/** create flex container **/
					div.insertNode("div", { class: "flex-xs dir-xs-col"}, function (div) {
						/** create field for value with chang event listener to repaint terrain **/
						Editor.field(div, { name: "value", min: properties[key].min, max: properties[key].max, step: properties[key].step, value: properties[key].value, "data-parent": key }, { change: function () {
							/** update simplex object **/
							noise[this.getAttribute("data-parent")] = parseFloat(this.value);
							/** repaint terrain **/
							if (typeof update === "function") update();
						}});
					});
				});
			});
		}
	}

	static toggle (parent, properties, noise, update) {
		/** @description: static method to generate noise editor for map **/
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {noise} is type {object} **/
		/** @param: {update} is type {function} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		properties = properties || {};
		/** iterate over properties **/
		for (var key in properties) {
			/** set reference id for field **/
			parent.insertNode("div", { id: key }, function (div) {
				/** set container for title **/
				div.insertNode("div", { class: "title-container" }, function (div) {
					/** create title **/
					Editor.title(div, { title: key });
				});
				/** set container for noise adjustors **/
				div.insertNode("div", { class: "edits-container" }, function (div) {
					/** create flex container **/
					div.insertNode("div", { class: "flex-xs dir-xs-row" }, function (div) {
						/** iterate over keys of property object **/
						Editor.field(div, { type: "checkbox", key: true, name: "use", "data-parent": key }, { change: function () {
							/** update simplex object **/
							noise[this.getAttribute("data-parent")] = this.checked;
							/** repaint terrain **/
							if (typeof update === "function") update();
						}});
					});
				});
			});
		}
	}

	static textures (parent, simplex, textureUpdate, update) {
		/** @description: static method to generate noise editor for map **/
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {textureUpdate} is type {function} **/
		/** @param: {update} is type {function} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		var properties = simplex.textures || {};
		/** iterate over properties **/
		for (var i = 0, len = properties.length; i < len; i++) {
			/** set reference id for field **/
			parent.insertNode("div", { id: properties[i].psd_name }, function (div) {
				/** set container for title **/
				div.insertNode("div", { class: "title-container" }, function (div) {
					/** create title **/
					Editor.title(div, { title: properties[i].psd_name });
				});
				/** set container for noise adjustors **/
				div.insertNode("div", { class: "edits-container" }, function (div) {
					/** create flex container **/
					div.insertNode("div", { class: "flex-xs dir-xs-col"}, function (div) {
						/** create field for value with chang event listener to repaint terrain **/
						Editor.field(div, { name: "value", min: 0, step: 1, value: properties[i].tile_range, "data-parent": i }, { change: function () {
							/** get lookup key from bound **/
							var key = parseInt(this.getAttribute("data-parent"));
							/** update simplex object **/
							properties[key].tile_range = parseInt(this.value);
							/** update ranges **/
							simplex.range = textureUpdate(properties);
							/** update max texture length to reflect scaled textures **/
							document.getElementById("max").querySelector("input[name='value']").value = simplex.range.length
							/** repaint terrain **/
							if (typeof update === "function") update();
						}});
						/** create field for value with chang event listener to repaint terrain **/
						Editor.field(div, { type: "color", name: "colour", min: 0, step: 1, value: properties[i].colour, "data-parent": i }, { change: function () {
							/** get lookup key from bound **/
							var key = parseInt(this.getAttribute("data-parent"));
							/** update property **/
							properties[key].colour = this.value;
							/** repaint terrain **/
							if (typeof update === "function") update();
						}});
					});
				});
			});
		}
	}

}