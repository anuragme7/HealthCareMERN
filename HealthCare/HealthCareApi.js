const express  =require('express');
const cors = require('cors');
const createAdmin = require('./dal/dataaccessAdmin');
const createDoctor = require('./dal/dataaccessDoctor');
const createPatient = require('./dal/dataaccessPatient');
const createNurse = require('./dal/dataaccessNurse');
const createWardBoy = require('./dal/dataaccessWardBoy');
const createRoom =require('./dal/dataaccessRoom');
const createWard = require('./dal/dataaccessWard');
const createRole = require('./dal/dataaccessRole');
const createTempUser = require('./dal/dataaccessTempUser');
const createTempStaff = require('./dal/dataaccessTempStaff');
const createStaff = require('./dal/dataaccessStaff');
const createDocPat = require('./dal/dataaccessDoctorPatientRel');
const createDocObservations = require('./dal/dataaccessDoctorObservation');
const creareMedical = require('./dal/dataaccessMedical');

const instance = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());

instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);

const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
  };

instance.set("jwtSecret", jwtSettings.jwtSecret);

//Admin APIs
let adminObj = new createAdmin();

instance.post('/api/app/login',adminObj.login);

//Role APIs
let roleObj = new createRole();
instance.post('/api/role/login',roleObj.login);
instance.post('/api/role/post',roleObj.newRole);
instance.post('/api/role/user/post',roleObj.newUser);
instance.post('/api/role/userinrole/post',roleObj.newUserRole);

instance.get('/api/role/get',roleObj.getData);

//TempUser APIs
let tempuserObj = new createTempUser();

instance.post('/api/tmpusr/post',tempuserObj.postData);
instance.post('/api/tmpusr/check',tempuserObj.checkUser);


instance.get('/api/tmpusr/get',tempuserObj.getData);
instance.get('/api/tmpusr/get/:id',tempuserObj.getDataById);
instance.get('/api/tmpusr/getroles',tempuserObj.getRoles);

instance.delete('/api/tmpusr/delete/:id',tempuserObj.deleteData);

//TempStaff APIs
let tempstaffObj = new createTempStaff();

instance.post('/api/tmpstf/post',tempstaffObj.postData);

instance.get('/api/tmpstf/get',tempstaffObj.getData);
instance.get('/api/tmpstf/get/:id',tempstaffObj.getDataById);


instance.delete('/api/tmpstf/delete/:id',tempstaffObj.deleteData);

//Doctor APIs
let doctorObj = new createDoctor();

instance.post('/api/doc/post',doctorObj.postData);

instance.get('/api/doc/get',doctorObj.getData);
instance.get('/api/doc/get/:id',doctorObj.getDataById);


instance.delete('/api/doc/delete/:id',doctorObj.deleteData);

instance.put('/api/doc/put/:id',doctorObj.putData);

//Doctor Observation APIs
let doctorobsObj = new createDocObservations();
instance.post('/api/docobs/post',doctorobsObj.postData);

instance.post('/api/docobs/get',doctorobsObj.getDataById);

instance.delete('/api/docobs/delete/:id',doctorobsObj.deleteData);

instance.put('/api/docobs/put/:id',doctorobsObj.putData);


//Patient APIs
let patientObj = new createPatient();

instance.get('/api/pat/get',patientObj.getPatientData);
instance.get('/api/pat/get/:id',patientObj.getPatientDataById);

instance.post('/api/pat/post',patientObj.postPatientData);

instance.put('/api/pat/put/:id',patientObj.putPatientData);

//instance.delete('/api/pat/delete/:id',patientObj.deletePatientData);


//Doctor Patient APIs
let docpatObj = new createDocPat();

instance.get('/api/docpat/get',docpatObj.getData);
instance.get('/api/docpat/getDoc/:id',docpatObj.getDataByDocId);
instance.get('/api/docpat/getPat/:id',docpatObj.getDataByPatId);


instance.post('/api/docpat/post',docpatObj.postData);

instance.put('/api/docpat/put/:id',docpatObj.putData);

//Nurse APIs
let nurseObj = new createNurse();

instance.get('/api/nur/get',nurseObj.getData);
instance.get('/api/nur/get/:id',nurseObj.getDataById);

instance.post('/api/nur/post',nurseObj.postData);

instance.put('/api/nur/put/:id',nurseObj.putData);

instance.delete('/api/nur/delete/:id',nurseObj.deleteData);

//WardBoy APIs
let wardboyObj = new createWardBoy();

instance.get('/api/warb/get',wardboyObj.getData);
instance.get('/api/warb/get/:id',wardboyObj.getDataById);

instance.post('/api/warb/post',wardboyObj.postData);

instance.put('/api/warb/put/:id',wardboyObj.putData);

instance.delete('/api/warb/delete/:id',wardboyObj.deleteData);

//Room APIs
let roomObj = new createRoom();

instance.get('/api/roo/get',roomObj.getData);
instance.get('/api/roo/get/:id',roomObj.getDataById);

instance.post('/api/roo/post',roomObj.postData);

instance.put('/api/roo/put/:id',roomObj.putData);

instance.delete('/api/roo/delete/:id',roomObj.deleteData);

//Ward APIs
let wardObj = new createWard();

instance.get('/api/wrd/get',wardObj.getData);
instance.get('/api/wrd/get/:id',wardObj.getDataById);

instance.post('/api/wrd/post',wardObj.postData);

instance.put('/api/wrd/put/:id',wardObj.putData);

instance.delete('/api/wrd/delete/:id',wardObj.deleteData);


//Staff APIs
let staffObj = new createStaff();

instance.post('/api/stf/post',staffObj.postData);

instance.get('/api/stf/get',staffObj.getData);
instance.get('/api/stf/get/:id',staffObj.getDataById);


instance.delete('/api/stf/delete/:id',staffObj.deleteData);

instance.put('/api/stf/put/:id',staffObj.putData);

//Medical APIs
let medObj = new creareMedical();

instance.post('/api/med/post',medObj.postData);

instance.get('/api/med/get',medObj.getData);
instance.get('/api/med/get/:id',medObj.getDataById);


instance.delete('/api/med/delete/:id',medObj.deleteData);

instance.put('/api/med/put/:id',medObj.putData);

instance.listen(9080,()=>{
    console.log('Server Started on port 9080');
});