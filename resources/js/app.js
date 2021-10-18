require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import RouterHome from './frontComponents/routerHome';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import './frontComponents/helpers/customs_style.css';
import history from "./frontComponents/helpers/history";

const store = createStore(reducer);

if (document.getElementById('app')) {

    ReactDOM.render( <Provider  store={store}><RouterHome   /></Provider> , document.getElementById('app'));
}
