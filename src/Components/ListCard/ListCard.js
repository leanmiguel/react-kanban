import React from 'react';
import { Container, Row, Col, CardGroup, Button, Card, CardTitle, CardBody, CardText, Form, FormGroup, Label, Input, DropdownItem, InputGroup, InputGroupAddon } from 'reactstrap';

class ListCard extends React.Component {
    state = {
        title: null,
        addItemClicked: false,
        addInput: null,
        listItems: []
    }

    toggleClickedHandler = () => {
        this.setState({ addItemClicked: !this.state.addItemClicked });

    }

    inputHandler = (e) => {
        this.setState({ addInput: e.target.value });
    }

    addListItemHandler = () => {

        let listItems = [...this.state.listItems];

        if (this.state.addInput) {
            listItems.push(this.state.addInput);
            this.setState({ listItems, addInput: null, addItemClicked: false });
        }
        else {
            alert('Please input an item');
        }

    }


    render() {
        let addForm =
            (
                <InputGroup style={{ marginTop: 5 }}>

                    <Input placeholder='Input Item' onChange={this.inputHandler} />

                    <InputGroupAddon addonType="append">
                        <Button
                            color="primary"
                            onClick={() => { this.addListItemHandler() }}>
                            +</Button></InputGroupAddon>
                    <InputGroupAddon addonType="append"><Button color="secondary" onClick={() => { this.toggleClickedHandler() }}>x</Button></InputGroupAddon>
                </InputGroup>

            );

        let addButton = (<Button color="primary" onClick={() => { this.toggleClickedHandler() }} style={{ marginTop: 5 }} >+</Button>)

        let listItems = this.state.listItems.map((item) => {
            return <Button outline color="primary" key={`${item}${Date.now()}`} style={{ marginTop: 5 }}>{item}</Button>;

        });
        return (
            <Col sm={{ size: 3 }} style={{ padding: 2 }}>
                <Card className="bg-light text-dark" style={{ padding: '5px' }}>
                    <CardTitle className="text-center">Card title</CardTitle>
                    <DropdownItem divider></DropdownItem>
                    {listItems}

                    {this.state.addItemClicked ? addForm : addButton}


                </Card>
            </Col>



            // <Col>
            //     <Button>Add another list</Button></Col>

        )
    }

}

export default ListCard;