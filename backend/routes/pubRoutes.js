const express = require('express');
const router = express.Router();
const pub = require('../controllers/publicationController');
const auth=require('../middelware/auth');


router.post('/pub', auth, pub.createPost);
router.get('/posts',pub.getAllPosts);

router.get('/posts/:id',pub.getPubById);
router.post('/posts/:postId/comments', auth,pub.createComment);
router.delete('/delete/:id', auth, pub.deletePost);


router.put('/posts/like',auth,pub.likepost);
router.put('/posts/unlike',auth,pub.unlikepost);
router.get('/posts/search', pub.searchPosts);
router.delete('/posts/supprime/:id',pub.supprimepost);
router.get('/posts/mypost',auth,pub.getmyPosts);






module.exports = router;
