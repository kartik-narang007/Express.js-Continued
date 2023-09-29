const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'root', {dialect :'mysql', host:'localhost'});

module.exports = sequelize;


























//install sequelize by npm install --sequelize
//uske baad Sequelize module ko import kro 
//and ek naya sequelize object banao database se connect krke ek naya sequel pool banane ke liye.
//ab model me jaake product js me model banao
