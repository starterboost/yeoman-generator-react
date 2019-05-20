import React from 'react';
import { connect } from 'react-redux';

import <%= name %>Component from '../components/<%= name %>Component';

const mapStateToProps = state => {
	return ({
		<% if( reducerName ) { %><% if( type == 'items' ) { %>items : state.<%= reducerName %><% }else{ %>data : state.<%= reducerName %><% } %><% } %>
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
