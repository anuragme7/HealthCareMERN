const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctorobservations', {
    ObsId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patient',
        key: 'PatientId'
      }
    },
    Observation: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctorobservations',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ObsId" },
        ]
      },
      {
        name: "FK_OBSDoctorId",
        using: "BTREE",
        fields: [
          { name: "DoctorId" },
        ]
      },
      {
        name: "FK_OBSPatientId",
        using: "BTREE",
        fields: [
          { name: "PatientId" },
        ]
      },
    ]
  });
};
