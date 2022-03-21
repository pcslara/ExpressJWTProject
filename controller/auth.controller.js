const express = require('express');
const AuthService = require('../service/auth.service');
const port = 3000

exports.login = async function( req, res, next ) {
    AuthService.login( req.body.username, req.body.password )
        .then( response => res.send( response ) )
        .catch( next )
}

exports.logout = function( req, res, next ) {
    AuthService.logout(req.body.username)
        .then( response => res.send( response ) )
        .catch( next )
}

exports.signup = function( req, res ) {
    const { username, password, role } = req.body;
    AuthService.signup(username, password, role )
        .then( response => res.send( response ) )
        .catch( next )
}
