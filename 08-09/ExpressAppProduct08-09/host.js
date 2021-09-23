const express = require("express");
const cors = require("cors");
const path = require('path');
const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());

instance.use(
    express.static(path.join(__dirname, './../../node_modules/bootstrap/dist/css'))
);

instance.use(
    express.static(path.join(__dirname, './../views'))
);

instance.use(
    cors({
      origin: "*", 
      allowedHeaders: "*", 
      methods: "*", 
    })
  );
  
let router = express.Router();
instance.use(router);

router.get("/",(req,resp) => {
    resp.sendFile('Login.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/Products",(req,resp) => {
    resp.sendFile('Products.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/Logout",(req,resp)=>{
    resp.sendFile('Logout.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/AddProduct",(req,resp)=>{
    resp.sendFile('AddProduct.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/UpdateProduct",(req,resp)=>{
    resp.sendFile('UpdateProduct.html', {
        root: path.join(__dirname, './../views')
    });
});

instance.listen(9080, () => {
    console.log("REST APIs are on port 9080");
  });