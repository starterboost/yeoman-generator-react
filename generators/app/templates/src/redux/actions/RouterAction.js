import { push } from 'connected-react-router';

/*INJECT:ACTION*/
export const navigateTo = ( path ) => {
	return push( path ); 
}