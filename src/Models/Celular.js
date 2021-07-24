const db = require('../Database/db');
const { Sequelize, DataTypes } = db.Sequelize;
const Color = require('./Color');

const Celular = db.sequelize.define('celulares', {
    model: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    brand: {
        allowNull: false,
        type: DataTypes.STRING
    },
    startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    endDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    colorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {         // User belongsTo Company 1:1
            model: 'Colors',
            key: 'id'
        }
    },
    code: {
        allowNull: false,
        type: DataTypes.STRING(8)
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
    }
})

// Celular.sync({force: true});

module.exports = Celular;