import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { BrowserRouter } from 'react-router-dom';
import * as heartActions from './store/hearts'
import * as replyActions from './store/replies'
import  * as connectionActions from './store/connections'
import * as messageActions from './store/messages'

import AlertProvider from './context/Alert';
import SocketProvider from './context/Socket';
const store = configureStore();
if (process.env.NODE_ENV !== "production") {
    window.store = store;
  }

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.heartActions = heartActions
    window.replyActions = replyActions
    window.connectionActions = connectionActions
    window.messageActions = messageActions
  }
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <SocketProvider>
        <AlertProvider>
        <ModalProvider>
             <App />
        </ModalProvider>
        </AlertProvider>
        </SocketProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
