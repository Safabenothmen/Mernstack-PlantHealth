const mongoose = require('mongoose');
require('../models/pubdetails');
const Post = mongoose.model('Post');
require('../models/userdetails');
const Agriculteur = mongoose.model('agriculteur');
const Expert = mongoose.model('expert');
const User = mongoose.model('user');

const multer = require('multer');
const path = require('path');



const {cloudinaryUploadImage, cloudinaryRemoveImage} =require("../utils/cloudinary")

// Configurez le stockage de multer
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    if (file) {
      const fileName = file.originalname.replace(/\s/g, '_');
      cb(null, fileName);
    } else {
      cb(null, false);
    }
  },
});

// Créez l'instance de multer
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      console.log(file.mimetype)
      cb(null, true);
    } else {
      cb({ message: "unsupported file format" }, false);
    }
  },

});

// Création de post
const createPost = async (req, res) => {
  try {
    // Utilisez le middleware multer pour gérer le téléchargement du fichier photo
    photoUpload.single('photo')(req, res, async function (err) {
      if (err) {
        console.error('Erreur lors du téléchargement de la photo:', err);
        return res.status(500).json({ message: 'Erreur lors du téléchargement de la photo' });
      }

      const { titre, description } = req.body;
      const userId = req.user.id;

      if (!req.file) {
        return res.status(400).json({ message: 'Fichier photo manquant' });
      }
const photoPath =  "../../app3/src/components/Dashbord/Forum/uploads/"+req.file.filename;

console.log(photoPath)

      const role = req.user.role;
      console.log(role);
      let user;

      if (role === 'expert') {
        user = await Expert.findById(req.user.id);
      } else if (role === 'agriculteur') {
        user = await Agriculteur.findById(req.user.id);
      }

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      //photo upload to cloudinary 
      const imagePath=path.join(__dirname,`../uploads/${req.file.filename}`)
    const result=await cloudinaryUploadImage(imagePath);
console.log(result)
      const newPost = new Post({
        titre,
        description,
        photo:{
          url:result.secure_url,
          publicId:result.public_id
           },
        postedBy: userId,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      });

      const savedPost = await newPost.save();

      res.status(201).json(savedPost);
      console.log(newPost)
    });
  } catch (error) {
    console.error('Erreur lors de la création de la publication:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la publication' });
  }
};

const getAllPosts = async (req, res) => {
  try {
   

    const posts = await Post.find()
      .populate('nom')
      .populate('prenom')
      .populate('titre')
      .populate('created')
      .select('nom prenom titre created')
      .exec();

    res.json(posts);
  } catch (error) {
    console.error('Erreur lors de la récupération des publications:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des publications' });
  }
};




const getPubById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la publication:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des détails de la publication' });
  }
};


const createComment = async (req, res) => {
  try {
    const { postId, text, nom } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée' });
    }

    const comment = {
      text,
      nom: req.user.nom,
      prenom: req.user.prenom,
      role: req.user.role,
    };

    post.comments.push(comment);

    await post.save();

    res.status(201).json({ message: 'Commentaire créé avec succès' });
    console.log(req.user.role);
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);
    res.status(500).json({ message: 'Erreur lors de la création du commentaire' });
  }
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // Vérifiez si la publication existe et si l'utilisateur est l'auteur
  Post.findOne({ _id: postId, postedBy: userId })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "La publication n'a pas été trouvée ou vous n'êtes pas autorisé à la supprimer" });
      }

      // Supprimez la publication de la base de données
      Post.findByIdAndDelete(postId)
        .then(() => {
          res.json({ message: 'La publication a été supprimée avec succès' });
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la publication:', error);
          res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la publication' });
        });
    })
    .catch((error) => {
      console.error('Erreur lors de la recherche de la publication:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la recherche de la publication' });
    });
}
const supprimepost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "La publication n'a pas été trouvée" });
    }
    res.json({ message: 'La publication a été supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la publication:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la publication' });
  }
};

const likepost = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true });
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const unlikepost = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true });
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
 //Recherche de publications
 const searchPosts = async (req, res) => {
   const searchTerm = req.query.q; // Terme de recherche

   try {    
     const posts = await Post.find({
       $or: [
         { titre: { $regex: searchTerm, $options: 'i' } }, // Recherche insensible à la casse dans le titre
         { description: { $regex: searchTerm, $options: 'i' } }, // Recherche insensible à la casse dans la description
       ],
     });

     res.json(posts);
     console.log(posts);
   } catch (error) {
     console.error('Erreur lors de la recherche des publications:', error);
     res.status(500).json({ message: 'Erreur lors de la recherche des publications' });
   }
 };

 const getmyPosts = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté

    const posts = await Post.find({ postedBy: userId })
      .populate('nom')
      .populate('prenom')
      .populate('titre')
      .populate('description')
      .populate('date')
      .select('nom prenom titre date description')
      .exec();

    res.json(posts);
    console.log(posts)
  } catch (error) {
    console.error('Erreur lors de la récupération des publications:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des publications' });
  }
};






module.exports = {
  createPost,
  getAllPosts,
  getPubById,
  createComment,
  deletePost,
  likepost,
  unlikepost,
  searchPosts,
  supprimepost,
 getmyPosts
};