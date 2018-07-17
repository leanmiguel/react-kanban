import React, { Component } from 'react';
import { Container, Row, Col, CardGroup, Button, Card, CardTitle, CardBody, CardText, Form, FormGroup, Label, Input, DropdownItem } from 'reactstrap';
// import BoardCard from './Components/BoardCard/BoardCard';
import ListCard from '../Components/ListCard/ListCard';

class Board extends Component {

    state = {
        name: null,
        lists: []

    }


    render() {

        return (
            <div className="App">

                <Row style={{ marginLeft: '5px' }}>  <Button outline color="link" style={{ marginLeft: '5px' }}>Return</Button>
                    <h2 style={{ marginLeft: '5px' }}>Board Name</h2>
                </Row>




                <Row style={{ marginLeft: '5px', flexWrap: (window.innerWidth > 500 ? 'nowrap' : 'wrap') }} >

                    <ListCard />
                    <ListCard />
                    <Button outline color="primary" style={{ height: '7em' }}> Add New List </Button>

                </Row>



            </div>
        );
    }
}

export default Board;
