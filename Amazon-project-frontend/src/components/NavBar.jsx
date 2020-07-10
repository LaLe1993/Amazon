import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom'

const NavBar = () => (
  <Navbar variant="light" expand="lg">
    <Navbar.Brand href="/">
      <Image
        src="https://www.kloepfel-consulting.com/wp-content/uploads/2017/02/Amazon-logo-1.png"
        style={{ width: "100px", height: "55px" }}
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className='nav-link' to='/'>Products</Link>
        <Link className='nav-link' to='/addNew'>Add new</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default withRouter(NavBar);