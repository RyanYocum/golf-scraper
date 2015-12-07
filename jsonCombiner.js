var fs  = require('fs');
var info = [];
var results = [];
var colors = ['Black', 'Blue', "White", "Red", "Green", 'Gold'];
var guh = {};
var colorsL1 = ["Black - Ladies", "Blue - Ladies", "White - Ladies", "Red - Ladies", "Green - Ladies", "Gold - Ladies"];
var colorsL2 = ["BlackL", "BlueL", "WhiteL", "RedL", "GreenL", "GoldL"]
var county = ['Los Angeles', 'San Bernardino', 'Riverside', 'Orange', 'San Diego', 'Ventura/Santa Barbara', 'Palm Springs'];
fs.readFile('LosAngeles.json', function (err, data0) {
	if (err) throw err;
	else {
		info.push(JSON.parse(data0));
		fs.readFile('SanBernardinoCounty.json', function (err, data1) {
			if (err) throw err;
			else {
				info.push(JSON.parse(data1));
				fs.readFile('RiversideCounty.json', function (err, data2) {
					if (err) throw err;
					else {
						info.push(JSON.parse(data2));
						fs.readFile('OrangeCounty.json', function (err, data3) {
							if (err) throw err;
							else {
								info.push(JSON.parse(data3));
								fs.readFile('SanDiegoCounty.json', function (err, data4) {
									if (err) throw err;
									else {
										info.push(JSON.parse(data4));
										fs.readFile('VenturaSantaBarbaraCounty.json', function (err, data5) {
											if (err) throw err;
											else {
												info.push(JSON.parse(data5));
												fs.readFile('PalmSpringsCounty.json', function (err, data6) {
													if (err) throw err;
													else {
														info.push(JSON.parse(data6));
														console.log(info)
														for (var i = 0; i < info.length; i++) {
															for (key in info[i]) {
																var curr = info[i][key];
																if (!curr.results) {
																	continue;
																}
																else {
																	var name = [key].toString();
																	if (name.match(/-/)) {
																		name = name.split(' -');
																		name = name[0];
																	}
																	if (name.match(/:/)) {
																		name = name.split(':');
																		name = name[0];
																	}
																	if (name.match(/\(/)) {
																		name = name.split(' (');
																		name = name[0] + ' - ' + name[1].slice(0, name[1].length - 1);
																	}
																	curr.name = name;
																	curr.city = curr.city.slice(2,curr.city.length - 1);
																	curr.county = county[i];
																	curr.general = curr.results.stuff;
																	for (key2 in curr.results.front) {
																		if (!guh[key2]) {
																			guh[key2] = 1
																		}
																	}
																	if (typeof curr.results.back == 'object') {
																		if (!curr.results.back["Men's Par"]) {
																			continue;
																		}
																		curr.par = curr.results.front["Men's Par"].concat(curr.results.back["Men's Par"]);
																		curr.hdcp = curr.results.front["Men's HDCP"].concat(curr.results.back["Men's HDCP"]);
																		curr.parL = curr.results.front["Women's Par"].concat(curr.results.back["Women's Par"]);
																		curr.hdcpL = curr.results.front["Women's HDCP"].concat(curr.results.back["Women's HDCP"]);
																		for (var j = 0; j < colors.length; j++) {
																			if (curr.results.back[colors[j]]) {
																				curr[colors[j]] = curr.results.front[colors[j]].concat(curr.results.back[colors[j]]);
																			}
																			if (curr.results.back[colorsL1[j]]) {
																				curr[colorsL2[j]] = curr.results.front[colorsL1[j]].concat(curr.results.back[colorsL1[j]]);
																			}
																		}
																	}
																	delete curr.results;
																	results.push(curr);
																}
															}
														}
														// console.log(results)
														fs.writeFile("SocalRegionCourses.json", JSON.stringify(results), function (err) {
															if (err) throw err;
																else {
																	console.log('file written')
																}
														});
													}
												})
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	}
})