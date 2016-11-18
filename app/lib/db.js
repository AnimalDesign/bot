'use strict';

import { existsSync, readdirSync } from 'fs';
import Sequelize from 'sequelize';
import { logger } from '.';

let sequelize = null;
const models = {};
const relationships = {};

/**
 * Singleton database layer
 * @class db
 */
class db {
	connect(config) {
		config.logging = logger.info;
		config.define = {
			underscored: false,
			freezeTableName: false
		};

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
		if (!existsSync('app/' + path)) {
			return;
		}

		readdirSync('app/' + path)
			.filter((file) => file.substr(-3) === '.js')
			.forEach(function(name) {
				const modelName = name.replace(/\.js$/i, '');
				const object = require('../' + path + '/' + modelName);

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
		for (const name in relationships) {
			if ({}.hasOwnProperty.call(relationships, name)) {
				const relation = relationships[name];
				for (const relName in relation) {
					if ({}.hasOwnProperty.call(relation, relName)) {
						const related = relation[relName];
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
	syncDatabase(force = false) {
		sequelize
			.sync(force)
			.then(function() {
				logger.info('Database tables synced.');
			}, function(err) {
				throw new Error(err);
			});
	}

	/**
	 * Returns database models
	 * @returns {array}
	 */
	getModels() {
		return models;
	}

	/**
	 * Returns database model
	 * @returns {object}
	 */
	getModel(name) {
		return models[name];
	}
}

module.exports = exports = new db();
