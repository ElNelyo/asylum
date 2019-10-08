import React from 'react';
import GifItem from './GifItem';
import { Container, Row, Col } from 'react-bootstrap'


const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    return <Col md={4} xs={12}><GifItem key={image.id} gif={image} onGifSelect={props.onGifSelect} /> </Col>
  });

  return (
    <Container>
      <Row className="gifList">
        {gifItems}
       
      </Row>
    </Container>

  );
};

export default GifList;