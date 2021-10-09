const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medical', {
    MedId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    MedName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    MedType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Manufacturer: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ManuDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    HospitalInDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UnitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Ingredients: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'medical',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MedId" },
        ]
      },
    ]
  });
};
