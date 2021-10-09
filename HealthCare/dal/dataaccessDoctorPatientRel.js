const {Sequelize,DataTypes}  =  require('sequelize');
const path = require('path');
const jwt = require("jsonwebtoken");
let validate=require("./validate");
const sequelize = new Sequelize("hospital", "root", "Manofsteel@1", {
    host: 'localhost',
    dialect:'mysql'
});

const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
  };
const doctor_patient_relation = require(path.join(__dirname, './../models/doctor_patient_relation'))(sequelize, Sequelize.DataTypes);
const doctor = require(path.join(__dirname, './../models/doctor'))(sequelize, Sequelize.DataTypes);
const patient = require(path.join(__dirname, './../models/patient'))(sequelize, Sequelize.DataTypes);


let validateObj=new validate();

class Doctor_patient_relationLogic {

//Doctor_patient_relation Apis

   async getData(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
            req.decode = validatedToken;
              await sequelize.sync({ force: false });
              let rows = await doctor_patient_relation.findAll();
              if(rows===null){
                  return resp.status(404).send({message:"No records present"});
              }
              return resp.status(200).send({
                        message: "Data is Read Successfully",
                        rowCount: rows.length,
                        rows: rows,
                      });
            }    
        }

    async getDataByDocId(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
                req.decode = validatedToken;
                await sequelize.sync({ force: false });
                //let rows = await doctor_patient_relation.findAll({where:{DoctorId:req.params.id}});
                let rows=await sequelize.query(`SELECT * from patient INNER JOIN doctor_patient_relation where patient.PatientId = doctor_patient_relation.PatientId and doctor_patient_relation.DoctorId="${req.params.id}"`);
                console.log(rows[0]);
                console.log("In .......");
                console.log(req.params.id);
               // "
                if(rows===null){
                    return resp.status(200).send({message:"No Record Found for the Id"});
                }
                return resp.status(200).send({
                        message: "Data is Read Successfully",
                        rowCount: rows.length,
                        rows: rows[0],
                        });
            }  
        }
    async getDataByPatId(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(401).send({
                response: `Authorization failed`,
                });
        }
        else{
            req.decode = validatedToken;
            await sequelize.sync({ force: false });
            let rows=await sequelize.query(`SELECT * from doctor INNER JOIN doctor_patient_relation where doctor.DoctorId = doctor_patient_relation.DoctorId and doctor_patient_relation.PatientId="${req.params.id}"`);
            if(rows===null){
                return resp.status(200).send({message:"No Record Found for the Id"});
            }
            return resp.status(200).send({
                    message: "Data is Read Successfully",
                    rowCount: rows.length,
                    rows: rows,
                    });
        }  
    }

    async postData(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
                req.decode = validatedToken;
                await sequelize.sync({ force: false });
                 let doc  = req.body;
                let doctorExist = await doctor.findOne({where:{DoctorId:doc.DoctorId}});
                if(doctorExist===null) {
                    return resp.status(201).send({message: `Dr. ${doc.DoctorId} does not exist`});
                }   
                let patientExist = await patient.findOne({where:{PatientId:doc.PatientId}});
                if(patientExist===null) {
                    return resp.status(201).send({message: `Patient ${doc.PatientId} does not exist`});
                } 
                // console.log("req body......");
                // console.log(doc);
                if(doc.ReferredIn!==undefined&&doc.ReferredIn!==null){
                    let doctorExist = await doctor.findOne({where:{DoctorId:doc.ReferredIn}});
                    if(doctorExist===null) {
                        return resp.status(201).send({message: `Referred Id ${doc.DoctorId} does not exist`});
                    }  
                }
                let rec= await doctor_patient_relation.create(doc);
                if(rec){
                    return resp.status(200).send({
                        message: "Data is Added Successfully",
                        rows: rec});
                }else{
                    return resp
                    .status(500)  
                    .send({ message: `Error Occured `}); 
                }
            };    
        }

    async putData(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
            req.decode = validatedToken;
            await sequelize.sync({force:false});
            let doctor_patient_relationExist = await doctor_patient_relation.findOne({where:{RelationId: req.params.id}});
            if(doctor_patient_relationExist===null) {
                return resp.status(409).send({message: `This relation does not exists`});
            } 
            let doc  = req.body;
            let doctorExist = await doctor.findOne({where:{DoctorId:doc.DoctorId}});
            if(doctorExist===null) {
                return resp.status(200).send({message: `Dr. ${doc.DoctorId} does not exist`});
            }   
            let patientExist = await patient.findOne({where:{PatientId:doc.PatientId}});
            if(patientExist===null) {
                return resp.status(200).send({message: `Patient ${doc.PatientId} does not exist`});
            } 
            if(doc.ReferredIn!==undefined&&doc.ReferredIn!==null){
                let doctorExist = await doctor.findOne({where:{DoctorId:doc.ReferredIn}});
                if(doctorExist===null) {
                    return resp.status(200).send({message: `Referred Id ${doc.ReferredIn} does not exist`});
                }  
            }
            await sequelize.sync({ force: false });
            let rec = doctor_patient_relation.update({
                DoctorId :doc.DoctorId ,
                PatientId  :doc.PatientId,
                ReferredIn :doc.ReferredIn,
                ReferredOut :doc.ReferredOut,
                Active :doc.Active
            },{
                where:{RelationId:req.params.id}
            }); 
            if(rec){
                return resp.status(200).send({
                message: "Data is Updated Successfully",
                rows: rec,
                });
            }
            return resp
                .status(500)  
                .send({ message: "Data could not be updated. Please provide correct details." }); 
        };        
    }
}

module.exports = Doctor_patient_relationLogic;