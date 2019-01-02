var express = require('express');
var port =  process.env.PORT || 8080;
var app = express();
var db = require('./models')

app.use(express.static('public'));

// allow request body in JSON and URLENCODED format
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// setting up the handlebars
var exhbr = require('express-handlebars');
app.engine('handlebars', exhbr( { defaultLayout : 'main' }));
app.set("view engine", 'handlebars');

// set up the routes
var router = require('./routes/route');
app.use(router)

// db is in sync and app is listening to our port
db.sequelize.sync({force: true}).then( ()=>{
    app.listen(port, ()=> {
        console.log(`app is listening on port ${port}`)
    })
})
