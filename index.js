var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const crypto = require('crypto');
const fetch = require('node-fetch');
var Wit = require('node-wit').Wit;
var log = require('node-wit').log;

// Sanity checks for availability of Messenger API parameters
const FB_PAGE_ID = process.env.FB_PAGE_ID;
if (!FB_PAGE_ID) { throw new Error('missing FB_PAGE_ID') }

const FB_PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }

const FB_APP_SECRET = process.env.FB_APP_SECRET;
if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }

// Once sanity checks are complete, we start the server
var app = express();
app.set( 'port', process.env.PORT || 3000 );

console.log( 'Starting server on port ' + app.get( 'port' ) );
app.listen( app.get( 'port' ), function( err ) {
	if( err ) {
		console.log( 'Problem starting server' );
		return 1;
	}
	
	console.log( 'Started server and listening on port ' + app.get( 'port' ) );
	return 0;
});

// Server frontpage
app.get('/', function (req, res) {
  res.send('This is TestBot Server');
});

// Facebook webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'foodie_app_by_krishna_and_friends') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');    
    }
});
