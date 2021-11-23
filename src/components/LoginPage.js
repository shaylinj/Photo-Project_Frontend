import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class LoginPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = this.intialState;
        localStorage.setItem('LoggedIn', 'LogIn');
    }
    intialState =
    {
        userId:'', exists:'',email:''
    }
    detailChange = event =>
    {
        console.log(event.target.name);
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    userLogin = () => 
    {
        localStorage.setItem('email',this.state.email);
        if(localStorage.getItem('email') === '')
        {
            alert("Please enter valid email address");
        }
        else
        {
            console.log(localStorage.getItem('email'));
            axios
                .get("http://localhost:8090/photo-project/user/userID/"+ localStorage.getItem('email'))
                .then(res => res.data)
                .then((data) => {
                    console.log(data);
                    this.setState({userId: data.data});
                    localStorage.setItem('userID',this.state.userId);
                    axios
                        .get("http://localhost:8090/photo-project/user/exists/"+ localStorage.getItem('userID'))
                        .then(res => res.data)
                        .then((data) => {
                            console.log(data);
                            this.setState({exists: data.data});
                            if(this.state.exists)
                            {
                                localStorage.setItem('LoggedIn', 'Log out');
                                window.location ="/PhotoGallery";
                            }
                            else
                            {
                                localStorage.setItem('LoggedIn', 'Log in');
                                alert("User with email: " + localStorage.getItem('email') + " does not exist");
                                this.state.userId = '';
                                this.state.exists='';
                            }
                        })
                        .catch(err => 
                        {
                            alert("User with email: " + localStorage.getItem('email') + " does not exist");
                        });

                });
        }
    }

    render() {
        localStorage.setItem('LoggedIn', 'Login');
        localStorage.setItem('email', '');
        const {userId, email} = this.state;
        return (
            <Card className="loginCard">
                <Card.Header>
                    Log In
                </Card.Header>
                <Form userId="LoginForm">
                    <Card.Body>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.detailChange}
                                placeholder="example@gmail.com" />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Link
                            to={"Register"}
                            className="btn btn-outline-success">
                            <i className="fa fa-user-plus" aria-hidden="true"></i>
                            {' '}
                            Register
                        </Link>
                        {' '}
                        <Button
                            variant="outline-light"
                            onClick={this.userLogin}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            {' '}
                            Log in
                        </Button>{' '}
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}
