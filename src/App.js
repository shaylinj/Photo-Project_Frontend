import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import PhotoAdd from "./components/PhotoAdd";
import PhotoShare from "./components/PhotoShare";
import PhotoGallery from "./components/PhotoGallery";


function App() {
  const marginTop = {
    marginTop: "5px",
    marginLeft: "0"
  };


  return (
    <Router>
      <NavigationBar>
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Switch>
                <Route path="/" exact component= {LoginPage}/>
                <Route path="/RegisterPage" exact component= {RegisterPage}/>
                <Route path="/PhotoGallery" exact component= {PhotoGallery}/>
                <Route path="/PhotoAdd" exact component= {PhotoAdd}/>
                <Route path="/PhotoShare" exact component= {PhotoShare}/>
              </Switch>
            </Col>
          </Row>
        </Container>
      </NavigationBar>
    </Router>
  );
}
export default App;
