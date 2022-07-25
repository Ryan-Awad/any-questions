import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logout from '../helpers/logout';
import isSignedIn from '../helpers/isSignedIn';
import getUserInfo from '../helpers/getUserInfo';

class NavBar extends Component {
  state = {
    signedIn: false,
    username: null
  }

  componentDidMount() {
    isSignedIn(signedIn => this.setState({signedIn: signedIn}));
    getUserInfo(user => this.setState({username: user.displayName}));
  }

  render() { 
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/" style={{paddingLeft: 12}}>
          <img
            alt=""
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Any Questions?
        </Navbar.Brand>

        <Nav className="me-auto">
            <Nav.Link href="/ask-question">Ask Question</Nav.Link>
            {this.state.signedIn ? <Nav.Link onClick={logout}>Logout</Nav.Link> : null}
            {this.state.username ? <Nav.Link>Signed in as {this.state.username}</Nav.Link> : null}
        </Nav>
      </Navbar>
    );
  }
}
 
export default NavBar;