import React, { Component } from 'react';
import { Row, Button, } from 'reactstrap';
import ListCard from '../Components/ListCard/ListCard';
import AddListModal from '../Components/AddListModal/AddListModal';
import classes from './Board.css';

class Board extends Component {

    state = {

        name: null,
        lists: [],
        modalOpen: false,
        modalInput: null,

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

        this.setState({ lists });



    }


    addListItemHandler = (id, input, reset) => {
        let listItems = [...this.state.lists];
        //add the new list item to the add list
        let addListIndex = this.state.lists.findIndex((element) => {

            return element.id === id;

        });

        //if not empty
        if (input) {
            listItems[addListIndex].listItems.push({ name: input, description: '', id: `${input}${Date.now() * (Math.floor(Math.random() * 100))}` });
            reset();
        }
        else {
            alert('Please add an item');
        }
        this.setState({ listItems });
    }

    render() {

        //from state, create the lists to render to the dom
        const lists = this.state.lists.map((list) => {
            return <ListCard title={list.title} key={list.id} id={list.id} listItems={list.listItems} addListItemHandler={this.addListItemHandler} modifyListItemHandler={this.modifyListItemHandler} deleteListItemHandler={this.deleteListItemHandler} />
        })

        console.log(classes);


        return (
            <div className="App">

                {/* nav bar */}
                <Row style={{ marginLeft: '17px', marginTop: '5px', marginBottom: '5px' }}>  <Button outline color="link" style={{ marginLeft: '5px' }}>Return</Button>
                    <h2 style={{ marginLeft: '5px' }}>Board Name</h2>
                </Row>

                {/* Should be a media query for later, should wrap when the screen size is small. */}         {/* update media queries dont work unless i do custom css and let go of react strap */}
                <Row className='BoardRow' >


                    {lists}

                    <Button className='AddListButton' outline color="primary" onClick={() => { this.toggleModal() }}> Add New List </Button>
                    <AddListModal isOpen={this.state.modalOpen} toggleModal={this.toggleModal} modalInputHandler={this.modalInputHandler} modalInputAddHandler={this.modalInputAddHandler} ></AddListModal>


                </Row>



            </div>
        );
    }
}

export default Board;

//  style={{ marginLeft: '5px', marginRight: '5px', flexWrap: (window.innerWidth > 500 ? 'nowrap' : 'wrap') }}