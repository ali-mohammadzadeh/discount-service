const { Sequelize, DataTypes,Model } = require('sequelize');

let configuration=require('./../../config/config.json')[process.env["MODE"]??"development"]
const sequelize = new Sequelize(configuration.database,configuration.username, configuration.password, {
    host: configuration.host,
    dialect: configuration.dialect
});

module.exports = {
    sequelize,
    DataTypes,
    Model
}

