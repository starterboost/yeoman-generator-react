/* craco.config.js */
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');
const rewireBabelLoader = require("craco-babel-loader");
const stylePlugin = require('@starterboost/react-utilities/craco').plugins.style;

module.exports = function({ env }) {
	return {
		plugins: [
		{
			plugin: reactHotReloadPlugin
		},
		{ 
			plugin: rewireBabelLoader, 
			options: { 
				includes: [/node_modules\/@starterboost/],
				excludes: [/node_modules\/(!@starterboost)/] //put things you want to include in array here
      }
		},
		{
      plugin: stylePlugin({extname:'styl',loader:'stylus-loader'})
    }
		],
		webpack: {
		  alias: { 'react-dom': '@hot-loader/react-dom' }
		}
	};
}