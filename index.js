'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            decideMessage(sender, text);
        }
    }
    res.sendStatus(200)
})

const token = "EAADPuY7AusgBAL5wNKMrokW32BgDCVESDwtXp0u4ytJ0gmxHB9LISBwGW2y6XFEi3oBgNFb0BqMbV89d80DUqfZBV4Ln4ttZBsKOg1alqDqaNA1Wlx4ZAFQOZBAj7iquLpmTcEEcDs6FriESRU0WTQ99TAECWB4UNWArcqGIhAZDZD"

function decideMessage(sender, text1) {
	let text = text1.toLowerCase();
	if (text.includes("baby shower") && text.includes("throwing")) {
		sendTextMessage(sender, "Are you looking for decorations?");
		sendGenericMessage(sender)
	} else if (text.includes("add to shopping cart")) {
		sendTextMessage(sender, "Added to shopping cart!")
	} else if (text.includes("no")) {
		sendButtonMessage(sender, "I see it's summertime. Here are some things you might need for your baby shower.")
	} else {
		sendTextMessage(sender, "Can you ask again?");
	}
}

function sendButtonMessage(sender, text) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          },
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    } 
}
     request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}



// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
















