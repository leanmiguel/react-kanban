import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const card = () => (
    <Card >

        <CardBody>
            <CardTitle className="text-center">Board Name</CardTitle>

            <Button block>Enter Board</Button>
        </CardBody>
    </Card>
)

export default card;