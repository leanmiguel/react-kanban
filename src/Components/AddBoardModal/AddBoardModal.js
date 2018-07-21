import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const addBoardModal = (props) => {

    return (
        <Modal isOpen={props.isOpen} toggle={() => { props.toggleAddBoardModal() }}>
            <ModalHeader toggle={() => { props.toggleAddBoardModal() }}>New Board</ModalHeader>
            <ModalBody>
                <Input placeholder='Input New Board Name' onChange={props.modalInputHandler} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => { props.modalInputAddHandler() }}>Add</Button>{' '}
                <Button color="secondary" onClick={() => { props.toggleAddBoardModal() }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default addBoardModal;