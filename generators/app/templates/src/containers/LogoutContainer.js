import React from 'react';
import { connect } from 'react-redux';

import LogoutComponent from '../components/LogoutComponent';

import {endLogin} from '../redux/actions/LoginAction';

const mapStateToProps = state => {
	return ({
		isLoggedIn : state.login.isLoggedIn
	});
}

const mapDispatchToProps = dispatch => ({
	onLogout : () => {
		dispatch( endLogin() );
	}
	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	( props ) => <LogoutComponent {...props} />
);
