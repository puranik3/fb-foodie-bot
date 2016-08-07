var express     = require( 'express' );
var bodyParser  = require( 'body-parser' );
var request     = require( 'request' );
var fetch       = require( 'node-fetch' );
var fbAuth      = require( './fb/fb-auth' );
var fbMessaging = require( './fb/fb-messaging' );
/*
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
        console.log( 'page...' );
        data.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                // We retrieve the Facebook user ID of the sender
                const sender = event.sender.id;
                if (event.message) {
                    console.log( 'step 1...' );
                    // We retrieve the user's current session, or create one if it doesn't exist
                    // This is needed for our bot to figure out the conversation history
                    /*
                    const sessionId = findOrCreateSession(sender);
                    sessions[sessionId].context.coords = {
                        lat: 12.8409194,
                        lon: 77.6707922
                        //    lat: event.message.attachments[0].payload.coordinates.lat,
                        //   lon: event.message.attachments[0].payload.coordinates.long
                    };
                    */
                    // We retrieve the message content
/*                    const {text, attachments} = event.message;

                    if (attachments) {
                        // We received an attachment
                        // Let's reply with an automatic message
                        fbMessaging.sendMessagePromise(sender, 'Sorry I can only process text messages for now.')
                        .catch(console.error);
                    } else if (text) {
                        // We received a text message
                        fbMessaging.sendMessagePromise(sender, 'Hello there!')
                        .catch(console.error);
                        
                        // Let's forward the message to the Wit.ai Bot Engine
                        // This will run all actions until our bot has nothing left to do
                        /*
                        wit.runActions(
                            sessionId, // the user's current session
                            text, // the user's message
                            sessions[sessionId].context // the user's current session state
                        ).then((context) => {
                            // Our bot did everything it has to do.
                            // Now it's waiting for further messages to proceed.
                            console.log('Waiting for next user messages');

                            // Based on the session state, you might want to reset the session.
                            // This depends heavily on the business logic of your bot.
                            // Example:
                            // if (context['done']) {
                            //   delete sessions[sessionId];
                            // }

                            // Updating the user's current session state
                            sessions[sessionId].context = context;
                        })
                        .catch((err) => {
                            console.error('Oops! Got an error from Wit: ', err.stack || err);
                        })
                        */
                    /*}
                } else if( event.postback ) {
                    // check if persistent menu item is selected
                    if( event.postback.payload ) {
                        fbMessaging.sendMessagePromise(sender, event.postback.payload)
                                   .catch(console.error);
                    }
                } else {
                    fbMessaging.sendMessagePromise(sender, 'Sorry, I didn\'t get that! Can you rephrase your message?' )
                               .catch(console.error);
                    console.log('received event', JSON.stringify(event));
                }
            });
        });
    }
    res.sendStatus(200);
});*/