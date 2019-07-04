import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  const allMessages = this.props.messages.map((item, index) => {
    console.log(item.type);
    switch (item.type) {
      case 'incomingMessage':
        console.log('This worked');
        return <Message key={index} item={item} />;
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