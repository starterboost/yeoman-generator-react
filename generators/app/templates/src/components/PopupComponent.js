import { hot } from 'react-hot-loader';

import React from 'react';
import PropTypes from 'prop-types';

import {ClassNames} from '@starterboost/react-utilities/styles';
import {Component} from '@starterboost/react-utilities/components';

import Styles from './styles/PopupComponent.styl';

import {Header,Button,Segment} from 'semantic-ui-react';

class PopupComponent extends Component{
	
	state = {
	}

	/**
	 * @memberOf PopupComponent
	 * @function componentDidMount
	 * @returns {JSXElement}
	 */
	componentDidMount = () => {
		
	}

	/**
	 * @memberOf PopupComponent
	 * @function componentWillUnmount
	 * @returns {JSXElement}
	 */
	componentWillUnmount = () => {
		
	}

	/**
	 * @memberOf PopupComponent
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		const {className,title,onClose,children} = this.props;
		
		return (<div className={ClassNames( Styles.container, className )}>
			<div className={Styles.content}>
				<Header as='h3' className={Styles.header}>
					{title}
					{onClose && <Button icon='close' compact size='small' floated='right' onClick={onClose} />}
				</Header>
				<Segment className='clear'>
					{children}
				</Segment>
			</div>
		</div>)
	}
}

PopupComponent.propTypes = {
	className : PropTypes.string,
	title : PropTypes.string,
	onClose: PropTypes.func
	
}

PopupComponent.defaultProps = {

}

export default hot(module)(PopupComponent);
export { PopupComponent,Styles as PopupStyles };
