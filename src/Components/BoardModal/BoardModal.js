import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BoardModal = (props) => {



    return (

        <Modal isOpen={props.isOpen} toggle={() => { props.toggleBoardModal() }}>
            <ModalHeader toggle={() => { props.toggleBoardModal() }}>Edit Board</ModalHeader>
            <ModalBody>
                <h2>Board Name</h2>
                <Input value={props.currentBoardName} onChange={props.editBoardNameHandler} />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => { props.toggleBoardModal() }}>Return</Button>{' '}
                <Button color="danger" onClick={() => { props.deleteBoardHandler() }}>Delete</Button>
            </ModalFooter>
        </Modal>

    )
}





export default BoardModal;