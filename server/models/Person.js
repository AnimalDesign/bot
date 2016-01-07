var Sequelize = require('sequelize');

module.exports = {
	model: {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	relations: {
		hasMany: 'Device'
	},
	options: {
		indexes: [{
			unique: true,
			fields: ['email']
		}],
		paranoid: true,
		underscored: true,
		freezeTableName: true
	}
}