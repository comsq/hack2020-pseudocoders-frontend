import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';
import axios from 'axios';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
configure({
    reactionScheduler(f) {
        setTimeout(f); // https://habr.com/ru/company/mailru/blog/522312/#comment_22162136
    },
    enforceActions: 'never',
});

axios.defaults.baseURL = 'https://api.pseudocoders.online/';

function renderApp() {
    ReactDOM.render(<App />, document.querySelector('#root'));
}

renderApp();
