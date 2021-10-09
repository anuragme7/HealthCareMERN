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

const patient = require(path.join(__dirname, './../models/patient'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();
class PatientLogic {
//Patient Apis
    async getPatientData(req,resp){
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
              let rows = await patient.findAll();
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


    async getPatientDataById(req,resp){
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
                let rows = await patient.findOne({where:{PatientId:req.params.id}});
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
        
    async postPatientData(req,resp){
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
            let pat  = req.body;
            if(!validateObj.validatePatient(pat)){
                return resp.status(201).send({message:"Kindly provide all required fields"});
            }  
            let rec= await patient.create(pat);
            if(rec){
                return resp.status(200).send({
                    message: "Data is Added Successfully",
                    rows: rec});
            }else{
                return resp
                .status(500)  
                .send({ message: `Error Occured `}); 
            }
            }   
        }
//Not required.
    // async deletePatientData(req,resp){
    //     if(req.headers.authorization === undefined){
    //         return resp.status(401).send({message: `Please Login Again.`});
    //     }
    //     let receivedToken = req.headers.authorization.split(" ")[1];
    //     let validatedToken=await validateObj.validateToken(receivedToken);
    //     if (validatedToken===false){
    //         return resp.status(401).send({
    //             response: `Authorization failed`,
    //           });
    //     }
    //     else{
    //         req.decode = validatedToken;
    //         await sequelize.sync({force:false});
    //         let delid = req.params.id;
    //         let depar = await patient.findOne({where:{PatientId: delid}});
    //         if(depar===null) {
    //             return resp.status(200).send({message: `PatientId ${delid} does not exists`});
    //         }
    //         patient.destroy({
    //         where:{PatientId: delid}
    //         }).then((response)=>{
    //             console.log(`in then ${response}`);
    //             return resp.status(200).send( {message:"Data is Deleted Successfully"});
    //         }).catch((err)=>{
    //             return resp
    //             .status(500)  
    //             .send(`Error Occured : ${err.message}`);
    //         });  
    //     }
    // }    
    
    async putPatientData(req,resp){
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
            let patientExist = await patient.findOne({where:{PatientId: req.params.id}});
            if(patientExist===null) {
                return resp.status(409).send({message: `PatientId ${req.params.id} does not exists`});
            } 
            let pat  = req.body;
            if(!validateObj.validatePatient(pat)){
                return resp.status(409).send({message:"Kindly provide all required fields"});
            }
            await sequelize.sync({ force: false });
            let rec = patient.update({
                PatientId:pat.PatientId,
                PatientFname:pat.PatientFname,
                PatientMname:pat.PatientMname,
                PatientLname:pat.PatientLname,
                Address:pat.Address,
                City:pat.City,
                DateOfBirth:pat.DateOfBirth,
                Gender:pat.Gender,
                IPD_OPD:pat.IPD_OPD,
                Email:pat.Email,
                Roomno:pat.Roomno,
                Disease:pat.Disease,
                MobNo:pat.MobNo,
                EmergencyContact:pat.EmergencyContact,
                IdCard:pat.IdCard
            },{
                where:{PatientId:req.params.id}
            }); 
            if(rec){
                return resp.status(200).send({
                message: "Data is Updated Successfully",
                rows: rec,
                });
            }
            return resp
                .status(500)  
                .send({ message: "Some Error Occured" }); 
        }      
    }
    
}

module.exports = PatientLogic;