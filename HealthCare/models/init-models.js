var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _doctor = require("./doctor");
var _doctor_patient_relation = require("./doctor_patient_relation");
var _doctorobservations = require("./doctorobservations");
var _medical = require("./medical");
var _medicalbill = require("./medicalbill");
var _medicalbilldetails = require("./medicalbilldetails");
var _nurse = require("./nurse");
var _patient = require("./patient");
var _roles = require("./roles");
var _room = require("./room");
var _staff = require("./staff");
var _tempstaff = require("./tempstaff");
var _tempuser = require("./tempuser");
var _user = require("./user");
var _userinrole = require("./userinrole");
var _ward = require("./ward");
var _wardboy = require("./wardboy");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);
  var doctor_patient_relation = _doctor_patient_relation(sequelize, DataTypes);
  var doctorobservations = _doctorobservations(sequelize, DataTypes);
  var medical = _medical(sequelize, DataTypes);
  var medicalbill = _medicalbill(sequelize, DataTypes);
  var medicalbilldetails = _medicalbilldetails(sequelize, DataTypes);
  var nurse = _nurse(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var room = _room(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var tempstaff = _tempstaff(sequelize, DataTypes);
  var tempuser = _tempuser(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userinrole = _userinrole(sequelize, DataTypes);
  var ward = _ward(sequelize, DataTypes);
  var wardboy = _wardboy(sequelize, DataTypes);

  doctor_patient_relation.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(doctor_patient_relation, { as: "doctor_patient_relations", foreignKey: "DoctorId"});
  doctor_patient_relation.belongsTo(doctor, { as: "ReferredIn_doctor", foreignKey: "ReferredIn"});
  doctor.hasMany(doctor_patient_relation, { as: "ReferredIn_doctor_patient_relations", foreignKey: "ReferredIn"});
  doctorobservations.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(doctorobservations, { as: "doctorobservations", foreignKey: "DoctorId"});
  medicalbill.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(medicalbill, { as: "medicalbills", foreignKey: "DoctorId"});
  medicalbilldetails.belongsTo(medical, { as: "Med", foreignKey: "MedId"});
  medical.hasMany(medicalbilldetails, { as: "medicalbilldetails", foreignKey: "MedId"});
  medicalbilldetails.belongsTo(medicalbill, { as: "BillNo_medicalbill", foreignKey: "BillNo"});
  medicalbill.hasMany(medicalbilldetails, { as: "medicalbilldetails", foreignKey: "BillNo"});
  doctor_patient_relation.belongsTo(patient, { as: "Patient", foreignKey: "PatientId"});
  patient.hasMany(doctor_patient_relation, { as: "doctor_patient_relations", foreignKey: "PatientId"});
  doctorobservations.belongsTo(patient, { as: "Patient", foreignKey: "PatientId"});
  patient.hasMany(doctorobservations, { as: "doctorobservations", foreignKey: "PatientId"});
  medicalbill.belongsTo(patient, { as: "Patient", foreignKey: "PatientId"});
  patient.hasMany(medicalbill, { as: "medicalbills", foreignKey: "PatientId"});
  staff.belongsTo(roles, { as: "Role", foreignKey: "RoleId"});
  roles.hasMany(staff, { as: "staffs", foreignKey: "RoleId"});
  userinrole.belongsTo(roles, { as: "Role", foreignKey: "RoleId"});
  roles.hasMany(userinrole, { as: "userinroles", foreignKey: "RoleId"});
  userinrole.belongsTo(user, { as: "User", foreignKey: "UserId"});
  user.hasOne(userinrole, { as: "userinrole", foreignKey: "UserId"});
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
    doctorobservations,
    medical,
    medicalbill,
    medicalbilldetails,
    nurse,
    patient,
    roles,
    room,
    staff,
    tempstaff,
    tempuser,
    user,
    userinrole,
    ward,
    wardboy,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
