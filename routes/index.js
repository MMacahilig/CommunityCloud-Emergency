var express = require('express');
var router = express.Router();
var Alert = require('../models/alert').Alert;
var User = require('../models/user').User;


/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.user){
    return res.redirect('/cloud');
  }
  var vm = {
    title: 'Login to CommunityCloud',
    error: req.flash('error')
  }
  res.render('index', vm);
});

/*
router.get('/cloud', function(req, res, next) {
  res.render('cloud', { title: 'CommunityCloud' });
  //res.render('index');
});
*/
router.get('/login',function (req,res,next) {
  res.render("Login/login");
});

router.post('/alert', function (req,res,next){
  var newAlert = Alert({
    alertType: req.body.alertType,
    details: req.body.alertDetails,
    location: req.body.alertLocation,
    rating: req.body.alertRating,
    createdBy: req.user._id,
    created: Date.now
  });

  newAlert.save();
  res.redirect('/');
});



module.exports = router;
