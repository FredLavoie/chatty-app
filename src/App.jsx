import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';
import {currentUser, messages} from './messages.json';
import {generateRandomId} from '../utilities.js'

class App extends Component {
  constructor() {
    super();
    this.state = { currentUser: currentUser, messages: messages };
    // this.state = { currentUser: {}, messages: [] };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ currentUser: currentUser, messages: messages })
    }, 1000);
  }

  addNewMessage = event => {
    if(event.key === 'Enter') {
      let newContent = event.target.value;
      let id = generateRandomId();
      const newMessage = { type: "incomingMessage", content: newContent, username:this.state.currentUser.username , id: id };
      const oldMessages = this.state.messages;
      const allMessages = [...oldMessages, newMessage];
      this.setState({ messages: allMessages });
    }
  }

  updateUser = event => {
    let newUser = event.target.value;   
    this.setState({ currentUser: {username: newUser}});
  }

  render() {
    return (
      <div className="container">

        <Header />

        <MessageList messages={this.state.messages}/>

        <ChatBar user={this.state.currentUser.username} addNewMessage={this.addNewMessage} updateUser={this.updateUser} />

      </div>
    );
  }
}
export default App;
