import React from 'react';
import ReactDOM from 'react-dom';

import './index.styl';

//import App from './components/AppComponent';
import App from './containers/AppContainer';
import { ConnectedRouter } from 'connected-react-router'


import { Provider } from 'react-redux';

import * as ServiceWorker from './core/service-worker';
import configureHistory from './core/history';
import configureStore from './core/store';
import configureServer from './core/server';

const history = configureHistory();


const store = configureStore({
	history,
	extraArg : {
		server : configureServer( process.env )
	}
});


ReactDOM.render(<Provider store={store}>
	<ConnectedRouter history={history}>
		<App />
	</ConnectedRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();
