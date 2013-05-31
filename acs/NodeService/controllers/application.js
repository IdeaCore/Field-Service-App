var ACS = require('acs').ACS,
	pjson = require('../package.json');	

ACS.init(pjson.appkey);

function index(req, res) {
	var pageUrl = 'https://dashboard.appcelerator.com';
	
	if(pjson.name != '[REPLACE WITH guid FROM tiapp.xml]'){
		pageUrl += '/#/app/' + pjson.name;
	}
	
	res.render('index', {
		url: pageUrl
	});
};

function errorpage(req,res){
	console.log('[ERROR]session id is: ' + JSON.stringify(req.session) );
	res.render('error');	
};

function badendpoint(req,res){
	
	res.json({
		success: false,
		message: "The API endpoint you are trying to reach does not exists."
	});
	
};

function listapi(req,res){
	res.render('apilist');
};
