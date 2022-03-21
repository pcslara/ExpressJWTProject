const express = require('express');
const jwt = require('jsonwebtoken');
const {UserModel, Role} = require('../model/user.model');
const db = require('../config/database.config')
const HttpStatusCode = require("./service").HttpStatusCode
const ServiceResponse = require("./service").ServiceResponse

function generateAccessToken(username) {
    try {
    return jwt.sign( {username}, process.env.TOKEN_SECRET, { expiresIn: '15d' } );
    } catch(err) {
        console.log( err )
    }
}

exports.login = async function( username, password ) {
    let user = await UserModel.findOne( {username:username} ) 
    if( user ) {
        if( user.comparePassword( password ) ) {
            let token = generateAccessToken(username);
            await user.updateOne( {authToken:token} )
            jsonUser = user.toObject({ getters: true })
            delete jsonUser.hashed_password
            return ServiceResponse.ok(  jsonUser  )
        } else {
            throw ServiceResponse.error(HttpStatusCode.FORBIDDEN, "Password incorreto")
        }
    } else {
        return ServiceResponse.error(HttpStatusCode.NOT_FOUND, "Usuário não encontrado")
    }   
}

exports.logout = async function( username ) {
    let docs = await UserModel.find({})
    console.log( username )
    let user = await UserModel.findOne( {username:username} ) 
    if( !user ) throw ServiceResponse.error(HttpStatusCode.NOT_FOUND, "Usuário não encontrado")
    await user.updateOne( { authToken: "" } )
    
    docs = await UserModel.find({})
    console.log( docs )
    return ServiceResponse.ok()
}

exports.signup = async function( username, password, role ) {
    if( !Object.values(Role).contains(role) ) throw ServiceResponse.error(HttpStatusCode.FORBIDDEN, "Role inválido")
    let user = await UserModel.findOne( {username:username} )
    if( user ) throw ServiceResponse.error(HttpStatusCode.UNAUTHORIZED, "Já existe um usuário com este nome")
    let newUser = new UserModel( {username:username, password:password, role:role } );
    await newUser.save()
    return ServiceResponse.ok()
}
