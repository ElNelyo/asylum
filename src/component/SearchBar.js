import React from 'react';
import { Form, Container, Row, Col} from 'react-bootstrap'
class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render() {
        return (
            
          
            <Container>
            <Row>
            <Col md={4} xs={4}></Col>

            <Col md={4} xs={4}>
            <div className="search">
                 <Form.Group controlId="search">
                    <Form.Label>Recherche</Form.Label>
                    <Form.Control onChange={event => this.onInputChange(event.target.value)} type="email" placeholder="Animal, humeur ..." />
                </Form.Group>
                  
            </div>
            </Col>

            <Col md={4} xs={4}></Col>
            </Row>
          </Container>
        );
    }
}

export default SearchBar;