const mongoose = require('mongoose');
require("../models/admindetails");
const Administrateur = mongoose.model('Administrateur');
const nodemailer = require('nodemailer');

const bcrypt = require("bcryptjs");
const { createCheckSchema } = require('express-validator/src/middlewares/schema');



/*exports.createadmin = async (req, res) => {
    const { email, password} = req.body;

  
    try {
      // Vérifier que l'utilisateur n'existe pas déjà
      let admin;
      // Créer un nouvel utilisateur
        admin = new Administrateur({
          email,
          password,
        });
      // Enregistrer l'utilisateur dans la base de données
      await admin.save();
  
      res.json({ message: 'Inscription réussie.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };

//authentification
exports.authadmin = async (req, res) => {
  const { email, password,userType } = req.body;
  const admin = await Administrateur.findOne({ email });

  try {
    if (!admin) {
      return res.status(404).send({ message: 'admin non trouvé.' });
    }

    // Vérification du mot de passe avec bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Mot de passe incorrect.' });
    }
    
    const token = jwt.sign(
      {
        userId:admin._id,
        userEmail: admin.email,
        userType:admin.userType,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );
    res.json({ message: 'Authentification réussie',
      email: admin.email,
      token,
      userType: admin.userType
    });
   
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}*/

//

require('../models/userdetails')

const Expert = mongoose.model('expert');

exports.getPendingExperts = async (req, res) => {
  try {
    const pendingExperts = await Expert.find({ status: 'En attente' });
    res.json(pendingExperts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}
exports.getAllExperts = async (req, res) => {
  try {
    const AllExperts = await Expert.find();
    res.json(AllExperts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}


  

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vagrokfarm@gmail.com',
    pass: 'hwroyvpcgzpqodup'
  }
});

  exports.acceptExpert = async (req, res) => {
    const expertId = req.params.id;
    try {
      const expert = await Expert.findById(expertId);
      await Expert.findByIdAndUpdate(expertId, { status: "Accepté" }, { new: true });
      //send email
      const mailOptions = {
        from: 'vagrokfarm@gmail.com',
        to: expert.email,
        subject: 'Votre demande a été acceptée',
        html: `<p><strong>Bonjour ${expert.nom} ${expert.prenom},</strong></p>
               <p>Félicitations ! Nous sommes ravis de vous informer que votre demande en tant qu'expert a été acceptée avec succès
               . Vous pouvez maintenant accéder à votre compte .</p>
               <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
               
               <p>Cordialement,</p>
               <p>L'équipe de notre application</p>`

      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(info.response);
        }
      });
      res.json(expert);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }





  exports.refuseExpert = async (req, res) => {
    const expertId = req.params.id;
    try {
      const expert = await Expert.findById(expertId);
      await Expert.findByIdAndUpdate(expertId, { status: "Refusé" }, { new: true });
       const mailOptions = {
        from: 'vagrokfarm@gmail.com',
        to: expert.email,
        subject: 'Votre demande a été acceptée',
        html: `<p><strong>Bonjour ${expert.nom} ${expert.prenom},</strong></p>
               <p>  Votre demande en tant qu'expert a été refusée. </p>
               <p>Cordialement,</p>
               <p>L'équipe de notre application</p>`
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(info.response);
        }
      });
      res.json(expert);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  exports.supprimerExpert = async (req, res) => {
    const expertId = req.params.id;
    try {
      console.log("ID de l'expert à supprimer: ", expertId);
      const expert = await Expert.findById(expertId);
      console.log("Expert avant la suppression: ", expert);
      await Expert.findByIdAndDelete(expertId);
      console.log("Expert supprimé: ", expert);
      res.json(expert);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
  
  

  
  


  