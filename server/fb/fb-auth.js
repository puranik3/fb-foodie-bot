var crypto = require( 'crypto' );

module.exports = (function() {
    
    let FB_VERIFY_TOKEN = null;
    crypto.randomBytes(8, (err, buff) => {
        if (err) throw err;
        FB_VERIFY_TOKEN = buff.toString('hex');
        console.log( `/webhook will accept the Verify Token "${FB_VERIFY_TOKEN}"` );
    });

    /*
     * Verify that the callback came from Facebook. Using the App Secret from
     * the App Dashboard, we can verify the signature that is sent with each
     * callback in the x-hub-signature field, located in the header.
     *
     * https://developers.facebook.com/docs/graph-api/webhooks#setup
     *
     */
    function verifyRequestSignature(req, res, buf) {
      var signature = req.headers["x-hub-signature"];

      if (!signature) {
        // For testing, let's log an error. In production, you should throw an
        // error.
        console.error("Couldn't validate the signature.");
      } else {
        var elements = signature.split('=');
        var method = elements[0];
        var signatureHash = elements[1];

        var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
          .update(buf)
          .digest('hex');

        if (signatureHash != expectedHash) {
          throw new Error("Couldn't validate the request signature.");
        }
      }
    }
    
    return {
        verifyRequestSignature: verifyRequestSignature
    };
}());