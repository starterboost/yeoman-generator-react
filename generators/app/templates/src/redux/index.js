
import _ from 'lodash';
import { combineReducers } from 'redux';
//iterate all the files

const REGEXP_REDUCER = /^\.\/reducers\/([a-zA-Z]+)Reducer$/;
function importAll (requireContext) {
  const output = {};
	requireContext.keys().forEach(key => {
		if( REGEXP_REDUCER.test(key) ){
      const reducerId = REGEXP_REDUCER.exec(key)[1]
      const reducerKey = _.camelCase(reducerId)
      console.log(`Binding Reducer '${reducerId}Reducer' to state.${reducerKey}`);
			let component = requireContext( key );
			output[reducerKey] = component.default;
		}
  });
  
  return output;
}

export default combineReducers(
  //dynamically finds all the reducers
  importAll(require.context('./', true))
);


