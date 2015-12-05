process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var request = require('request');
var cheerio = require('cheerio');

var courseInfo = {};

request('https://www.greenskeeper.org/southern_california/golf_courses/', function (error, response, html) {
	if (error) {
		console.log(error);
	}
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		// console.log(html)
		var obj = $('#countyCourses table')
		// .first().map(function (i, element) {
		// 	var eh = (element).children.map(function (j, elemen) {
		// 		if 
		// 		console.log(j.children[0])
		// 	})
		// 	// console.log(element)
		// 	// console.log(i)
		// })
		var bleh = obj.first().find('td');
		name = ''
		bleh.map(function (i, element) {
			if (i !== 0) {
				if ((i % 2) ==1) {
					name = $(element).find('a').text();
					// console.log(name);
					var city = $(element).find('font').text();
					courseInfo[name] = {};
					courseInfo[name].city = city;
					var link = $(element).find('a').attr('href');
					courseInfo[name].link = link;
				}
				if ((i % 2) === 0) {
					var check = $(element).find('img').first().next().attr('src')
					if (check === '/golf_courses/images/scorecard.png') {
						courseInfo[name].url = 'https://www.greenskeeper.org/southern_california' + courseInfo[name].link + '/scorecard.cfm'
					}
				}
			}
		})
		console.log(courseInfo)
	}
})

// 	var results = {};
// 	results.stuff = {};
// 	results.front = {};
// 	results.back = {};
// 	var temp1 = [];
// 	var temp2 = [];
// 	var temp3 = [];

// request('https://www.greenskeeper.org/southern_california/los_angeles/Alhambra_Golf_Course/scorecard.cfm', function (error, response, html) {

// 	if (error) {
// 		console.log(error);
// 	}
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		var obj = $('#gcscorecard');
// 		var tbody = obj.children('.header').next().children().find("td")
// 		console.log(tbody)
// 		tbody.map(function (i, element) {
// 			temp1.push($(element).text())
// 		})
// 		var tbody = obj.children('.header').next().next().children().find("td")
// 		console.log(tbody)
// 		tbody.map(function (i, element) {
// 			temp2.push($(element).text())
// 		})
// 		var tbody1 = obj.children('.header').next().next().next().children().find("td")
// 		console.log(tbody1)
// 		tbody1.map(function (i, element) {
// 			temp3.push($(element).text())
// 		})
// 		console.log(temp1.length)
// 		var temp4 = temp1.slice(0,5)
// 		console.log(temp4)
// 		for (var i = 0; i < temp1.length - 2; i+=5) {
// 			results.stuff[temp1[i]] = [];
// 			results.stuff[temp1[i]].push(temp1[i+1])
// 			results.stuff[temp1[i]].push(temp1[i+2])
// 			results.stuff[temp1[i]].push(temp1[i+3])
// 			results.stuff[temp1[i]].push(temp1[i+4])
// 		}
// 		for (var i = 0; i < temp2.length - 2; i += 10) {
// 			results.front[temp2[i]] = [];
// 			results.back[temp3[i]] = [];
// 			for (var j = 1; j < 10; j++) {
// 				results.front[temp2[i]].push(temp2[i+j])
// 				results.back[temp3[i]].push(temp3[i+j])
// 			}
// 		}
// 		console.log(results)
// 	}
// })