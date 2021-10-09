const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ward', {
    WardNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    WardType: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ward',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "WardNo" },
        ]
      },
    ]
  });
};
