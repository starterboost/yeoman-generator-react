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
			const exists = await fs.existsAsync( appDir );
			//confirm the app doesn't exist already
			if( exists ){
				this.log(`App '${name}' already exists`);
			}else{
				const {username,password} = await this.prompt([
					{
						type: "input",
						name: "username",
						message: "Authentication username"
					},
					{
						type: "input",
						name: "password",
						message: "Authentication password"
					}
				]);

				await fs.mkdirAsync( appDir );
				//reset the destination root
				this.destinationRoot( appDir );
				await this.config.save();
				//now copy over the files
				await this.copyTplDir({name,username,password});
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

			//call the generator that was requested
			this.composeWith(`starterboost-react:${generator}`, {});

		}

	}
};