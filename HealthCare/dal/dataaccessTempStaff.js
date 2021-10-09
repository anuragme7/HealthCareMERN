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
const tempstaff = require(path.join(__dirname, './../models/tempstaff'))(sequelize, Sequelize.DataTypes);
const user = require(path.join(__dirname, './../models/user'))(sequelize, Sequelize.DataTypes);
const roles = require(path.join(__dirname, './../models/roles'))(sequelize, Sequelize.DataTypes);


let validateObj=new validate();

class TempStaffLogic {

//tempstaff Apis

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
              let rows = await tempstaff.findAll();
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
        if (validatedToken===false){
            return resp.status(401).send({
                response: `Authorization failed`,
              });
        }
        else{
                req.decode = validatedToken;
                await sequelize.sync({ force: false });
                let rows = await tempstaff.findOne({where:{UserId:req.params.id}});
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
        await sequelize.sync({ force: false });
        let temp  = req.body;
        let tempStaffExist = await tempstaff.findOne({where:{Email: temp.Email}});
        if(tempStaffExist!==null) {
            return resp.status(409).send({message: `Please wait untill the Admin approves your request.`});
        }
        let usrem = await user.findOne({where:{Email: temp.Email}});
        if(usrem!==null) {
            return resp.status(409).send({message: `Email ${temp.Email} already exists`});
        }
        let rolname = await roles.findOne({where:{RoleId: temp.RoleId}});
        if(rolname===null) {
            return resp.status(409).send({message: `RoleId ${temp.RoleId} does not exists`});
        }
        if(!validateObj.validateTempStaff(temp)){
            return resp.status(400).send({message:"Kindly provide all required fields"});
        }  
        let rec= await tempstaff.create(temp);
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
            let depar = await tempstaff.findOne({where:{UserId: delid}});
            if(depar===null) {
                return resp.status(200).send({message: `UserId ${delid} does not exists`});
            }
            tempstaff.destroy({
            where:{UserId: delid}
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
      
}

module.exports = TempStaffLogic;