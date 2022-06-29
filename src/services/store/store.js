import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers/index';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, composedEnhancer);
