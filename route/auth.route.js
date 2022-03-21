const express = require('express');
const AuthController = require('../controller/auth.controller')
const AuthMiddleware = require('../middleware/auth.middleware')
const Role = require('../model/user.model').Role

var router = express.Router();


router.post('/login',  AuthController.login );
router.post('/logout', AuthMiddleware.autorize(), AuthController.logout );
router.post('/signup', AuthMiddleware.autorize( Role.ADMIN ), AuthController.signup );


module.exports = router;
