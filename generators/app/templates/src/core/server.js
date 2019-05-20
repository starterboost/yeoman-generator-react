const {io,feathers} = window;
var app;

const configureServer = ( options ) => {
	//stop being created multiple times - if big issue developer has to do a hard refresh
	if( app ) return app;
	
	const {REACT_APP_SERVER_URL,REACT_APP_USERNAME,REACT_APP_PASSWORD,REACT_APP_NAME} = options;
	//start up the feathersjs app
	// Socket.io is exposed as the `io` global.
	var socket = io(REACT_APP_SERVER_URL);
	// @feathersjs/client is exposed as the `feathers` global.
	app = feathers();

	app.configure(feathers.socketio(socket));
	app.configure(feathers.authentication({
		storage: localStorage,
		storageKey: `${REACT_APP_NAME||'feathers'}-jwt`
	}));
	const authenticate = () => {
		return app.authenticate()
		.catch( err => {
			console.log('Logging in using local strategy');
			return app.authenticate({
				strategy: 'local',
				email: REACT_APP_USERNAME,
				password: REACT_APP_PASSWORD
			})
		} )
	}

	socket.on("disconnect", () => console.log("disconnect") )
	socket.on("connect", () => {
		initData();
	} )

	var initialised = false;
	function initData(){
		authenticate()
		.then(() => {
			if( initialised ) return;
			initialised = true;
		})
		.then(() => {
			return app.service('api/regions').find()
			.then( console.log )
		})
	}

	return app;
}

export default configureServer;