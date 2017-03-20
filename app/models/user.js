//utilisation de mongoose pour la création de shémas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//user schema
var UserSchema = new Schema({
	name    : {type:String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false}
});






module.exports = mongoose.model('User', UserSchema);