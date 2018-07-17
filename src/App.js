import React, { Component } from 'react';
import { Container, Row, Col, CardGroup, Button, Card, CardTitle, CardBody, CardText, Form, FormGroup, Label, Input, DropdownItem } from 'reactstrap';
import BoardCard from './Components/BoardCard/BoardCard';
import ListCard from './Components/ListCard/ListCard';

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* this is the main page  */}
        {/* <h2 className="text-center">Trello Clone</h2>


        <Container fluid>

          <Row >
            <CardGroup style={{ margin: 'auto' }}>
              <BoardCard />
              <BoardCard />
              <BoardCard />
              <BoardCard />
            </CardGroup>


          </Row>
        </Container> */}

        <Row style={{ marginLeft: '5px' }}>  <Button outline color="link" style={{ marginLeft: '5px' }}>Return</Button>
          <h2 style={{ marginLeft: '5px' }}>Board Name</h2>
        </Row>




        <Row style={{ marginLeft: '5px', flexWrap: 'nowrap' }} >

          <ListCard />

        </Row>



      </div>
    );
  }
}

export default App;
