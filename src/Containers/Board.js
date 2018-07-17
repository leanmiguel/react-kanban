import React, { Component } from 'react';
import { Row, Button, } from 'reactstrap';
import ListCard from '../Components/ListCard/ListCard';
import AddListModal from '../Components/AddListModal/AddListModal';
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

    modifyListItemHandler = (e) => {
        console.log(e.target.value);
        console.log(this.state.lists);
    }
    addListItemHandler = (id, input, reset) => {
        let listItems = [...this.state.lists];
        //add the new list item to the add list
        let addListIndex = this.state.lists.findIndex((element) => {

            return element.id === id;

        });

        //if not empty
        if (input) {
            listItems[addListIndex].listItems.push({ name: input, description: '' });
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
            return <ListCard title={list.title} key={list.id} id={list.id} listItems={list.listItems} addListItemHandler={this.addListItemHandler} modifyListItemHandler={this.modifyListItemHandler} />
        })


        return (
            <div className="App">

                {/* nav bar */}
                <Row style={{ marginLeft: '5px' }}>  <Button outline color="link" style={{ marginLeft: '5px' }}>Return</Button>
                    <h2 style={{ marginLeft: '5px' }}>Board Name</h2>
                </Row>

                {/* Should be a media query for later, should wrap when the screen size is small. */}
                <Row style={{ marginLeft: '5px', flexWrap: (window.innerWidth > 500 ? 'nowrap' : 'wrap') }} >


                    {lists}

                    <Button outline color="primary" style={{ height: '6.7em' }} onClick={() => { this.toggleModal() }}> Add New List </Button>
                    <AddListModal isOpen={this.state.modalOpen} toggleModal={this.toggleModal} modalInputHandler={this.modalInputHandler} modalInputAddHandler={this.modalInputAddHandler}></AddListModal>


                </Row>



            </div>
        );
    }
}

export default Board;
