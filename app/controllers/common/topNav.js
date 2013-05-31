var _args = arguments[0] || {}, api = require("fieldServiceApi");

if(_args.screen && _args.screen === "detail") {
	$.wrapper.remove($.typeHome);
	$.typeHome = $.btnAppcLogo = $.lblTitle = $.rightView = $.dividerHome1 = $.btnHelp = $.dividerHome1 = $.btnRefresh = null;
} else {
	$.wrapper.remove($.typeDetail);
	$.typeDetail = $.btnHome = $.lblTitleDetail = $.rightViewDetail = $.dividerDetail1 = $.btnHelpDetail
	$.dividerDetail2 = $.btnAdd = $.btnCamera = $.dividerDetail3 = null;
}

var user = api.getUser();

if(user.photo && user.photo.urls && user.photo.urls.small_240) {
	$.userImage.image = user.photo.urls.small_240;
}

$.userName.text = user.first_name;

function profileClick(e) {
	var logoutBtn = Ti.UI.createButton({
		height: 46,
		top: 0,
		width: 200,
		color: "#000000",
		font: {
			fontSize: 14,
			fontWeight: "bold"
		},
		backgroundImage: "/common/btn-light-flex.png",
		backgroundSelectedImage: "/common/btn-light-touch-flex.png",
		backgroundTopCap: 22,
		backgroundLeftCap: 5,
		title: "Logout"

	});
	var popoverArgs = {
		arrowPosition: "top",
		view: logoutBtn,
		containerLayout: {
			top: 40,
			right: 25
		}
	};

	var popover = Alloy.createController("common/popover", popoverArgs);

	logoutBtn.addEventListener("click", Alloy.Globals.MainController.logout);

}

function infoClick() {
	var alertDialog = Ti.UI.createAlertDialog({
		title: "Field Service Demo Info",
		message: "This is a demonstration app developed by Appcelerator, Inc."
	}).show();
}

function openDashboard() {
	Ti.Platform.openURL(Alloy.CFG.defaults.nodeUrl);
}