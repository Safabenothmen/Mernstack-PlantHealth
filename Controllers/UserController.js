



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const mongoose = require('mongoose');
require('../models/userdetails');
const { validationResult } = require('express-validator');
const multer=require('multer');
const path=require('path');
const {v4:uuidv4}=require('uuid');



const Agriculteur = mongoose.model('agriculteur');
const Expert = mongoose.model('expert');
const Administrateur=mongoose.model('admin');
const User=mongoose.model('user');

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

  //creation d'agriculteur 
 
   



  exports.createagri = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, nom, prenom, password } = req.body;
  
    try {
      let agriculteur = await Agriculteur.findOne({ email });
  
      if (agriculteur) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      } else {
        agriculteur = new Agriculteur({
          email: req.body.email,
          nom,
          prenom,
          password,
          role: 'agriculteur',
        });
  
        //const salt = await bcrypt.genSalt(10);
        //agriculteur.password = await bcrypt.hash(password, salt);
  
        await agriculteur.save();
  
        const user = new User({
          email: agriculteur.email,
          password: agriculteur.password,
          role: agriculteur.role,
          agriculteur:agriculteur._id,
        });
  
        await user.save();
  
        res.json({ msg: 'User registered successfully' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
 
 
//creation d'expert
/*exports.createexpert = async (req, res) => {

  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, nom, prenom, password,role} = req.body;
  //const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    let user=await Expert.findOne({email});
    //if (type === 'agriculteur') {
      //user = await Agriculteur.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      } else {
        user= new Expert({
          email:req.body.email,
          nom,
          prenom,
          password,
          role:'expert',
         
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ msg: 'User registered successfully' });
      }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};*/



exports.createexpert = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, nom, prenom, password,etablissement,diplome} = req.body;
  console.log(req.body);

  try {
    let expert = await Expert.findOne({ email });

    if (expert) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    } else {
      expert = new Expert({
        email: req.body.email,
        nom,
        prenom,
        password,
        etablissement,
        diplome,
        role: 'expert',
        status:"En attente"
        
      });

     // const salt = await bcrypt.genSalt(10);
      //expert.password = await bcrypt.hash(password, salt);

      await expert.save();
      console.log(expert);

      const user = new User({
        email: expert.email,
        password: expert.password,
        role: expert.role,
        expert: expert._id,
        status:expert.status,
      });

      await user.save();

      res.json({ msg: 'User registered successfully' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



//create admin
exports. createAdmin = async (email, password) => {
  try {
    let admin = await Administrateur.findOne({ email });
    if (admin) {
    //  console.log('Admin already exists');
      return;
    }

    admin = new Administrateur({
      email,
      password,
      role: 'administrateur'
    });

    await admin.save();
    const user = new User({
      email: admin.email,
      password: admin.password,
      role: admin.role,
      admin: admin._id,
    });

    await user.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error(error.message);
  }
};
  




  



//recuperer agriculteur


exports.recupereragri = async (req, res) =>
{
  const { id } = req.params;
  try {
    const agri = await Agriculteur.findById(id);
    if (!agri) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send(agri);
  } catch (error) {
    res.status(400).send(error);
  }
};
 //update agriculteur
 exports.updateagri=async(req,res)=>
 {
  const user =req.params.id;
  console.log(user)
  const { email, nom, prenom, password } = req.body;

  try {
    const user = await Agriculteur.findByIdAndUpdate(user, { email, nom, prenom, password }, { new: true });
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send(user);
    
  } catch (error) {
    res.status(400).send(error);
  }
};
//supprimer Compte
 exports.deleteagri=async(req,res)=>
 {
  const { id } = req.params;
  try {
    const user = await Agriculteur.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(400).send(error);
  }
};
 



exports.recupererexpert = async (req, res) =>
{
  const { id } = req.params;
  try {
    const expert = await Expert.findById(id);
    if (!expert) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send(expert);
  } catch (error) {
    res.status(400).send(error);
  }
};
 //update agriculteur
 exports.updateexpert=async(req,res)=>
 {
  const {id} =req.params;
  const { email, nom, prenom, password } = req.body;
  try {
    const expert= await Expert.findByIdAndUpdate(id, { email, nom, prenom, password }, { new: true });
    if (!expert) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send(expert);
  } catch (error) {
    res.status(400).send(error);
  }
};
//supprimer Compte
 exports.deleteexpert=async(req,res)=>
 {
  const { id } = req.params;
  try {
    const expert = await Expert.findByIdAndDelete(id);
    if (!expert) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Modifier le compte de l'agriculteur
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
   
    const {nom,prenom,email,password } = req.body;

    const agriculteur = await Agriculteur.findByIdAndUpdate(id, { nom,prenom,email,password,  }, { new: true });
    console.log(agriculteur);
    res.json(agriculteur);
    console.log(agriculteur)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil utilisateur.' });
  }
};
exports.updateexpertProfile = async (req, res) => {
  try {
    const { id } = req.params;
   
    const {nom,prenom,email,password,diplome,etablissement } = req.body;

    const expert= await Expert.findByIdAndUpdate(id, { nom,prenom,email,password,diplome,etablissement  }, { new: true });
    console.log(expert);
    res.json(expert);
    console.log(expert)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil utilisateur.' });
  }
};

