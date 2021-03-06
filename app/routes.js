var passport = require('passport');


module.exports = function (app) {

    require('../config/passport.js')(passport);
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
   

    app.get('/selecttopic', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('selecttopic.ejs');
        }
        else {
            res.render('iamaptifundaadmin.ejs', { message:"" });

        }
    }
                                  // load the index.ejs file
);

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/iamaptifundaadmin', function(req, res) {

		// render the page and pass in any flash data if it exists
        res.render('iamaptifundaadmin.ejs', { message: req.flash('loginMessage') });
	});
    app.get('/youwillneverguesswhoiam', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('youwillneverguesswhoiam.ejs', { message: req.flash('loginMessage') });
    });
	// process the login form
	app.post('/adminlogin', passport.authenticate('local-login', {
        successRedirect: '/selecttopic', // redirect to the secure profile section
        failureRedirect: '/iamaptifundaadmin', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    app.post('/superadminlogin', passport.authenticate('local-login', {
        successRedirect: '/signup', // redirect to the secure profile section
        failureRedirect: '/youwillneverguesswhoiam', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }),
        function (req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

    app.get('/signup', isLoggedIn, function (req, res) {
        res.render('signup.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
        req.logout(); 
        res.render('index', { title: 'Welcome to APTIFUNDA.com', year: new Date().getFullYear() });
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
