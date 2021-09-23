var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _doctor = require("./doctor");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);


  return {
    admin,
    doctor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
