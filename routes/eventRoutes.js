const express = require('express');
const router = express.Router();
const eventController=require('../controllers/EvenementController');
const auth = require('../middelware/auth');

router.post('/create/event', auth, eventController.createEvent);

router.post('/:eventId/participate',auth, eventController.participerEvenement);
router.get('/allevent',eventController.getAllEvent);
router.get('/myevent', auth, eventController.getmyEvents);

router.delete('/deleteevent/:id',eventController.deleteEvent)
router.get('/:eventId/participants', eventController.getParticipants);
router.delete('/event/:id', auth, eventController.supprimerEvent);
router.put('/event/:eventId/accept/:participantId',auth, eventController.acceptParticipant);



module.exports = router;

