const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    titre: String,
    description: String,
    date: Date,
    expert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'expert',
      
    },
    nom: String,
    prenom:String,
  email:String,
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agriculteur',
        nom: String,
        prenom:String,
        status:{
        type: String,
        default: 'En attente',
        }
      },
      
    ],
  },
  {
    collection: 'evenement',
  }
);

const Event = mongoose.model('evenement', EventSchema);

module.exports = Event;
