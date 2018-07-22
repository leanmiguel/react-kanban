import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const addListModal = (props) => {

    return (
        <Modal isOpen={props.isOpen} toggle={() => { props.toggleModal() }}>
            <ModalHeader toggle={() => { props.toggleModal() }}>New List</ModalHeader>
            <ModalBody>
                <Input placeholder='Input New List Name' onChange={props.modalInputHandler} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => { props.modalInputAddHandler() }}>Add</Button>{' '}
                <Button color="secondary" onClick={() => { props.toggleModal() }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default addListModal;