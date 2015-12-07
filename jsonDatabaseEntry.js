var Sequelize = require('sequelize');
var sequelize = new Sequelize('golf', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: false
});

var Course = sequelize.define('course', {
	name: Sequelize.STRING,
	rating: Sequelize.FLOAT,
	slope: Sequelize.FLOAT,
	par:  { type : Sequelize.ARRAY(Sequelize.FLOAT), defaultValue: null},
	handicap:  { type : Sequelize.ARRAY(Sequelize.FLOAT), defaultValue: null}
});

sequelize.sync()