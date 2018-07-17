import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App'; 
import Board from './Containers/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
