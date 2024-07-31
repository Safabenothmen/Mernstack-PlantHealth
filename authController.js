const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Expert=mongoose.model('expert');
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const { Agriculteur, Administrateur } = require('../models/userdetails');

const secret = 'secret_key';

/*exports.login = async (req, res) => {
  const { email, password, } = req.body;

  const user = await User.findOne({ email});
  if (!user) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }

  //const salt = await bcrypt.genSalt(10);
  //const password1 = await bcrypt.hash(password, salt);
  //const userpass=await bcrypt.hash(User.password,salt);
  //const isMatch = await user.comparePassword(password);
  //const pass = await user.comparePassword(user.password);
   //console.log(password);
  //console.log(userpass);
if(password!=user.password)

   {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }


  if (user.role === 'expert') {
    const expert = await Expert.findOne({email});
    if (expert.status === 'En attente') {
      return res.status(401).json({ message: 'Votre demande est en cours de traitement' });
    } else if (expert.status === 'Refusé') {
      return res.status(401).json({ message: 'Votre demande a été refusée' });
    }
  }
  else {

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1d' });
    const userData = { id: user._id, email: user.email, role: user.role };
    res.json({ token, userData });
};
 
};
*/

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email incorrect' });
  }
  if (password !== user.password) {
    return res.status(401).json({ message: 'mot de passe incorrect' });
 }

  if (user.role === 'expert') {
    const expert = await Expert.findOne({ email });
    if (!expert) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    if (expert.status === 'En attente') {
      return res.status(401).json({ message: 'Votre demande est en cours de traitement' });
    } else if (expert.status === 'Refusé') {
      return res.status(401).json({ message: 'Votre demande a été refusé' });
    } else {
      const token = jwt.sign(
        { id: expert._id, role: expert.role, nom: expert.nom, prenom: expert.prenom, status:expert.status,diplome:expert.diplome,etablissement:expert.etablissement },
        secret,
        { expiresIn: '1d' }
      );
      
      const userData = { id: expert._id, email: expert.email, role: expert.role, nom: expert.nom, prenom: expert.prenom,status:expert.status,diplome:expert.diplome,etablissement:expert.etablissement};
      res.json({ token, userData });
      console.log(token);
      console.log(userData);
    }
  } else if (user.role === 'agriculteur') {
    const agriculteur = await Agriculteur.findOne({ email });
    if (!agriculteur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    } else {
      const token = jwt.sign(
        { id: agriculteur._id, role: agriculteur.role, nom: agriculteur.nom, prenom: agriculteur.prenom },
        secret,
        { expiresIn: '1d' }
      );
      
      const userData = { id: agriculteur._id, email: agriculteur.email, role: agriculteur.role, nom: agriculteur.nom, prenom: agriculteur.prenom };
      res.json({ token, userData });
      console.log(token);
      console.log(userData);
    }
  } else if (user.role === 'administrateur') {
    const administrateur = await Administrateur.findOne({ email });
    if (!administrateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    } else {
      const token = jwt.sign(
        { id: administrateur._id, role: administrateur.role, nom: administrateur.nom, prenom: administrateur.prenom },
        secret,
        { expiresIn: '1d' }
      );
      
      const userData = { id: administrateur._id, email: administrateur.email, role: administrateur.role, nom: administrateur.nom, prenom: administrateur.prenom };
      res.json({ token, userData });
      console.log(token);
      console.log(userData);
    }
  }
};




exports.authenticate = async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentification requise' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
      if (req.user.role === 'expert') {
        const expert = await Expert.findById(req.user.id);
        if (expert.status === 'En attente') {
          return res.status(401).json({ message: 'Votre demande est en cours de traitement' });
        } else if (expert.status === 'Refusé') {
          return res.status(401).json({ message: 'Votre demande a été refusée' });
        }
      }
      
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentification requise' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Autorisation refusée' });
  }
  next();
};

exports.isAgriculteur = (req, res, next) => {
  if (req.user.role !== 'agriculteur') {
    return res.status(403).json({ message: 'Autorisation refusée' });
  }
  next();
};

exports.isExpert = (req, res, next) => {
  if (req.user.role !== 'expert') {
    return res.status(403).json({ message: 'Autorisation refusée' });
  }
  next();
};

exports.getuser = (req, res) => {
  if (req.user && req.user.nom && req.user.prenom && req.user.role) {
    const nom = req.user.nom;
    const prenom = req.user.prenom;
    const role= req.user.role;

    res.json({ nom, prenom,role });
  } else if (req.user && req.user.nom && req.user.role ){
    const nom = req.user.nom;
    res.json({ nom, prenom: 'Prénom non disponible' });
  } else {
    res.json({ nom: 'Nom non disponible', prenom: 'Prénom non disponible' });
  }
};




exports.getProfile = (req, res) => {
  if (req.user) {
    const { role } = req.user; // Récupérer uniquement le rôle de l'utilisateur
    res.json({ role }); // Renvoyer uniquement le rôle dans la réponse
  } else {
    res.status(404).json({ error: 'Profil non trouvé' });
  }
};
exports.getUserProfile = (req, res) => {
  const { id, nom, prenom,role } = req.user;
  
  // Retourner le profil de l'utilisateur
  res.json({ id, nom, prenom,role});
};






  