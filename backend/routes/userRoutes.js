const express = require('express');
const router = express.Router()
const { loginUser, registerUser } = require('../controllers/userController');



// Register a user
router.post('/register', registerUser)

// Login a user
router.post('/login', loginUser)

module.exports = router;