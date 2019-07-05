import React, {Component} from 'react';

class Header extends Component {

  render() {


    return (

      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h4>Users online: {this.props.online}</h4>
      </nav>

    );
  }
}

export default Header;