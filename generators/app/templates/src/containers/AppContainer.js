import AppComponent from '../components/AppComponent';

import React from 'react';
import { connect } from 'react-redux';

import { navigateTo, back } from '../redux/actions/RouterAction';
import { PATH_ROOT } from '../constants/PathConstants';

const mapStateToProps = state => {
	return ({
		errors: state.error,
		router : state.router,
		historyLength : state.history.length
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		dispatch( navigateTo( PATH_ROOT, true ) );
	},
	onNavigateTo : ( routePath ) => {
		dispatch( navigateTo( routePath ) );
	},
	onBack : ( routePath ) => {
		dispatch( back() );
	}
});

//const App = hot( AppComponent );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	( props ) => <AppComponent {...props} />
);
