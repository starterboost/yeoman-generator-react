import { replace, push, goBack } from 'connected-react-router';
import { historyClear, historyPush, historyPop } from './HistoryAction';

/*INJECT:ACTION*/
export const navigateTo = ( path, boolReplace = false ) => {
	return ( dispatch, getState ) => {
		dispatch( boolReplace ? replace( path ) : push( path ) );
		dispatch( boolReplace ? historyClear() : historyPush() ); 
	}
}

export const back = ( ) => {
	return ( dispatch, getState ) => {
		dispatch( goBack() );
		dispatch( historyPop() ); 
	} 
}