var geography = {
	tropic: {
		psd_asset: "squares.psd",
		tiles: [

			
			{	
				class_name: "ocean",
				type: "water",
				psd_name: "ocean_3",
				cost: 3,
				hex: "#2f96d8",
				type_cost: {
					fire: 3,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "ocean",
				type: "water",
				psd_name: "ocean_2",
				cost: 2,
				hex: "#3999d7",
				type_cost: {
					fire: 2,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "ocean",
				type: "water",
				psd_name: "ocean_1",
				cost: 1,
				hex: "#3d9bd8",
				type_cost: {
					fire: 1,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},

			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_4",
				cost: 4,
				hex: "#429dd8",
				type_cost: {
					fire: 6,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_3",
				cost: 3,
				hex: "#449dd6",
				type_cost: {
					fire: 5,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_2",
				cost: 2,
				hex: "#469fd8",
				type_cost: {
					fire: 4,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "sea",
				type: "water",
				psd_name: "sea_1",
				cost: 4,
				hex: "#449dd6",
				type_cost: {
					fire: 3,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},

			{
				class_name: "coast",
				psd_name: "coast_4",
				cost: 3,
				hex: "#54aedc",
				type_cost: {
					fire: 2,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "coast",
				psd_name: "coast_3",
				cost: 2,
				hex: "#60b3d9",
				type_cost: {
					fire: 1,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "coast",
				psd_name: "coast_2",
				cost: 2,
				hex: "#88c4d2",
				type_cost: {
					fire: 2,
					water: 0,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "coast",
				psd_name: "coast_1",
				cost: 1,
				hex: "#afd5ca",
				type_cost: {
					fire: 1,
					water: 1,
					grass: 0
				},
				tile_range: 1
			},
			
			{	
				class_name: "wash",
				psd_name: "wash_1",
				cost: 1,
				hex: "#f1f0d7",
				type_cost: {
					fire: 1,
					water: 1,
					grass: 0
				},
				tile_range: 1
			},

			{	
				class_name: "sand",
				psd_name: "sand_2",
				cost: 1,
				hex: "#ebeacd",
				type_cost: {
					fire: 0,
					water: 1,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "sand",
				psd_name: "sand_1",
				cost: 2,
				hex: "#e6e5c7",
				type_cost: {
					fire: 0,
					water: 2,
					grass: 0
				},
				tile_range: 1
			},
			
			{
				class_name: "grass",
				psd_name: "grass_6",
				cost: 0,
				hex: "#9fc59b",
				type_cost: {
					fire: 0,
					water: 1,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "grass",
				psd_name: "grass_5",
				cost: 0,
				hex: "#94bf8f",
				type_cost: {
					fire: 0,
					water: 2,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "grass",
				psd_name: "grass_4",
				cost: 0,
				hex: "#8bba83",
				type_cost: {
					fire: 0,
					water: 3,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "grass",
				psd_name: "grass_3",
				cost: 1,
				hex: "#85b87d",
				type_cost: {
					fire: 0,
					water: 4,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "grass",
				psd_name: "grass_2",
				cost: 2,
				hex: "#7eb375",
				type_cost: {
					fire: 0,
					water: 5,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "grass",
				psd_name: "grass_1",
				cost: 3,
				hex: "#7ab171",
				type_cost: {
					fire: 0,
					water: 6,
					grass: 0
				},
				tile_range: 1
			},

			{
				class_name: "hill",
				psd_name: "hill_4",
				cost: 1,
				hex: "#76af6c",
				type_cost: {
					fire: 1,
					water: 1,
					grass: 1
				},
				tile_range: 1
			},
			{
				class_name: "hill",
				psd_name: "hill_3",
				cost: 2,
				hex: "#72ad68",
				type_cost: {
					fire: 1,
					water: 2,
					grass: 1
				},
				tile_range: 1
			},
			{
				class_name: "hill",
				psd_name: "hill_2",
				cost: 3,
				hex: "#6ca762",
				type_cost: {
					fire: 0,
					water: 3,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "hill",
				psd_name: "hill_1",
				cost: 4,
				hex: "#68a45e",
				type_cost: {
					fire: 0,
					water: 4,
					grass: 0
				},
				tile_range: 1
			},

			{
				class_name: "alpine",
				psd_name: "alpine_6",
				cost: 1,
				hex: "#6aa460",
				type_cost: {
					fire: 0,
					water: 1,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "alpine",
				psd_name: "alpine_5",
				cost: 1,
				hex: "#6ea864",
				type_cost: {
					fire: 0,
					water: 2,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "alpine",
				psd_name: "alpine_4",
				cost: 2,
				hex: "#78b06e",
				type_cost: {
					fire: 0,
					water: 3,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "alpine",
				psd_name: "alpine_3",
				cost: 2,
				hex: "#80b676",
				type_cost: {
					fire: 0,
					water: 4,
					grass: 0
				},
				tile_range: 1
			},
			{
				class_name: "alpine",
				psd_name: "alpine_2",
				cost: 2,
				hex: "#8dbe85",
				type_cost: {
					fire: 0,
					water: 5,
					grass: 0
				},
				tile_range: 1
			}

		]
	}
};

console.log("var: \"geography\" parsed.");