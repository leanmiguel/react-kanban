import React from 'react';
import { Col, Button, Card, CardTitle, Input, DropdownItem, InputGroup, InputGroupAddon } from 'reactstrap';


const ListCard = (props) => {

    let addForm =
        (
            <InputGroup style={{ marginTop: 5 }}>
                <Input placeholder='Input Item' onChange={(e) => { props.newListItemInputHandler(e, props.id) }} />
                <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={() => { props.addNewListItemHandler(props.id) }} >+</Button>
                </InputGroupAddon>
                <InputGroupAddon addonType="append"><Button color="secondary" >x</Button></InputGroupAddon>
            </InputGroup>

        );


    let addButton = (<Button color="primary" onClick={() => { props.toggleListItemForm(props.id) }} style={{ marginTop: 5 }} >+</Button>)

    const listItems = props.items.map((item) => {
        return <Button
            outline
            color="primary"
            key={item.id}
            style={{ marginTop: '5px' }}>
            {item.name}
        </Button>
    })

    return (


        <React.Fragment>
            <Col sm={{ size: 3 }} style={{ padding: 2 }}>
                <Card className="bg-light text-dark" style={{ padding: '5px' }}>
                    <CardTitle className="text-center">
                        <a
                            href="# "

                            style={{ color: 'rgb(25,25,25)', fontWeight: 'bold', fontSize: '25px', paddingBottom: '-5px', wordWrap: 'break-word' }}>
                            {props.name}
                        </a>
                    </CardTitle>
                    <DropdownItem divider></DropdownItem>
                    {listItems}
                    {(props.listItemFormOn ? addForm : addButton)}
                </Card>
            </Col>
        </React.Fragment>


    )
}

export default ListCard;

