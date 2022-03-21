const express = require('express');
const bp = require('body-parser')
const dotenv = require('dotenv');
const app = express();
const port = 2000;
const AuthRoute = require("./route/auth.route")
const UserRoute = require("./route/user.route")
const ServiveResponse = require("./service/service").ServiceResponse
dotenv.config()


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const unirest = require("unirest");

app.use('/auth', AuthRoute )
app.use('/user', UserRoute )


app.use( (err, req, res, next ) => {
  console.log("LOG:" + err )
  if( typeof err == 'ServiceResponse')
    res.status( err.statusCode || 500 ).send( err )
  else {
    res.status( 500 ).send( ServiveResponse.error( 500, "Erro interno do Servidor" ))
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});
