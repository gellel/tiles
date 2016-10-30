var geography = {
	tropic: {
		psd_asset: "squares.psd",
		tiles: [

			/** ocean **/
			{	
				class_name: "ocean",
				type: "water",
				psd_name: "ocean_3",
				cost: 3,
				colour: { 
					rgb: { r: "47", g: "150", b: "216"},
					hex: "#2f96d8"
				},
				type_cost: {
					fire: 3,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "ocean",
				type: "water",
				psd_name: "ocean_2",
				cost: 2,
				colour: { 
					rgb: { r: "57", g: "153", b: "215"},
					hex: "#3999d7"
				},
				type_cost: {
					fire: 2,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "ocean",
				type: "water",
				psd_name: "ocean_1",
				cost: 1,
				colour: { 
					rgb: { r: "61", g: "155", b: "216"},
					hex: "#3d9bd8"
				},
				type_cost: {
					fire: 1,
					water: 0,
					grass: 0
				}
			},
			/** sea **/
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_4",
				cost: 4,
				colour: { 
					rgb: { r: "66", g: "157", b: "216"},
					hex: "#429dd8"
				},
				type_cost: {
					fire: 6,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_3",
				cost: 3,
				colour: { 
					rgb: { r: "68", g: "157", b: "214"},
					hex: "#449dd6"
				},
				type_cost: {
					fire: 5,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_2",
				cost: 2,
				colour: { 
					rgb: { r: "", g: "", b: ""},
					hex: "#469fd8"
				},
				type_cost: {
					fire: 4,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_1",
				cost: 4,
				colour: { 
					rgb: { r: "70", g: "159", b: "216"},
					hex: "#449dd6"
				},
				type_cost: {
					fire: 3,
					water: 0,
					grass: 0
				}
			},
			/** coast **/
			{
				class_name: "coast",
				psd_name: "coast_4",
				cost: 3,
				colour: { 
					rgb: { r: "84", g: "174", b: "220"},
					hex: "#54aedc"
				},
				type_cost: {
					fire: 2,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "coast",
				psd_name: "coast_3",
				cost: 2,
				colour: { 
					rgb: { r: "96", g: "179", b: "217"},
					hex: "#60b3d9"
				},
				type_cost: {
					fire: 1,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "coast",
				psd_name: "coast_2",
				cost: 2,
				colour: { 
					rgb: { r: "136", g: "196", b: "210"},
					hex: "#88c4d2"
				},
				type_cost: {
					fire: 2,
					water: 0,
					grass: 0
				}
			},
			{
				class_name: "coast",
				psd_name: "coast_1",
				cost: 1,
				colour: { 
					rgb: { r: "175", g: "213", b: "202"},
					hex: "#afd5ca"
				},
				type_cost: {
					fire: 1,
					water: 1,
					grass: 0
				}
			},
			/** wash **/
			
			{	
				class_name: "wash",
				psd_name: "wash_1",
				cost: 1,
				colour: { 
					rgb: { r: "241", g: "240", b: "215"},
					hex: "#f1f0d7"
				},
				type_cost: {
					fire: 1,
					water: 1,
					grass: 0
				}
			},

			/** sand **/
			{	
				class_name: "sand",
				psd_name: "sand_2",
				cost: 1,
				colour: { 
					rgb: { r: "235", g: "234", b: "205"},
					hex: "#ebeacd"
				},
				type_cost: {
					fire: 0,
					water: 1,
					grass: 0
				}
			},
			{
				class_name: "sand",
				psd_name: "sand_1",
				cost: 2,
				colour: { 
					rgb: { r: "230", g: "229", b: "119"},
					hex: "#e6e5c7"
				},
				type_cost: {
					fire: 0,
					water: 2,
					grass: 0
				}
			},
			
			
			/** grass **/
			{
				class_name: "grass",
				psd_name: "grass_6",
				cost: 0,
				colour: { 
					rgb: { r: "159", g: "197", b: "155"},
					hex: "#9fc59b"
				},
				type_cost: {
					fire: 0,
					water: 1,
					grass: 0
				}
			},
			{
				class_name: "grass",
				psd_name: "grass_5",
				cost: 0,
				colour: { 
					rgb: { r: "148", g: "191", b: "143"},
					hex: "#94bf8f"
				},
				type_cost: {
					fire: 0,
					water: 2,
					grass: 0
				}
			},
			{
				class_name: "grass",
				psd_name: "grass_4",
				cost: 0,
				colour: { 
					rgb: { r: "139", g: "186", b: "131"},
					hex: "#8bba83"
				},
				type_cost: {
					fire: 0,
					water: 3,
					grass: 0
				}
			},
			{
				class_name: "grass",
				psd_name: "grass_3",
				cost: 1,
				colour: { 
					rgb: { r: "133", g: "184", b: "125"},
					hex: "#85b87d"
				},
				type_cost: {
					fire: 0,
					water: 4,
					grass: 0
				}
			},
			{
				class_name: "grass",
				psd_name: "grass_2",
				cost: 2,
				colour: { 
					rgb: { r: "", g: "", b: ""},
					hex: "#7eb375"
				},
				type_cost: {
					fire: 0,
					water: 5,
					grass: 0
				}
			},
			{
				class_name: "grass",
				psd_name: "grass_1",
				cost: 3,
				colour: { 
					rgb: { r: "126", g: "179", b: "117"},
					hex: "#7ab171"
				},
				type_cost: {
					fire: 0,
					water: 6,
					grass: 0
				}
			},
			/** hill **/
			{
				class_name: "hill",
				psd_name: "hill_4",
				cost: 1,
				colour: { 
					rgb: { r: "118", g: "175", b: "108"},
					hex: "#76af6c"
				},
				type_cost: {
					fire: 1,
					water: 1,
					grass: 1
				}
			},
			{
				class_name: "hill",
				psd_name: "hill_3",
				cost: 2,
				colour: { 
					rgb: { r: "", g: "", b: ""},
					hex: "#72ad68"
				},
				type_cost: {
					fire: 1,
					water: 2,
					grass: 1
				}
			},
			{
				class_name: "hill",
				psd_name: "hill_2",
				cost: 3,
				colour: { 
					rgb: { r: "114", g: "173", b: "104"},
					hex: "#6ca762"
				},
				type_cost: {
					fire: 0,
					water: 3,
					grass: 0
				}
			},
			{
				class_name: "hill",
				psd_name: "hill_1",
				cost: 4,
				colour: { 
					rgb: { r: "104", g: "164", b: "94"},
					hex: "#68a45e"
				},
				type_cost: {
					fire: 0,
					water: 4,
					grass: 0
				}
			},
			/** alpine **/ 
			{
				class_name: "alpine",
				psd_name: "alpine_6",
				cost: 1,
				colour: { 
					rgb: { r: "106", g: "164", b: "96"},
					hex: "#6aa460"
				},
				type_cost: {
					fire: 0,
					water: 1,
					grass: 0
				}
			},
			{
				class_name: "alpine",
				psd_name: "alpine_5",
				cost: 1,
				colour: { 
					rgb: { r: "110", g: "168", b: "100"},
					hex: "#6ea864"
				},
				type_cost: {
					fire: 0,
					water: 2,
					grass: 0
				}
			},
			{
				class_name: "alpine",
				psd_name: "alpine_4",
				cost: 2,
				colour: {
					rgb: { r: "120", g: "176", b: "110" },
					hex: "#78b06e"
				},
				type_cost: {
					fire: 0,
					water: 3,
					grass: 0
				}
			},
			{
				class_name: "alpine",
				psd_name: "alpine_3",
				cost: 2,
				colour: {
					rgb: { r: "128", g: "182", b: "118" },
					hex: "#80b676"
				},
				type_cost: {
					fire: 0,
					water: 4,
					grass: 0
				}
			},
			{
				class_name: "alpine",
				psd_name: "alpine_2",
				cost: 2,
				colour: {
					rgb: { r: "141", g: "190", b: "133" },
					hex: "#8dbe85"
				},
				type_cost: {
					fire: 0,
					water: 5,
					grass: 0
				}
			}

		]
	}
};

console.log("var: \"geography\" parsed.");