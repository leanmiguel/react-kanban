import React from 'react';
import { Col, Button, Card, CardTitle, Input, DropdownItem, InputGroup, InputGroupAddon } from 'reactstrap';
import { Container, Draggable } from 'react-smooth-dnd';

class ListCard extends React.Component {


    render() {



        let addForm =
            (
                <InputGroup style={{ marginTop: 5 }}>
                    <Input placeholder='Input Item' onChange={(e) => { this.props.newListItemInputHandler(e, this.props.id) }} />
                    <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => { this.props.addNewListItemHandler(this.props.id) }} >+</Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append"><Button color="secondary" onClick={() => { this.props.toggleListItemForm(this.props.id) }} >x</Button></InputGroupAddon>
                </InputGroup>

            );


        let addButton = (<Button color="primary" onClick={() => { this.props.toggleListItemForm(this.props.id) }} style={{ marginTop: 5 }} >+</Button>)

        const listItems = this.props.items.map((item) => {
            return <Draggable key={item.id}>

                <Button
                    outline
                    block
                    color="primary"
                    style={{ marginTop: '5px' }}
                    onClick={() => {
                        this.props.setCurrentItem(this.props.id, item.id);
                        this.props.toggleListItemModal('listItem');
                    }}>
                    {item.name}
                </Button>
            </Draggable>
        })

        return (

            <React.Fragment>
                <Col sm={{ size: 3 }} style={{ padding: 2 }}>
                    <Card className="bg-light text-dark" style={{ padding: '5px' }}>
                        <CardTitle className="text-center">
                            <a
                                href="# "
                                onClick={() => {
                                    this.props.setCurrentItem(this.props.id);
                                    this.props.toggleListItemModal('list');
                                }}
                                style={{ color: 'rgb(25,25,25)', fontWeight: 'bold', fontSize: '25px', paddingBottom: '-5px', wordWrap: 'break-word' }}>
                                {this.props.name}
                            </a>
                        </CardTitle>
                        <DropdownItem divider></DropdownItem>
                        <Container groupName="listCardItems" getChildPayload={i => this.props.items[i]} onDrop={e => this.props.applyDrag(this.props.items, e, this.props.id)}>
                            {listItems}
                        </Container>
                        {(this.props.listItemFormOn ? addForm : addButton)}
                    </Card>
                </Col>
            </React.Fragment>


        )

    }
}

export default ListCard;

