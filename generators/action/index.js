const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra-promise');

const CustomGenerator = require('../../utils/CustomGenerator');
const Promise = require('bluebird');

module.exports = class extends CustomGenerator {
	// The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

		this.option('action', {type:String} );
		this.option('type', {type:String} );
	}

	async prompting() {
		//get a list of generators available
		const dirActions = this.destinationPath(`src/redux/actions`);
		const exists = await fs.existsAsync( dirActions );

		if( !exists ){
			console.log('Could not find the required directory "src/redux/actions"...');
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
				const answers = await this.prompt(_.filter([
					!this.options.action && {
						message: "Select target...",
						type: "list",
						name: "action",
						choices : actions
					},
					!this.options.type && {
						message: "Select type...",
						type: "list",
						name: "type",
						choices : [
							{name:'Action => Reducer',value:'action-reducer'},
							{name:'Pure Action',value:'action'},
						]
					}
				]));

				const options = _.pick( _.merge( answers, this.options ), [
					'action',
					'type',
				] );

				const {action,type} = options;

				//action-reducer is the complete definition of action_type and reducer/handler
				const ACTION =  action.toUpperCase().replace(/S$/,'');
				const defaultValue = type == "action-reducer" ? `${action.toUpperCase()}_LOADED` : undefined;
				var namePrefix = undefined;
				if( type == "action-reducer" ){
					var answer = await this.prompt([
						{
							message: "Action name prefix...",
							type: "list",
							name: "namePrefix",
							choices: [
								`${ACTION}_`,
								`${ACTION}S_`,
								{name:'other...', value:undefined}
							]
						}
					]);
					namePrefix = answer.namePrefix;	
				}

				//ASK FOR THE NAME OF THE ACTION
				var {name} = await this.prompt([
					{
						message: "Action name ...",
						type: "input",
						name: "name",
						suffix: namePrefix
					}
				]);
				
				//normalise the name
				name = `${namePrefix || ''}${name}`;
				name =  _.capitalize( name ).substring( 0, 1 ) + _.camelCase( name ).substring( 1 );
				const NAME = _.kebabCase( name ).replace(/\-/g,'_').toUpperCase();
				const nameCamelCase = _.camelCase( name );
				
				var {exportDefinition} = await this.prompt([
					{
						message: `Export definition '${NAME}'...`,
						type: "confirm",
						name: "exportDefinition",
						default: true
					}
				]);

				const values = {name,NAME,nameCamelCase,exportDefinition};

				switch( type ){
					case 'action-reducer':
						//reads the templates and then injects them into the target file - with the variables specified
						await this._injectTpls([
							'actions/define_action_type.js',
							'actions/action_reducer.js'
						], `src/redux/actions/${action}Action.js`,
							values 
						);
						
						await this._injectTpls([
							'reducers/import_action_type.js',
							'reducers/reducer.js'
						], `src/redux/reducers/${action}Reducer.js`,
							values
						);

					break;
					case 'action':
						await this._injectTpls([
							'actions/action.js'
						], `src/redux/actions/${action}Action.js`,
							values
						);
						
					break;
				}

				const {repeat} = await this.prompt([
					{
						message: `Create another reducer for '${action}'`,
						type: "confirm",
						name: "repeat",
						default: false
					}
				]);

				if( repeat ){
					this.composeWith('starterboost-react:action', options);
				}

			}
		}


	}
}