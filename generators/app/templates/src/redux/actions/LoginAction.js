/*INJECT:DEFINE_ACTION_TYPE*/
export const LOGIN_ERROR_CLEAR = "LOGIN_ERROR_CLEAR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

/*INJECT:ACTION*/
export const submitLogin = ( email, password ) => {
	return ( dispatch, getState, arg ) => {
		
		//clear the error
		dispatch( loginErrorClear() );
		
		arg.server.login( email, password )
		.then( () => {
			dispatch( loginSuccess() );
		} )
		.catch( ( err ) => {
			dispatch( loginFail( err.message ) );
		} );
	} 
}

export const endLogin = ( email, password ) => {
	return ( dispatch, getState, arg ) => {
		
		arg.server.logout()
		.then( () => {
			dispatch( logoutSuccess() );
		} )
		.catch( ( err ) => {
			dispatch( logoutFail( err ) );
		} );
	} 
}

export const initLogin = () => {
	return ( dispatch, getState, arg ) => {
		arg.server.queryLoginStatus()
		.then( status => {
			if( status ){
				dispatch( loginSuccess() );
			}else{
				dispatch( loginFail() );
			}
		});
	} 
}

/*INJECT:ACTION_REDUCER*/
export const loginErrorClear = () => ({
	type : LOGIN_ERROR_CLEAR
});

export const logoutSuccess = () => ({
	type : LOGOUT_SUCCESS,
});

export const logoutFail = (error) => ({
	type : LOGOUT_FAIL,
	error
});

export const loginFail = (error) => ({
	type : LOGIN_FAIL,
	error
});

export const loginSuccess = () => ({
	type : LOGIN_SUCCESS,
});

