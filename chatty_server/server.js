//********************************** REQUIRED PACKAGES *************************************/
//******************************************************************************************/
const uuidv4 = require('uuid/v4');
const express = require('express');
const SocketServer = require('ws').Server;

//*********************************** EXPRESS SERVER ***************************************/
//******************************************************************************************/

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets
  // (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//********************************** WEBSOCKET SERVER **************************************/
//******************************************************************************************/

const wss = new SocketServer({ server });

wss.broadcast = message => { 
  wss.clients.forEach(client => {
    client.send(message);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by the
// ws parameter in the callback.
let count = 0;
wss.on('connection', ws => {

  console.log('Client connected');
  count += 1;
  wss.broadcast(JSON.stringify({count: count})); // add to user count on connection
  
  ws.on('message', data => {
    let message = JSON.parse(data);
    message.id = uuidv4();   
    wss.broadcast(JSON.stringify(message));
  });

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    console.log('Client disconnected');
    count -= 1;
    wss.broadcast(JSON.stringify({count: count}));
  });

});
