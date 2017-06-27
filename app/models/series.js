//utilisation de mongoose pour la création de shémas
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//serie schema
var SerieSchema = new Schema({
	// //_creator : {type: Schema.ObjectId, ref: 'User'},
	// _userId : {type: Schema.ObjectId, ref: 'User', require: true},
	// //img   : {type: },
	// titre   : {type:String, required: true},
	// nbrTotal: {type: Number, required: true},
	// //nbrAqui : {type: Number},
	// auteur  : {type: String}
	name: {type: String},
	author: {type: String},
	category: {type: Object},
	img: {type: String},
	id: {type: String},
	chapter_Length: {type: Number}
});

//verify if serie is already saved
SerieSchema.pre('save', function(next){
	var serie = this;

	//enregistre le manga seulement si le titre n'est pas déjà selectionné
	if (serie.isSelected('titre')) return next();//res.json("ça marche pô, la série existe deja trou d'balle!");
});

// return the model
module.exports = mongoose.model('Serie', SerieSchema);







