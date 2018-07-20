import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Board from '../../Containers/Board/Board';
import Boards from '../../Containers/Boards/Boards';
const router = () => (

    <BrowserRouter>
        <Switch>
            <Route
                exact path="/"
                component={Boards}>
            </Route>
            <Route path="/board/:boardName/:boardId" component={Board}></Route>
        </Switch>
    </BrowserRouter>



)

export default router;