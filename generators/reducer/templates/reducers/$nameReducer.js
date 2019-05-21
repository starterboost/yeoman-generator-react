import {
	/*INJECT:IMPORT_ACTION_TYPE*/
} from '../actions/<%= name %>Action';

import {
	CreateReducer, AddItem, UpdateItem, RemoveItem
} from '../utils/ReducerUtil';

const INITIAL_STATE = {
	
};

const reducer = CreateReducer( INITIAL_STATE, {
	/*INJECT:REDUCER*/
} );

export default reducer;