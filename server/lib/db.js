'use strict';

var filesystem = require('fs'),
	Sequelize = require('sequelize'),
	models = {},
	relationships = {};

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

		return sequelize
			.authenticate()
			.then(function() {
				console.info('> Connection has been established successfully.');
			}, function(err) {
				throw new Error(err);
			});
	}

	this.loadModels = function(path) {
		if (!filesystem.existsSync('server/' + path)) {
			return;
		}

		filesystem.readdirSync('server/' + path).forEach(function(name) {
			var modelName = name.replace(/\.js$/i, ''),
				object = require('../' + path + '/' + modelName);

			models[modelName] = sequelize.define(modelName, object.model, object.options || {});

			if ('relations' in object) {
				relationships[modelName] = object.relations;
			}
		});

		console.info('> Loaded models', models);
	}

	/**
	 * Creates relations between database models
	 *
	 * @public
	 */
	this.createRelations = function() {
		for (var name in relationships) {
			var relation = relationships[name];
			for (var relName in relation) {
				var related = relation[relName];
				models[name][relName](models[related]);
				console.info('> Relation: ' + name + ' ' + relName + ' ' + related);
			}
		}
	}

	/**
	 * Sync datbase schema
	 *
	 * @public
	 */
	this.syncDatabase = function(force) {
		force = typeof force !== 'undefined' ? force : false;

		sequelize
			.sync(force)
			.then(function() {
				console.info('> Database tables synced.');
			}, function(err) {
				throw new Error(err);
			});
	}

	/**
	 * Returns database model
	 *
	 * @returns {object}
	 *
	 * @public
	 */
	this.getModel = function(name) {
		return models[name];
	}

	this.seq = function() {
		return sequelize;
	}
}

module.exports = exports = new db();