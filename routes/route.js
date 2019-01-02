var express = require('express');
var router = express.Router();
var db = require('../models')
require('dotenv').config()

var yelp = require('yelp-fusion');

var client = yelp.client(process.env.YELP_API_KEY);

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/favorites', (req, res) => {
    db.Favorite.findAll({}).then((favdata) => {
        res.render('favorite', { favdata: favdata });
    })
})

router.post('/search', (req, res) => {
    var searchlocation = req.body.location
    client.search({
        location: searchlocation
    }).then(response => {
        var resultArr = []
        for (var i = 0; i < response.jsonBody.businesses.length; i++) {
            var result = {
                name: response.jsonBody.businesses[i].name,
                image_url: response.jsonBody.businesses[i].image_url,
                page_url: response.jsonBody.businesses[i].url
            }
            resultArr.push(result);
        }
        res.render('search', { result: resultArr })
    }).catch(e => {
        console.log(e);
    });
})

router.post('/api/favorite', (req, res) => {
    db.Favorite.create({
        name: req.body.name,
        image_url: req.body.image,
        page_url: req.body.url
    }).then ((respond) => {
        db.Favorite.findAll({}).then((favdata) => {
            res.render('favorite', { favdata: favdata });
        })
    })
})

module.exports = router;