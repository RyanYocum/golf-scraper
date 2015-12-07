var Sequelize = require('sequelize');
var sequelize = new Sequelize('golf', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: false
});

var fs = require('fs');

var data = JSON.parse(fs.readFileSync("SocalRegionCourses.json", 'utf8'));

var Course = sequelize.define('course', {
	county: Sequelize.STRING,
	city: Sequelize.STRING,
	name: Sequelize.STRING,
	rating: Sequelize.FLOAT,
	slope: Sequelize.FLOAT,
	par:  { type : Sequelize.ARRAY(Sequelize.FLOAT), defaultValue: null},
	hdcp:  { type : Sequelize.ARRAY(Sequelize.FLOAT), defaultValue: null},
	parL:  { type : Sequelize.ARRAY(Sequelize.FLOAT), defaultValue: null},
	hdcpL:  { type : Sequelize.ARRAY(Sequelize.FLOAT), defaultValue: null},
});

sequelize.sync()

for (var i = 0; i < data.length; i++) {
	var j = data[i];
	Course.create({name: j.name, city: j.city, county: j.county, par: j.par, hdcp: j.hdcp, parL: j.parL, hdcpL: j.hdcpL})
}