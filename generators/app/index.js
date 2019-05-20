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
		//if no package then we're not in an app - ask to create one
		if( !this.fs.exists( path.resolve( this.destinationRoot(), '.yo-rc.json' ) ) ){
			//get a list of generators available
			const answers = await this.prompt([
				{
					type: "input",
					name: "name",
					message: "Your project name"
				}
			]);
			//variables we'll use next
			const {name} = answers;
			const appDir = path.resolve( this.destinationRoot(), name );
			//confirm the app doesn't exist already
			if( this.fs.exists( appDir ) ){
				this.log(`App '${name}' already exists`);
			}else{
				await fs.mkdirAsync( appDir );
				this.destinationRoot( appDir );
				this.config.save();
			}
		}else{
			const {generator} = await this.prompt([
				{
					message: "I want to create...",
					type: "list",
					name: "generator",
					choices : [
						{
							name: "Container/Component",
							value : 'component'
						},
						{
							name: "Action/Reducer",
							value : 'reducer'
						},
						{
							name: "Action Type",
							value : 'action'
						},
					]
				}
			]);

			this.composeWith(`starterboost-react:${generator}`, {
			});

		}

	}
};