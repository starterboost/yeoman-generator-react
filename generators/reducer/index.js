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

		this.option('name', {type:String});
	}

	async prompting() {
		//get a list of generators available
		var answers = await this.prompt( _.filter([
			!this.options.name && {
				type: "input",
				name: "name",
				message: "Your reducer name",
				default: this.options.name
			}
		]) );

		const options = _.pick( _.merge( answers, this.options ), [
			'name',
		] );

		const {name} = options;

		//copy the actions over
		await this.fs.copyTpl(
			this.templatePath('actions/$nameAction.js'),
			this.destinationPath(`src/redux/actions/${name}Action.js`),
			options
		);
		
		//copy the reducers over
		await this.fs.copyTpl(
			this.templatePath('reducers/$nameReducer.js'),
			this.destinationPath(`src/redux/reducers/${name}Reducer.js`),
			options
		);

		//ask if they want a component creating with the same options
		const {createComponent} = await this.prompt( [
			{
				type: "confirm",
				name: "createComponent",
				message: `Create Container/Component called '${name}'`,
				default: name
			}
		] );

		if( createComponent ){
			//pass on to the component generator
			await this.composeWith(`starterboost-react:component`, {name:name});
		}

	}
}