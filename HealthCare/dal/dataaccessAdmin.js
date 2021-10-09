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
const admin = require(path.join(__dirname, './../models/admin'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();

class AuthLogic {
//Admin api
    async login(req,resp){
        let admininfo = req.body;
        let usr = await admin.findOne({where:{AdminEmail: admininfo.AdminEmail }});
        if(usr===null) {
           return resp.status(401).send({message: `Email ${admininfo.AdminEmail} does not exists`});
        }
        if(usr.AdminPassword.trim() !== admininfo.AdminPassword.trim()){
            return resp.status(401).send({message: `Incorrect Password`});
        }
        let tokenInfo={Id:usr.AdminEmail};
        const token = jwt.sign({ tokenInfo }, jwtSettings.jwtSecret, {
            expiresIn: 3600
          });
        return resp.status(200).send({
                message: `User ${usr.AdminEmail} login successfull`,
                token:token
            });
   }

}

module.exports = AuthLogic;