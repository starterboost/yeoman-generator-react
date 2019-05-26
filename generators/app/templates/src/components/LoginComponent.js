import { hot } from 'react-hot-loader';

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {ClassNames} from '@starterboost/react-utilities/styles';
import {Component} from '@starterboost/react-utilities/components';

import Styles from './styles/LoginComponent.styl';
import PopupComponent from './PopupComponent';
import { Form, Divider, Button } from 'semantic-ui-react';

class LoginComponent extends Component{
	
	state = {
		email: '',
		password: ''
	}

	/**
	 * @memberOf LoginComponent
	 * @function componentDidMount
	 * @returns {JSXElement}
	 */
	componentDidMount(){
		this.props.onMount( this.props );
	}
	
	/**
	 * @memberOf LoginComponent
	 * @function onSubmit
	 * @returns {JSXElement}
	 */
	onSubmit(){
		const {email,password} = this.state;
		this.props.onSubmit( email, password );
	}
	
	/**
	 * @memberOf LoginComponent
	 * @function onChange
	 * @returns {JSXElement}
	 */
	onChange( evt, props ){
		const {name,value} = props;
		this.setState({
			[name] : value
		});
	}

	/**
	 * @memberOf LoginComponent
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		const {className,isLoggedIn,error,children} = this.props;
		const {email,password} = this.state;
		
		if( isLoggedIn ){
			return <Fragment>
				{children}
			</Fragment>
		}

		return (<PopupComponent className={ClassNames(Styles.container,className)}>
			
			<h1>Login</h1>
			<Form.Field>
				<label>Email</label>
				<Form.Input fluid name='email' value={email} onChange={this.onChange} />
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<Form.Input type='password' fluid name={'password'} value={password} onChange={this.onChange} />
			</Form.Field>
			<Divider />

			{error && <Fragment>
				<p className={'error'}>{error}</p>
				<Divider />
			</Fragment>}
			<Button primary content='Submit' onClick={this.onSubmit} />
	
		</PopupComponent>)
	}
}

LoginComponent.propTypes = {
	className : PropTypes.string,
	onMount: PropTypes.func.isRequired,
	isLoggedIn : PropTypes.bool.isRequired
}

LoginComponent.defaultProps = {

}

export default hot(module)(LoginComponent);
export { LoginComponent,Styles as LoginStyles };
