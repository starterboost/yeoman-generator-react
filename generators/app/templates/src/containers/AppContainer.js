import React from 'react';
import { connect } from 'react-redux';

import AppComponent from '../components/AppComponent';

import {test} from '../redux/actions/ErrorActions';


const mapStateToProps = state => {
	return ({
		errors: state.error
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		dispatch( test() )
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	( props ) => <AppComponent {...props} />
);
