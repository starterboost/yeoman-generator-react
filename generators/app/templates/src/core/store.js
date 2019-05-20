
/*
 * store.js
 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../redux'; // aka this is your rootReducer

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = ( options = {} ) => {
	//create the store
	const store = createStore(
		reducer, 
		compose(
			applyMiddleware(thunk.withExtraArgument( options.extraArg || {} )),
			reduxDevTools,
		)
	);

	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
		module.hot.accept('../redux', () => {
			store.replaceReducer(reducer);
		});
		}
	}

	return store;
};

export default configureStore;