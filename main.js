process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var request = require('request');
var cheerio = require('cheerio');

	var results = {};
	results.stuff = [];
	results.front = [];
	results.back = [];

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
			results.stuff.push($(element).text())
		})
		var tbody = obj.children('.header').next().next().children().find("td")
		console.log(tbody)
		tbody.map(function (i, element) {
			results.front.push($(element).text())
		})
		var tbody1 = obj.children('.header').next().next().next().children().find("td")
		console.log(tbody1)
		tbody1.map(function (i, element) {
			results.back.push($(element).text())
		})
		console.log(results)
	}
})