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
const doctorobservations = require(path.join(__dirname, './../models/doctorobservations'))(sequelize, Sequelize.DataTypes);
const doctor = require(path.join(__dirname, './../models/doctor'))(sequelize, Sequelize.DataTypes);
const patient = require(path.join(__dirname, './../models/patient'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();

class DoctorObservationLogic {

//Doctor Apis
    async getDataById(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(201).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(201).send({
                response: `Authorization failed`,
              });
        }
        else{
                req.decode = validatedToken;
                let doc  = req.body;
                await sequelize.sync({ force: false });
                let doctorExist = await doctorobservations.findOne({where:{DoctorId: doc.DoctorId}});
                if(doctorExist===null) {
                    return resp.status(201).send({message: `Dr. you have made no observations for this patient`});
                }  
                let patientExist = await doctorobservations.findOne({where:{PatientId: doc.PatientId}});
                if(patientExist===null) {
                    return resp.status(201).send({message: `Dr. you have made no observations for this patient`});
                }  
                let rows = await doctorobservations.findAll({where:{DoctorId:doc.DoctorId,PatientId:doc.PatientId}});
                if(rows===null){
                    return resp.status(201).send({message:"No Record Found for the Id"});
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

                let doc  = req.body;
                await sequelize.sync({ force: false });

                let depar = await doctor.findOne({where:{DoctorId: doc.DoctorId}});
                if(depar===null) {
                    return resp.status(201).send({message: `DoctorId ${doc.DoctorId} does not exists`});
                }
                let patientExist = await patient.findOne({where:{PatientId: doc.PatientId}});
                if(patientExist===null) {
                    return resp.status(201).send({message: `PatientId ${doc.PatientId} does not exists`});
                } 
                if(doc.Observation===undefined||doc.Observation.length===0){
                    return resp.status(201).send({message: `Please Provide an Observation.`});

                }
                let rec= await doctorobservations.create(doc);
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


        async deleteData(req,resp){
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
                let delid = req.params.id;
                let depar = await doctorobservations.findOne({where:{ObsId: delid}});
                if(depar===null) {
                    return resp.status(201).send({message: `DoctorId ${delid} does not exists`});
                }
                doctorobservations.destroy({
                where:{ObsId: delid}
                }).then((response)=>{
                    console.log(`in then ${response}`);
                    return resp.status(200).send( {message:"Data is Deleted Successfully"});
                }).catch((err)=>{
                    return resp
                    .status(500)  
                    .send(`Error Occured : ${err.message}`);
                });  
            }
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
            let doctorExist = await doctorobservations.findOne({where:{ObsId: req.params.id}});
            if(doctorExist===null) {
                return resp.status(201).send({message: `Observation does not exists`});
            } 
            if(doctorExist.DoctorId!==doc.DoctorId||doctorExist.PatientId!==doc.PatientId){
                return resp.status(201).send({message:`This is a observation with wrong Doctor or Patient details`});
            }
            let doc  = req.body;
            await sequelize.sync({ force: false });
            let rec = doctorobservations.update({
               DoctorId:doc.DoctorId,
               PatientId:doc.PatientId,
               Observation:doc.Observation
            },{
                where:{ObsId:req.params.id}
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

module.exports = DoctorObservationLogic;