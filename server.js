const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
require('./config/db');
const bcrypt = require("bcryptjs");
const auth=require("./middelware/auth");
const {createAdmin}=require('./controllers/UserController');


//const eventRoutes=require('./Routes/event');

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


  //const eventRoutes = require('./routes/eventRoutes');
  const userRoutes =require('./routes/userRoutes');
  const adminRoutes =require('./routes/adminRoutes');
  const pubRoutes=require('./routes/pubRoutes');
  const eventRoutes=require('./routes/eventRoutes');
  //const pubRoutes=require('./routes/pubRoutes');
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  app.get("/", (req, res) => {
    res.send("request successfully sent!");
  });
  app.get("/auth",auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
  });
  //app.use('/events', eventRoutes);
  


  app.use('/uploads', express.static('uploads'));

//user
  app.use('/',userRoutes);
  //forum
  app.use('/',pubRoutes);
  //event
  app.use('/',eventRoutes);
  //admin
  app.use('/admin', adminRoutes);
  createAdmin('admin@gmail.com', 'safaanas123')
  createAdmin('safanas@gmail.com','safaanas123')
  //connecter au serveur 
app.listen(5000, ()=>{
console.log('server on port 5000');
})

