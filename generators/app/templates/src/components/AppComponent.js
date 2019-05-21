/*eslint-env es6*/
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import _ from 'lodash';

import Styles from './styles/AppComponent.module.scss';

import {
	PATH_ROOT,
	/*<INJECT:IMPORT_ROUTE_PATH*/
} from '../constants/PathConstants';

import ButtonComponent from './ButtonComponent';
/*<INJECT:IMPORT_COMPONENT*/

class App extends Component {
	
	onNavigateTo = ( evt, props ) => {
		this.props.onNavigateTo( props['data-route-path'] );
	}
	
	/**
	 * @memberOf App
	 * @function render
	 * @returns {JSXElement}
	 */
	render() {
		const {router} = this.props;
		const {location} = router;
		return (
			<div className={Styles.container}>
				<ul className={Styles.menu}>
					{_.map([
						{name:"Home",path:PATH_ROOT},
						/*<INJECT:CONFIG_MENU*/	
					],(route, index) => {
						return <li key={index}><ButtonComponent onClick={this.onNavigateTo} content={route.name} data-route-path={route.path} /></li>
					})}
				</ul>
				<Switch location={location}>
					<Route exact path={PATH_ROOT} render={() => {
						return <h1>App</h1>
					}} />
					{/*<INJECT:CONFIG_ROUTE*/}
					<Route render={() => this.props.onNavigateTo( PATH_ROOT ) } />
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	onNavigateTo : PropTypes.func.isRequired
}

export default App;

export { App, Styles as AppStyles };

