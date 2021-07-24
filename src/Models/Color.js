const db = require('../Database/db');
const { Sequelize, DataTypes } = db.Sequelize

const Color = db.sequelize.define('colors', {
    descript: {
        allowNull: false,
        type: DataTypes.STRING(50)
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

// Color.sync({force: true});

module.exports = Color;