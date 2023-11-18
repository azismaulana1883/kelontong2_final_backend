const express = require('express');
const router = express.Router();

const authController =  require('../../Controllers/auth/auth')

//register user or owner
router.post('/register', authController.Register);
router.get('/verify', authController.VerifyEmail);

module.exports = router;