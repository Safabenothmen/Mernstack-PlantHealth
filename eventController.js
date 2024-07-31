const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = mongoose.model('event');
const Expert = mongoose.model('expert');

// Fonction pour la création d'un événement par un expert authentifié
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const expert = await Expert.findById(req.user.id);

    if (!expert) {
      return res.status(404).json({ error: 'Expert not found' });
    }

    const event = new Event({
      title: title,
      description: description,
      date: date,
      expert: expert._id,
    });

    await event.save();
    

    res.status(201).json({ message: 'Event created successfully', event: event });
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

module.exports = router;
// participe
