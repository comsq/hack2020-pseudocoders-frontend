import ReactDOM from 'react-dom';
import React from 'react';
import { App } from 'src/components/App/App';
import { configure } from 'mobx';

configure({
    reactionScheduler(f) {
        setTimeout(f); // https://habr.com/ru/company/mailru/blog/522312/#comment_22162136
    },
    enforceActions: 'never',
});

function renderApp() {
    ReactDOM.render(<App />, document.querySelector('#root'));
}

renderApp();
