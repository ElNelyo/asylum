import React from "react";
import { Col, Container, Row } from 'react-bootstrap'

class About extends React.Component {





  render() {
    var TravisCI = 
    <Container>
            <Row >
            <div>
                <Col md={12} xs={12}>
                  <h1>Intégration Continue</h1>
                  <img src="https://docs.travis-ci.com/images/TravisCI-Full-Color.png" alt="Travis"></img>
                </Col> 
                
                <Col md={12} xs={12}>
                  <img style={{ width: "330px", height: 'auto' }} src="https://travis-ci.org/ElNelyo/asylum.svg?branch=master" alt="travis-statut"></img>
                </Col>

                <Col md={12} xs={12}>
                  <h1>Déploiement continu</h1>
                  <img style={{ width: "330px", height: 'auto' }} src="https://miro.medium.com/max/1200/1*qqOrP7lca1XW70IzPg9Mmw.png" alt='surge'></img>
                </Col>
            </div>
            </Row>
      </Container>

       return [
        <div>
          {TravisCI}
        </div>




    ];

  }



}


export default About;