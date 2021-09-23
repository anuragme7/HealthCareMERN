const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    AdminEmail: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    AdminPassword: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AdminEmail" },
        ]
      },
    ]
  });
};
