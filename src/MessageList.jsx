import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    // map all messages to 'allMessages' and filter by message type
    const allMessages = this.props.messages.map((item, index) => {
      switch (item.type) {
        // incomingMessage gets sent to 'Message' to get rendered
        case 'incomingMessage':
          return <Message key={index} item={item} />;
        // incomingNotification gets sent to 'Notification' to get rendered
        case 'incomingNotification':
          return <Notification oldUser={item.oldUser} key={index} item={item} />;
      }
    });

    return (
      <main className="messages">
        {allMessages}
      </main>
    );
  }

}

export default MessageList;