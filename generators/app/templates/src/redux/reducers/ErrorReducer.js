import {
	/*INJECT:IMPORT_ACTION_TYPE*/
	ERROR_SHOW, ERROR_HIDE,
} from '../actions/ErrorAction';

import {
	CreateReducer
} from '../utils/ReducerUtil';

/*START:INIT_STATE*/
const INITIAL_STATE = {message:null};
/*END:INIT_STATE*/

const reducer = CreateReducer(INITIAL_STATE, {
	/*INJECT:REDUCER*/
	[ERROR_SHOW] : (state, action) => {
		const {error} = action; 
		state.message = String( error.message || error);
		return state; 
	},
	[ERROR_HIDE] : (state, action) => {
		state.message = null;
		return state; 
	}
});

export default reducer;