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
    this.SocketServer.onopen = this.handleOnOpen; // not sure why I need this at the moment

    this.SocketServer.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);
      let allTheMessages = [...this.state.messages,  serverMessage ];

      this.setState({ messages: allTheMessages });

    }
    

  }

  addNewMessage = event => {
    if(event.key === 'Enter') {
      let newMessage = { type: "incomingMessage", content: event.target.value, name:this.state.currentUser.name };
      this.SocketServer.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

  updateUser = event => {
    let oldUser = this.state.currentUser.name;

    let newUser = event.target.value;
    let num = 1;

    const validator = (userValidate, num) => {
      if (userValidate == '') {
        userValidate = 'Anonymous' + num;
        for (let user of this.state.messages) {
          if (userValidate == user.name) {
            console.log('Inside first loop, second if statement is true');
            num += 1;
            userValidate = 'Anonymous' + num;
            console.log('num at this point is: ', num);
            validator(userValidate, num);

          }
        }
      } else if(/Anonymous/.test(userValidate)) {
        console.log('Inside else if before the for loop');
        
        for (let user of this.state.messages) {
          if (userValidate == user.name) {
            let numRes = parseInt(user.name.substr(9));
            num = numRes + 1;
            userValidate = 'Anonymous' + num;
            console.log(`Inside 'else if': ${userValidate}, ${num}`);
            this.setState({ currentUser: {name: userValidate}});    
            return userValidate;
          }
        }

      }

      return userValidate;
    }
    let validUser = validator(newUser, num);

    let newMessage = { type: "incomingNotification", content: validUser, oldUser: oldUser };
    this.SocketServer.send(JSON.stringify(newMessage));

    event.target.value = validUser;
    this.setState({ currentUser: {name: validUser}});
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
