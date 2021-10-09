const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctor_patient_relation', {
    RelationId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    DoctorId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'DoctorId'
      }
    },
    PatientId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'patient',
        key: 'PatientId'
      }
    },
    ReferredIn: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'doctor',
        key: 'DoctorId'
      }
    },
    ReferredOut: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Active: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctor_patient_relation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RelationId" },
        ]
      },
      {
        name: "FK_DoctorId",
        using: "BTREE",
        fields: [
          { name: "DoctorId" },
        ]
      },
      {
        name: "FK_PatientId",
        using: "BTREE",
        fields: [
          { name: "PatientId" },
        ]
      },
      {
        name: "FK_ReferredIn",
        using: "BTREE",
        fields: [
          { name: "ReferredIn" },
        ]
      },
    ]
  });
};
