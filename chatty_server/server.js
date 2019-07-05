// server.js
const uuidv4 = require('uuid/v4');
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = message => { 
  wss.clients.forEach(client => {
    client.send(message);
    
    // if (client.readyState === SocketServer.OPEN) {
    //   console.log('This is the message inside broacast', message); 
    // }
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let count = 0;
wss.on('connection', ws => {
  console.log('Client connected');
  count += 1;
  wss.broadcast(JSON.stringify({count: count})); // try this to send the count to the client
  
  ws.on('message', data => {
    let message = JSON.parse(data);
    message.id = uuidv4();   
    wss.broadcast(JSON.stringify(message));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    count -= 1;
    wss.broadcast(JSON.stringify(count));
    
  });
});
