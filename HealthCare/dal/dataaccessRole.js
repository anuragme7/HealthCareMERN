const {Sequelize,DataTypes, literal}  =  require('sequelize');
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


const roles = require(path.join(__dirname, './../models/roles'))(sequelize, Sequelize.DataTypes);

const user = require(path.join(__dirname, './../models/user'))(sequelize, Sequelize.DataTypes);

const staff = require(path.join(__dirname, './../models/staff'))(sequelize, Sequelize.DataTypes);

const userinrole = require(path.join(__dirname, "./../models/userinrole"))(
    sequelize,
    Sequelize.DataTypes
  );

let validateObj=new validate();

class RoleLogic {

    async newRole(req,resp){
        if(req.headers.authorization === undefined){
            return resp.status(401).send({message: `Please Login Again.`});
        }
        let receivedToken = req.headers.authorization.split(" ")[1];
        let validatedToken=await validateObj.validateToken(receivedToken);
        if (validatedToken===false){
            return resp.status(401).send({
                message: `Authorization failed`,
              });
        }
        else{
            req.decode = validatedToken;
            let rolesinfo = req.body;
            await sequelize.sync({force:false});
            let rolname = await roles.findOne({where:{RoleName: rolesinfo.RoleName}});
            if(rolname!==null) {
                return resp.status(409).send({message: `RoleName ${rolesinfo.RoleName} already exists`});
            }
            let created  = await roles.create(rolesinfo);
            return resp.status(201).send({message: `RoleId ${rolesinfo.RoleId} for Roles ${rolesinfo.RoleName} Created`});
        }
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
        }

    async newUser(req,resp){
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
            let userinfo = req.body;
            await sequelize.sync({force:false});
            let usr = await user.findOne({where:{UserId: userinfo.UserId}});
            if(usr!==null) {
                return resp.status(409).send({message: `UserId ${userinfo.UserId} already exists`});
            }
            let usrem = await user.findOne({where:{Email: userinfo.Email}});
            if(usrem!==null) {
                return resp.status(409).send({message: `Email ${userinfo.Email} already exists`});
            }
            let created  = await user.create(userinfo);
            return resp.status(200).send({message: `UserId ${userinfo.UserId} registered successfully`});
        }
    }

    async newUserRole(req,resp){
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
            let userinfo = req.body;
            await sequelize.sync({force:false});
            let usr = await user.findOne({where:{UserId: userinfo.UserId}});
            if(usr===null) {
                return resp.status(409).send({message: `UserId ${userinfo.UserId} does not exists`});
            }
            let checkusr = await userinrole.findOne({where:{UserId: userinfo.UserId}});
            if(checkusr!==null) {
                return resp.status(409).send({message: `Role for ${userinfo.UserId} already exists.`});
            }
            let rolid = await roles.findOne({where:{RoleId: userinfo.RoleId}});
            if(rolid===null) {
                return resp.status(409).send({message: `RoleId ${userinfo.RoleId} does not exists`});
            }
            let created  = await userinrole.create(userinfo);
            return resp.status(201).send({message: `UserId ${userinfo.UserId} for RoleId ${userinfo.RoleId} registered successfully`});
        }
    }
    async login(req,resp){
        let userInfo = req.body;
        if(userInfo.UserId===undefined && userInfo.Email===undefined){
            return resp.status(401).send({message:"Please pass Valid UserId or Email to Login"});
        }
        let usr;
        let tokenInfo={Id:"",Email:""};
        if(userInfo.Email!==undefined){
            usr = await user.findOne({where:{Email: userInfo.Email }});
            if(usr===null) {
                console.log("in if");
                return resp.status(401).send({message: `Email ${userInfo.Email} does not exists`});
            }
            else{
                console.log("in Email else");
                console.log(JSON.stringify(usr.Email));
                tokenInfo.Email=usr.Email;
                tokenInfo.Id=usr.UserId;
            }
            console.log("Exiting Email");
        }else if(userInfo.UserId!==undefined){
            console.log("Entering else if Id");
            usr = await user.findOne({where:{UserId: userInfo.UserId }});
            if(usr===null) {
                console.log("in if");
                return resp.status(401).send({message: `UserId ${userInfo.UserId} does not exists`});
            }
            else{
                console.log("in Id else");
                console.log(JSON.stringify(usr));
                tokenInfo.Email=usr.Email;
                tokenInfo.Id=usr.UserId;
            }
        } 
        if(usr.Password.trim() !== userInfo.Password.trim()){
            return resp.status(401).send({message: `Incorrect Password`});
        }
        let checkusrinrole= await userinrole.findOne({where:{UserId: usr.UserId }});
        if(checkusrinrole===null){
            let tempid=usr.UserId.slice(3,);
            let userinstaff= await staff.findOne({where:{StaffId: tempid }});
            if(userinstaff===null){
                return resp.status(201).send({
                    message:"Your registeration could not complete properly. Contact Admin."
                });
            }
            else{
                const token = jwt.sign({ tokenInfo }, jwtSettings.jwtSecret, {
                    expiresIn: 3600
                  });
                return resp.status(200).send({
                    message: `User ${usr.Email} login successfull`,
                    token:token,
                    roleName:"NA",
                    rows:userinstaff
                });
            }
        }
        else{
            let rolename=await sequelize.query(`SELECT UserId,RoleName from roles INNER JOIN userinrole where roles.RoleId = userinrole.RoleId and userinrole.UserId="${usr.UserId}"`);
            let namer=rolename[0][0].RoleName;
            let userid=rolename[0][0].UserId;
            const token = jwt.sign({ tokenInfo }, jwtSettings.jwtSecret, {
                expiresIn: 3600
              });
            return resp.status(200).send({
                    message: `User ${usr.Email} login successfull`,
                    token:token,
                    roleName:namer,
                    UserId:userid
                });
       }
        
   }
}

module.exports = RoleLogic;