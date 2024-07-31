const { default: mongoose } = require('mongoose');



require('../models/pubdetails');
//require('../models/userdetails');
//const auth=require('../middelware/auth');
const Post = mongoose.model('Post');
//const user=mongoose.model("user")
//const Post = require('../models/post');

// controllers/pubController.js

//const Publication = require('../models/Publication');

exports.createPost = async (req, res) => {
  try {
    console.log('Received a request to create a new post:', req.body);

    const { title, body } = req.body;

    const newPublication = new Post({
      title,
      body,
      author: req.user._id
    });

    const result = await newPublication.save();
    console.log('Successfully created a new post:', result);

    res.status(201).json({  result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: err });
  }
};
