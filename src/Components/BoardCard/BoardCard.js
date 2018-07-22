import React from 'react';

import { Card, CardBody, CardTitle, Button } from 'reactstrap';
const type = "board";
const BoardCard = (props) => (

    <Card style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
        <CardBody>
            <CardTitle className="text-center">
                <Button
                    color="link"
                    style={{ color: 'rgb(25,25,25)' }}
                    onClick={() => {
                        props.toggleModal(type)
                        props.setCurrentBoard(props.name, props.id)
                    }}>
                    {props.name}
                </Button>
            </CardTitle>
            <Button color='primary' onClick={() => { props.enterBoardHandler(props.id, props.name) }} block>Enter Board</Button>
        </CardBody>
    </Card>

)

export default BoardCard;