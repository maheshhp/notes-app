import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Store from './redux/store';
import Reducer from './redux/reducers';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store(Reducer)}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
