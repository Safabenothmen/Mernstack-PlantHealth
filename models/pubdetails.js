const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  titre: {
    type: String,

  },
  description: {
    type: String,

  },
  photo: {

    type: Object,
    default: {
      url: "",
      publicId: null,
    },
  },

  likes: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],


  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'user' },
    nom: String,
    prenom: String,
    role: String,
  }],
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'user' },
  nom: String,
  prenom: String,
  role: String,
  created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'Post'
}
)
const Post = mongoose.model('Post', PostSchema);

module.exports = {
  Post
};