import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Container } from './styles';

const Header = () => {
  const [open, setOpen] = useState(false);

  // Função do collapse
  const toggle = () => {
    setOpen(!open);
  }

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to="/">Minhas Séries</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/series">Séries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/generos">Genêros</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default Header;