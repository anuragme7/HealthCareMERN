const express  =require('express');
const cors = require('cors');
const createDoctor = require('./dal/dataaccessDoctor');
const instance = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());

instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);

const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
  };

instance.set("jwtSecret", jwtSettings.jwtSecret);

let createobj = new createDoctor();

instance.post('/api/app/login',createobj.login);
instance.post('/api/app/post',createobj.postData);

instance.get('/api/app/get',createobj.getData);
instance.get('/api/app/get/:id',createobj.getDataById);

instance.delete('/api/app/delete/:id',createobj.deleteData);

instance.put('/api/app/put/:id',createobj.putData);


instance.listen(9080,()=>{
    console.log('Server Started on port 9080');
});