var request = require( 'request' );
var fetch   = require( 'node-fetch' );

const { FB_PAGE_ACCESS_TOKEN, FB_PAGE_TOKEN, PAGE_ACCESS_TOKEN } = require( './fb-params' );

module.exports = (function() {
    function sendMessage(recipientId, text) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FB_PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: recipientId },
                message: {
                    text : text
                }
            }
        }, function (error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    };

    function sendQuickRepliesText(recepientId, question, titles) {
        var message = {
            "text": question,
            "quick_replies": []
        };
        var quick_replies_accumulated = [];
        for (var i = 0; i < titles.length; i++) {
            var newQR = {
                "content_type": "text",
                "title": titles[i],
                "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_" + titles[i].toUpperCase()
            }
            quick_replies_accumulated.push(newQR);
        }
        if (quick_replies_accumulated.length) {
            message.quick_replies = quick_replies_accumulated;
            sendMessage(recepientId, message);
        }
    }

    // ----------------------------------------------------------------------------
    // Messenger API specific code

    // See the Send API reference
    // https://developers.facebook.com/docs/messenger-platform/send-api-reference
    const sendMessagePromise = (id, text) => {
        const body = JSON.stringify({
            recipient: { id },
            message: { text },
        });
        const qs = 'access_token=' + encodeURIComponent(FB_PAGE_ACCESS_TOKEN);
        return fetch('https://graph.facebook.com/me/messages?' + qs, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        })
            .then(rsp => rsp.json())
            .then(json => {
                if (json.error && json.error.message) {
                    throw new Error(json.error.message);
                }
                return json;
            });
    };
    
    const sendQuickRepliesTextPromise = (id, question, titles) => {
       var message = {
           "text": question,
           "quick_replies": []
       };

       var quick_replies_accumulated = [];
       for (var i = 0; i < titles.length; i++) {
           var newQR = {
               "content_type": "text",
               "title": titles[i],
               "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_" + titles[i].toUpperCase()
           }
           quick_replies_accumulated.push(newQR);
       }
       if (quick_replies_accumulated.length) {
           message.quick_replies = quick_replies_accumulated;
       }

       const body = JSON.stringify({
           recipient: { id },
           message: message
       });

       const qs = 'access_token=' + encodeURIComponent(FB_PAGE_ACCESS_TOKEN);
       return fetch('https://graph.facebook.com/me/messages?' + qs, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body,
       })
           .then(rsp => rsp.json())
           .then(json => {
               if (json.error && json.error.message) {
                   throw new Error(json.error.message);
               }
               return json;
           });
    };

    return {
        sendMessage: sendMessage,
        sendQuickRepliesText: sendQuickRepliesText,
        sendMessagePromise: sendMessagePromise,
        sendQuickRepliesTextPromise: sendQuickRepliesTextPromise
    };
}());