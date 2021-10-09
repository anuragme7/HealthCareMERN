const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctor', {
    DoctorId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    DoctorFname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    DoctorMname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DoctorLname: {
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
    Specialization: {
      type: DataTypes.STRING(30),
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
    DoctorFeesPerVisit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    DoctorICUFees: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    DoctorConsultationFees: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DoctorId" },
        ]
      },
    ]
  });
};
