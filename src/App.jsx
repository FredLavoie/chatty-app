import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Jimmy'},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.SocketServer = new WebSocket('ws://localhost:3001'); // Creating the connection to the Socket Server
  }



  handleOnOpen = event => {
    console.log('Connection to server established.');
      
    // changing from offline to online
    // this.updateStatus(true);
};

  componentDidMount() {
    this.SocketServer.onopen = this.handleOnOpen;

    this.SocketServer.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);
      let allTheMessages = [...this.state.messages,  serverMessage ];

      this.setState({ messages: allTheMessages });

    }
    

  }

  addNewMessage = event => {
    if(event.key === 'Enter') {
      const newMessage = { type: "incomingMessage", content: event.target.value, name:this.state.currentUser.name };
      this.SocketServer.send(JSON.stringify(newMessage));
    }
  }

  updateUser = event => {
    let newUser = event.target.value;   
    this.setState({ currentUser: {name: newUser}});
  }

  render() {
    return (
      <div className="container">

        <Header />

        <MessageList messages={this.state.messages}/>

        <ChatBar user={this.state.currentUser.name} addNewMessage={this.addNewMessage} updateUser={this.updateUser} />

      </div>
    );
  }
}
export default App;
