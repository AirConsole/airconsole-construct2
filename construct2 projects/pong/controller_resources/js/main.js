/* Controller JS template by Psychokiller1888 - www.sickrabbitstudios.com */

var airConsole = null;
var downEvent;
var upEvent;

$(document).ready(function() {
	airConsole = new AirConsole();
	
	downEvent = isMobile() ? 'touchstart' : 'mousedown';
	upEvent = isMobile() ? 'touchend' : 'mouseup';

	var sendHandshake = function() {
		airConsole.message(AirConsole.SCREEN, {
			handshake: true
		});
	};
	
	var sendMessage = function(string) {
		airConsole.message(AirConsole.SCREEN, {
			message: string
		});	
	}

	airConsole.onReady = function() {
		sendHandshake();
	};

	airConsole.onMessage = function(deviceId, data) {
	};
	
	$('#up').on(downEvent, function (event) {
		sendMessage("up");
	});
	
	$('#up').on(upEvent, function (event) {
		sendMessage("stop");
	});
	
	$('#down').on(downEvent, function (event) {
		sendMessage("down");
	});
	
	$('#down').on(upEvent, function (event) {
		sendMessage("stop");
	});
});

/**
* Returns true if device is a mobile device
* @return {Boolean}
*/
function isMobile() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i) ||
		navigator.userAgent.match(/WPDesktop/i) ||
		navigator.userAgent.match(/Opera Mini/i) ||
		navigator.userAgent.match(/IEMobile/i)) {
		return true;
	}
	else {
		return false;
	}
}