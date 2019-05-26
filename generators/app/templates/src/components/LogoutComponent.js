import { hot } from 'react-hot-loader';

import React from 'react';
import PropTypes from 'prop-types';

import {Component} from '@starterboost/react-utilities/components';
import { Button } from 'semantic-ui-react';

class LogoutComponent extends Component{
	
	
	/**
	 * @memberOf LogoutComponent
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {isLoggedIn, onLogout, className} = this.props;
		return (isLoggedIn ? 
			<Button className={className} content='Exit' color='red' icon='external' compact onClick={onLogout} />
			: null )
	}
}

LogoutComponent.propTypes = {
	className : PropTypes.string,
	isLoggedIn : PropTypes.bool.isRequired,
	onLogout : PropTypes.func.isRequired
	
}

LogoutComponent.defaultProps = {

}

export default hot(module)(LogoutComponent);
export { LogoutComponent };
