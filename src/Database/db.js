const Sequelize = require('sequelize');
const sequelize = new Sequelize('melhorcom', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function () {
    console.log("Connected...");
    return sequelize;
}).catch(function (erro) {
    console.log("Error: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};