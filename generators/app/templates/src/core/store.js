
/*
 * store.js
 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import createReducer from '../redux'; // aka this is your rootReducer
import { routerMiddleware } from 'connected-react-router';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = ( options = {} ) => {
	const history = options.history;
	//ensure we get a history object
	console.assert( history, 'History reference expected' );
	//create the reducer
	const reducer = createReducer( history );
	//create the store
	const store = createStore(
		reducer, 
		compose(
			applyMiddleware(
				routerMiddleware( history ),
				thunk.withExtraArgument( options.extraArg || {} )
			),
			reduxDevTools,
		)
	);
	return store;
};

export default configureStore;