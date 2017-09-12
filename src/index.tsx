import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { State, formApp } from './reducers/index';
import AppContainer from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore<State>(formApp, window['devToolsExtension'] && window['devToolsExtension']());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});

registerServiceWorker();
