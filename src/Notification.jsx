import React, {Component} from 'react';

class Notification extends Component {
  
  constructor (props) {
    super(props);
  }
  
  render() {
    return (
      <div className="message-system">
        <span>{`${this.props.oldUser} changed their username to ${this.props.item.content}`}</span>
      </div>
    );
  }

}

export default Notification;