import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';
import messages from './messages.json';

class App extends Component {
  constructor() {
    super();
    this.state = { messages };
  }

  render() {
    return (
      <div className="container">

        <Header />

        <MessageList messages={this.state.messages}/>

        <ChatBar />

      </div>
    );
  }
}
export default App;
