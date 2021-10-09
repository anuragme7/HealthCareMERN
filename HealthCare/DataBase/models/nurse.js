const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurse', {
    NurseId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    NurseFname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    NurseMname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    NurseLname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    City: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    DateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MobNo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    EmergencyContact: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    IdCard: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    NurseFeesPerDay: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    WardNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'ward',
        key: 'WardNo'
      }
    }
  }, {
    sequelize,
    tableName: 'nurse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NurseId" },
        ]
      },
      {
        name: "FK_NurseWardNo",
        using: "BTREE",
        fields: [
          { name: "WardNo" },
        ]
      },
    ]
  });
};
