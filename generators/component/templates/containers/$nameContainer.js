import React from 'react';
import { connect } from 'react-redux';

import <%= name %>Component from '../components/<%= name %>Component';

<% if( reducerName ) { %>
import {} from '../redux/actions/<%= name %>Action';
<% } %>

const mapStateToProps = state => {
	return ({
		
	});
}

const mapDispatchToProps = dispatch => ({
	<% if( enableOnMount ) { %>onMount : function( props ){

	}, <% } %>
	<% if( enableOnUnmount ) { %>onUnmount : function( props ){

	},<% } %>
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	( props ) => <<%= name %>Component {...props} />
);
