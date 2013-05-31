var Cloud = require('ti.cloud');
//var animation = require('alloy/animation');

var settings = {
	loginCallback: null,
 	createCallback: null
}

$.loginClick = function() {
  loginClick();
}
//Create activity indicator for buttons
function activityIndicator(){
	var style;
	if (OS_IOS){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	return Ti.UI.createActivityIndicator({
		color:"#ffffff",
	  	style:style,
	  	height:Ti.UI.SIZE,
	  	width:Ti.UI.SIZE
	});
	 
}

function loginClick() {
    $.usernameTxt.blur();
    $.passwordTxt.blur();
    $.loginLbl.text = "";
    var actInd = activityIndicator()
    $.loginBtn.add(actInd);
    actInd.show();
    Cloud.Users.login({
        login : $.usernameTxt.value || Alloy.CFG.defaults.username || null,
        password : $.passwordTxt.value || Alloy.CFG.defaults.password || null
    }, function(e) {
        if(e.success == 1){
            var user = e.users[0];
            settings.loginCallback(user);
        } else {
            $.loginLbl.text = "Login";
            actInd.hide();
            $.loginBtn.remove(actInd);
            actInd = null;
            $.msgLbl.text = e.message;
            settings.loginCallback();  
        }
        
    });
}

function forgotClick(e) {
	resetLoginForm();
	$.acsLogin.animate({ opacity:0.0, duration:250 }, function() {
		$.loginContainer.animate({ height:307, duration:250 }, function() {
			$.acsloginPass.animate({ opacity:1.0, duration:250 });
			$.loginContainer.height = 307
		});
	});
}

function remindClick(e) {
	var actInd = activityIndicator()
	$.emailBtn.add(actInd);
	$.emailBtn.title ="";
	actInd.show();
	
	Cloud.Users.requestResetPassword({
		email : $.emailTxt.value
	}, function(e) {
		if(e.success == 1){
			$.msgLbl.text = 'Password Reset';
			actInd.hide();
			$.emailBtn.remove(actInd);
			actInd = null;
			$.emailBtn.title = "Reset";
			cancelClick('Password Reset');
		} else {
			actInd.hide();
			$.emailBtn.title = "Reset";
			$.emailBtn.remove(actInd);
			actInd = null;
			$.msgLbl.text = 'Error: ' + e.message;
		}
		
	});
}

function cancelClick(e) {
	$.acsloginPass.animate({ opacity:0.0, duration:250 }, function() {
		$.loginContainer.animate({ height:361, duration:250 }, function() {
			$.acsLogin.animate({ opacity:1.0, duration:250 });
			$.loginContainer.height = 361;
		});
	});
	$.msgLbl.text = e || '';
	//resetAccountForm();
	resetEmailForm();
}

// function createAccountClick(e){
	// resetLoginForm();
	// animation.fadeOut($.acsLogin, 200);
	// animation.fadeIn($.acsloginAccount, 500);
// 	
// 	
	// //Todo: Customise account creation fields.
	// // var textfield = Alloy.createWidget('com.appcelerator.acslogin', 'textfield').getView('acsLoginAccountTxt');
	 // //$.acsloginAccount.add(textfield);
// 	
// }

// function createClick(e){
	// Cloud.Users.create({
		// username: $.usernameNew.value,
		// password: $.passwordNew.value,
		// email: $.usernameNew.value,
		// password_confirmation: $.passwordConfirm.value
	// }, function(e){
		// if(e.success == 1){
			// $.accountLbl.text = "Account Created!";
		// } else {
			// $.accountLbl.text = 'Error: ' + e.message;
		// }
	// });
// }

function resetEmailForm(){
	$.msgLbl.text = '';
	$.emailTxt.value = '';
}

function resetAccountForm(){
	$.accountLbl.text = '';
	$.usernameNew.value = '';
	$.passwordNew.value = '';
	$.passwordConfirm.value = '';
}

function resetLoginForm(){
	$.msgLbl.text = '';
	$.usernameTxt.value = '';
	$.passwordTxt.value = '';
}

function focusStyle(evt){
	evt.source.backgroundImage = "/common/field-bg-focused.png";
	
}

function blurStyle(evt){
	evt.source.backgroundImage = "/common/field-bg.png";
}

function focusPassword(){
    $.passwordTxt.focus();
}

Ti.App.addEventListener("keyboardframechanged",moveLoginContainer);

function moveLoginContainer(evt){
	if (Ti.App.keyboardVisible) {
		$.loginContainer.animate({
			center: {
				x: Ti.Platform.displayCaps.platformWidth / 2,
				// Accomodate status bar height on iPad...
				y: (Ti.Platform.osname === "ipad") ? ((Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2) - 10 : ((Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2)
			}, 
			duration: 250
		});
	} else{
		$.loginContainer.animate({
			center: {
				x: Ti.Platform.displayCaps.platformWidth / 2,
				y: Ti.Platform.displayCaps.platformHeight / 2
			},
			duration: 250
		});
	}
}

$.init = function(params) {
	settings.loginCallback = params.loginCallback;
}

$.open = function(){
	if(OS_IOS){
		setTimeout(function() {
				// timeout only to delay initial animation (fake start)
				$.loginContainer.animate({
					height: 361, 
					duration: 250
				}, function() {
					$.acsLogin.animate({ opacity:1.0, duration:250 });
					$.divider.animate({ opacity:1.0, duration: 250 });
					$.loginContainer.height = 361;
				});
		}, 1000);
	} else {
		$.loginContainer.height  = 361; 
		$.acsLogin.opacity = 1.0;
		$.divider.opacity =1.0;
	}
}


$.close = function(){
	
	Ti.App.removeEventListener("keyboardframechanged",moveLoginContainer);
	$.destroy();
	Alloy.CFG.skipLogin = false;
}

$.open();
