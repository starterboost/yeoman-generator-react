import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ClassNames} from '@starterboost/react-utilities/styles';

import Styles from './styles/<%= name %>Component.module.scss';

class <%= name %>Component extends Component{
	
	state = {
	}

	/**
	 * @memberOf <%= name %>Component
	 * @function componentDidMount
	 * @returns {JSXElement}
	 */
	componentDidMount = () => {
		<% if( enableOnMount ) { %>this.props.onMount( this.props );<% } %>
	}

	/**
	 * @memberOf <%= name %>Component
	 * @function componentWillUnmount
	 * @returns {JSXElement}
	 */
	componentWillUnmount = () => {
		<% if( enableOnUnmount ) { %>this.props.onUnmount( this.props );<% } %>
	}

	/**
	 * @memberOf <%= name %>Component
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {<% if( type ) { %><%= type %>,<% } %>className} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
			
		</div>)
	}
}

<%= name %>Component.propTypes = {
	className : PropTypes.string,
	<% if( type == 'data' ) { %>data : PropTypes.object.isRequired,<% } %>
	<% if( type == 'items' ) { %>items : PropTypes.array.isRequired,<% } %>
	<% if( enableOnMount ) { %>onMount: PropTypes.func.isRequired,<% } %>
	<% if( enableOnUnmount ) { %>onUnmount: PropTypes.func.isRequired,<% } %>
}

<%= name %>Component.defaultProps = {

}

export default <%= name %>Component;
export { <%= name %>Component,Styles as <%= name %>Styles };
