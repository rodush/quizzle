'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');

var mongoose = require('mongoose');


// start mongoose
mongoose.connect('mongodb://localhost/bar_orders');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	var foodSchema = new mongoose.Schema({
        title: String,
        image: String,
        measure: String,
        supplier: String
    });

    var drinksSchema = new mongoose.Schema({
        title: String,
        image: String,
        measure: String,
        supplier: String
    });
    
    var supplierSchema = new mongoose.Schema({
        name: String,
        address: String,
        telephone: String,
        email: String
    });
    
    var food = mongoose.model('food', foodSchema);
    var drinks = mongoose.model('drinks', drinksSchema);
    var supplier = mongoose.model('supplier', supplierSchema);
    
    /* set Baucis */
    baucis.rest({
        singular: 'food'
    });
    baucis.rest({
        singular: 'drinks'
    });
    baucis.rest({
        singular: 'supplier'
    });
    
    // Just for test ;-)
    var bkkSupp = new supplier({
        name: "BKK",
        address: "Kyiv",
        telephone: "12145645",
        email: "info@bkk.kyiv.ua"
    });
    bkkSupp.save();

	var app = express();
    
	app.configure(function(){
	    app.set('port', 9000);

	    app.set('view engine', 'handlebars');
	    app.set('views', __dirname + '../app/scripts/views');
	});

    app.use('/api/v1', baucis());

	// simple log
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));


	// route index.html
	app.get('/', function(req, res){
	  res.sendfile( path.join( __dirname, '../app/index.html' ) );
	});
    
    // start server
	http.createServer(app).listen(app.get('port'), function(){
	    console.log('Express App started!');
	});
});


