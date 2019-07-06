import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';


//******************************** App CLASS WITH METHODS **********************************/
//******************************************************************************************/
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Jimmy', online: false},
      messages: [], // messages from the server will be stored here as they arrive
      online: 0
    };
    // Creating the connection to the Socket Server
    this.SocketServer = new WebSocket('ws://localhost:3001');
  }

  // send message history to user when window object is loaded
  componentDidMount() {
    this.SocketServer.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);

      if (typeof serverMessage.count == 'number') {
        this.setState({ online: serverMessage.count });
      }

      let allTheMessages = [...this.state.messages,  serverMessage ];
      this.setState({ messages: allTheMessages });
    };
  }

  // method to create message object and send to server to broadcast
  // new message to all current users
  addNewMessage = event => {
    if(event.key === 'Enter') {
      let newMessage = { 
        type: 'incomingMessage',
        content: event.target.value,
        name:this.state.currentUser.name
      };
      this.SocketServer.send(JSON.stringify(newMessage));
      event.target.value = ''; // reset form field to empty after submitting message
    }
  }

  // method to update user name and assign 'Anonymous#' if left empty
  // then send to sever to broadcast new notification to all current users
  updateUser = event => {
    let oldUser = this.state.currentUser.name;
    let newUser = event.target.value;
    let num = 1;

    // validates name change and assigns 'Anonymous#' if left empty
    const validator = (userValidate, num) => {
      if (userValidate == '') {
        userValidate = 'Anonymous' + num;
        for (let user of this.state.messages) {
          if (userValidate == user.name) {
            num += 1;
            userValidate = 'Anonymous' + num;
            validator(userValidate, num);

          }
        }
        // if user leaves the 'name' box empty, increments 
        // the 'Anonymous' suffix to the next available number
      } else if(/Anonymous/.test(userValidate)) {
        for (let user of this.state.messages) {
          if (userValidate == user.name) {
            let numRes = parseInt(user.name.substr(9));
            num = numRes + 1;
            userValidate = 'Anonymous' + num;   
            return userValidate;
          }
        }
      }
      return userValidate;
    };
    
    // validate incoming user name change
    let validUser = validator(newUser, num);

    // create new notification object to send to server
    let newMessage = { 
      type: 'incomingNotification',
      content: validUser,
      oldUser: oldUser
    };
    this.SocketServer.send(JSON.stringify(newMessage));

    // set user input field to new user 
    event.target.value = validUser;

    // set curerntUser state to the new user name
    this.setState({ currentUser: {name: validUser, online: true}});
  }

  //**************************************** RENDER ******************************************/
  //******************************************************************************************/

  // Append all components of the page to 'container' class 
  render() {
    return (
      <div className="container">

        <Header online={this.state.online}/>

        <MessageList messages={this.state.messages}/>

        <ChatBar user={this.state.currentUser.name} addNewMessage={this.addNewMessage} updateUser={this.updateUser} />

      </div>
    );
  }
}

export default App;
