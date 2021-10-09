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
const medical = require(path.join(__dirname, './../models/medical'))(sequelize, Sequelize.DataTypes);

let validateObj=new validate();

class MedicalLogic {

//Medical Apis

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
              let rows = await medical.findAll();
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
                let rows = await medical.findOne({where:{MedId:req.params.id}});
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
                await sequelize.sync({ force: false });
                 let med  = req.body;
                // if(!validateObj.validatemedical(med)){
                //     return resp.status(201).send({message:"Kindly provide all required fields"});
                // }
                let medicalExist = await medical.findOne({where:{MedId: med.MedId}});
                if(medicalExist!==null) {
                    return resp.status(201).send({message: `Medicine is already registered`});
                }   
                let rec= await medical.create(med);
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
                let depar = await medical.findOne({where:{MedId: delid}});
                if(depar===null) {
                    return resp.status(201).send({message: `MedId ${delid} does not exists`});
                }
                medical.destroy({
                where:{MedId: delid}
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
            let medicalExist = await medical.findOne({where:{MedId: req.params.id}});
            if(medicalExist===null) {
                return resp.status(409).send({message: `MedId ${req.params.id} does not exists`});
            } 
            let med  = req.body;
            // if(!validateObj.validatemedical(med)){
            //     return resp.status(201).send({message:"Kindly provide all required fields"});
            // }
            await sequelize.sync({ force: false });
            let rec = medical.update({
                MedName:med.MedName,
                MedType:med.MedType,
                Manufacturer:med.Manufacturer,
                ManuDate:med.ManuDate,
                ExpiryDate:med.ExpiryDate,
                HospitalInDate:med.HospitalInDate,
                Quantity:med.Quantity,
                UnitPrice:med.UnitPrice,
                Ingredients:med.Ingredients
            },{
                where:{MedId:req.params.id}
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

module.exports = MedicalLogic;