/*INJECT:CONST_ACTION_TYPE*/
export const ERROR_SHOW = 'ERROR_SHOW';
export const ERROR_HIDE = 'ERROR_HIDE';

/*INJECT:ACTION*/
export const showError = ( error ) => ({
	type : ERROR_SHOW,
	error
})

export const hideError = ( ) => ({
	type : ERROR_HIDE
})

//wrapper that will bind to any promise and auto handle any error produced
export const catchError = (dispatch, promise) =>  {
	return promise.catch( err => {
		console.log('Catch', err);
		dispatch( showError( err ) )
	});
}

export const test = () =>  {
	return (dispatch, getState, other) => {
		console.log('test', other);
	}
}
