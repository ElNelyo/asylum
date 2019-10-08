import React from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Row, Container , Col} from 'react-bootstrap'


class Users extends React.Component {


  constructor(props) {
    super(props);

    this.users = []

  }


  createAddressCard = () => {
    let parent = [];
    
    this.users.map((value, index) => {
    parent.push(
      <Col md={4}  xs={12} className="text-center">
            <Card>
              <Card.Img variant="top" src={value.image} />
              <Card.Body>
                <Card.Title>{value.name}
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
              </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
            </Col>
    )  
    });

    return parent;
  }
  componentWillMount = () => {


    this.getUsers();
  }


  getUsers() {
    this.users =
      [

        {
          name: "Maxime",
          image: require('../img/avatar/maxime.png'),
          id: "12313133"
        },
        {
          name: "Trinh",
          image: require('../img/avatar/trinh.png'),
          id: "01315886"
        }
      ]
  }



  render() {

    if (this.users.length > 0) {



      return (
       
        <Container>
        <Row>
       
          {this.createAddressCard()}
       
          </Row>
        </Container>
       
      );








    } else {
      return React.createElement(
        "div",
        null,
        "Salut ",
        this.props.name
      );
    }

  }
}


export default Users;