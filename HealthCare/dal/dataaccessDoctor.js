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
const doctor = require(path.join(__dirname, './../models/doctor'))(sequelize, Sequelize.DataTypes);
const admin = require(path.join(__dirname, './../models/admin'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();
class AuthLogic {

    async login(req,resp){
        let admininfo = req.body;
        let usr = await admin.findOne({where:{AdminEmail: admininfo.AdminEmail }});
        if(usr===null) {
           return resp.status(409).send({message: `Email ${admininfo.AdminEmail} does not exists`});
        }
        if(usr.AdminPassword.trim() !== admininfo.AdminPassword.trim()){
            return resp.status(401).send({message: `Email ${admininfo.AdminPassword} Password does not match`});
        }
        const token = jwt.sign({ usr }, jwtSettings.jwtSecret, {
            expiresIn: 3600 // 1 hour
          });
        return resp.status(200).send({
                message: `UserId ${usr.AdminEmail} login successfull`,
                token:token
            });
   }

   async getData(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        await jwt.verify(
            receivedToken,
            jwtSettings.jwtSecret,
            async (error, decode) => {
              if (error)
                return resp.status(401).send({
                  response: `Authorization failed`,
                });
              req.decode = decode;
              await sequelize.sync({ force: false });
              let rows = await doctor.findAll();
              if(rows===null){
                  return resp.status(404).send({message:"No records present"});
              }
              return resp.status(200).send({
                        message: "Data is Read Successfully",
                        rowCount: rows.length,
                        rows: rows,
                      });
            }
          );    
        }

    async getDataById(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        await jwt.verify(
            receivedToken,
            jwtSettings.jwtSecret,
            async (error, decode) => {
                if (error)
                return resp.status(401).send({
                    response: `Authorization failed`,
                });
                req.decode = decode;
                await sequelize.sync({ force: false });
                let rows = await doctor.findOne({where:{DoctorId: req.params.id}});
                if(rows===null){
                    return resp.status(404).send({message:"No Record Found for the Id"});
                }
                return resp.status(200).send({
                        message: "Data is Read Successfully",
                        rowCount: rows.length,
                        rows: rows,
                        });
            }
            );    
        }

    async postData(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        await jwt.verify(
            receivedToken,
            jwtSettings.jwtSecret,
            async (error, decode) => {
                if (error)
                return resp.status(401).send({
                    response: `Authorization failed`,
                });
                req.decode = decode;
                await sequelize.sync({ force: false });
                let doc  = req.body;
                if(!validateObj.validateDoctor(doc)){
                    return resp.status(409).send({message:"Kindly provide all required fields"});
                }
                let doctorExist = await doctor.findOne({where:{DoctorId: doc.DoctorId}});
                if(doctorExist!==null) {
                    return resp.status(409).send({message: `Dr. ${doctorExist.DoctorFname} is already registered`});
                }   
                let rec= await doctor.create(doc);
                if(rec){
                    return resp.status(200).send({
                        message: "Data is Added Successfully",
                        rows: rec});
                }else{
                    return resp
                    .status(500)  
                    .send({ message: `Error Occured `}); 
                }
            });    
        }


        async deleteData(req,resp){
            if(req.headers.authorization === undefined){
                return resp.status(401).send({message: `Please Login Again.`});
            }
            let receivedToken = req.headers.authorization.split(" ")[1];
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                    return resp.status(401).send({
                        response: `Authorization failed`,
                    });
                    req.decode = decode;
                    await sequelize.sync({force:false});
                    let delid = req.params.id;
                    let depar = await doctor.findOne({where:{DoctorId: delid}});
                    if(depar===null) {
                        return resp.status(409).send({message: `DoctorId ${delid} does not exists`});
                    }
                    doctor.destroy({
                    where:{DoctorId: delid}
                    }).then((response)=>{
                        console.log(`in then ${response}`);
                        return resp.status(200).send( {message:"Data is Deleted Successfully"});
                    }).catch((err)=>{
                        return resp
                        .status(500)  
                        .send(`Error Occured : ${err.message}`);
                    });  
                });
    }

    async putData(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        await jwt.verify(
            receivedToken,
            jwtSettings.jwtSecret,
            async (error, decode) => {
                if (error)
                return resp.status(401).send({
                    response: `Authorization failed`,
                });
                await sequelize.sync({force:false});
                let doctorExist = await doctor.findOne({where:{DoctorId: req.params.id}});
                if(doctorExist===null) {
                    return resp.status(409).send({message: `DoctorId ${req.params.id} does not exists`});
                } 
                let doc  = req.body;
                if(!validateObj.validateDoctor(doc)){
                    return resp.status(409).send({message:"Kindly provide all required fields"});
                }
                await sequelize.sync({ force: false });
                let rec = doctor.update({
                    DoctorFname:doc.DoctorFname,
                    DoctorMname:doc.DoctorMname,
                    DoctorLname:doc.DoctorLname,
                    Address:doc.Address,
                    City:doc.City,
                    DateOfBirth:doc.DateOfBirth,
                    Gender:doc.Gender,
                    Email:doc.Email,
                    Specialization:doc.Specialization,
                    MobNo:doc.MobNo,
                    EmergencyContact:doc.EmergencyContact,
                    IdCard:doc.IdCard,
                    DoctorFeesPerVisit:doc.DoctorFeesPerVisit,
                    DoctorICUFees:doc.DoctorICUFees,
                    DoctorConsultationFees:doc.DoctorConsultationFees
                },{
                    where:{DoctorId:req.params.id}
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
            });        
    }

    
}

module.exports = AuthLogic;