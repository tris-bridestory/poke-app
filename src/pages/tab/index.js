import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const PokeTab = () => {

  return (
    <Row>
        <Col>
            <Link to='/'><span>Home</span></Link>
        </Col>
        <Col>
            <Link to='/pokedex'><span>Pokedex</span></Link>
        </Col>
    </Row>
  )
}

export default PokeTab;
