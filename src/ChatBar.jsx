import React, {Component} from 'react';
// import PropTypes from 'prop-types';


class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onBlur={this.props.updateUser} defaultValue={this.props.user} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onKeyPress={this.props.addNewMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

}

// Doing type checking on the props
// ChatBar.propTypes = {
//   updateUser: PropTypes.func,
//   addNewMessage: PropTypes.func,
//   user: PropTypes.string
// };

export default ChatBar;