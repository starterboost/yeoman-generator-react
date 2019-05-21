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
	}

	async prompting() {
		//get the list of available components
		const files = await fs.readdirAsync( this.destinationPath('src/containers') );
		const components = _.filter( _.map( files, ( file ) => {
			if( file != 'AppContainer.js' && path.extname( file ) == '.js' ){
				return path.basename( file, path.extname( file ) );
			}

			return null;
		} ) );

		//get a list of generators available
		const answers = await this.prompt([
			{
				type: "input",
				name: "routePath",
				message: "Your route path (/containers/:containerId)"
			},
			{
				type: "list",
				name: "component",
				message : "Select the component for this route",
				choices: _.concat( components, [
					{name : 'other...', value: false }
				] )
			}
		]);
		//variables we'll use next
		const {routePath,component} = answers;

		//pull out the path parts
		const REGEX_PATH_PART = /^:([a-zA-Z]+)/;
		const parts = _.filter( _.map( routePath.split('/'), ( part ) => {
			if( REGEX_PATH_PART.test( part ) ){
				return REGEX_PATH_PART.exec( part )[1];
			}

			return null;
		} ) );

		const NAME = `PATH_${_.kebabCase( routePath ).toUpperCase().replace(/\-/g,'_')}`;

		const values = {NAME,parts,component,routePath};
		this.log( values );
		
		await this._injectTpls([
			'config_menu.js',
			'config_route.js',
			'import_component.js',
			'import_route_path.js'
		], `src/components/AppComponent.js`,
			values
		);
		
		await this._injectTpls([
			'define_route_path.js',
		], `src/constants/PathConstants.js`,
			values
		);
	}
};