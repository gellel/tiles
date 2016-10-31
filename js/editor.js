function editTitle (node) {
	/** @description: create HTML for node title **/
	/** @param: {node} is type {HTML} **/
	/** create container for title **/
	node.insertNode("section", { class: "bm-xs-4" }, function (section) {
		/** create nested div **/
		section.insertNode("div", function (div) {
			/** create heading **/
			div.insertNode("h4", function (header) {
				/** create heading span **/
				header.insertNode("span", "editor");
			});
		});
	});
};

function editRange (section, prop, update) {
	/** @description: create rows of editable sliders for simplex noise **/
	/** @param: {node} is type {HTML} **/
	/** @param: {prop} is type {object} **/
	/** @param: {update} is type {function} **/
	/** create container for rows **/
	section.insertNode("aside", { id: prop.id, class: "flex-xs dir-xs-col" }, function (aside) {
		/** create title **/
		aside.insertNode("div", { class: "col-xs-grow"}, function (row) {
			/** create vertical padding **/
			row.insertNode("div", { class: "tp-xs-3 bp-xs-3" }, function (dx) {
				/** create horizotal padding **/
				dx.insertNode("div", { class: "rp-xs-3 lp-xs-3" }, function (dy) {
					/** **/
					dy.insertNode("h5", prop.id, { class: "title" });
				});
			});
		});
		/** create inputs **/
		aside.insertNode("div", { class: "col-xs-grow" }, function (row) {
			/** create text input fields **/
			row.insertNode("div", { class: "flex-xs dir-xs-row" }, function (fields) {
				/** set sub property object **/
				for (var p in prop) {
					/** skip editing for id **/
					if (p !== "id") {
						/** create set value **/
						fields.insertNode("aside", { class: "flex-xs dir-xs-row" }, function (column) {
							/** insert title **/
							column.insertNode("div", { class: "col-xs-auto" }, function (div) {
								/** create vertical padding **/
								div.insertNode("div", { class: "tp-xs-3 bp-xs-3" }, function (dx) {
									/** create horizotal padding **/
									dx.insertNode("div", { class: "rp-xs-3 lp-xs-3" }, function (dy) {
										dy.insertNode("h6", p, { class: "font-xs-6" });
									});
								});
							});
							/** insert input **/
							column.insertNode("div", { class: "col-xs-grow" }, function (div) {

								/** create vertical padding **/
								div.insertNode("input", { name: p, class: "tp-xs-3 rp-xs-3  bp-xs-3 lp-xs-3 font-xs-6", value: prop[p] }, function (input) {

									/** set reference for event assignment **/
									input.setAttribute("data-parent", prop.id);
									/** on leave status **/
									input.bind("blur", function () {

										/** get parent id reference node **/
										var parent = document.getElementById(this.getAttribute("data-parent"));

										/** get range element **/
										var range = parent.querySelector("input[type='range']");
								
										/** confirm input **/
										if (this.value) {
											/** set new range attribute value **/
											range[this.name] = parseFloat(this.value);
											
											/** confirm this property is the simplex value **/
											if (this.name === "value") {
												/** set simplex value **/
												simplex[parent] = parseFloat(this.value);
											}
											/** automatically edit if enabled **/
											if (document.getElementById("automated").checked) {
												update();
											}
										}
									});
								});
							});
						});
					}
				}
			});
		});
		/** create range slider **/
		aside.insertNode("div", { class: "col-xs-grow" }, function (row) {
			/** create vertical padding **/
			row.insertNode("div", { class: "tp-xs-0 bp-xs-0" }, function (dx) {
				/** create horizotal padding **/
				dx.insertNode("div", { class: "rp-xs-3 lp-xs-3" }, function (dy) {
					/** create vertical padding **/
					dy.insertNode("input", { type: "range", class: "col-xs-12 tp-xs-3 bp-xs-3 font-xs-6", name: prop.id, value: prop.value, min: prop.min, max: prop.max, step: prop.step }, function (range) {
						/** event listener for input changes **/
						range.bind("input", function () {
							/** update simplex object **/
							simplex[this.name] = parseFloat(this.value);
							/** update value input **/
							document.getElementById(this.name).querySelector("input[name='value']").value = parseFloat(this.value);
							/** confirm that automatic updates are enabled **/
							if (document.getElementById("automated").checked) {
								/** perform update **/
								update();
							}
						});
					});
				});
			});
		});
	});
};

function editAutomatic (node) {
	/** @description: create HTML for automatic edits toggle **/
	/** @param: {node} is type {HTML} **/
	/** create container for automatic editing toggle **/
	node.insertNode("section", { class: "bm-xs-4" }, function (section) {
		/** create flex row **/
		section.insertNode("aside", { class: "flex-xs dir-xs-row align-xs-center" }, function (aside) {
			/** create title **/
			aside.insertNode("div", { class: "col-xs-auto"}, function (row) {
				/** create vertical padding **/
				row.insertNode("div", { class: "tp-xs-3 bp-xs-3" }, function (dx) {
					/** create horizotal padding **/
					dx.insertNode("div", { class: "rp-xs-3 lp-xs-3" }, function (dy) {
						/** **/
						dy.insertNode("h5", "automatic update");
					});
				});
			});
			/** create input **/
			aside.insertNode("input", { id: "automated", type: "checkbox", checked: true });
		});
	});
};

function editButton (node, update) {
	/** @description: create HTML for generating edits **/
	/** @param: {node} is type {HTML} **/
	/** @param: {update} is type {function} **/
	/** create terrain button for editing terrain if auto not enabled **/
	node.insertNode("section", { class: "bm-xs-0" }, function (section) {
		/** create section container **/
		section.insertNode("aside", { class: "flex-xs dir-xs-row align-xs-center" }, function (aside) {
			/** create button **/
			aside.insertNode("button", "update", { class: "tp-xs-4 rp-xs-4 bp-xs-4 lp-xs-2", style: "background-color: aquamarine;" }, function (button) {
				button.bind("click", update);
			});
		});
	});
};


function createEditor (node, config, update) {
	/** @description: creates HTML editing fields for grid map **/
	/** @param: {node} is type {HTML} **/
	/** @param: {config} is type {object} **/
	/** @param: {update} is type {function} **/
	/** create title **/
	editTitle(node);
	/** create nodes **/
	node.insertNode("section", { class: "bm-xs-4" }, function (section) {
		/** iterate over config **/
		for (var key in config) {
			/** confirm this property is unique to object  **/
			if (config.hasOwnProperty(key)) {
				/** create node rows **/
				editRange(node, config[key], update);
			}
		}
	});
	/** create automatic **/
	editAutomatic(node);
	/** create button **/
	editButton(node, update);
}