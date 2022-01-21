import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
const NavBar = () => {
    return (
        <div>
            <Navbar bg="secondary">
                <Container>
                    <Navbar.Brand to="#home" className='text-light text-center text-justify'>
                        To Do LIST
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
};

export default NavBar;

