import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, FormControl, NavDropdown} from 'react-bootstrap'
import {Navbar, Nav, Button} from 'react-bootstrap'

export default class NavigationBar extends Components
{
    constructor(props) 
    {
        super(props);
        this.userImages = this.userImages.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }
    userLogin = () => {
        localStorage.setItem('email','');
        localStorage.setItem('userID','');
        window.location ="/LoginPage";
    }
    userImages = () =>
    {
        window.location ="/PhotoGallery";
    }
    render()
    {
        return(
             <Navbar bg="dark" variant="dark" collapseOnSelect expand='sm'>
                    <Container>
                        <Nav.Item className='fluid'>
                            <Link to={""} className="navbar-brand">
                                <img
                                    src="https://th.bing.com/th/id/OIP.GClZyI7Va0ZNfkN_AndgPgHaHa?pid=ImgDet&rs=1"
                                    width="40"
                                    height="40"
                                    alt="brand"
                                />{" "}
                                PhotoProject
                            </Link>
                        </Nav.Item>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <div className="ms-auto">
                                <Nav.Item>
                                    <Button
                                        variant="outline-light"
                                        onClick={this.userImages}>
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                        {' '}
                                        Images
                                    </Button>
                                    {' '}
                                    <Button
                                        variant="outline-light"
                                        onClick={this.userLogin}>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        {' '}
                                        {localStorage.getItem('loggedIn')}
                                    </Button>
                                    <p className="userEmail"></p>
                                </Nav.Item>
                            </div>
                        </Navbar.Collapse>
                    </Container>
            </Navbar>
        );
    }


}
