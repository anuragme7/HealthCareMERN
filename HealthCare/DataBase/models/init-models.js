var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _doctor = require("./doctor");
var _doctor_patient_relation = require("./doctor_patient_relation");
var _medical = require("./medical");
var _medicalbill = require("./medicalbill");
var _medicalbilldetails = require("./medicalbilldetails");
var _nurse = require("./nurse");
var _patient = require("./patient");
var _room = require("./room");
var _ward = require("./ward");
var _wardboy = require("./wardboy");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);
  var doctor_patient_relation = _doctor_patient_relation(sequelize, DataTypes);
  var medical = _medical(sequelize, DataTypes);
  var medicalbill = _medicalbill(sequelize, DataTypes);
  var medicalbilldetails = _medicalbilldetails(sequelize, DataTypes);
  var nurse = _nurse(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var room = _room(sequelize, DataTypes);
  var ward = _ward(sequelize, DataTypes);
  var wardboy = _wardboy(sequelize, DataTypes);

  doctor_patient_relation.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(doctor_patient_relation, { as: "doctor_patient_relations", foreignKey: "DoctorId"});
  doctor_patient_relation.belongsTo(doctor, { as: "ReferredIn_doctor", foreignKey: "ReferredIn"});
  doctor.hasMany(doctor_patient_relation, { as: "ReferredIn_doctor_patient_relations", foreignKey: "ReferredIn"});
  medicalbill.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(medicalbill, { as: "medicalbills", foreignKey: "DoctorId"});
  medicalbilldetails.belongsTo(medical, { as: "Med", foreignKey: "MedId"});
  medical.hasMany(medicalbilldetails, { as: "medicalbilldetails", foreignKey: "MedId"});
  medicalbilldetails.belongsTo(medicalbill, { as: "BillNo_medicalbill", foreignKey: "BillNo"});
  medicalbill.hasMany(medicalbilldetails, { as: "medicalbilldetails", foreignKey: "BillNo"});
  doctor_patient_relation.belongsTo(patient, { as: "Patient", foreignKey: "PatientId"});
  patient.hasMany(doctor_patient_relation, { as: "doctor_patient_relations", foreignKey: "PatientId"});
  medicalbill.belongsTo(patient, { as: "Patient", foreignKey: "PatientId"});
  patient.hasMany(medicalbill, { as: "medicalbills", foreignKey: "PatientId"});
  nurse.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(nurse, { as: "nurses", foreignKey: "WardNo"});
  room.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(room, { as: "rooms", foreignKey: "WardNo"});
  wardboy.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(wardboy, { as: "wardboys", foreignKey: "WardNo"});

  return {
    admin,
    doctor,
    doctor_patient_relation,
    medical,
    medicalbill,
    medicalbilldetails,
    nurse,
    patient,
    room,
    ward,
    wardboy,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
