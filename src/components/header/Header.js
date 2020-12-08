import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {

    return (
        <div className="header-container">
            <Container>
                <Row>
                    <Col>
                        <div className='main-title'>
                            Memory Game 🔥
                                 </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
