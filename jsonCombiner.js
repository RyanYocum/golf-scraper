var fs  = require('fs');
var info = [];
var results = [];
fs.readFile('LosAngeles.json', function (err, data0) {
	if (err) throw err;
	else {
		info.push(data0)
		fs.readFile('SanBernardinoCounty.json', function (err, data1) {
			if (err) throw err;
			else {
				info.push(data1)
				fs.readFile('RiversideCounty.json', function (err, data2) {
					if (err) throw err;
					else {
						info.push(data2)
						fs.readFile('OrangeCounty.json', function (err, data3) {
							if (err) throw err;
							else {
								info.push(data3)
								fs.readFile('OrangeCounty.json', function (err, data4) {
									if (err) throw err;
									else {
										info.push(data4)
										fs.readFile('VenturaSantaBarbaraCounty.json', function (err, data5) {
											if (err) throw err;
											else {
												info.push(data5)
												fs.readFile('PalmSpringsCounty.json', function (err, data6) {
													if (err) throw err;
													else {
														info.push(data6)
														console.log('all loaded')
														// for (var i = 0; i < info.length; i++) {
														// 	for (key in info[i]) {

														// 	}
														// }
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