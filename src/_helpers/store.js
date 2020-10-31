import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../_reducers';

const middleWares = [thunkMiddleware];

let composeEnhancers = compose;

export const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(
		...middleWares
	)
));