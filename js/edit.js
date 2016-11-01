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

	static curve (parent, properties, curve, update) {
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {curve} is type {class} **/
		/** @param: {update} is type {function} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		properties = properties || {};
		/** **/
		parent.insertNode("div", { id: "curve" }, function (div) {
			/** set container for title **/
			div.insertNode("div", { class: "title-container" }, function (div) {
				/** create title **/
				Editor.title(div, { title: "scale curve" });
			});
			/** set container for noise adjustors **/
			div.insertNode("div", { class: "edits-container" }, function (div) {
				/** create flex container **/
				div.insertNode("div", { class: "flex-xs dir-xs-row" }, function (div) {
					/** create columns editor **/
					Editor.field(div, { key: true, reference: "use", type: "checkbox", name: "arc", value: properties.arc }, { change: function () {
						properties.arc = this.checked;
						update();
					}});
					/** create columns editor **/
					Editor.field(div, { key: true, name: "method", type: "text", name: "curve", value: properties.curve }, { input: function () {
						if (curve[this.value]) {
							properties.curve = this.value;
							update();
						}
					}});
				});
			});
		});
	}

	static grid (parent, properties, update) {
		/** @description: static method to generate grid editor for map **/
		/** @param: {parent} is type {HTMLNode} **/
		/** @param: {properties} is type {object} **/
		/** @param: {noise} is type {object} **/
		/** @param: {update} is type {function} **/
		/** set base parent node **/
		parent = parent || document.body;
		/** set base properties object **/
		properties = properties || {};
		/** **/
		parent.insertNode("div", { id: "grid" }, function (div) {
			/** set container for title **/
			div.insertNode("div", { class: "title-container" }, function (div) {
				/** create title **/
				Editor.title(div, { title: "grid" });
			});
			/** set container for noise adjustors **/
			div.insertNode("div", { class: "edits-container" }, function (div) {
				/** create flex container **/
				div.insertNode("div", { class: "flex-xs dir-xs-row" }, function (div) {
					/** create columns editor **/
					Editor.field(div, { key: true, name: "cols", value: properties.columns });
					/** create rows editor **/
					Editor.field(div, { key: true, name: "rows", value: properties.rows });
					/** create scale editor **/
					Editor.field(div, { key: true, name: "scale", value: properties.scale });
				});
			});
		});
	}


	static fieldset (parent, properties, functs) {

	}

	static create (parent, properties, simplex, update) {

	}

	constructor () {
		
	}

}