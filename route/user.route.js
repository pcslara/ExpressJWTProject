const express = require('express');
const UserController = require('../controller/user.controller')
const AuthMiddleware = require('../middleware/auth.middleware')
const Role = require('../model/user.model').Role

var router = express.Router();


router.get('/',       AuthMiddleware.autorize( Role.ADMIN ), UserController.getAll );
router.post('/',      AuthMiddleware.autorize( Role.ADMIN ), UserController.create );
router.patch('/:_id',  AuthMiddleware.autorize( Role.ADMIN ), UserController.update );
router.delete('/:_id', AuthMiddleware.autorize( Role.ADMIN ), UserController.delete );


module.exports = router;
