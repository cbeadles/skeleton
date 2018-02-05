import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from '../redux/Store/configureStore';

const store = configureStore();

function renderApp(name, App) {
  const container = document.getElementById(`${name}-app-container`);
  if (container) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      , container
    );
  }
}

export default function renderApps(apps) {
  Object.keys(apps).forEach((name) => {
    renderApp(name, apps[name]);
  });
}
