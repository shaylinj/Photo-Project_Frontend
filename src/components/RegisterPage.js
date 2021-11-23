import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";


export default class RegisterPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initialState;
        this.userRegister = this.userRegister.bind(this);
        this.detailChange = this.detailChange.bind(this);
    }
    initialState =
    {
        email:'', password:'',firstname:'',lastname:''
    }
    detailChange = event =>
    {
        console.log(event.target.name);
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    userRegister = () =>
    {
        const users = new FormData();
        users.append("firstName", this.state.firstname);
        users.append("lastName", this.state.lastname);
        users.append("email", this.state.email);
        users.append("password", this.state.password);

        axios
            .post("http://localhost:8090/photo-project/user/add",user,
            {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                if(response.data != null){
                    this.setState(() => this.initialState);
                    if(!alert("User registered successfully"))
                    {
                        window.location ="/LoginPage";
                    };
                }
            })
            .catch(err => 
            {
                alert("User could not be registered");
            });
    }

    detailChange = event =>
    {
        console.log(event.target.name);
        this.setState
        ({
            [event.target.name]:event.target.value
        });
    }

    render() 
    {
        const {email, firstName, lastName, password} = this.state;
        return (
            <Card className="loginCard">
                <Card.Header>
                    Login
                </Card.Header>
                <Form id="LoginForm" onSubmit={this.userRegister}>
                    <Card.Body>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Addess</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.userChange}
                                placeholder="Email: " />
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={this.userChange}
                                placeholder="First name: " />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={this.userChange}
                                placeholder="Last name: " />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.userChange}
                                placeholder="Valid Password: " />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button
                            variant="outline-light"
                            type="submit">
                            <i className="fa fa-user-plus" aria-hidden="true"></i>
                            {' '}
                            Register
                        </Button>{' '}
                    </Card.Footer>
                </Form>
            </Card>
        );
    }

}
