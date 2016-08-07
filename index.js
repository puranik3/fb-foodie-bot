var http = require( 'http' );

var server = http.createServer( function( req, res ) {
	res.write( 'hello, world' );
	res.end();
});

var port = process.env.port || 3000;
console.log( 'Starting server on port ' + port );

server.listen( port, function( err ) {
	if( err ) {
		console.log( 'Problem starting server' );
		return 1;
	}
	
	console.log( 'Started server and listening on port ' + port );
	return 0;
});
