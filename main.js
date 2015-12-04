process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var request = require('request');
var cheerio = require('cheerio');

request('https://www.greenskeeper.org/southern_california/golf_courses/', function (error, response, html) {
	if (error) {
		console.log(error);
	}
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		console.log(html);
	}
})