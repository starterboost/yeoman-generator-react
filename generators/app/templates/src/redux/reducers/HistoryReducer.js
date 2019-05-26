import {
	/*INJECT:IMPORT_ACTION_TYPE*/
	HISTORY_CLEAR,
	HISTORY_POP,
	HISTORY_PUSH,
} from '../actions/HistoryAction';

import {
	CreateReducer
} from '../utils/ReducerUtil';

const INITIAL_STATE = {
	length: 0
};

const reducer = CreateReducer( INITIAL_STATE, {
	/*INJECT:REDUCER*/
	[HISTORY_CLEAR] : (state, action) => {
		//modify your state
		state.length = 0;
		//return state for changes to be applied to the immutable state
		return state; 
	},
	[HISTORY_POP] : (state, action) => {
		//modify your state
		state.length = Math.max( state.length - 1, 0 );
		//return state for changes to be applied to the immutable state
		return state; 
	},
	[HISTORY_PUSH] : (state, action) => {
		//modify your state
		state.length++;
		//return state for changes to be applied to the immutable state
		return state; 
	},
} );

export default reducer;