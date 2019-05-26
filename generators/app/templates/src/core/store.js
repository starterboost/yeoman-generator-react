
/*
 * store.js
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import createReducer from '../redux'; // aka this is your rootReducer
import { routerMiddleware } from 'connected-react-router';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const configureStore = ( options = {} ) => {
	const history = options.history;
	// //ensure we get a history object
	//console.assert( history, 'History reference expected' );
	//create the reducer
	const reducer = createReducer( {
		history
	} );
	//create the store
	const store = createStore(
		reducer, 
		composeWithDevTools(
			applyMiddleware(
				routerMiddleware( history ),
				thunk.withExtraArgument( options.extraArg || {} )
			)
		)
	);
	return store;
};

export default configureStore;