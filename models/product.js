//sbse pehle Sequelize module import kro
const Sequelize = require('sequelize');

//util me jo object banaya tha data pool vaala vo import kro
const sequelize = require('../util/database');

//Product naam se new table define kro

const Product = sequelize.define('products',{ 
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title:{
    type:Sequelize.STRING,
    allowNull : false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl:{
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
})
module.exports = Product;


//table ka naam and ek javascript object dena hota hai define method me