const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra-promise');

const CustomGenerator = require('../../utils/CustomGenerator');
const Promise = require('bluebird');

const COMPONENT_TYPES = [
	{id:'data',value:'data',name:'data={Object}'},
	{id:'items',value:'items',name:'items={Array}'},
	{id:'other',value:false,name:'...other'}
]

module.exports = class extends CustomGenerator {
	// The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

		//define the options that can be called from the command line
		//the type is important - DO NOT remove or it will cast to Boolean
		this.option('name',{type:String});
	}

	async prompting() {
		//get a list of generators available
		var answers = await this.prompt( _.filter([
			!this.options.name && {
				type: "input",
				name: "name",
				message: "Your component name",
				default: this.options.name
			},
			!_.find( COMPONENT_TYPES, {id:this.options.type} ) && {
				type: "list",
				name: "type",
				message: "Component type",
				choices: COMPONENT_TYPES
			},
			{
				type: "confirm",
				name: "enableOnMount",
				message: "Enable onMount",
				default: false
			},
			{
				type: "confirm",
				name: "enableOnUnmount",
				message: "Enable onUnmount",
				default: false
			}
		]) );

		const options = _.pick( 
			_.merge( {
				reducerName:false
			}, 
			answers, 
			this.options ), [
			'name',
			'type',
			'enableOnMount',
			'enableOnUnmount',
			'reducerName'
		] );

		const {name} = options;

		await this.fs.copyTpl(
			this.templatePath('containers/$nameContainer.js'),
			this.destinationPath(`src/containers/${name}Container.js`),
			options
		);
		
		await this.fs.copyTpl(
			this.templatePath('components/$nameComponent.js'),
			this.destinationPath(`src/components/${name}Component.js`),
			options
		);

		await this.fs.copyTpl(
			this.templatePath('components/styles/$nameComponent.module.scss'),
			this.destinationPath(`src/components/styles/${name}Component.module.scss`),
			options
		);
	}
}