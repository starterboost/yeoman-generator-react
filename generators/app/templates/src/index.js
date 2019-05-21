import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import configureHistory from './core/history';
import configureStore from './core/store';
import configureServer from './core/server';
import * as serviceWorker from './core/serviceWorker';

import App from './containers/AppContainer';

const history = configureHistory();

const store = configureStore({
	history: history,
	extraArg : {
		server : configureServer( process.env )
	}
});

console.log('app started...', new Date().toUTCString() );

const rootEl = document.getElementById('root');
const render = Component => {
	return ReactDOM.render(
		<Provider store={store}>
      <ConnectedRouter history={history}>
				<Router>
					<Component />
				</Router>
      </ConnectedRouter>
    </Provider>,
    rootEl
	);
};

render( App );

if (module.hot) {
	module.hot.accept('./containers/AppContainer', () => {
		const NextApp = require('./containers/AppContainer').default
		render( NextApp );
	})
}

serviceWorker.unregister();


