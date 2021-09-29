import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import connectionReducer from './connections';
import heartReducer from './hearts';
import messageReducer from './messages';
import profileReducer from './profile';
import replyReducer from './replies';
import session from './session'

const rootReducer = combineReducers({
  session,
  hearts: heartReducer,
  replies: replyReducer,
  profile: profileReducer,
  connections: connectionReducer,
  messages: messageReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
