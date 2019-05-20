const path = require('path');
const _ = require('lodash');
const util = require('util');
const fs = require('fs-extra-promise');
const ejs = require('ejs');

const Generator = require('yeoman-generator');
const Promise = require('bluebird');

module.exports = class extends Generator {
	async _injectTpls( tpls, target, options ){
		const pathToTarget = this.destinationPath( target );
		var contents = await this.fs.read( pathToTarget );
		
		return Promise.mapSeries( tpls, async ( tpl ) => {
			const NAME = _.kebabCase( path.basename( tpl, path.extname( tpl ) ) ).toUpperCase().replace(/\-/g,'_');
			const markerInject = `/*INJECT:${NAME}*/`;
			const indexMarkerStart = contents.indexOf( markerInject );
			
			const template = await this.fs.read( this.templatePath( tpl ) );
			const insert = ejs.render( template, options );

			//find the start point
			if( indexMarkerStart > -1 ){
				//find the end point
				const indexMarkerEnd = indexMarkerStart + _.size( markerInject );
				//find the next line return
				const indexInject = ( ( index, indexDefault ) => {
					return index > -1 ? index : indexDefault;
				}) ( contents.indexOf('\n',indexMarkerEnd), indexMarkerEnd );
				//add our text at this point
				contents = contents.substring( 0, indexInject ) + `\n${insert}` + contents.substring( indexInject );
			}else{
				this.log(`Unable to find '${markerInject}' in '${tpl}'`)
			}
		})
		.then( () => {
			//write out the contents
			this.fs.write( pathToTarget, contents );
		} );
	}

	async copyTplDir( source, target, options ){
		//move the arguments around
		if( util.isObject( source ) ){
			options = target;
			target = source;
			source = null;
		}
		
		//move the arguments around
		if( util.isObject( target ) ){
			options = target;
			target = null;
		}

		source = source || '';
		target = target || '';

		//get the root of the target directory
		const pathToSource = this.templatePath( source || '' );
		const pathToTarget = this.destinationPath( target || '' );
		//read the source
		await fs.readdirAsync( pathToSource )
		//.then( files => Promise.mapSeries( files, file => fs.statAsync( path.resolve( pathToSource, file ) ) ) )
		.then( (files) => {
			return Promise.mapSeries( files, async (file) => {
				const pathToFile = this.templatePath( path.join( pathToSource, file ) );
				//console.log( path.join( source, file ), pathToFile );
				const isDirectory = await fs.isDirectoryAsync( pathToFile );

				if( isDirectory ){
					//call recursively
					return this.copyTplDir( 
						path.join( source, file ), 
						path.join( target, file ), 
						options 
					);
				}else{
					//copy the file across
					return this.fs.copyTpl(
						this.templatePath( path.join( pathToSource, file ) ),
						this.destinationPath( path.join( pathToTarget, file ) ),
						options
					);
				}
			} );
		} )
	}
}