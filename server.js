// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var config 	   = require('./config');
var path 	   = require('path');			//permet de se balader sur les route entre les "slashs"

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
//On paramètre notre système de log de requêtes : morgan
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure our app to handle CORS requests

 app.use(function(req, res, next) {
 	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
 });

// log all requests to the console 
app.use(morgan('dev'));

// connect to our database
mongoose.connect(config.database);

// set static files location  
//Static files are images, JavaScript library, CSS files etc. You can specify by using.
// used for requests that our frontend will make

// ROUTES FOR OUR API =================
// ====================================


// API ROUTES ------------------------
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE --------------- 
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES

app.use(express.static (__dirname + '/public/app/views'));
 
// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Bienvenue sur le server de la mangathèque : ' + config.port);



