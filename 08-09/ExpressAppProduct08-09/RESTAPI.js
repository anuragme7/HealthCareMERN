const express = require("express");
const cors = require("cors");
const path = require('path');
const dal = require("./dal/asyncapi");

const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());

let router = express.Router();
instance.use(router);

instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);


const dalObject = new dal();

instance.get("/login",dalObject.login);

instance.get("/api/products", dalObject.getpro);

instance.get("/api/products/:id", dalObject.getprobyid );

instance.delete("/api/products/:id",dalObject.delpro) ;

instance.post("/api/products", dalObject.createpro);

instance.put("/api/products/:id", dalObject.updpro);

instance.listen(9081, () => {
  console.log("REST APIs are on port 9081");
});
