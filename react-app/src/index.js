import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { BrowserRouter } from 'react-router-dom';
import * as heartActions from './store/hearts'

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
    window.store = store;
  }

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.heartActions = heartActions
  }
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ModalProvider>
             <App />
        </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
