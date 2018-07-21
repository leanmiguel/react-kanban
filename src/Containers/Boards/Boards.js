import React from 'react';
import { Button, Row } from 'reactstrap';
import BoardCard from '../../Components/BoardCard/BoardCard';
import AddBoardModal from '../../Components/AddBoardModal/AddBoardModal';
import BoardModal from '../../Components/BoardModal/BoardModal';



class Boards extends React.Component {

    constructor(props) {
        super(props);

        let localStorageBoards = null;
        if (JSON.parse(localStorage.getItem('boards'))) {
            localStorageBoards = JSON.parse(localStorage.getItem('boards'));
        }

        this.state = {
            boards: (localStorageBoards ? localStorageBoards : []),
            addBoardModalOpen: false,
            boardModalOpen: false,
            modalInput: null,
            currentBoard: false,
        }


    }

    toggleBoardModal = (boardName, boardId) => {

        this.setState({ boardModalOpen: !this.state.boardModalOpen, currentBoard: { name: boardName, id: boardId } });

    }
    toggleAddBoardModal = () => {
        this.setState({ addBoardModalOpen: !this.state.addBoardModalOpen });
    }

    modalInputHandler = (e) => {
        this.setState({ modalInput: e.target.value });
    }

    getCurrentBoardHandler = () => {


        const currentBoardItem = this.state.boards.findIndex((element) => {
            return element.id === this.state.currentBoard.id;
        })

        console.log(currentBoardItem);
        return currentBoardItem;
    }
    editBoardNameHandler = (e) => {


        let boards = [...this.state.boards];

        const editIndex = boards.findIndex((element) => {
            return element.id === this.state.currentBoard.id;
        })

        let currentBoardStorage = localStorage.getItem(boards[editIndex].id);
        let previousBoardId = boards[editIndex].id;

        boards[editIndex].title = e.target.value;
        boards[editIndex].id = `${e.target.value}${Date.now() * (Math.floor(Math.random() * 100))}`;

        this.setState({ boards, currentBoard: { name: boards[editIndex].title, id: boards[editIndex].id } });


        localStorage.setItem('boards', JSON.stringify(boards));
        localStorage.removeItem(previousBoardId);
        localStorage.setItem(boards[editIndex].id, currentBoardStorage);



    }

    deleteBoardHandler = () => {
        let boards = [...this.state.boards];

        const deleteIndex = boards.findIndex((element) => {
            return element.id = this.state.currentBoard.id;
        })

        boards.splice(deleteIndex, 1);

        this.setState({ boards, boardModalOpen: !this.state.boardModalOpen });
        localStorage.setItem('boards', JSON.stringify(boards));
        localStorage.removeItem(this.state.currentBoard.id);

    }
    modalInputAddHandler = () => {
        let boards = [...this.state.boards];
        boards.push({ title: this.state.modalInput, id: `${this.state.modalInput}${Date.now() * (Math.floor(Math.random() * 100))}` }); // key is nice and random




        if (this.state.modalInput) {
            this.setState({ boards, modalInput: null, });
            this.toggleAddBoardModal();
            localStorage.setItem('boards', JSON.stringify(boards));


            // cycle through the boards and make sure they are available in local storage. if it is found, do nothing
            for (let board of boards) {
                if (JSON.parse(localStorage.getItem(board.id))) {
                    // do nothing
                } else {
                    localStorage.setItem(board.id, JSON.stringify([]));
                }
            }

        }
        else {
            this.toggleAddBoardModal();
            alert('Please input a name for your board');
        }
    }

    enterBoardHandler = (id, title) => {
        this.props.history.push(`/board/${title}/${id}/`);


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
            return <BoardCard title={board.title} key={board.id} id={board.id} enterBoardHandler={this.enterBoardHandler} toggleBoardModal={this.toggleBoardModal} />
        })


        let currentBoardName = "";
        let currentBoardId = "";
        if (this.state.currentBoard) {
            try {

                let currentItem = this.state.boards.find((element) => {

                    return element.id === this.state.currentBoard.id;
                })
                currentBoardName = currentItem.title;
                currentBoardId = currentItem.id;
            }

            catch (err) {

            }

        }
        return (

            <React.Fragment>

                <h2 style={{ marginLeft: '5px' }}>Trello Clone</h2>

                {boards}


                <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
                    <Button outline color="primary" block onClick={() => { this.toggleAddBoardModal() }}> Add New Board </Button>
                </Row>

                <AddBoardModal isOpen={this.state.addBoardModalOpen} toggleAddBoardModal={this.toggleAddBoardModal} modalInputAddHandler={this.modalInputAddHandler} modalInputHandler={this.modalInputHandler}></AddBoardModal>

                <BoardModal isOpen={this.state.boardModalOpen} toggleBoardModal={this.toggleBoardModal} editBoardNameHandler={this.editBoardNameHandler} currentBoardName={currentBoardName} currentBoardId={currentBoardId} deleteBoardHandler={this.deleteBoardHandler}></BoardModal>
            </React.Fragment>
        )
    }

}

export default Boards;

