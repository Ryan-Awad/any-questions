import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class NavBar extends Component {
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
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
 
export default NavBar;