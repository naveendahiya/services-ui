import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import configureStore from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import './styles/index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
  <React.StrictMode>
  <ToastContainer  />
  <App />
  </React.StrictMode>
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
