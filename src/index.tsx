import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';

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

function renderApp() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.querySelector('#root'),
    );
}

renderApp();
