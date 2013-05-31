// initialize app
function start(app, express) {
	app.use(express.methodOverride());	
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session(
            { key: 'node.acs', secret: "ApPc2#12CmS" }));
}

// release resources
function stop() {
	
}