
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

const render = Component => {
	return ReactDOM.render(
		<Provider store={store}>
      <ConnectedRouter history={history}>
				<Router>
					<Component />
				</Router>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
	);
};

render( App );

serviceWorker.unregister();


