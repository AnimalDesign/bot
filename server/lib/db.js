// 'use strict';

var filesystem = require('fs'),
	Sequelize = require('sequelize'),
	models = {};

var db = function db() {
	var sequelize = null;

	this.connect = function(database, username, password, obj) {
		if (arguments.length == 2) {
			sequelize = new Sequelize(database, username);
		} else if (arguments.length == 3) {
			sequelize = new Sequelize(database, username, password);
		} else if (arguments.length == 4) {
			sequelize = new Sequelize(database, username, password, obj);
		}

		sequelize
			.authenticate()
			.then(function() {
				console.info('> Connection has been established successfully.');
			}, function(err) {
				throw new Error(err);
			});
	}

	this.loadModels = function(path) {
		var pathModelCount = 0,
			pathRelationships = {};

		// Load models from path
		filesystem.readdirSync('server/' + path).forEach(function(name) {
			var modelName = name.replace(/\.js$/i, ''),
				object = require('../' + path + '/' + modelName);

			models[modelName] = sequelize.define(modelName, object.model, object.options || {});
			pathModelCount++;

			if ('relations' in object) {
				pathRelationships[modelName] = object.relations;
			}
		});
		
		console.info('> Loaded models', models);

		// Create relations
		for (var name in pathRelationships) {
			var relation = pathRelationships[name];
			for (var relName in relation) {
				var related = relation[relName];
				models[name][relName](models[related]);
				console.info('> Relation: ' + name + ' ' + relName + ' ' + related);
			}
		}

		if(pathModelCount > 0) {
			sequelize
			.sync({
				force: true
			})
			.then(function() {
				console.info('> Database tables synced.');
			}, function(err) {
				throw new Error(err);
			});
		}
	}

	this.model = function(name) {
		return models[name];
	}

	this.seq = function() {
		return sequelize;
	}

	if (db.caller != db.getInstance) {
		throw new Error('This object cannot be instanciated');
	}
}

db.instance = null;
db.getInstance = function() {
	if (this.instance === null) {
		this.instance = new db();
	}
	return this.instance;
}

module.exports = db.getInstance();