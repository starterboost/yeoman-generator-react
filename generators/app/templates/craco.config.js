/* craco.config.js */
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');
const stylePlugin = require('@starterboost/react-utilities/craco').plugins.style;

module.exports = function({ env }) {
	return {
		plugins: [{
			plugin: reactHotReloadPlugin
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