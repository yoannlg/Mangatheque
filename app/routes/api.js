var bodyParser = require('body-parser');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret || 'admin';

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


// on routes that end in /users
// ----------------------------------------------------
apiRouter.route('/users')

    // create a bear (accessed at POST http://localhost:5100/api/users)
    .post(function(req, res) {
        
		var user      = new User();      // create a new instance of the User model
		user.name     = req.body.name;  // set the user name (comes from the request)
		user.password = req.body.password;
        // save the bear and check for errors
        user.save(function(err) {
            if (err){
            	if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
            }
            //return a message
            res.json({ message: 'User created!' });
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
	.get(function(req,res) {
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
			res.json({ message: 'User updated!' });
			});
		});
	})
	.delete(function(req, res){
		User.remove({
			_id: req.params.user_id
		},function(err, user){
			if (err)
				res.send(err);

			res.json({message: 'Successfully deleted'});
		});
	});

return apiRouter;
};




