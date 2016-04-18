'use strict';

var filesystem = require('fs'),
	Sequelize = require('sequelize'),
	logger = require('./logger'),
	sequelize = null,
	models = {},
	relationships = {};

/**
 * Singleton database layer
 * @class db
 */
class db {
	connect(config) {
		config.logging = logger.info;

		sequelize = new Sequelize(
			config.database || '',
			config.username || '',
			config.password || '',
			config
		);

		return sequelize
			.authenticate()
			.then(function() {
				logger.log('verbose', 'Connection has been established successfully.');
			}, function(err) {
				logger.error(err);
			});
	}

	loadModels(path) {
		if (!filesystem.existsSync('app/' + path)) {
			return;
		}

		filesystem.readdirSync('app/' + path).forEach(function(name) {
			var modelName = name.replace(/\.js$/i, ''),
				object = require('../' + path + '/' + modelName);

			models[modelName] = sequelize.define(modelName, object.model, object.options || {});

			if ('relations' in object) {
				relationships[modelName] = object.relations;
			}
		});

		logger.log('verbose', 'Loaded models', models);
	}

	/**
	 * Creates relations between database models
	 */
	createRelations() {
		for (var name in relationships) {
			if ({}.hasOwnProperty.call(relationships, name)) {
				var relation = relationships[name];
				for (var relName in relation) {
					if ({}.hasOwnProperty.call(relation, relName)) {
						var related = relation[relName];
						models[name][relName](models[related]);
						logger.log('verbose', 'Relation: ' + name + ' ' + relName + ' ' + related);
					}
				}
			}
		}
	}

	/**
	 * Sync datbase schema
	 */
	syncDatabase(force) {
		force = typeof force !== 'undefined' ? force : false;

		sequelize
			.sync(force)
			.then(function() {
				logger.info('Database tables synced.');
			}, function(err) {
				throw new Error(err);
			});
	}

	/**
	 * Returns database model
	 * @returns {object}
	 */
	getModel(name) {
		return models[name];
	}

	seq() {
		return sequelize;
	}
}

module.exports = exports = new db();