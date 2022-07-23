import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers/index';
import wsMiddleware from '../middleware/ws-middleware';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, wsMiddleware()));
export const store = createStore(rootReducer, composedEnhancer);
