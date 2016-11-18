var chai = require('chai'),
	assert = chai.assert,
	AnimalBot = require('../lib/animalBot'),
	animalbot = new AnimalBot;

describe('animalBot', function() {
	it('loads configuration when initialized', function() {
		assert.equal(typeof animalbot.settings, 'object');
	});

	it('configuration contains path to database', function() {
		assert.equal(typeof animalbot.settings.dbPath, 'string');
	});
});
