var router = require('express').Router();
var Promise = require('bluebird');

var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');

router.get('/', function (req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function (hotels, restaurants, activities) {
    console.log(hotels)
    res.render('index', {
      hotels: hotels,
      restaurants: restaurants,
      activities: activities
    });
  })
  .catch(next);
});

module.exports = router;