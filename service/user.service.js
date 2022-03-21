const express = require('express');
const jwt = require('jsonwebtoken');
const {UserModel, Role} = require('../model/user.model');
const db = require('../config/database.config')
const HttpStatusCode = require("./service").HttpStatusCode
const ServiceResponse = require("./service").ServiceResponse


exports.create = async function( username, password, role ) {
    if( !Object.values(Role).contains(role) ) throw ServiceResponse.error(HttpStatusCode.FORBIDDEN, "Role inválido")
    let user = await UserModel.findOne( {username:username} )
    if( user ) throw ServiceResponse.error(HttpStatusCode.UNAUTHORIZED, "Já existe um usuário com este nome")
    let newUser = new UserModel( {username:username, password:password, role:role } );
    await newUser.save()
    return ServiceResponse.ok()
}


exports.getAll = async function() {
    return ServiceResponse.ok( await UserModel.find( {} ) )
}

exports.update = async function( id, newUser ) {
    await UserModel.findOne( {_id:id} ).update( newUser )
    return ServiceResponse.ok()
}



