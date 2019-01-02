var express = require('express');
var router = express.Router();
var db = require('../models')

router.get('/', (req,res) => {
    res.render('home')
})

router.get('/favorite', (req,res) => {
    db.Favorite.findAll({}).then( (data) => {
        console.log(data)
        res.json(data);
    })
})

module.exports = router;