const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("hospital", "root", "Manofsteel@1", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  }
//   ,
//   define:{
//       timestamps:false
//   }
});

const person = sequelize.define('doctorobservation', {
    ObsId:{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    DoctorId: {
        type: DataTypes.STRING(20),
        allowNull: false

    },
    PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Observation: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
});

// generate database and table
// force:true, create a table
person.sync({force:true}).then(()=>{
    // creating table with the COlumn Values
    return person.create({
        DoctorId: 'Dr-1', PatientId:100, Observation:"Cough and Cold Medicine Given"
    }); 
}).catch((error)=>{
    console.log(`Error Occured ${error.message}`);
});

console.log('Done Please check database');