const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicalbill', {
    BillNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    BillDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    BillTime: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    PatientId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'patient',
        key: 'PatientId'
      }
    },
    DoctorId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'DoctorId'
      }
    },
    AmtBeforeTax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TotalBill: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    AmtAfterTax: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicalbill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BillNo" },
        ]
      },
      {
        name: "FK_BillDoctorId",
        using: "BTREE",
        fields: [
          { name: "DoctorId" },
        ]
      },
      {
        name: "FK_BillPatientId",
        using: "BTREE",
        fields: [
          { name: "PatientId" },
        ]
      },
    ]
  });
};
