const express = require("express");
const router = express.Router();
const {createPost, showPost, showSinglePost , deletePost, updatePost, addComment, addLike} = require("../controllers/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post('/post/create', isAuthenticated, isAdmin , createPost);
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id',isAuthenticated,isAdmin,deletePost )
router.put('/update/post/:id',isAuthenticated ,isAdmin, updatePost)
router.put('/comment/post/:id',isAuthenticated ,addComment)
router.put('/addlike/post/:id',isAuthenticated ,addLike)

module.exports = router;
