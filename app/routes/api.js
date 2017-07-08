var bodyParser = require('body-parser');
var User       = require('../models/user');
var Serie      = require('../models/series');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret || 'admin';


var apiExterne = "http://www.mangaeden.com/api/list/0/";


module.exports = function(app, express) {

	var apiRouter = express.Router();

	// middleware to use for all requests
	apiRouter.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
	});

	apiRouter.get('/', function(req, res){
		res.json({ message: 'hooray! welcome to our api!' });
	});

apiRouter.route('/authenticate')
	.post(function(req, res){
		// find the user
		console.log("Moi même je vaut : ",req.body.name);
	  User.findOne({
	    name: req.body.name
	  }).select('name password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.status(402).json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.status(403).json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = generateToken(user)

	        // return the information including token as JSON
	        res.status(200).json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

function generateToken(user) {
	        return jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresIn: '7d' // expires in 24 hours
	        });
}


function authenticate(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	}



// // route middleware to verify a token
// 	apiRouter.use(function(req, res, next) {
// 		// do logging
// 		console.log('Somebody just came to our app!');

// 	  // check header or url parameters or post parameters for token
// 	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

// 	  // decode token
// 	  if (token) {

// 	    // verifies secret and checks exp
// 	    jwt.verify(token, superSecret, function(err, decoded) {      

// 	      if (err) {
// 	        res.status(403).send({ 
// 	        	success: false, 
// 	        	message: 'Failed to authenticate token.' 
// 	    	});  	   
// 	      } else { 
// 	        // if everything is good, save to request for use in other routes
// 	        req.decoded = decoded;
	            
// 	        next(); // make sure we go to the next routes and don't stop here
// 	      }
// 	    });

// 	  } else {

// 	    // if there is no token
// 	    // return an HTTP response of 403 (access forbidden) and an error message
//    	 	res.status(403).send({ 
//    	 		success: false, 
//    	 		message: 'No token provided.' 
//    	 	});
	    
// 	  }
// 	});

















// on routes that end in /users
// ----------------------------------------------------
apiRouter.route('/users')

    // create a bear (accessed at POST http://localhost:5100/api/users)
    .post(function(req, res) {
        
		var user      = new User();      // create a new instance of the User model
		user.name     = req.body.name;  // set the user name (comes from the request)
		user.password = req.body.password;

        // save the user and check for errors
        user.save(function(err) {
            if (err){
            	if (err.code == 11000) 
						return res.status(403).json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
            }
            //return a message
            var token = generateToken(user)
            res.status(200).json({ message: 'User created!',
            						user : user,
            						token : token,
            						id: req.params.user_id});
        });
        
    })
 // get all the useer (accessed at GET http://localhost:5100/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

apiRouter.route('/users/:user_id')
	.get(authenticate, function(req,res) {
		User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            	res.json(user);
        });
	})
	.put(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if (err)
				res.send(err);
		
			user.name = req.body.name;  // update the bears info
		// save the bear
			user.save(function(err){
			if (err)
				res.send(err);
			res.status(200).json({ message: 'User updated!' });
			});
		});
	})
	.post(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if (err)
				res.send(err);
			user.manga_id.push(req.body.mangaId);  // update the mangaList
			user.save(function(err){
			if (err)
				res.send(err);
			res.status(200).json({ message: 'mangaList updated!' });
			});
		});
	})
	.delete(function(req, res){
		User.remove({
			_id: req.params.user_id
		},function(err, user){
			if (err)
				res.send(err);

			res.status(200).json({message: 'Successfully deleted'});
		});
	});








// on routes that end in serie
// ----------------------------------------------------
apiRouter.route('/users/:user_id/series')
	.post(authenticate, function(req,res){
		var serie      = new Serie();

		serie._userId  = req.params.user_id;
		serie.titre    = req.body.titre;
		serie.nbrTotal = req.body.nbrTotal;
		//serie.nbrAqui  = req.body.nbrAqui;
		serie.auteur   = req.body.auteur;

		serie.save(function(err) {
			if (err) {
				if (err.code == 11000)
					return res.json({success: false, message: 'A serie whith same name already exists.'})
				else
					return res.send("t'es un putain de boulet mec!!",err);
			}
			res.json({message: 'Manga added in your favorite'});
		});
	})
// get all serie (accessed at GET http://localhost:5100/api/users/id/series)
    .get(function(req, res) {
        Serie.find({_userId: req.params.user_id},function(err, series) {
            if (err)
                res.send(err);

            res.json(series);
        });
    });


return apiRouter;
};




