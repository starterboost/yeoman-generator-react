import React from 'react';
import { connect } from 'react-redux';

import LoginComponent from '../components/LoginComponent';

import {
	initLogin,
	submitLogin
} from '../redux/actions/LoginAction';


const mapStateToProps = state => {
	return ({
		isLoggedIn : state.login.isLoggedIn,
		error : state.login.error
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : function( props ){
		//try to authenticate
		dispatch( initLogin() );
	}, 
	onSubmit : function( email, password ){
		dispatch( submitLogin( email, password ) );
	}
	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	( props ) => <LoginComponent {...props} />
);
