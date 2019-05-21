import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ClassNames} from '@starterboost/react-utilities/styles';

import './styles/ButtonComponent.scss';

class ButtonComponent extends Component{

	/**
	 * @memberOf ContainersComponent
	 * @function onClick
	 * @prop evt {Event}
	 * @returns {JSXElement}
	 */
	onClick = ( evt ) => {
		this.props.onClick( evt, this.props );
	}

	/**
	 * @memberOf ContainersComponent
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className,content,primary} = this.props;
		return (<div 
			onClick={this.onClick}
			className={ClassNames(
				"button",
				primary?"primary":null,
				className,
			)}>
			{content}
		</div>)
	}
}

ButtonComponent.propTypes = {
	className : PropTypes.string,
	content : PropTypes.string.isRequired,
	primary : PropTypes.bool,
	onClick : PropTypes.func,
}

ButtonComponent.defaultProps = {
	primary: false,
	onClick: () => console.warn('onClick not implemented')
}

export default ButtonComponent;
export { ButtonComponent };
