const express = require('express');
const router = express.Router();
const {signup} = require("../controllers/authController")
//auth Routes
// /api/signup


router.post('/signup', signup);


module.exports = router;