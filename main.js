process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var request = require('request');
var cheerio = require('cheerio');

	var results = {};
	results.stuff = {};
	results.front = {};
	results.back = {};
	var temp1 = [];
	var temp2 = [];
	var temp3 = [];

request('https://www.greenskeeper.org/southern_california/los_angeles/Alhambra_Golf_Course/scorecard.cfm', function (error, response, html) {

	if (error) {
		console.log(error);
	}
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		var obj = $('#gcscorecard');
		var tbody = obj.children('.header').next().children().find("td")
		console.log(tbody)
		tbody.map(function (i, element) {
			temp1.push($(element).text())
		})
		var tbody = obj.children('.header').next().next().children().find("td")
		console.log(tbody)
		tbody.map(function (i, element) {
			temp2.push($(element).text())
		})
		var tbody1 = obj.children('.header').next().next().next().children().find("td")
		console.log(tbody1)
		tbody1.map(function (i, element) {
			temp3.push($(element).text())
		})
		console.log(temp1.length)
		var temp4 = temp1.slice(0,5)
		console.log(temp4)
		for (var i = 0; i < temp1.length - 2; i+=5) {
			results.stuff[temp1[i]] = [];
			results.stuff[temp1[i]].push(temp1[i+1])
			results.stuff[temp1[i]].push(temp1[i+2])
			results.stuff[temp1[i]].push(temp1[i+3])
			results.stuff[temp1[i]].push(temp1[i+4])
		}
		for (var i = 0; i < temp2.length - 2; i += 10) {
			results.front[temp2[i]] = [];
			results.back[temp3[i]] = [];
			for (var j = 1; j < 10; j++) {
				results.front[temp2[i]].push(temp2[i+j])
				results.back[temp3[i]].push(temp3[i+j])
			}
		}
		console.log(results)
	}
})