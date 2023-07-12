const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Candy = sequelize.define('candy', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    product: Sequelize.STRING,

    productCode:Sequelize.STRING,
    
    qty: {
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    perPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
},

{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Candy;