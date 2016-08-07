var express     = require( 'express' );
var bodyParser  = require( 'body-parser' );
var request     = require( 'request' );
var fetch       = require( 'node-fetch' );
var fbAuth      = require( './fb/fb-auth' );
var fbMessaging = require( './fb/fb-messaging' );

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

//app.use(bodyParser.json({ verify: fbAuth.verifyRequestSignature }));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Server frontpage
app.get('/', function (req, res) {
  res.send( 'This is TestBot Server' );
});

// For webhook verification by FB
app.get('/webhook', function (req, res) {
    //if (req.query['hub.mode'] === 'subscribe') {
        if (req.query['hub.verify_token'] === 'foodie_app_by_krishna_and_friends') {
          res.send(req.query['hub.challenge']);
        } else {
          res.send('Error, wrong validation token');    
        }
    //}
});

// Message handler
app.post('/webhook', (req, res) => {
    // Parse the Messenger payload
    // See the Webhook reference
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference
    const data = req.body;
    
    if (data.object === 'page') {
        data.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if (event.message) {
                    let sender = event.sender.id;
                    fbMessaging.sendMessage(sender, 'hi');
                }
            });
        });
    } else {
        res.sendStatus(200);
    }
});