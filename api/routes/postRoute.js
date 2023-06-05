const express = require("express");
const router = express.Router();
const {createPost, showPost, showSinglePost , deletePost, updatePost} = require("../controllers/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post('/post/create', isAuthenticated, isAdmin , createPost);
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id',isAuthenticated,isAdmin,deletePost )
router.put('/update/post/:id',isAuthenticated ,isAdmin, updatePost)
module.exports = router;
