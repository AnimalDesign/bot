var Sequelize = require('sequelize');

module.exports = {
	model: {
		hostname: {
			type: Sequelize.STRING
		},
		macaddress: {
			type: Sequelize.STRING(12),
			allowNull: false
		},
		person: {
			type: Sequelize.INTEGER,
			field: 'person_id',
			references: {
				model: 'Person',
				key: 'id'
			}
		}
	},
	relations: {
		belongsTo: 'Person'
	},
	options: {
		indexes: [{
			unique: true,
			fields: ['macaddress']
		}],
		paranoid: true,
		underscored: true,
		freezeTableName: true
	}
}