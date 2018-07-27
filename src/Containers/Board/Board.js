import React, { Component } from 'react';
import { Row, Button, } from 'reactstrap';
import ListCard from '../../Components/ListCard/ListCard';
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

            listModalOpen: false,       //modal used for editing the list modal
            listItemModalOpen: false,   // modal used for editing a list item, which contains the description.
            currentItem: null
        })
    }

    toggleModal = (type) => {
        if (type === "addNewList") {
            this.setState({ addNewListModalOpen: !this.state.addNewListModalOpen });
        }
        if (type === "listItem") {
            this.setState({ listItemModalOpen: !this.state.listItemModalOpen });
        }
        if (type === "list") {
            this.setState({ listModalOpen: !this.state.listModalOpen });
        }
    }

    addNewListInputHandler = (e) => {
        this.setState({ addNewListInput: e.target.value });
    }

    addNewListHandler = () => {
        let lists = [...this.state.lists];
        lists.push({ name: this.state.addNewListInput, listItems: [], id: keyGenerator(this.state.addNewListInput), listItemFormOn: false, newListItemInput: null, });

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

    /// List Item stuff

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

        matchedList.listItems.push({ name: matchedList.newListItemInput, description: '', id: keyGenerator(matchedList.newListItemInput) });
        matchedList.listItemFormOn = false;
        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

    }

    toggleListItemForm = (listId) => {

        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        matchedList.listItemFormOn = !matchedList.listItemFormOn; //invert the state

        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

    }

    setCurrentItem = (listId, listItemId) => {


        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })


        if (listItemId !== undefined) {
            const matchedListItem = matchedList.listItems.find((item) => {
                return item.id === listItemId;
            })
            this.setState({ currentItem: { listId: listId, listItem: matchedListItem } });
        }

        else {
            this.setState({ currentItem: matchedList });
        }

    }

    modifyListItemHandler = (e, listId, listItemId) => {
        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        const matchedListItem = matchedList.listItems.find((item) => {
            return item.id === listItemId;
        })

        matchedListItem.description = e.target.value;
        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));
    }


    deleteListItemHandler = (listId, listItemId) => {


        // copy the current state of lists for immutability
        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        const matchedListItemIndex = matchedList.listItems.findIndex((item) => {
            return item.id === listItemId;
        })

        matchedList.listItems.splice(matchedListItemIndex, 1);
        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));
        this.toggleModal('listItem')

    }

    // list functions

    modifyListHandler = (e, listId) => {


        // copy the current state of lists for immutability
        let lists = [...this.state.lists];

        const matchedList = lists.find((list) => {
            return list.id === listId;
        })

        matchedList.name = e.target.value;
        matchedList.id = keyGenerator(e.target.value);

        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));

    }

    deleteListHandler = (listId) => {

        let lists = [...this.state.lists];

        const matchedListIndex = lists.findIndex((list) => {
            return list.id === listId;
        })

        lists.splice(matchedListIndex, 1);

        this.setState({ lists });
        localStorage.setItem(this.props.match.params.boardId, JSON.stringify(lists));
        this.toggleModal('list')
    }

    render() {

        const lists = this.state.lists.map((list) => {

            return <ListCard
                name={list.name}
                key={list.id}
                id={list.id}
                items={list.listItems}
                listItemFormOn={list.listItemFormOn}
                toggleListItemForm={this.toggleListItemForm}
                newListItemInputHandler={this.newListItemInputHandler}
                addNewListItemHandler={this.addNewListItemHandler}
                modifyListItemHandler={this.modifyListItemHandler}
                setCurrentItem={this.setCurrentItem}
                toggleListItemModal={this.toggleModal}
            />


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

                <TrelloModal type="listItem" isOpen={this.state.listItemModalOpen} currentItem={this.state.currentItem} toggleModal={this.toggleModal} modifyListItemHandler={this.modifyListItemHandler} deleteListItemHandler={this.deleteListItemHandler}></TrelloModal>

                <TrelloModal type="list" isOpen={this.state.listModalOpen} currentItem={this.state.currentItem} toggleModal={this.toggleModal} modifyListHandler={this.modifyListHandler} deleteListHandler={this.deleteListHandler} ></TrelloModal>


            </div>
        );
    }
}

export default Board;

const keyGenerator = (name) => {
    return `${name}${Date.now() * (Math.floor(Math.random() * 100))}`;
}