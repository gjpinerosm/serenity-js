const 
	crew         = require('serenity-js/lib/stage_crew');
	glob         = require('glob'),
	protractor   = require.resolve('protractor'),
	node_modules = protractor.substring(0, protractor.lastIndexOf('node_modules')+ 'node_modules'.length), 
	seleniumJar  = glob.sync('$(node_modules)/protractor/**/selenium-server-standalone-*.jar').pop();

exports.config = {
	baseUrl: 'http://www.facebook.com',
	seleniumServerJar: seleniumJar,
	allScriptTimeout: 110000,
	disableChecks: true,

	framework: 'custom',
	frameworkPath: require.resolve('serenity-js'),

	serenity: {
		crew: [
			crew.serenityBDDReporter(),
			crew.photographer()
		]
		//crew.consoleReporter()
	},

	specs: ['features/**/*.feature'],
	cucumberOpts: {
		require: ['features/**/*.ts'],
		format:  'pretty',
		compiler: 'ts:ts-node/register'
	},

	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: [
				'--disable-infobars'			
			]
		}
	}
};

