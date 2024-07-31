const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/eventdetails');
require('../models/userdetails');
const Event = mongoose.model('evenement');
const Expert = mongoose.model('expert');
const nodemailer = require('nodemailer');

const bcrypt = require("bcryptjs");
const { createCheckSchema } = require('express-validator/src/middlewares/schema');
const Agriculteur=mongoose.model('agriculteur');

// Fonction pour la création d'un événement par un expert authentifié
// Importez votre modèle Event

exports.createEvent = async (req, res) => {
  try {
    const { titre, description, date } = req.body;

    // Vérifiez si un expert est associé à la requête
    if (!req.user) {
      return res.status(404).json({ error: 'Expert not found' });
    }

    const expertId = req.user.id; // Supposons que l'ID de l'expert est disponible dans req.user.id

    // Recherchez l'expert dans la base de données
    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({ error: 'Expert not found' });
    }

    const event = new Event({
      titre,
      description,
      date,
      expert: expertId,
      nom: expert.nom,
      prenom: expert.prenom,
      email:expert.email,
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ error: 'Failed to create event' });
  }
};




exports.participerEvenement = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id; // ID de l'utilisateur extrait du jeton d'accès

    // Recherchez l'événement dans la base de données
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Vérifiez si l'utilisateur existe déjà dans la liste des participants de l'événement
    const isParticipant = event.participants.includes(userId);
    if (isParticipant) {
      return res.status(400).json({ error: 'Already participated in the event' });
    }

    // Effectuer les actions pour permettre à l'agriculteur de participer à l'événement
    event.participants.push(userId);
    await event.save();

    res.status(200).json({ message: 'Participation confirmed', event });
  } catch (error) {
    console.error('Error participating in event:', error.message);
    res.status(500).json({ error: 'Failed to participate in event' });
  }
};



exports.getAllEvent= async (req, res) => {

  try {
    const event = await Event.find()
    .populate('nom')
    .populate('prenom')

.populate('email')

    .populate('titre')
.populate('description')
.populate('date')
      .select('nom prenom titre description date')
            .exec();

    res.json(event);
    console.log(event);
  } catch (error) {
    console.error('Erreur lors de la récupération devenement:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération desevenements' });
  }
};




exports.getmyEvents = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in req.user.id

    const events = await Event.find({ expert: userId })
      .populate('nom')
      .populate('prenom')
      .populate('email')
      .populate('titre')
      .populate('description')
      .populate('date')
      .select('nom prenom titre description date')
      .exec();

    res.json(events);
    console.log(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vagrokfarm@gmail.com',
    pass: 'hwroyvpcgzpqodup'
  }
});
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByIdAndDelete(eventId);

    const mailOptions = {
      from: 'vagrokfarm@gmail.com',
      to: event.email, // Use event.email instead of Event.email
      subject: 'Votre événement a été supprimé',
      html: `<p><strong>Bonjour ${event.nom} ${event.prenom},</strong></p>
             <p>nous tenons à vous informer que votre événement ${event.titre} a été supprimé . Nous vous prions de nous contacter pour plus d'informations concernant cette suppression.</p>
             <p> Merci de votre compréhension</p>
             
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

    res.sendStatus(200);
    console.log('event supprimée avec succes');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement', error);
    res.sendStatus(500);
  }
};
exports.getParticipants = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findById(eventId).populate('participants');
    if (!event) {
      return res.status(404).json({ message: "L'événement n'a pas été trouvé." });
    }

    const participants = event.participants;
    res.json({ participants });
  } catch (error) {
    console.error('Erreur lors de la récupération des participants :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des participants.' });
  }
};



exports.supprimerEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
   

    const event = await Event.findOne({ _id: eventId});
    if (!event) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }

    await event.deleteOne();

    res.sendStatus(200);
    console.log('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.sendStatus(500);
  }
};

exports.acceptParticipant = async (req, res) => {
  const { eventId, participantId } = req.params;
  const expertId = req.user.id; // Assuming you have implemented authentication middleware that attaches the expert ID to the request object

  try {
    const event = await Event.findOne({ _id: eventId, expert: expertId }).populate('expert');
    
    // Check if the event exists and belongs to the expert
    if (!event) {
      return res.status(404).json({ message: 'Événement introuvable ou non autorisé' });
    }
    
    // Find the participant in the event's participants array
    const participant = event.participants.find(participant => participant._id.toString() === participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant introuvable' });
    }
    
    // Update the participant's status to "Accepté"
    participant.status = 'Accepté';
    
    // Save the updated event
    await event.save();
    console.log(event);
    // Envoyez un email au participant
    const mailOptions = {
      from: 'vagrokfarm@gmail.com',
      to: participant.email,
      subject: 'Votre demande a été acceptée',
      html: `<p><strong>Bonjour ${participant.nom} ${participant.prenom},</strong></p>
             <p>Félicitations ! Votre demande a été acceptée par l'expert ${event.expert.nom} ${event.expert.prenom}.</p>
             <p>Vous pouvez maintenant participer à l'événement "${event.titre}".</p>
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

    res.json({ message: 'Demande de participant acceptée avec succès' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
