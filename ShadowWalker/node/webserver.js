"use strict";

exports.init = function(config){
	var express = require('express')
	, os = require('os')
	, util = require('util')
	, ejs = require('ejs')
	, fs = require('fs')
	, url = require('url')
	, path = require('path')
	, server = express()
	, basePath = path.dirname(module.filename);

	function substr(s, maxlen){
		if (s.length < maxlen)
			return s;
		return s.substr(0, maxlen) + '...';
	}
	server.configure(function(){
		server.set('view', __dirname + '/views');
		server.set('view engine', 'html');
		server.engine('html', ejs.renderFile);
		//console.log('ejs');
	});


	server.configure('development', function(){
		server.use(express.logger({format: ':date :response-time :method :url'}));
		//require('./lib/httpsniffer').sniffOn(server);
		server.use(express.compress());
		server.use(express.bodyParser());
		server.use(express.cookieParser());
		server.use(express.session({secret: 'nodeapp'}));
		server.use(server.router);
		
		server.use(express.static(basePath + '/' + config.pathGame));
		server.use(express.static(basePath + '/' + config.pathCocos2d));

		server.use(express.errorHandler({ dumpExceptions: true }));
		//server.locals.debug = true;
		server.use(function(err, req, res, next){
			if (err instanceof exceptions.NotFound){
				res.send('404 not found! ' + err, 404);
				//res.end();
			}else{
				res.send(err);
				next(err);
			}
		});
	});

	server.configure('production', function(){
		server.use(express.logger({format: ':method :url'}));
		server.use(express.bodyParser());
		server.use(express.cookieParser());
		server.use(express.session({secret: 'nodeapp'}));
		server.use(server.router);
		server.use(express.static(basePath + '/' + config.pathGame));
		server.use(express.static(basePath + '/' + config.pathCocos2d));
	});

	var requestLastIdentity = 0;
	server.all('/*', function(req,res,next){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Request-With');
		req.id = ++requestLastIdentity;
		next();
	});

	// last handle all
	/*
	server.get('/*', function(req, res){
		throw new exceptions.NotFound;
	});
	*/
	server.listen(config.port, function(){
		console.log('hello world!' + os.uptime());
	});
};