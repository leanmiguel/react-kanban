import React from 'react';
import { Button, Row } from 'reactstrap';
import BoardCard from '../../Components/BoardCard/BoardCard';
import TrelloModal from '../../Components/TrelloModal/TrelloModal';


class Boards extends React.Component {

    constructor(props) {
        super(props);
        let localStorageBoards = null;
        if (JSON.parse(localStorage.getItem('boards'))) {
            localStorageBoards = JSON.parse(localStorage.getItem('boards'));
        }
        this.state = {
            boards: (localStorageBoards ? localStorageBoards : []),
            addNewBoardModalOpen: false,
            boardModalOpen: false,
            newBoardInput: null,
            currentBoard: false,
        }
    }

    toggleModal = (type) => {
        if (type === "board") {
            this.setState({ boardModalOpen: !this.state.boardModalOpen });
        }
        if (type === "addNewBoard") {
            this.setState({ addNewBoardModalOpen: !this.state.addNewBoardModalOpen });
        }
    }

    setCurrentBoard = (boardName, boardId) => {
        this.setState({ currentBoard: { name: boardName, id: boardId } });
    }

    newBoardInputHandler = (e) => {
        this.setState({ newBoardInput: e.target.value });
    }

    addNewBoardHandler = () => {
        let boards = [...this.state.boards];
        boards.push({ name: this.state.newBoardInput, id: keyGenerator(this.state.newBoardInput) });

        if (this.state.newBoardInput) {
            this.setState({ boards, newBoardInput: null, });
            this.toggleModal('addNewBoard');
            saveLocalStorage(boards);
            localStorageBoardGenerator(boards)
        }
        else {
            this.toggleModal('addNewBoard');
            alert('Please input a name for your board');
        }
    }

    editBoardNameHandler = (e) => {
        const boards = [...this.state.boards];
        const { currentBoardIndex, currentBoardStorage, currentBoardId } = getCurrentBoardInformation(this.state.boards, this.state.currentBoard);
        editBoard(boards[currentBoardIndex], e.target.value);       //modify the current board with the input from the modal
        this.setState({ boards, currentBoard: { name: boards[currentBoardIndex].name, id: boards[currentBoardIndex].id } });
        saveLocalStorage(boards, undefined, currentBoardId, boards[currentBoardIndex].id, currentBoardStorage);
    }

    deleteBoardHandler = () => {
        let boards = [...this.state.boards];
        const deletedBoardId = this.state.currentBoard.id;
        const deleteIndex = boards.findIndex((element) => {
            return element.id = this.state.currentBoard.id;
        })
        boards.splice(deleteIndex, 1);
        this.setState({ boards, boardModalOpen: !this.state.boardModalOpen });
        saveLocalStorage(boards, deletedBoardId);
    }


    enterBoardHandler = (id, name) => {
        this.props.history.push(`/board/${name}/${id}/`);
        // if there is no local storage set for this particular board in local storage, put an empty list in local storage.
        if (JSON.parse(localStorage.getItem(id))) {
            // do nothing

        } else {
            localStorage.setItem(id, JSON.stringify([]));
        }
    }


    render() {

        //render the boards from state
        const boards = this.state.boards.map((board) => {
            return <BoardCard name={board.name} key={board.id} id={board.id} enterBoardHandler={this.enterBoardHandler} toggleModal={this.toggleModal} setCurrentBoard={this.setCurrentBoard} />
        })

        const { currentBoardName, currentBoardId } = getCurrentBoardInformation(this.state.boards, this.state.currentBoard);

        return (

            <React.Fragment>

                <h2 style={{ marginLeft: '5px' }}>React Kanban</h2>

                {boards}

                <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
                    <Button outline color="primary" block onClick={() => { this.toggleModal('addNewBoard') }}> Add New Board </Button>
                </Row>

                <TrelloModal type="addNewBoard" isOpen={this.state.addNewBoardModalOpen} toggleModal={this.toggleModal} addNewBoardHandler={this.addNewBoardHandler} newBoardInputHandler={this.newBoardInputHandler} ></TrelloModal>

                <TrelloModal type="board" isOpen={this.state.boardModalOpen} toggleModal={this.toggleModal} editBoardNameHandler={this.editBoardNameHandler} currentBoardName={currentBoardName} currentBoardId={currentBoardId} deleteBoardHandler={this.deleteBoardHandler} ></TrelloModal>


            </React.Fragment>
        )
    }

}

export default Boards;

const keyGenerator = (name) => {
    return `${name}${Date.now() * (Math.floor(Math.random() * 100))}`;
}

const localStorageBoardGenerator = (boards) => {
    // cycle through the boards and make sure they are available in local storage. if it is found, do nothing
    for (let board of boards) {
        if (JSON.parse(localStorage.getItem(board.id))) {
            // do nothing
        } else {
            localStorage.setItem(board.id, JSON.stringify([]));
        }
    }
}

const getCurrentBoardInformation = (boards, currentBoard) => {

    if (currentBoard) {
        try {

            const currentBoardIndex = boards.findIndex((element) => {
                return element.id === currentBoard.id;
            })

            const currentBoardName = boards[currentBoardIndex].name;
            const currentBoardId = boards[currentBoardIndex].id;
            const currentBoardStorage = localStorage.getItem(currentBoardId);
            return { currentBoardName, currentBoardIndex, currentBoardStorage, currentBoardId };

        }
        catch (e) {

        }
    }

    return { currentBoardName: '', currentBoardId: '' };

}

const editBoard = (board, newName) => {
    board.name = newName;
    board.id = keyGenerator(newName);
}

const saveLocalStorage = (boards, deleteBoardId, oldBoardId, newBoardId, newBoardContents) => {
    localStorage.setItem('boards', JSON.stringify(boards));

    if (deleteBoardId !== undefined) {

        localStorage.removeItem(deleteBoardId);
    }
    if (oldBoardId !== undefined) {
        localStorage.removeItem(oldBoardId); //delete the previous board and replace it with the new board in local storage
        localStorage.setItem(newBoardId, newBoardContents);
    }
}

