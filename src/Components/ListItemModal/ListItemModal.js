import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const listItemModal = (props) => {

    return (
        <Modal isOpen={props.isOpen} toggle={() => { props.toggleModal() }}>
            <ModalHeader style={{ fontWeight: 'bold' }} toggle={() => { props.toggleModal() }}>{(props.item ? props.item.name : null)}</ModalHeader>
            <ModalBody>
                <h2>Description</h2>
                <Input placeholder='Input Description' type="textarea" onChange={props.modifyListItemHandler} />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => { props.toggleModal() }}>Delete</Button>
            </ModalFooter>
        </Modal>
    )
}

export default listItemModal;