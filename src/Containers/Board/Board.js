import React, { Component } from 'react';
import { Row, Button, } from 'reactstrap';
import ListCard from '../../Components/ListCard/ListCard';
import NewListCard from '../../Components/ListCard/NewListCard';
import TrelloModal from '../../Components/TrelloModal/TrelloModal';

import './Board.css';
class Board extends Component {


    constructor(props) {
        super(props);

        const boardId = this.props.match.params.boardId;

        // if there is currently an item in local storage retrieve it, if not set local storage.
        let currentLists = [];
        if (JSON.stringify(localStorage.getItem(boardId))) {
            currentLists = JSON.parse(localStorage.getItem(boardId));
        }

        this.state = ({
            name: (this.props.match.params.boardName),
            lists: currentLists,
            addNewListModalOpen: false,
            addNewListInput: null,

            listModalOpen: false,
            listItemModalOpen: false,
            addNewListItemHandler: null,
            currentItem: null,



        })
    }

    toggleModal = (type) => {

        if (type === "addNewList") {
            this.setState({ addNewListModalOpen: !this.state.addNewListModalOpen });
        }
        if (type === "listItem") {
            this.setState({ listItemModalOpen: !this.state.listItemModalOpen });
        }

    }

    addNewListInputHandler = (e) => {
        this.setState({ addNewListInput: e.target.value });
    }

    addNewListHandler = () => {
        let lists = [...this.state.lists];
        lists.push({ name: this.state.addNewListInput, listItems: [], id: keyGenerator(this.state.addNewListInput), listItemFormOn: false, newListItemInput: null });

        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

        if (this.state.addNewListInput) {
            this.setState({ lists, addNewListInput: null, });
            this.toggleModal('addNewList');
        }
        else {
            this.toggleModal('addNewList');
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


    /// new stuff


    newListItemInputHandler = (e, listId) => {

        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        matchedList.newListItemInput = e.target.value;
        this.setState({ lists });
    }

    addNewListItemHandler = (listId) => {

        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        matchedList.listItems.push({ name: matchedList.newListItemInput, id: keyGenerator(matchedList.newListItemInput) });
        matchedList.listItemFormOn = false;
        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

    }

    toggleListItemForm = (listId) => {

        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        matchedList.listItemFormOn = true;

        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

    }



    render() {



        const lists = this.state.lists.map((list) => {

            return <NewListCard
                name={list.name}
                key={list.id}
                id={list.id}
                items={list.listItems}
                listItemFormOn={list.listItemFormOn}
                toggleListItemForm={this.toggleListItemForm}
                newListItemInputHandler={this.newListItemInputHandler}
                addNewListItemHandler={this.addNewListItemHandler} />
        })


        return (
            <div className="App">

                {/* nav bar */}
                <Row style={{ marginLeft: '5px', marginTop: '5px', marginBottom: '5px' }}>  <Button outline color="link" style={{ marginLeft: '5px' }}
                    onClick={() => { this.props.history.push('/') }}>Return</Button>
                    <h2 style={{ marginLeft: '5px' }}>{this.state.name}</h2>
                </Row>

                <Row className='BoardRow'>

                    {lists}

                    <Button className='AddListButton' outline color="primary" onClick={() => { this.toggleModal('addNewList') }}> Add New List </Button>




                </Row>

                <TrelloModal type="addNewList" isOpen={this.state.addNewListModalOpen} toggleModal={this.toggleModal} addNewListInputHandler={this.addNewListInputHandler} addNewListHandler={this.addNewListHandler} ></TrelloModal>

                <Button onClick={() => { this.setState({ listItemModalOpen: !this.state.listItemModalOpen }) }}>test list item modal</Button>
                <TrelloModal type="listItem" isOpen={this.state.listItemModalOpen}></TrelloModal>


            </div>
        );
    }
}

export default Board;

const keyGenerator = (name) => {
    return `${name}${Date.now() * (Math.floor(Math.random() * 100))}`;
}