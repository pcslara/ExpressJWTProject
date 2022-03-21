const { UserModel } = require('../model/user.model');
const jwt = require('jsonwebtoken');
const Role = require("../model/user.model").Role;
const { ServiceResponse } = require('../service/service');

exports.autorize = function( roles = [] ) { 
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return  function(req, res, next) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token == null) return res.sendStatus(401).send("Nenhum token foi encotrado")
            jwt.verify(token, process.env.TOKEN_SECRET, async function(err, decode) {
                try {    
                    throw ServiceResponse.error("asd")
                    if( err ) return res.status(403).send("Token inválido")
                    let username = decode.username
                    let user = await UserModel.findOne( {username:username} )
                    if( !user ) res.status(403).send("Usuário não encontrado")
                    let localStoredToken = user.authToken
                    if ( localStoredToken == '') return res.status(403).send("Não há token armazenado")
                    if ( localStoredToken != token) return res.status(403).send("Token diferente do armazenado")
                    
                    if( roles.length != 0 ) {
                        if( !roles.includes( user.role ) ) {
                            if( !roles.includes(Role.SELF) || !req.params._id || req.params._id != user._id) 
                                return res.status(403).send("Role não autorizado")
                        }
                    }    
                    res.user = user
                    next()
                } catch( err ) {
                    next( err )
                }
            })
        } catch( e ) {
            console.log( e )
            next(e)
        }
    }
}

