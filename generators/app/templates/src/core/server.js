const _ = require('lodash');
const Promise = require('bluebird');

const {io,feathers} = window;
var app;

function DeferredPromise( handler ){

	this.promise = new Promise( ( resolve, reject ) => {
		this.resolve = resolve;
		this.reject = reject;
	} );

	this.trigger = () => {
		( handler ? handler() : Promise.resolve() ).then( this.resolve, this.reject );
	}
}

const configureServer = ( options ) => {
	//stop being created multiple times - if big issue developer has to do a hard refresh
	if( app ) return app;
	
	const {
		REACT_APP_SERVER_URL,REACT_APP_NAME
		,REACT_APP_USERNAME,REACT_APP_PASSWORD
	} = options;
	//start up the feathersjs app
	// Socket.io is exposed as the `io` global.
	var socket = io(REACT_APP_SERVER_URL);
	// @feathersjs/client is exposed as the `feathers` global.
	app = feathers();

	app.configure(feathers.socketio(socket));
	app.configure(feathers.authentication({
		storageKey : `${REACT_APP_NAME||'feathers'}-jwt`,
		storage:localStorage
	}));

	var numAuthenticationRequests = 0;
	var authenticated = false;

	const authenticate = () => {
		if( numAuthenticationRequests > 0 ){
			const defer = new DeferredPromise();
			addQuery( () => {
				//trigger the deferred promise after the authentication ompletes
				defer.trigger();
			} )
			return defer.promise;
		}
		numAuthenticationRequests++;
		authenticated = authenticated || false;
		//console.log('authenticate', numAuthenticationRequests);
		return app.authenticate()
		//EXPECT THE USER TO LOG US IN
		.catch( err => {
			if( REACT_APP_USERNAME && REACT_APP_PASSWORD ){
				console.log('Login using supplied props')
				//login automatically
				return app.authenticate({
					strategy: 'local',
					email: REACT_APP_USERNAME,
					password: REACT_APP_PASSWORD
				});
			}else{
				//re-throw this error
				throw err;
			}
		} )
		.then(
			() => {
				authenticated = true;
				app.emit('loggedIn');
				numAuthenticationRequests--;
				processQueries();
			}, 
			() => {
				authenticated = false;
				app.emit('loggedOut');
				numAuthenticationRequests--;
				//reattempt if required
				// Promise.delay( 5000 ).then( () => {
				// 	if( numAuthenticationRequests === 0 ){
				// 		authenticate();
				// 	}
				// });
			}
		);
	}

	socket.on("disconnect", () => console.log("disconnect") )
	socket.on("connect", () => {
		authenticate();
	} );
	
	var queries = [];

	const addQuery = ( query ) => {
		queries.push( query );
		//if not authenticating at the moment then call it
		if( numAuthenticationRequests === 0 ){
			authenticate();
		}
	}

	const processQueries = () => {
		//any queries that are hanging can be actioned
		_.each( queries, query => query() );
		//reset the queries
		queries = [];
	}

	app.queryService = ( id ) => {

		const query = ( type ) => {
			return ( ...args ) => {
				var iresolve, ireject;
				//this is the promise we return back to the user
				const promise = new Promise(( resolve, reject ) => {
					//we hold off doing anything until our query stub is called back
					iresolve = resolve;
					ireject = reject;
				});

				//this is the query we add
				addQuery(() => {
					//now we're free to carry on
					const service = app.service( id );
					//call the service and map the reject and resolve methods from before
					service[type].apply( service, args ).then( iresolve, ireject );
				});

				return promise;
			}
		}

		return {
			get : query('get'),
			find: query('find'),
			create: query('create'),
			update: query('update'),
			patch: query('patch'),
			remove: query('remove')
		}
	}

	app.queryLoginStatus = () => {
		if( authenticated ){
			return Promise.resolve( true );
		}else{
			var iresolve;
			//this is the promise we return back to the user
			const promise = new Promise(( resolve ) => {
				//we hold off doing anything until our query stub is called back
				iresolve = resolve;
			});

			//only allow the query 5 seconds to complete
			setTimeout( () => {
				if( iresolve ){
					iresolve( false );
				}
				iresolve = null;
			}, 5000 );
			
			//this is the query we add
			addQuery(() => {
				if( iresolve ){
					iresolve( authenticated );
				}
				iresolve = null;
			});
	
			return promise;
		}
	}

	//add simplified login/logout methods to the app
	app.login = ( email, password ) => {
		numAuthenticationRequests++;
		//authenticate the user against the local strategy
		return app.authenticate({
			strategy: 'local',
			email: email,
			password: password
		})
		.then( 
			() => {
				numAuthenticationRequests--;
				processQueries();
			},
			( err ) => {
				numAuthenticationRequests--;
				throw err;
			}
		);
	}

	return app;
}

export default configureServer;