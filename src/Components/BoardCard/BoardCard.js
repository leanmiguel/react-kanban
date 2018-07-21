import React from 'react';

import { Card, CardBody, CardTitle, Button } from 'reactstrap';
const BoardCard = (props) => (

    <Card style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
        <CardBody>
            <CardTitle className="text-center"><Button color="link" style={{ color: 'rgb(25,25,25)' }} onClick={() => { props.toggleBoardModal(props.title, props.id) }}>{props.title}</Button></CardTitle>
            <Button color='primary' onClick={() => { props.enterBoardHandler(props.id, props.title) }} block>Enter Board</Button>
        </CardBody>
    </Card>

)

export default BoardCard;