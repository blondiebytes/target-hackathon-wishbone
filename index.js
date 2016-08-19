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
            continue
        }
        if (event.postback) {
        	let text = JSON.stringify(event.postback)
        	decideMessage(sender, text);
        	continue
      }
    }
    res.sendStatus(200)
})

const token = "EAADPuY7AusgBAL5wNKMrokW32BgDCVESDwtXp0u4ytJ0gmxHB9LISBwGW2y6XFEi3oBgNFb0BqMbV89d80DUqfZBV4Ln4ttZBsKOg1alqDqaNA1Wlx4ZAFQOZBAj7iquLpmTcEEcDs6FriESRU0WTQ99TAECWB4UNWArcqGIhAZDZD"

function decideMessage(sender, text1) {
	let text = text1.toLowerCase();
	if (text.includes("baby shower") && text.includes("throwing")) {
		sendTextMessage(sender, "Congrats! Do you need anything for your baby shower?");
		sendGenericMessage1(sender)
	} else if (text.includes("add to shopping cart")) {
		sendTextMessage(sender, "Added to shopping cart!")
	} else if (text.includes("no")) {
		sendButtonMessage(sender, "I see it's summertime. Here are some things you might need.")
	} else if (text.includes("sunscreen")) {
		sendTextMessage(sender, "Here are some great deals on sunscreen!");
		//sendGenericMessage2(sender);
	} else if (text.includes("gift")) {
		sendButtonMessage2(sender, "What is the occasion?");
	} else if (text.includes("baby shower")) {
		sendButtonMessage3(sender, "What's your price range?")
	} else if (text.includes("$15 - $50")) {
		sendButtonMessage4(sender, "Here are some customer favorites!")
	} else if (text.includes("clothes")) {
		sendTextMessage(sender, "Boy or girl?")
	} else if (text.includes("boy")) {
		sendButtonMessage5(sender, "Here are some essentials!")
	} else if (text.includes("toys")) {
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
            "title":"Sunscreen",
            "payload":"sunscreen"
          },
          {
            "type":"postback",
            "title":"Flip Flops",
            "payload":"flip flops"
          },
          {
            "type":"postback",
            "title":"Sunglasses",
            "payload":"sunglasses"
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

function sendButtonMessage2(sender, text) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"Baby Shower",
            "payload":"baby shower"
          },
          {
            "type":"postback",
            "title":"Birthday",
            "payload":"birthday"
          },
          {
            "type":"postback",
            "title":"Graduation",
            "payload":"graduation"
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

function sendButtonMessage3(sender, text) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"$0 - $15",
            "payload":"$0 - $15"
          },
          {
            "type":"postback",
            "title":"$15 - $50",
            "payload":"$15 - $50"
          },
          {
            "type":"postback",
            "title":"$50 - $100",
            "payload":"$50 - $100"
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

function sendButtonMessage4(sender, text) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"Clothes",
            "payload":"clothes"
          },
          {
            "type":"postback",
            "title":"Stroller",
            "payload":"stroller"
          },
          {
            "type":"postback",
            "title":"Toys",
            "payload":"toys"
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

function sendButtonMessage5(sender, text) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"Shoes",
            "payload":"shoes"
          },
          {
            "type":"postback",
            "title":"Clothes",
            "payload":"clothes"
          },
          {
            "type":"postback",
            "title":"Toys",
            "payload":"toys"
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

function sendGenericMessage1(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Invitations",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://scene7.targetimg1.com/is/image/Target/15406466?wid=1024&hei=1024&qlt=70&fmt=pjpeg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.target.com/p/pink-baby-dots-invitations-with-photo-overlay-25-count/-/A-15406466",
                        "title": "See Item"
                    }, {
                        "type": "postback",
                        "title": "Add to Cart",
                        "payload": "add to shopping cart",
                    }],
                }, {
                    "title": "Favor Bags",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.target.com/p/pink-baby-dots-invitations-with-photo-overlay-25-count/-/A-15406466",
                        "title": "Favor bag",
                    }],
                }]
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



// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
















