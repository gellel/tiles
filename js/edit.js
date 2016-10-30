class Editor {

	static title (parent, properties) {

		parent.insertNode("div", { class: "tp-xs-2 bp-xs-2" }, function (ypadding) {

			ypadding.insertNode("div", { class: "rp-xs-2 lp-xs-2"}, function (xpadding) {

				xpadding.insertNode(properties.tag, properties);

			});

		});
	}
	
	static slide (parent, properties, functs) {

		parent.insertNode("input", { class: properties.class, type: "range", min: properties.min, max: properties.max, step: properties.step, name: properties.name }, function (input) {

			for (var key in functs) {

				input.bind(key, functs[key]);
			}
		});

	}

	static input (parent, properties, functs) {

		parent.insertNode("input", properties, function (input) {

			for (var key in functs) {

				input.bind(key, functs[key]);
			}
		});

	}
	
	static scales (parent, properties, functs) {

		parent.insertNode("div", { class: "col-xs-grow" }, function (div) {

			div.insertNode("div", { class: "flex-xs dir-xs-row" }, function (flex) {

				flex.insertNode("div", { class: "col-xs-auto" }, function (titleContainer) {

					Editor.title(titleContainer, properties);

				});

				flex.insertNode("div", { class: "col-xs-grow" }, function (inputContainer) {

					Editor.input(inputContainer, properties, functs)

				});

			});

		});

	}

	static bias (parent, properties, callback) {

		parent.insertNode("div", {}, function (div) {

		});

	}

	static easing (parent, properties, callback) {

		parent.insertNode("div", {}, function (div) {

		});

	}

	static automate (parent, properties, callback) {

		parent.insertNode("div", {}, function (div) {
			
		});

	}

	constructor () {
		
	}

}