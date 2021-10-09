const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    PatientId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PatientFname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    PatientMname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PatientLname: {
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
    IPD_OPD: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Roomno: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Disease: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MobNo: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    EmergencyContact: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    IdCard: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PatientId" },
        ]
      },
    ]
  });
};
