var express = require('express');
var router = express.Router();
var db = require('../models')
require('dotenv').config()

var yelp = require('yelp-fusion');
 
var client = yelp.client(process.env.YELP_API_KEY);

router.get('/', (req,res) => {
    res.render('home')
})

router.get('/favorites', (req,res) => {
    db.Favorite.findAll({}).then( (favdata) => {
        console.log(favdata)
            res.render('favorite', {favdata: favdata});
    })
})

router.post('/search', (req,res) => {
    var searchlocation = req.body.location
    client.search({
        location: searchlocation
      }).then(response => {
          var resultArr = []
          for(var i=0; i<response.jsonBody.businesses.length; i++){
            var result = {
                name: response.jsonBody.businesses[i].name,
                image_url: response.jsonBody.businesses[i].image_url,
                page_url: response.jsonBody.businesses[i].url
              } 
              resultArr.push(result);
          }
          res.render('search', {result : resultArr})
      }).catch(e => {
        console.log(e);
      });
})

module.exports = router;