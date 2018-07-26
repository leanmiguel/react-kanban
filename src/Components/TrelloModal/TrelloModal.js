import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TrelloModal = (props) => {

    if (props.type === 'listItem') {
        return (

            <Modal isOpen={props.isOpen} toggle={() => { props.toggleModal() }}>
                <ModalHeader style={{ fontWeight: 'bold' }} toggle={() => { props.toggleModal() }}>{(props.item ? props.item.name : null)}</ModalHeader>
                <ModalBody>
                    <h2>Description</h2>
                    <Input placeholder='Input Description' type="textarea" value={props.currentDescription} onChange={(e) => { props.modifyListItemHandler(e, props.item) }}></Input>   {/* Instead of onChange = props.modifyListItemHandler, you can write it like this to pass in extra parameters! */}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { props.deleteListItemHandler(props.item, props.toggleModal) }}>Delete</Button>
                </ModalFooter>
            </Modal >

        )
    }

    else if (props.type === 'addNewList') {
        return (
            <Modal isOpen={props.isOpen} toggle={() => { props.toggleModal(props.type) }}>
                <ModalHeader toggle={() => { props.toggleModal(props.type) }}>New List</ModalHeader>
                <ModalBody>
                    <Input placeholder='Input New List Name' onChange={props.addNewListInputHandler} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { props.addNewListHandler() }}>Add</Button>{' '}
                    <Button color="secondary" onClick={() => { props.toggleModal(props.type) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    else if (props.type === 'addNewBoard') {

        return (
            <Modal isOpen={props.isOpen} toggle={() => { props.toggleModal(props.type) }}>
                <ModalHeader toggle={() => { props.toggleModal(props.type) }}>New Board</ModalHeader>
                <ModalBody>
                    <Input placeholder='Input New Board Name' onChange={props.newBoardInputHandler} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { props.addNewBoardHandler() }}>Add</Button>{' '}
                    <Button color="secondary" onClick={() => { props.toggleModal(props.type) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    else if (props.type === 'board') {
        return (

            <Modal isOpen={props.isOpen} toggle={() => { props.toggleModal(props.type) }}>
                <ModalHeader toggle={() => { props.toggleModal(props.type) }}>Edit Board</ModalHeader>
                <ModalBody>
                    <h2>Board Name</h2>
                    <Input value={props.currentBoardName} onChange={props.editBoardNameHandler} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => { props.toggleModal(props.type) }}>Return</Button>{' '}
                    <Button color="danger" onClick={() => { props.deleteBoardHandler() }}>Delete</Button>
                </ModalFooter>
            </Modal>

        )

    }

}

export default TrelloModal;