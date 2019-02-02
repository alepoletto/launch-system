import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import 'semantic-ui-css/semantic.min.css';
import './index.scss'
import * as serviceWorker from './serviceWorker';
import Header from './features/Header'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <div>
        <Header/>
        <App />
      </div>

    </AppContainer>,
    document.getElementById('root')
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
