const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicalbilldetails', {
    BillDetailsNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    BillNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'medicalbill',
        key: 'BillNo'
      }
    },
    MedId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'medical',
        key: 'MedId'
      }
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicalbilldetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BillDetailsNo" },
        ]
      },
      {
        name: "FK_BillNo",
        using: "BTREE",
        fields: [
          { name: "BillNo" },
        ]
      },
      {
        name: "FK_MedId",
        using: "BTREE",
        fields: [
          { name: "MedId" },
        ]
      },
    ]
  });
};
