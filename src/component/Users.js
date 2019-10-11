import React from "react";
import { Card, Button, Row, Container , Col} from 'react-bootstrap'
import axios from 'axios';

class Users extends React.Component {

  state = {
    persons: []
  }
  constructor(props) {
    super(props);

    this.users = []



  }

  componentDidMount() {
    axios.get(`http://awesome-dev.eu:8090/users/count`)
      .then(res => {
        const persons =(res.data);
        
        this.setState({ persons });
      })
  }

  UNSAFE_componentWillMount(){

    this.getUsers();
  
  }


  createMemberCounter =() => 
  {
    let parent = [];
    parent.push(
      <Col md={12} xs = {12}>
        <p>Asylum contient { this.state.persons.value} membre(s)</p>
        
      </Col>
    )
    return parent
  }
  createAddressCard = () => {
    let parent = [];
    
    this.users.map((value, index) => {
    parent.push(
      <Col md={4}  xs={12}key={index} >
            <Card >
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

    return console.log("Image loaded")
    });

    return parent;
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
            {this.createMemberCounter()}
          </Row>
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