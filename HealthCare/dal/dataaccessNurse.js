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
const nurse = require(path.join(__dirname, './../models/nurse'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();

class nurseLogic {

//Nurse Apis

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
              let rows = await nurse.findAll();
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

    async getDataById(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false||validatedToken===undefined){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
                req.decode = validatedToken;
                await sequelize.sync({ force: false });
                let rows = await nurse.findOne({where:{NurseId:req.params.id}});
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
        if (validatedToken===false||validatedToken===undefined){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
                req.decode = validatedToken;
                await sequelize.sync({ force: false });
                 let nur  = req.body;
                if(!validateObj.validateNurse(nur)){
                    return resp.status(200).send({message:"Kindly provide all required fields"});
                }
                let nurseExist = await nurse.findOne({where:{NurseId: nur.NurseId}});
                if(nurseExist!==null) {
                    return resp.status(200).send({message: `${nurseExist.NurseFname} is already registered`});
                }   
                let rec= await nurse.create(nur);
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
            if (validatedToken===false||validatedToken===undefined){
                return resp.status(401).send({
                    response: `Authorization failed`,
                });
            }
            else{
                req.decode = validatedToken;
                await sequelize.sync({force:false});
                let delid = req.params.id;
                let depar = await nurse.findOne({where:{NurseId: delid}});
                if(depar===null) {
                    return resp.status(200).send({message: `NurseId ${delid} does not exists`});
                }
                nurse.destroy({
                where:{NurseId: delid}
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
        if (validatedToken===false||validatedToken===undefined){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
            req.decode = validatedToken;
            await sequelize.sync({force:false});
            let nurseExist = await nurse.findOne({where:{NurseId: req.params.id}});
            if(nurseExist===null) {
                return resp.status(201).send({message: `NurseId ${req.params.id} does not exists`});
            } 
            let nur  = req.body;
            if(!validateObj.validateNurse(nur)){
                return resp.status(201).send({message:"Kindly provide all required fields"});
            }
            await sequelize.sync({ force: false });
            let rec = nurse.update({
                NurseFname:nur.NurseFname,
                NurseLname:nur.NurseLname,
                Address:nur.Address,
                City:nur.City,
                DateOfBirth:nur.DateOfBirth,
                Gender:nur.Gender,
                Email:nur.Email,
                MobNo:nur.MobNo,
                EmergencyContact:nur.EmergencyContact,
                IdCard:nur.IdCard,
                NurseFeesPerDay:nur.NurseFeesPerDay,
                WardNo:nur.WardNo
            },{
                where:{NurseId:req.params.id}
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

module.exports = nurseLogic;