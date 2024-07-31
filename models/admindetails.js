const mongoose = require('mongoose');

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
  userType: {
    type: String,
    //enum: ['agriculteur', 'expert'],
    required: true,
    default: 'administrateur',
  },
},

{
    collection: 'Administrateur',
  }
);

mongoose.model('Administrateur', AdminSchema);
