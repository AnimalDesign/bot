// http://www.redotheweb.com/2013/02/20/sequelize-the-javascript-orm-in-practice.html
// https://github.com/JeyDotC/articles/blob/master/EXPRESS%20WITH%20SEQUELIZE.md

var filesystem = require('fs'),
	Sequelize = require('sequelize'),
	models = {},
	relationships = {};

var singleton = function singleton() {
	var sequelize = null;
	var modelsPath = '';

	this.setup = function(path, database, username, password, obj) {
		modelsPath = path;

		if (arguments.length == 3) {
			sequelize = new Sequelize(database, username);
		} else if (arguments.length == 4) {
			sequelize = new Sequelize(database, username, password);
		} else if (arguments.length == 5) {
			sequelize = new Sequelize(database, username, password, obj);
		}

		init();
	}

	this.model = function(name) {
		return models[name];
	}

	this.seq = function() {
		return sequelize;
	}

	function init() {
		filesystem.readdirSync('server/' + modelsPath).forEach(function(name) {
			var modelName = name.replace(/\.js$/i, ''),
				object = require('../' + modelsPath + '/' + modelName);

			models[modelName] = sequelize.define(modelName, object.model, object.options || {});

			if ('relations' in object) {
				relationships[modelName] = object.relations;
			}
		});

		console.info('> Loaded models', models);

		for (var name in relationships) {
			var relation = relationships[name];
			for (var relName in relation) {
				var related = relation[relName];
				console.info('> Relation: ' + name + ' ' + relName + ' ' + related);
				models[name][relName](models[related]);
			}
		}
	}

	if (singleton.caller != singleton.getInstance) {
		throw new Error('This object cannot be instanciated');
	}
}

singleton.instance = null;
singleton.getInstance = function() {
	if (this.instance === null) {
		this.instance = new singleton();
	}
	return this.instance;
}

module.exports = singleton.getInstance();