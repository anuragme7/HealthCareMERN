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
const tempuser = require(path.join(__dirname, './../models/tempuser'))(sequelize, Sequelize.DataTypes);
const user = require(path.join(__dirname, './../models/user'))(sequelize, Sequelize.DataTypes);
const roles = require(path.join(__dirname, './../models/roles'))(sequelize, Sequelize.DataTypes);


let validateObj=new validate();

class TempUserLogic {

//TempUser Apis
    async checkUser(req,resp){
        await sequelize.sync({ force: false });
        let temp  = req.body;
        let usrem = await user.findOne({where:{Email: temp.Email}});
        if(usrem!==null) {
            return resp.status(409).send({message: `Email ${temp.Email} already exists`});
        }
        let tmp = await tempuser.findOne({where:{Email: temp.Email}});
        if(tmp!==null) {
            return resp.status(409).send({message: `Email ${temp.Email} already exists for registeration`});
        }
        return resp.status(200).send({message:"Welcome"}); 
    }


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
              let rows = await tempuser.findAll();
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

        async getRoles(req,resp){
            await sequelize.sync({ force: false });
            let rows = await roles.findAll();
            if(rows===null){
                return resp.status(404).send({message:"No records present"});
            }
            return resp.status(200).send({
                    message: "Data is Read Successfully",
                    rowCount: rows.length,
                    rows: rows,
                    });   
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
                let rows = await tempuser.findOne({where:{UserId:req.params.id}});
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
        await sequelize.sync({ force: false });
        let temp  = req.body;
        let usrem = await user.findOne({where:{Email: temp.Email}});
        if(usrem!==null) {
            return resp.status(409).send({message: `Email ${temp.Email} already exists`});
        }
        let tmp = await tempuser.findOne({where:{Email: temp.Email}});
        if(tmp!==null) {
            return resp.status(409).send({message: `Email ${temp.Email} already exists for registeration`});
        }
        if(!validateObj.validateTempUser(temp)){
            return resp.status(200).send({message:"Kindly provide all required fields"});
        }  
        let rec= await tempuser.create(temp);
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
            let depar = await tempuser.findOne({where:{UserId: delid}});
            if(depar===null) {
                return resp.status(200).send({message: `UserId ${delid} does not exists`});
            }
            tempuser.destroy({
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

module.exports = TempUserLogic;