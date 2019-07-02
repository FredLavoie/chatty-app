import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  
  constructor(props) {
    super(props);

  }

  render() {
  const allMessages = this.props.messages.map(item => (
    <Message item={item} />
  ));
    return (
      <main className="messages">
        {allMessages}
      </main>
    )
  }
}

export default MessageList;