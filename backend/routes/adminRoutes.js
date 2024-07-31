const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');

//router.post('/register', admin.createadmin);
//router.post('/login', admin.authadmin);
router.get('/expert',admin.getPendingExperts);
router.get('/Allexpert',admin.getAllExperts);

router.put('/accepter/:id', admin.acceptExpert);
router.put('/refuser/:id', admin.refuseExpert);
router.delete('/supprimer/:id', admin.supprimerExpert);



module.exports = router;
