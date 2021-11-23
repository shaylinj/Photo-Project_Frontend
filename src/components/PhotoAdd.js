import React, { Component } from 'react';
import {Button, Card, Form, ProgressBar} from "react-bootstrap";
import axios from 'axios';

export default class PhotoAdd extends Components
{
    constructor(props) 
    {
        super(props);
        this.state = this.initialState;
        this.photoChange = this.photoChange.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
    }
    initialState = 
    {
        userID:localStorage.getItem('userID'), selectedFile:''
    };
    resetPhoto= () =>
    {
        this.setState(() => this.initialState);
    }
    submitPhoto = () =>
    {
        const image = new FormData();
        image.append("userID",localStorage.getItem('userID'));
        image.append("file", this.state.selectedFile);
        axios
            .post("http://localhost:8090/photo-project/image/upload",img, 
            {
            headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(response => 
            {
                if(response.data != null)
                {
                    this.setState(() => this.initialState);
                    if(!alert("Image saved successfully"))
                    {
                        window.location ="/PhotoGallery";
                    }
                }
            })
            .catch(err => 
            {
            alert("Image could not be uploaded. Please try again, if the problem persists your image my be too large to upload");
            });
        
    }
    photoChange = event =>
    {
        this.state.selectedFile = event.target.files[0];
    }
    
    render()
    {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    Add New Image
                </Card.Header>
                <Form onReset={this.resetImage} onSubmit={this.submitImage} id="AddImageForm">
                    <Card.Body>
                        <div>
                            <h5>Image</h5>
                            <input type="file" onChange={this.imageChange}/>
                        </div>
                    </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                    <Button
                        variant="outline-light"
                        type="submit"
                        className="buttonLayout">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        {' '}
                        Add Image
                    </Button>{' '}
                    <Button
                        variant="outline-danger"
                        type="reset"
                        className="buttonLayout">
                        <i className="fa fa-undo" aria-hidden="true"></i>
                        {' '}
                        Reset Form
                    </Button>{' '}
                </Card.Footer>
                </Form>
            </Card>
        );
    }
}
