var express     = require( 'express' );
var bodyParser  = require( 'body-parser' );
var request     = require( 'request' );
var fetch       = require( 'node-fetch' );
var fbAuth      = require( './fb/fb-auth' );
var fbMessaging = require( './fb/fb-messaging' );

// Setup Messenger API parameters from environment
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

// Sanity checks for availability of Messenger API parameters
(function doSanityChecks() {
    if (!FB_PAGE_ID) { throw new Error('missing FB_PAGE_ID') }
    if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }
    if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }
})();

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

app.use(bodyParser.json({ verify: fbAuth.verifyRequestSignature }));

// Server frontpage
app.get('/', function (req, res) {
  res.send( 'This is TestBot Server' );
});

// Facebook webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'foodie_app_by_krishna_and_friends') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');    
    }
});

// Message handler
app.post('/webhook', (req, res) => {
    // Parse the Messenger payload
    // See the Webhook reference
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference
    const data = req.body;

    if (data.object === 'page') {
        fbMessaging.sendMessage( data.entry.messaging.sender.id, 'hello' );
        /*
        data.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if (event.message) {
                    // Yay! We got a new message!
                    // We retrieve the Facebook user ID of the sender
                    const sender = event.sender.id;

                    // We retrieve the user's current session, or create one if it doesn't exist
                    // This is needed for our bot to figure out the conversation history
                    const sessionId = findOrCreateSession(sender);
                    sessions[sessionId].context.coords = {
                        lat: 12.8409194,
                        lon: 77.6707922
                        //    lat: event.message.attachments[0].payload.coordinates.lat,
                        //   lon: event.message.attachments[0].payload.coordinates.long
                    };
                    // We retrieve the message content
                    const {text, attachments} = event.message;

                    if (attachments) {
                        // We received an attachment
                        // Let's reply with an automatic message
                        fbmsg.sendMessagePromise(sender, 'Sorry I can only process text messages for now.')
                        .catch(console.error);
                    } else if (text) {
                        // We received a text message

                        // Let's forward the message to the Wit.ai Bot Engine
                        // This will run all actions until our bot has nothing left to do
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
                    }
                } else {
                    console.log('received event', JSON.stringify(event));
                }
            });
        });
        */
    }
    res.sendStatus(200);
});