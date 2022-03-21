const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

/**
 * User Schema
 */
const Role =  {
    NOUSER: "nouser",
    ADMIN: "admin",
    ALUNO: "aluno",
    PROFESSOR: "professor",
    TAE: "tae",
    SELF: "self"
}

const roleData = Object.values(Role)

const UserSchema = new Schema({
    name: { type: String, default: '' },
    username: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    authToken: { type: String, default: '' },
    role: {type: String, enum: roleData, default: Role.NOUSER },
});

/**
 * Virtuals
 */
UserSchema.methods.comparePassword = function (password ) {
    return bcrypt.compareSync( password, this.hashed_password );
};

UserSchema.methods.encryptPassword = function () {
    const salt =  bcrypt.genSaltSync(8);
    return bcrypt.hashSync( this._password, salt);
};

UserSchema.virtual('password')
    .set(
        function(password) {
            
            this._password = password;
            this.hashed_password = this.encryptPassword();            


        }
    ).get(function() {
        return this._password;
    });

UserModel = mongoose.model('User', UserSchema)
module.exports = {  UserModel , Role }