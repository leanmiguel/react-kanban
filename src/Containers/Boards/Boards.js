import React from 'react';
import { Button, Row } from 'reactstrap';
import BoardCard from '../../Components/BoardCard/BoardCard';
import AddBoardModal from '../../Components/AddBoardModal/AddBoardModal';
class Boards extends React.Component {

    constructor(props) {
        super(props);

        let localStorageBoards = null;
        if (JSON.parse(localStorage.getItem('boards'))) {
            localStorageBoards = JSON.parse(localStorage.getItem('boards'));
        }

        this.state = {
            boards: (localStorageBoards ? localStorageBoards : []),
            modalOpen: false,
            modalInput: null,
        }


    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    modalInputHandler = (e) => {
        this.setState({ modalInput: e.target.value });
    }

    modalInputAddHandler = () => {
        let boards = [...this.state.boards];
        boards.push({ title: this.state.modalInput, id: `${this.state.modalInput}${Date.now() * (Math.floor(Math.random() * 100))}` }); // key is nice and random




        if (this.state.modalInput) {
            this.setState({ boards, modalInput: null, });
            this.toggleModal();
            localStorage.setItem('boards', JSON.stringify(boards));

            for (let board of boards) {
                if (JSON.parse(localStorage.getItem(board.id))) {
                    // do nothing
                } else {
                    localStorage.setItem(board.id, JSON.stringify([]));
                }
            }

        }
        else {
            this.toggleModal();
            alert('Please input a name for your board');
        }
    }

    enterBoardHandler = (id, title) => {
        this.props.history.push(`/board/${title}/${id}/`);

        if (JSON.parse(localStorage.getItem(id))) {
            // do nothing

        } else {
            localStorage.setItem(id, JSON.stringify([]));
        }
    }


    render() {

        const boards = this.state.boards.map((board) => {
            return <BoardCard title={board.title} key={board.id} id={board.id} enterBoardHandler={this.enterBoardHandler} />
        })

        return (

            <React.Fragment>

                <h2 style={{ marginLeft: '5px' }}>Trello Clone</h2>

                {boards}


                <Row style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>

                    <Button outline color="primary" block onClick={() => { this.toggleModal() }}> Add New Board </Button>
                </Row>

                <AddBoardModal isOpen={this.state.modalOpen} toggleModal={this.toggleModal} modalInputAddHandler={this.modalInputAddHandler} modalInputHandler={this.modalInputHandler}></AddBoardModal>
            </React.Fragment>
        )
    }

}

export default Boards;

