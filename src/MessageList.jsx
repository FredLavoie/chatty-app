import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  const allMessages = this.props.messages.map((item, index) => {
    switch (item.type) {
      case 'incomingMessage':
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

// Doing type checking on the props
// MessageList.propTypes = {
//   messages: PropTypes.array,
// };

export default MessageList;