import React, { Component } from 'react';
import { Row, Button, } from 'reactstrap';
import ListCard from '../../Components/ListCard/ListCard';
import AddListModal from '../../Components/AddListModal/AddListModal';
import './Board.css';
class Board extends Component {

    constructor(props) {
        super(props);

        let currentLists = [];
        const boardId = this.props.match.params.boardId;
        if (JSON.stringify(localStorage.getItem(boardId))) {
            // console.log(JSON.parse(localStorage.getItem(boardId)));
            currentLists = JSON.parse(localStorage.getItem(boardId));
        }

        this.state = ({

            name: (this.props.match.params.boardName),
            lists: currentLists,
            modalOpen: false,
            modalInput: null,

        })
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }


    modalInputHandler = (e) => {
        this.setState({ modalInput: e.target.value });
    }

    modalInputAddHandler = () => {
        let lists = [...this.state.lists];
        lists.push({ title: this.state.modalInput, listItems: [], id: `${this.state.modalInput}${Date.now() * (Math.floor(Math.random() * 100))}` }); // key is nice and random

        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));
        // console.log(lists);
        if (this.state.modalInput) {
            this.setState({ lists, modalInput: null, });
            this.toggleModal();
        }
        else {
            this.toggleModal();
            alert('Please input a name for your list');
        }


    }


    deleteListItemHandler = (currentItem, toggleModal) => {

        // copy the current state of lists for immutability
        let lists = [...this.state.lists];

        // find the list which matches with the current Item
        let modifyListIndex = this.state.lists.findIndex((element) => {

            return element.id === currentItem.boardId;

        });

        // find the current entry which matches with the current Item
        let modifyDescriptionIndex = lists[modifyListIndex].listItems.findIndex((element) => {
            return element.id === currentItem.listItemId;
        })


        // remove it

        lists[modifyListIndex].listItems.splice(modifyDescriptionIndex, 1);

        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

        toggleModal();
    }

    modifyListItemHandler = (e, currentItem) => {

        let lists = [...this.state.lists];


        // we can change to this to a function there are multiple calls of this.
        // find the list which matches with the current Item
        let modifyListIndex = this.state.lists.findIndex((element) => {

            return element.id === currentItem.boardId;

        });

        // find the current entry which matches with the current Item
        let modifyDescriptionIndex = lists[modifyListIndex].listItems.findIndex((element) => {
            return element.id === currentItem.listItemId;
        })


        // change the description with what is currently in the textarea
        lists[modifyListIndex].listItems[modifyDescriptionIndex].description = e.target.value;

        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));
        this.setState({ lists });



    }


    addListItemHandler = (id, input, reset) => {
        let lists = [...this.state.lists];
        //add the new list item to the add list
        let addListIndex = this.state.lists.findIndex((element) => {

            return element.id === id;

        });

        //if not empty
        if (input) {
            lists[addListIndex].listItems.push({ name: input, description: '', id: `${input}${Date.now() * (Math.floor(Math.random() * 100))}` });
            reset();
        }
        else {
            alert('Please add an item');
        }

        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));
        this.setState({ lists });
    }

    render() {
        //from state, create the lists to render to the dom
        const lists = this.state.lists.map((list) => {
            return <ListCard title={list.title} key={list.id} id={list.id} listItems={list.listItems} addListItemHandler={this.addListItemHandler} modifyListItemHandler={this.modifyListItemHandler} deleteListItemHandler={this.deleteListItemHandler} />
        })


        return (
            <div className="App">

                {/* nav bar */}
                <Row style={{ marginLeft: '5px', marginTop: '5px', marginBottom: '5px' }}>  <Button outline color="link" style={{ marginLeft: '5px' }}
                    onClick={() => { this.props.history.push('/') }}>Return</Button>
                    <h2 style={{ marginLeft: '5px' }}>{this.state.name}</h2>
                </Row>

                {/* Should be a media query for later, should wrap when the screen size is small. */}         {/* update media queries dont work unless i do custom css and let go of react strap */}
                <Row className='BoardRow'>


                    {lists}

                    <Button className='AddListButton' outline color="primary" onClick={() => { this.toggleModal() }}> Add New List </Button>
                    <AddListModal isOpen={this.state.modalOpen} toggleModal={this.toggleModal} modalInputHandler={this.modalInputHandler} modalInputAddHandler={this.modalInputAddHandler} ></AddListModal>


                </Row>



            </div>
        );
    }
}

export default Board;
