const express = require('express');
const router = express.Router();
const user=require('../controllers/UserController');
const { check } = require('express-validator');
const auth=require('../controllers/authController');
const middelware=require('../middelware/auth');

//router.post('/register', userController.createUser);
router.post('/register/agri',[
    check('nom', 'Name is required').notEmpty(),
    check('prenom', 'prenom is required').notEmpty(),

    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],user.createagri);


router.post('/register/expert',[
    check('nom', 'Name is required').notEmpty(),
    check('prenom', 'prenom is required').notEmpty(),

    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('diplome','diplome is required').notEmpty(),
    check('etablissement','etablissement required').notEmpty(),

],user.createexpert);
router.post('/login', auth.login);
router.get('/profile',middelware,auth.getuser);
router.get('/me', middelware, auth.getProfile);
router.get('/user', middelware, auth.getUserProfile);
router.post('/register/admin',user.createAdmin);
// router.put('/update/id',middelware,user.updateagri);

router.put('/update/:id',middelware, user.updateUserProfile );


router.put('/updateExpert/:id',middelware, user.updateexpertProfile  );
//router.get('/me', auth.getNomUtilisateur);

//router.post('/:id',)


//router.put('/:id', eventController.updateEvent);
//router.delete('/:id', eventController.deleteEvent);

module.exports = router;
