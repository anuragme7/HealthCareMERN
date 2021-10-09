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
const wardboy = require(path.join(__dirname, './../models/wardboy'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();

class wardboyLogic {

//WardBoy Apis

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
              let rows = await wardboy.findAll();
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
                let rows = await wardboy.findOne({where:{WardBoyId:req.params.id}});
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
                 let war  = req.body;
                if(!validateObj.validateWardBoy(war)){
                    return resp.status(200).send({message:"Kindly provide all required fields"});
                }
                let wardboyExist = await wardboy.findOne({where:{WardBoyId: war.WardBoyId}});
                if(wardboyExist!==null) {
                    return resp.status(200).send({message: `${wardboyExist.WardBoyFname} is already registered`});
                }   
                let rec= await wardboy.create(war);
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
                let depar = await wardboy.findOne({where:{WardBoyId: delid}});
                if(depar===null) {
                    return resp.status(200).send({message: `WardBoyId ${delid} does not exists`});
                }
                wardboy.destroy({
                where:{WardBoyId: delid}
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
            let wardboyExist = await wardboy.findOne({where:{WardBoyId: req.params.id}});
            if(wardboyExist===null) {
                return resp.status(409).send({message: `WardBoyId ${req.params.id} does not exists`});
            } 
            let war  = req.body;
            if(!validateObj.validateWardBoy(war)){
                return resp.status(409).send({message:"Kindly provide all required fields"});
            }
            await sequelize.sync({ force: false });
            let rec = wardboy.update({
                WardBoyFname:war.WardBoyFname,
                WardBoyLname:war.WardBoyLname,
                Address:war.Address,
                City:war.City,
                DateOfBirth:war.DateOfBirth,
                Gender:war.Gender,
                Email:war.Email,
                MobNo:war.MobNo,
                EmergencyContact:war.EmergencyContact,
                IdCard:war.IdCard,
                WardBoySalary:war.WardBoySalary,
                WardNo:war.WardNo
            },{
                where:{WardBoyId:req.params.id}
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

module.exports = wardboyLogic;