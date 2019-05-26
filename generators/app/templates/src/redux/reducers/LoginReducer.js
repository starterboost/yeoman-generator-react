import {
	/*INJECT:IMPORT_ACTION_TYPE*/
	LOGIN_ERROR_CLEAR,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
} from '../actions/LoginAction';

import {
	CreateReducer
} from '../utils/ReducerUtil';

const INITIAL_STATE = {
	isLoggedIn : false,
	error : null
};

const reducer = CreateReducer( INITIAL_STATE, {
	/*INJECT:REDUCER*/
	[LOGIN_ERROR_CLEAR] : (state, action) => {
		//modify your state
		state.error = null;
		//return state for changes to be applied to the immutable state
		return state; 
	},
	[LOGOUT_SUCCESS] : (state, action) => {
		//modify your state
		state.isLoggedIn = false;
		state.error = null;
		//return state for changes to be applied to the immutable state
		return state; 
	},
	[LOGOUT_FAIL] : (state, action) => {
		//modify your state
		state.error = action.error;
		//return state for changes to be applied to the immutable state
		return state; 
	},
	[LOGIN_FAIL] : (state, action) => {
		//modify your state
		state.isLoggedIn = false;
		state.error = action.error;
		//return state for changes to be applied to the immutable state
		return state; 
	},
	[LOGIN_SUCCESS] : (state, action) => {
		//modify your state
		state.isLoggedIn = true;
		state.error = null;
		//return state for changes to be applied to the immutable state
		return state; 
	},
} );

export default reducer;