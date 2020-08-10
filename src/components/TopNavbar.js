import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopNavbar(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt');
    console.log(token)
    if (token !== null && token !== undefined) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, []);

  function logout() {
    Cookies.remove('jwt');
    if (props.history.location.pathname === '/') {
      props.history.push('/login');
    } else {
      props.history.push('/');
    }
  }

  return (
    <Navbar className='topnav' expand='xl'>
      <Navbar.Brand href='/'>
        <img
          src='/logo.png'
          width='auto'
          height='50'
          className='d-inline-block align-top'
          alt='Check It Out logo'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
        </Nav>
        <Nav className='topnav__container'>


          { loggedIn ?
          <>
            <LinkContainer to='/places'>
              <Nav.Link href='/'>Places</Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={<div style={{display: 'inline-block'}}><FontAwesomeIcon className='' icon='user-circle' /> </div>}
              className='topnav__dropdown dropdown'
              id='basic-nav-dropdown dropdown-button-drop-down'
              drop='down'
              alignRight>
              <NavDropdown.Item href='/profile' >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as='button' onClick={logout} className='topnav__dropdown-element'>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </>
            :
            <>
              <LinkContainer to='/about-s'>
                <Nav.Link href='/'>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact'>
                <Nav.Link href='/'>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link as='button' className="topnav__btn topnav__btn--login">Log in</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signup'>
                <Nav.Link as='button' className="topnav__btn topnav__btn--signup">Sign up</Nav.Link>
              </LinkContainer>
            </>
           }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}