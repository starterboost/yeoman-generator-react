
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './core/store';
import configureServer from './core/server';
import * as serviceWorker from './core/serviceWorker';

import App from './containers/AppContainer';

const store = configureStore({
	extraArg : {
		server : configureServer( process.env )
	}
});

const render = Component => {
	return ReactDOM.render(
		<Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
	);
};

render( App );

serviceWorker.unregister();


