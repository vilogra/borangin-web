import React, { useState } from "react";
import {
  Collapse,
  Navbar as Navigation,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
} from "reactstrap";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navigation color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">Borangin</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  About Us
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Admin</NavbarText>
          </Collapse>
        </Container>
      </Navigation>
    </div>
  );
};

export default Navbar;
