const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    StaffId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Fname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Mname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Lname: {
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
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'RoleId'
      }
    },
    EmergencyContact: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    IdCard: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MobNo: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffId" },
        ]
      },
      {
        name: "FK_StaffRoleId",
        using: "BTREE",
        fields: [
          { name: "RoleId" },
        ]
      },
    ]
  });
};
