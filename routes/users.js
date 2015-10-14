var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
var passport = require('passport');
var config = require('../config');
var User = require('../models/user').User;



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



/**
 * GET call to render the details page for user to input personal details
 * Also updates old entry if there is an old record inputted by user
 */
router.get('/details', function (req, res, next) {

  res.render('users/details');
});


/**
 * POST call in registeration page for generating new user for system
 */

router.get('/register', function (req, res, next) {
  res.render('Login/register');
});

router.post('/register', function (req, res, next) {
   console.log(req);
  userService.addUser(req.body, function(err){
    if(err){
      var vm = {
        title: 'Sign up for CommunityCloud',
        input: req.body,
        error: err
      };
      console.log(err);
      delete vm.input.password;
      delete vm.input.confirmPassword;
      console.log(vm);
      return res.render('Login/register', vm);
    }
    req.login(req.body, function(err){
      res.redirect('/cloud');
    });
  });
});

router.get("/userList", function(req, res, next) {
  User.find(function(err, users) {
    res.send(users);
  });
});
/**
 * POST call used for authetication of the user
 */
router.post('/login',
    function(req, res, next){
      console.log(req.body);
      if(req.body.rememberMe){
        req.session.cookie.maxAge = config.cookieMaxAge;
      }
      sess = req.session;
      next();
    },

    passport.authenticate('local', {
      failureRedirect: '/',
      successRedirect: '/cloud',
      failureFlash: 'Invalid credentials'
    }));

/**
 * GET call used for loggout and removing session data
 */
router.get('/logout', function(req, res, next){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
