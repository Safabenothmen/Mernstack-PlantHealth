// user.model.js
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password : {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'administrateur',
  },
  
},

{
    collection: 'admin',
  }
);

const agriSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      //enum: ['agriculteur', 'expert'],
      required: true,
      default: 'agriculteur'
    },
  },
  {
    collection: 'agriculteur',
  }
);

const expertSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'expert'
    },
    etablissement:{
      type: String,
      required:true,
    },
    diplome:{
      type: String,
      required:true,
    },
    status: {
      type: String,
      default: 'En attente',
    },  
  },
  {
    collection: 'expert',
  }
);


/*const userSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'agriculteur', 'expert'],
      required: true
    },
    agriculteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agriculteur'
    },
    expert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expert'
    }
  },{
    collection:'user'
  });
*/



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password : {
    type: String,
    required: true
  },
  
  role: {
    type: String,
    enum: ['administrateur', 'agriculteur', 'expert'],
    required: true
  },
  status: {
    type: String,
    default: 'null',
  },
  
  agriculteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'agriculteur'
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'expert'
  },
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'administrateur'
  },

  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],

}, {
  collection: 'user'
});


/*userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}*/
userSchema.pre('save', async function (next) {
  if (this.expert && this.role === 'expert') {
    // Si l'utilisateur est un expert, stockez le statut
    this.status = this.expert.status;
  }
  next();
});


  const Agriculteur = mongoose.model('agriculteur', agriSchema);
  const Expert = mongoose.model('expert', expertSchema);
  const Administrateur=mongoose.model('admin',AdminSchema)
  const User = mongoose.model('user', userSchema);
  
  module.exports = {
    Agriculteur,
    Expert,
   Administrateur,
   User
  };




