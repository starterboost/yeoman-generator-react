import { hot } from 'react-hot-loader/root';
/*eslint-env es6*/
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import _ from 'lodash';

import {Component} from '@starterboost/react-utilities/components';

import Styles from './styles/AppComponent.styl';

import {Button} from 'semantic-ui-react';

import {
	PATH_ROOT,
	/*INJECT:IMPORT_ROUTE_PATH*/
} from '../constants/PathConstants';

import LoginContainer from '../containers/LoginContainer';
import LogoutContainer from '../containers/LogoutContainer';
/*INJECT:IMPORT_COMPONENT*/

console.log( new Date() );

class AppComponent extends Component{

	onNavigateTo( path, props ){
		setTimeout(() => {
			if(_.isString( path )){
				this.props.onNavigateTo( path );
			}else{
				this.props.onNavigateTo( props['data-route-path'] );
			}
		},1);
	}
	
	componentDidMount(){
		this.props.onMount();
	}
	//const {location} = router;
	render(){
		const {router,historyLength,onBack} = this.props;
		const {location} = router;
		return (
			<div className={Styles.container}>
				<ul className={Styles.menu}>
					{historyLength > 0 && <li><Button primary inverted content='Back' icon='arrow left' onClick={onBack} /></li>}
					
					{_.map([
						{name:"Home",path:PATH_ROOT},
						/*INJECT:CONFIG_MENU*/	
					],(route, index) => {
						return <li key={index}><Button compact content={route.name} onClick={this.onNavigateTo} data-route-path={route.path} /></li>
					})}
					<li><LogoutContainer className={Styles.logout} /></li>
				</ul>
				<LoginContainer>
					<Switch location={location}>
						<Route exact path={PATH_ROOT} render={( route ) => {
							return <p>Welcome</p>
						}} />
						{/*INJECT:CONFIG_ROUTE*/}	
						<Route render={() => this.onNavigateTo( PATH_ROOT ) } />
					</Switch>
				</LoginContainer>
			</div>
		);
	}
}

AppComponent.propTypes = {
	onNavigateTo : PropTypes.func.isRequired,
	onBack : PropTypes.func.isRequired,
	router : PropTypes.object.isRequired,
	historyLength : PropTypes.number.isRequired
}

export default hot(AppComponent);
export { AppComponent, Styles as AppStyles };