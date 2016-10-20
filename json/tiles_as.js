var geography = {
	arctic: {
		psd_asset: "arctic.psd",
		tiles:[
			{
				tile_name: "iceberg_base",
				parent_name: "iceberg",
				tile_cost: "undefined",
				colour: {
					hex: "#dfedf4",
					rgb: {
						r: 233,
						g: 237,
						b: 244
					}
				},
				parent_order: 1
			},
			{
				tile_name: "iceberg_rim",
				parent_name: "iceberg",
				tile_cost: "undefined",
				colour: {
					hex: "#d5e7f0",
					rgb: {
						r: 213,
						g: 231,
						b: 240
					}
				},
				parent_order: 2
			},
			{
				tile_name: "iceberg_edge",
				parent_name: "iceberg",
				tile_cost: "undefined",
				colour: {
					hex: "#d1e4ed",
					rgb: {
						r: 209,
						g: 228,
						b: 237
					}
				},
				parent_order: 3
			},
			{
				tile_name: "water_deepest",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#1b4a7a",
					rgb: {
						r: 27,
						g: 74,
						b: 122
					}
				},
				parent_order: 1
			},
			{
				tile_name: "water_deeper",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#25507d",
					rgb: {
						r: 37,
						g: 80,
						b: 125
					}
				},
				parent_order: 2
			},
			{
				tile_name: "water_deep",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#2e5680",
					rgb: {
						r: 46,
						g: 86,
						b: 128
					}
				},
				parent_order: 3
			},
			{
				tile_name: "water_medium",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#365d86",
					rgb: {
						r: 54,
						g: 93,
						b: 134
					}
				},
				parent_order: 4
			},
			{
				tile_name: "water_low",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#3a6188",
					rgb: {
						r: 58,
						g: 97,
						b: 136
					}
				},
				parent_order: 5
			},
			{
				tile_name: "water_shallow",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#3f6489",
					rgb: {
						r: 63,
						g: 100,
						b: 137
					}
				},
				parent_order: 6
			},
			{
				tile_name: "coast_deep",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#58718b",
					rgb: {
						r: 88,
						g: 113,
						b: 139
					}
				},
				parent_order: 1
			},
			{
				tile_name: "coast_medium",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#687c90",
					rgb: {
						r: 104,
						g: 124,
						b: 144
					}
				},
				parent_order: 2
			},
			{
				tile_name: "coast_low",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#718292",
					rgb: {
						r: 113,
						g: 130,
						b: 146
					}
				},
				parent_order: 3
			},
			{
				tile_name: "coast_shallow",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#67737f",
					rgb: {
						r: 103,
						g: 115,
						b: 127
					}
				},
				parent_order: 4
			},
			{
				tile_name: "sand_beach",
				parent_name: "sand",
				tile_cost: "undefined",
				colour: {
					hex: "#4d535a",
					rgb: {
						r: 77,
						g: 83,
						b: 90
					}
				},
				parent_order: 1
			},
			{
				tile_name: "sand_rocks",
				parent_name: "sand",
				tile_cost: "undefined",
				colour: {
					hex: "#63666a",
					rgb: {
						r: 99,
						g: 102,
						b: 106
					}
				},
				parent_order: 2
			},
			{
				tile_name: "land_edge",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#cccccc",
					rgb: {
						r: 204,
						g: 204,
						b: 204
					}
				},
				parent_order: 1
			},
			{
				tile_name: "land_rim",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#e8e8e8",
					rgb: {
						r: 232,
						g: 232,
						b: 232
					}
				},
				parent_order: 2
			},
			{
				tile_name: "land_base",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#f1f1f1",
					rgb: {
						r: 241,
						g: 241,
						b: 241
					}
				},
				parent_order: 3
			},
			{
				tile_name: "land_perimeter",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#f7f7f7",
					rgb: {
						r: 247,
						g: 247,
						b: 247
					}
				},
				parent_order: 4
			},
			{
				tile_name: "rocky_edge",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#f9f9f9",
					rgb: {
						r: 249,
						g: 249,
						b: 249
					}
				},
				parent_order: 1
			},
			{
				tile_name: "rocky_rim",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#ffffff",
					rgb: {
						r: 255,
						g: 255,
						b: 255
					}
				},
				parent_order: 2
			}		
		]
	},
	tropic: {
		psd_asset: "tropic.psd",
		tiles: [
			{
				tile_name: "water_deepest",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#25a9cb",
					rgb: {
						r: 37,
						g: 169,
						b: 203
					}
				},
				parent_order: 1
			},
			{
				tile_name: "water_deeper",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#28aed0",
					rgb: {
						r: 40,
						g: 174,
						b: 208
					}
				},
				parent_order: 2
			},
			{
				tile_name: "water_deep",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#32b7d8",
					rgb: {
						r: 50,
						g: 183,
						b: 216
					}
				},
				parent_order: 3
			},
			{
				tile_name: "water_medium",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#3dc2e3",
					rgb: {
						r: 61,
						g: 194,
						b: 227
					}
				},
				parent_order: 4
			},
			{
				tile_name: "water_low",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#4ccbeb",
					rgb: {
						r: 76,
						g: 203,
						b: 235
					}
				},
				parent_order: 5
			},
			{
				tile_name: "water_shallow",
				parent_name: "water",
				tile_cost: "undefined",
				colour: {
					hex: "#57d8f8",
					rgb: {
						r: 87,
						g: 216,
						b: 248
					}
				},
				parent_order: 6
			},
			{
				tile_name: "coast_deep",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#6ee0fc",
					rgb: {
						r: 110,
						g: 224,
						b: 252
					}
				},
				parent_order: 1
			},
			{
				tile_name: "coast_medium",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#77e3fd",
					rgb: {
						r: 119,
						g: 227,
						b: 253
					}
				},
				parent_order: 2
			},
			{
				tile_name: "coast_low",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#b1e1d1",
					rgb: {
						r: 117,
						g: 225,
						b: 209
					}
				},
				parent_order: 3
			},
			{
				tile_name: "coast_shallow",
				parent_name: "coast",
				tile_cost: "undefined",
				colour: {
					hex: "#cae1b1",
					rgb: {
						r: 202,
						g: 225,
						b: 177
					}
				},
				parent_order: 4
			},
			{
				tile_name: "sand_beach",
				parent_name: "sand",
				tile_cost: "undefined",
				colour: {
					hex: "#ebe8b5",
					rgb: {
						r: 235,
						g: 232,
						b: 181
					}
				},
				parent_order: 1
			},
			{
				tile_name: "sand_soft",
				parent_name: "sand",
				tile_cost: "undefined",
				colour: {
					hex: "#e3dfa1",
					rgb: {
						r: 227,
						g: 223,
						b: 161
					}
				},
				parent_order: 2
			},
			{
				tile_name: "sand_firm",
				parent_name: "sand",
				tile_cost: "undefined",
				colour: {
					hex: "#e1dd9d",
					rgb: {
						r: 225,
						g: 221,
						b: 157
					}
				},
				parent_order: 3
			},
			{
				tile_name: "sand_mixed",
				parent_name: "sand",
				tile_cost: "undefined",
				colour: {
					hex: "#dbd793",
					rgb: {
						r: 219,
						g: 215,
						b: 147
					}
				},
				parent_order: 4
			},
			{
				tile_name: "land_edge",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#93db93",
					rgb: {
						r: 147,
						g: 219,
						b: 147
					}
				},
				parent_order: 1
			},
			{
				tile_name: "land_rim",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#83cf81",
					rgb: {
						r: 131,
						g: 207,
						b: 129
					}
				},
				parent_order: 2
			},
			{
				tile_name: "land_base",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#54ce68",
					rgb: {
						r: 84,
						g: 206,
						b: 104
					}
				},
				parent_order: 3
			},
			{
				tile_name: "grass_base",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#4cc760",
					rgb: {
						r: 76,
						g: 199,
						b: 96
					}
				},
				parent_order: 4
			},
			{
				tile_name: "grass_short",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#47c55c",
					rgb: {
						r: 71,
						g: 197,
						b: 92
					}
				},
				parent_order: 5
			},
			{
				tile_name: "grass_medium",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#3dc153",
					rgb: {
						r: 61,
						g: 193,
						b: 83
					}
				},
				parent_order: 6
			},
			{
				tile_name: "grass_thick",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#3bc054",
					rgb: {
						r: 59,
						g: 192,
						b: 84
					}
				},
				parent_order: 1
			},
			{
				tile_name: "hill_edge",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#3bc054",
					rgb: {
						r: 59,
						g: 192,
						b: 84
					}
				},
				parent_order: 2
			},
			{
				tile_name: "hill_rim",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#34b84d",
					rgb: {
						r: 52,
						g: 184,
						b: 77
					}
				},
				parent_order: 3
			},
			{
				tile_name: "hill_base",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#34b84d",
					rgb: {
						r: 52,
						g: 184,
						b: 77
					}
				},
				parent_order: 4
			},
			{
				tile_name: "hill_perimeter",
				parent_name: "land",
				tile_cost: "undefined",
				colour: {
					hex: "#3ea952",
					rgb: {
						r: 62,
						g: 169,
						b: 82
					}
				},
				parent_order: 5
			}		
		]
	}
};

console.log("var: \"geography\" parsed.");