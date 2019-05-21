import React from 'react';
import { connect } from 'react-redux';

import AppComponent from '../components/AppComponent';
import { navigateTo } from '../redux/actions/RouterAction';

const mapStateToProps = state => {
	return ({
		errors: state.error,
		router : state.router
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {

	},
	onNavigateTo : ( routePath ) => {
		dispatch( navigateTo( routePath ) );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	( props ) => <AppComponent {...props} />
);
