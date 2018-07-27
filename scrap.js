//////////////////////////////////////// THIS IS FROM LIST CARD 

toggleClickedHandler = () => {
    this.setState({ addItemClicked: !this.state.addItemClicked });

}

inputHandler = (e) => {
    this.setState({ addInput: e.target.value });
}

resetAddForm = () => {
    //this function was created so the board is able to access it
    this.setState({ addInput: null, addItemClicked: false });
}

toggleListItemModal = () => {
    this.setState({ listItemModalOpen: !this.state.listItemModalOpen });
}

toggleListModal = () => {
    this.setState({ listModalOpen: !this.state.listModalOpen });
}

////////////////////////////////////// END OF LIST CARD

       //from state, create the lists to render to the dom
        // const lists = this.state.lists.map((list) => {
        //     return <ListCard name={list.name} key={list.id} id={list.id} listItems={list.listItems} addListItemHandler={this.addListItemHandler} modifyListItemHandler={this.modifyListItemHandler} deleteListItemHandler={this.deleteListItemHandler} editListModalHandler={this.editListModalHandler} />
        // })
