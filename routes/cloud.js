var express = require('express');
var router = express.Router();
var Event = require('../models/event').Event;
var Alert = require('../models/alert').Alert;
var User = require('../models/user').User;
var AlertNotification = require('../models/alert-notification').AlertNotification;

var restrict = require('../auth/restrict');


/* GET home page. */

router.get('/', restrict, function(req, res, next) {
    //console.log(req.user.created);
    var startDate = new Date(req.user.created);
    var dateString = startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getYear();
    //var dateString = startDate.getDate() + "/" + (startDate.getMonth()+1) + "/" + startDate.getYear();
    //console.log(dateString);

    AlertNotification.find({UserId: req.user._id}).lean().exec(function(err,docs){
        var alertString = [];
        var queryString = "[";
        var i = 0;

        if(docs){
            for (var key in docs) {
                //console.log("key:" + docs[key].alertId);
                alertString.push(docs[key].alertId);
            }
        }
        //console.log("alerts: " + alertString);
        for (var i = 0; i < alertString.length; i++) {
            if(i == alertString.length -1){
                queryString += "{_id:" + alertString[i]+"}";
            }else{
                queryString += "{_id:" + alertString[i]+"},";
            }
        }
        queryString += "]";

        Alert.find({ _id:{$in: alertString }}).lean().exec(function(err,alert){
            if(alert){
                Event.find().lean().exec(function(err, event) {
                    var vm = {
                        firstName : req.user.firstName,
                        lastName : req.user.lastName,
                        id: req.user._id,
                        event: event,
                        alert: alert,
                        created: dateString
                    };
                    res.render('cloud',vm);
                });
            }
        });
        //console.log("query String: " + queryString);


    });
});

router.post('/event', function(req, res, next) {
    console.log("trigger");
    console.log(req.body);

    var newEvent = new Event ({
        alertType: req.body.alertType,
        details: req.body.details,
        location: req.body.location,
        rating: req.body.rating,
        createdBy: req.user.firstName + " " + req.user.lastName,
        createdId: req.user._id,
        created: Date.now()
    });

    newEvent.save(function (err) {
        if(err){
            console.log(err);
            return next(err);
        }
        next(null);
    });

    res.sendStatus(200);
});

router.post('/mobileAlert', function(req, res, next) {
    console.log("trigger");
    console.log(req.body);
    var newAlert = new Alert ({
        alertType: req.body.AlertType,
        details: req.body.details,
        location: req.body.location,
        rating: req.body.rating,
        createdBy: req.body._id,
        created: Date.now()
    });

    newAlert.save(function (err) {
        if(err){
            console.log(err);
            return next(err);
        }
        next(null);
    });

    var vm = {
        "success": "true"
    };

    res.send(200);

});


router.post('/receiveAlert', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://communitycloud.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    var newAlert = new Alert({
        alertType: req.body.alertType,
        details: req.body.details,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        createdBy: req.body.createdBy,
        createdId: req.body.createdId,
        created: Date.now()
    });

    newAlert.save(function (err) {
        if(err){
            console.log(err);
            return next(err);
        }
        next(null);
    });
    User.find({},function(err,user){
        if(user){
            user.forEach(function(user){
                var newAlertNotification = new AlertNotification ({
                    UserId: user._id,
                    createdBy: newAlert.createdBy,
                    createdId: newAlert.createdId,
                    alertId: newAlert._id,
                    dismissed: false,
                    created: Date.now()
                });

                newAlertNotification.save(function (err) {
                    if(err){
                        console.log(err);
                        //return next(err);
                    }
                    next(null);
                });
            });

        }

    });
    res.sendStatus(200);
});

router.get('/alertnotifications', function(req,res,next){
    AlertNotification.find(function(err, alert) {
        res.send(alert);
    });
});


router.delete('/deleteAlerts', function(req, res, next) {
    console.log("trigger");
    AlertNotification.remove({},function(){console.log("Deleted Notifications")});
    Alert.remove({},function(){console.log("Deleted Alerts");});
    res.send(200);
});

router.delete('/deleteEvents', function(req,res,next) {
    console.log("trigger");
    Event.remove({},function(){console.log("Deleted Alerts");});
    res.send(200);
});

router.get('/getEvent', function(req,res,next){
    Event.find(function(err, alert) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(alert));
    });
});

router.post('/pialert', function(req,res,next){
    var newAlert = new Alert({
        alertType: req.body.alertType,
        details: req.body.details,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        createdBy: req.body.createdBy,
        createdId: req.body.createdId,
        created: Date.now()
    });

    newAlert.save(function (err) {
        if(err){
            console.log(err);
            return next(err);
        }
        next(null);
    });

    newAlert.save();
    res.send(JSON.stringify(req.body));
});

router.get("/getAlerts", function(req, res, next) {
    Alert.find(function(err, users) {
        res.send(users);
    });
});



module.exports = router;
