import React from 'react';
import axios from 'axios';
import PhotoAdd from "./PhotoAdd";
import {Card, Container, Row, Col, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class PhotoGallery extends Components
{
    constructor(props)
     {
        super(props);
        this.state = {images: []};
        this.state.exists = '';
        this.state.email = '';
        this.deletePhoto = this.deletePhoto.bind(this);
        this.downloadPhoto = this.downloadPhoto.bind(this);
        this.setUserID = this.setUserID.bind(this);
        this.sharePhoto = this.sharePhoto.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
     }
    componentDidMount()
    {
        axios
            .get("http://localhost:8090/photo-project/image/view/"+ localStorage.getItem('userID'))
            .then(res => res.data)
            .then((data) => {
                console.log(data);
                this.setState({images: data.data});
            });
        console.log(this.state.images);
    }
    deleteImage = (image) => 
    {
        axios
            .delete("http://localhost:8090/photo-project/image/delete/" + localStorage.getItem('userID') + "/" + image.name)
            .then(response =>
            {
                if (response.data != null) 
                {
                    if (!alert(image.name + " deleted successfully")) 
                    {
                        window.location.reload();
                    }
                }
            })
    };
    downloadImage = (image) => 
    {
        window.open("http://localhost:8090/photo-project/image/download/" + image.userID + "/" + image.name);
    }
    shareImage(image) 
    {
        return event => 
        {
            event.preventDefault();
            localStorage.setItem('sharedUserEmail', this.state.email);
            if(localStorage.getItem('sharedUserEmail') === '')
            {
                alert("Invalid email for image share");
            }
            else
            {
                console.log(localStorage.getItem('sharedUserEmail'));
                axios
                    .get("http://localhost:8090/photo-project/user/userID/"+ localStorage.getItem('sharedUserEmail'))
                    .then(res => res.data)
                    .then((data) => {

                        localStorage.setItem('sharedUserID', data.data);
                        console.log(localStorage.getItem('sharedUserID'));
                    });
                axios
                    .get("http://localhost:8090/photo-project/user/exists/"+ localStorage.getItem('sharedUserID'))
                    .then(res => res.data)
                    .then((data) => {
                        console.log(data);
                        this.setState({exists: data.data});
                        if(this.state.exists)
                        {
                            const image = new FormData();
                            image.append("date", image.date);
                            image.append("imageid", image.imageID);
                            image.append("link", image.link);
                            image.append("name", image.name);
                            image.append("sharedUserID", localStorage.getItem('sharedUserID'));
                            image.append("size", image.size);
                            image.append("user", image.userID);

                            axios
                                .post("http://localhost:8090/photo-project/shareImage",img)
                                .then(response => {
                                    alert("Image shared successfully");
                                })
                                .catch(err => 
                                {
                                    alert("Image could not be shared.");
                                });
                        }
                        {
                            alert("User " + localStorage.getItem('sharedUserID') + " does not exist");
                            this.state.userID = '';
                            this.state.exists='';
                        }
                    });

                localStorage.setItem('sharedUserEmail', '');
                localStorage.setItem('sharedUserID', '');
            }
            this.state.email='';
        }
    }

    PhotoAdd = event => 
    {
        if(localStorage.getItem('userID') === '')
        {
            alert("User not logged in");
        }
        else
        {
            window.location ="/PhotoAdd";
        }
    }

    render() 
    {
        const {userID, email} = this.state;
        let uID = localStorage.getItem('userID');
        return (
            <Card className="cards">
                <Card.Header>
                    Photo Gallery
                    {' '}
                    <Button
                        variant="outline-light"
                        type="submit"
                        className="buttonLayout"
                        onClick={this.addImage}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        {' '}
                        Add Photo
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div>
                        {this.state.images.map((image) => (
                            <div className="imageLayout">
                                <img
                                    className="image"
                                    key={image.imageID}
                                    src={"http://localhost:8090/photo-project/image/view/"+ userID + "/" + image.name}
                                />
                                {' '}
                                <br/>
                                <div className="metadata">{image.name}</div>
                                <div className="metadata">Size: {image.size}KB</div>
                                <div className="metadata">Date: {image.date}</div>
                                {' '}
                                <Button
                                    variant="outline-success"
                                    type="button"
                                    className="buttonLayout"
                                    onClick={this.downloadImage.bind(this, image)}>
                                    <i className="fa fa-download"></i>
                                    {' '}
                                    Download
                                </Button>
                                {' '}
                                <Button
                                    variant="outline-danger"
                                    type="button"
                                    className="buttonLayout"
                                    onClick={this.deleteImage.bind(this, image)}>
                                    <i className="fa fa-trash"></i>
                                    {' '}
                                    Delete
                                </Button>
                                <br/>
                                <Form onSubmit={this.shareImage(image)} id="ShareImageForm">
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon2"
                                            name="email"
                                            value={email}
                                            onChange={this.setUserID}
                                        />
                                        <Button
                                            variant="outline-light"
                                            type="submit">
                                            <i className="fa fa-share-alt"></i>
                                            {' '}
                                            Share
                                        </Button>
                                    </InputGroup>
                                </Form>
                                <br/>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        );
    }
     
}