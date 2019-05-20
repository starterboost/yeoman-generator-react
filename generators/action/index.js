const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra-promise');

const Generator = require('yeoman-generator');
const Promise = require('bluebird');

module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);
	}

	async prompting() {
		//get a list of generators available
		const dirActions = this.destinationPath(`redux/actions`);
		const exists = await fs.existsAsync( dirActions );

		if( !exists ){
			console.log('Could not find the required directory "redux/actions"...');
		}else{
			//list the actions that already exist
			const actions = await fs.readdirAsync( dirActions ).then( actions => {
				actions = _.map( actions, action => _.first( _.slice( /^([A-Za-z]+)Action.js$/.exec(action), 1 ) ) );
				actions = _.filter( actions );
				return actions;
			} );
			
			if( _.size( actions ) == 0 ){
				console.log('No ActionReducer exists yet, create using the "reducer" generator...');
			}else{
				const {action,type} = await this.prompt([
					{
						message: "Select target...",
						type: "list",
						name: "action",
						choices : actions
					},
					{
						message: "Select type...",
						type: "list",
						name: "type",
						choices : [
							{name:'Action => Reducer',value:'action-reducer'},
							{name:'Pure Action',value:'action'},
						]
					}
				]);

				
				//action-reducer is the complete definition of action_type and reducer/handler
				const namePrefix = type == "action-reducer" ? `${action.toUpperCase()}_` : '';
				//ASK FOR THE NAME OF THE ACTION
				var {name,exportDefinition} = await this.prompt([
					{
						message: "Action name ...",
						type: "input",
						name: "name",
						suffix: namePrefix
					},
					{
						message: "Export definition...",
						type: "confirm",
						name: "exportDefinition",
						default: true
					}
				]);
				
				name = `${namePrefix}${name}`;
				name =  _.capitalize( name ).substring( 0, 1 ) + _.camelCase( name ).substring( 1 );
				const NAME = _.kebabCase( name ).replace(/\-/,'_').toUpperCase();
				const nameCamelCase = _.camelCase( name );
				console.log( name, NAME, nameCamelCase );
				
				
				switch( type ){
					case 'action-reducer':
					break;
					case 'action':
					break;
				}

			}
		}


	}
}