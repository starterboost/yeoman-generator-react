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

		this.option('name');
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

		await this.fs.copyTpl(
			this.templatePath('actions/$nameAction.js'),
			this.destinationPath(`redux/actions/${name}Action.js`),
			options
		);
		
		await this.fs.copyTpl(
			this.templatePath('reducers/$nameReducer.js'),
			this.destinationPath(`redux/reducers/${name}Reducer.js`),
			options
		);
	}
}