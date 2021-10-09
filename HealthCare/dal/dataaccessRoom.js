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
const room = require(path.join(__dirname, './../models/room'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();

class RoomLogic {

//Room Apis

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
              let rows = await room.findAll();
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
                let rows = await room.findOne({where:{RoomNo:req.params.id}});
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
                 let roo  = req.body;
                if(!validateObj.validateRoom(roo)){
                    return resp.status(201).send({message:"Kindly provide all required fields"});
                }
                let roomExist = await room.findOne({where:{RoomNo: roo.RoomNo}});
                if(roomExist!==null) {
                    return resp.status(201).send({message: `${roomExist.RoomNo} is already registered`});
                }   
                let rec= await room.create(roo);
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
                let depar = await room.findOne({where:{RoomNo: delid}});
                if(depar===null) {
                    return resp.status(200).send({message: `RoomNo ${delid} does not exists`});
                }
                room.destroy({
                where:{RoomNo: delid}
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
            let roomExist = await room.findOne({where:{RoomNo: req.params.id}});
            if(roomExist===null) {
                return resp.status(409).send({message: `RoomNo ${req.params.id} does not exists`});
            } 
            let roo  = req.body;
            if(!validateObj.validateRoom(roo)){
                return resp.status(409).send({message:"Kindly provide all required fields"});
            }
            await sequelize.sync({ force: false });
            let rec = room.update({
                RoomNo:roo.roomFname,
                WardNo:roo.WardNo,
                RoomType:roo.RoomType,
                RoomFeesPerDay:roo.RoomFeesPerDay
                
            },{
                where:{RoomNo:req.params.id}
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

module.exports = RoomLogic;