var http = require( 'http' );

var server = http.createServer( function( req, res ) {
	res.write( 'hello, world' );
	res.end();
});

server.listen( 3000, function( err ) {
	if( err ) {
		console.log( 'Problem starting server' );
		return
	}
	
	console.log( 'Started server and listening on port 3000' );
});
