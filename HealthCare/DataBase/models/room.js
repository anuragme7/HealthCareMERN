const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    RoomNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    WardNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'ward',
        key: 'WardNo'
      }
    },
    RoomType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    RoomFeesPerDay: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoomNo" },
        ]
      },
      {
        name: "FK_WardNo",
        using: "BTREE",
        fields: [
          { name: "WardNo" },
        ]
      },
    ]
  });
};
