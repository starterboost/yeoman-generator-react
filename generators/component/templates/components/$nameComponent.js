import { hot } from 'react-hot-loader';

import React from 'react';
import PropTypes from 'prop-types';

import {ClassNames} from '@starterboost/react-utilities/styles';
import {Component} from '@starterboost/react-utilities/components';

import Styles from './styles/<%= name %>Component.styl';

class <%= name %>Component extends Component{
	
	state = {
	}

	/**
	 * @memberOf <%= name %>Component
	 * @function componentDidMount
	 * @returns {JSXElement}
	 */
	componentDidMount(){
		<% if( enableOnMount ) { %>this.props.onMount( this.props );<% } %>
	}

	/**
	 * @memberOf <%= name %>Component
	 * @function componentWillUnmount
	 * @returns {JSXElement}
	 */
	componentWillUnmount(){
		<% if( enableOnUnmount ) { %>this.props.onUnmount( this.props );<% } %>
	}

	/**
	 * @memberOf <%= name %>Component
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
			<h1><%= name %></h1>
		</div>)
	}
}

<%= name %>Component.propTypes = {
	className : PropTypes.string,
	<% if( enableOnMount ) { %>onMount: PropTypes.func.isRequired,<% } %>
	<% if( enableOnUnmount ) { %>onUnmount: PropTypes.func.isRequired,<% } %>
}

<%= name %>Component.defaultProps = {

}

export default hot(module)(<%= name %>Component);
export { <%= name %>Component,Styles as <%= name %>Styles };
