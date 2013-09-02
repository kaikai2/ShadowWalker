"use strict";

var path = require('path');

// set current directory
process.chdir(path.dirname(module.filename));

process.on("uncaughtException", function(err){
	console.log('uncaughtException:' + err.stack);
});


// Workers can share any TCP connection
// In this case its a HTTP server
var config = require('./config').config;
require('./webserver').init(config);
