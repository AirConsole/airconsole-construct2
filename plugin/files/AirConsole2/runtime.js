// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.AirConsole2 = function(runtime) {
	this.runtime = runtime;
};

function AirConsoleOffline() {
	console.warn('You are currently offline or AirConsole could not be loaded. Plugin fallback to AirConsole mock-up.');
	AirConsoleOffline.prototype.getNickname = function() {return 'undefined when offline'};
	AirConsoleOffline.prototype.getProfilePicture = function() {return 'undefined when offline'};
	AirConsoleOffline.prototype.getUID = function() {return -9999};
	AirConsoleOffline.prototype.isPremium = function() {return false};
	AirConsoleOffline.prototype.getControllerDeviceIds = function() {return []};
	AirConsoleOffline.prototype.getCustomDeviceState = function() {return null};
	AirConsoleOffline.prototype.isUserLoggedIn = function() {return false};
	AirConsoleOffline.prototype.message = function() {};
	AirConsoleOffline.prototype.broadcast = function() {};
	AirConsoleOffline.prototype.requestHighScores = function() {};
	AirConsoleOffline.prototype.storeHighScore = function() {};
	AirConsoleOffline.prototype.setActivePlayers = function() {};
	AirConsoleOffline.prototype.showAd = function() {};
	AirConsoleOffline.prototype.navigateHome = function() {};
	AirConsoleOffline.prototype.navigateTo = function() {};
	AirConsoleOffline.prototype.requestPersistentData = function() {};
	AirConsoleOffline.prototype.storePersistentData = function() {};
	AirConsoleOffline.prototype.getMasterControllerDeviceId = function() {return -9999};
	AirConsoleOffline.prototype.getActivePlayerDeviceIds = function() {return []};
	AirConsoleOffline.prototype.convertPlayerNumberToDeviceId = function() {};
	AirConsoleOffline.prototype.convertDeviceIdToPlayerNumber = function() {};
}

(function ()
{
	var pluginProto = cr.plugins_.AirConsole2.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function() {
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		this.maxPlayers;
		this.gameReady = false;
		this.deviceId;
		this.message;
		this.adCompleted = 0;
		this.adShowing = 0;
		this.persistentData = null;
		this.highscores = null;
		this.emailAddress = null;
		this.customData = null;
		this.presetMessage = {};
	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		var self = this;
		if (typeof AirConsole !== 'undefined') {
			this.runningOffline = false;
			if (self.properties[1] === 1) {
				var config = {orientation: 'AirConsole.ORIENTATION_LANDSCAPE', synchronize_time: false, setup_document: true, device_motion: false};
				if (self.properties[2] === 1) {
					config.orientation = 'AirConsole.ORIENTATION_PORTRAIT';
				}
				if (self.properties[3] === 0) {
					config.synchronize_time = true;
				}
				if (self.properties[4] > 0) {
					config.device_motion = self.properties[4];
				}

				this.airConsole = new AirConsole(config);
			}
			else {
				this.airConsole = new AirConsole();
			}
		}
		else {
			this.runningOffline = true;
			this.airConsole = new AirConsoleOffline();
		}

		this.maxPlayers = self.properties[0];

		if (self.properties[1] === 1) {
			this.airConsole.onReady = function () {
				self.airConsole.message(AirConsole.SCREEN, {
					handshake: true
				})
			}
		}

		this.airConsole.onConnect = function (deviceId) {
			if (self.gameReady) {
				self.deviceId = deviceId;
				if (self.airConsole.getControllerDeviceIds().length > self.maxPlayers) {
					self.runtime.trigger(pluginProto.cnds.OnTooManyPlayers, self);
				}
				else {
					self.runtime.trigger(pluginProto.cnds.OnConnect, self);
				}
			}
		};

		this.airConsole.onDisconnect = function (deviceId) {
			if (self.gameReady) {
				self.deviceId = deviceId;
				self.runtime.trigger(pluginProto.cnds.OnDisconnect, self);
				self.runtime.trigger(pluginProto.cnds.OnDeviceDisconnect, self);
			}
		};

		this.airConsole.onMessage = function (deviceId, data) {
			if (self.gameReady && data) {
				self.deviceId = deviceId;
				self.message = data;
				self.runtime.trigger(pluginProto.cnds.OnMessage, self);
				self.runtime.trigger(pluginProto.cnds.OnMessageFrom, self);
				self.runtime.trigger(pluginProto.cnds.OnMessageIs, self);
				self.runtime.trigger(pluginProto.cnds.OnMessageFromIs, self);
				self.runtime.trigger(pluginProto.cnds.OnMessageHasProperty, self);
			}
		};

		this.airConsole.onDeviceStateChange = function (deviceId, data) {
		};

		this.airConsole.onCustomDeviceStateChange = function (deviceId, customData) {
			self.deviceId = deviceId;
			self.customData = customData;
			self.runtime.trigger(pluginProto.cnds.OnCustomDeviceStateChange, self);
		};

		this.airConsole.onHighscores = function (highscores) {
			if (highscores) {
				self.highscores = highscore;
				self.runtime.trigger(pluginProto.cnds.OnHighscores, self);
			}
		};

		this.airConsole.onHighscoreStored = function (highscore) {
			if (highscore) {
				self.highscores = highscore;
				self.runtime.trigger(pluginProto.cnds.OnHighscoreStored, self);
			}
		};

		this.airConsole.onAdComplete = function (adWasShown) {
			self.adCompleted = (adWasShown) ? 1 : 0;
			self.adShowing = 0;
			self.runtime.trigger(pluginProto.cnds.OnAdComplete, self);
		};

		this.airConsole.onAdShow = function () {
			self.adShowing = 1;
			self.runtime.trigger(pluginProto.cnds.OnAdShow, self);
		};

		this.airConsole.onPremium = function (deviceId) {
			if (self.gameReady) {
				self.deviceId = deviceId;
				self.runtime.trigger(pluginProto.cnds.OnPremium, self);
			}
		};

		this.airConsole.onPersistentDataLoaded = function (data) {
			if (data) {
				self.persistentData = data;
				self.runtime.trigger(pluginProto.cnds.OnPersistentDataLoaded, self);
			}
		};

		this.airConsole.onPersistentDataStored = function (uid) {
			self.runtime.trigger(pluginProto.cnds.OnPersistentDataStored, self);
		};

		this.airConsole.onDeviceProfileChange = function (deviceId) {
			self.deviceId = deviceId;
			self.runtime.trigger(pluginProto.cnds.OnDeviceProfileChange, self);
		};
	};

	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx) {};

	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw) {};

	//////////////////////////////////////
	// Conditions
	function Cnds() {}

	Cnds.prototype.OnConnect = function () {
		return true;
	};

	Cnds.prototype.OnDisconnect = function () {
		return true;
	};

	Cnds.prototype.OnDeviceDisconnect = function (deviceId) {
		return this.deviceId === deviceId;
	};

	Cnds.prototype.OnTooManyPlayers = function () {
		return true;
	};

	Cnds.prototype.OnPremium = function () {
		return true;
	};

	Cnds.prototype.OnMessage = function () {
		return true;
	};

	Cnds.prototype.OnMessageFrom = function (deviceId) {
		return this.deviceId === deviceId;
	};

	Cnds.prototype.OnMessageIs = function (property, value) {
		return (this.message.hasOwnProperty(property) && this.message[property] == value);
	};

	Cnds.prototype.OnMessageFromIs = function (property, value, deviceId) {
		return (this.message.hasOwnProperty(property) && this.message[property] == value && this.deviceId === deviceId);
	};

	Cnds.prototype.OnMessageHasProperty = function (property) {
		return (this.message.hasOwnProperty(property));
	};

	Cnds.prototype.IsUserLoggedIn = function (deviceId) {
		return this.airConsole.isUserLoggedIn(deviceId);
	};

	Cnds.prototype.OnAdComplete = function () {
		return true;
	};

	Cnds.prototype.OnAdShow = function () {
		return true;
	};

	Cnds.prototype.OnPersistentDataLoaded = function () {
		return true;
	};

	Cnds.prototype.OnPersistentDataStored = function () {
		return true;
	};

	Cnds.prototype.OnHighScores = function () {
		return true;
	};

	Cnds.prototype.OnHighScoreStored = function () {
		return true;
	};

	Cnds.prototype.OnEmailAddress = function () {
		return true;
	};

	Cnds.prototype.OnDeviceProfileChange = function () {
		return true;
	};

	Cnds.prototype.OnCustomDeviceStateChange = function () {
		return true;
	};

	Cnds.prototype.IsPremium = function (deviceId) {
		return this.airConsole.isPremium(deviceId);
	};

	Cnds.prototype.IsPluginOffline = function () {
		return this.runningOffline;
	};

	Cnds.prototype.IsMultipartMessage = function () {
		return Object.keys(this.message).length > 1;
	};
	
	Cnds.prototype.AdShown = function () {
		return this.adCompleted === 1;
	};

	Cnds.prototype.IsAdShowing = function () {
		return this.adShowing === 1;
	};

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {}

	Acts.prototype.GameReady = function () {
		this.gameReady = true;
		var deviceIds = this.airConsole.getControllerDeviceIds();
		for (var i = 0; i < deviceIds.length; i++) {
			this.airConsole.onConnect(deviceIds[i]);
		}
	};

	Acts.prototype.Message = function (deviceId, property, value) {
		//this.airConsole.postMessage_({ action: property, to: deviceId, data: value });
		this.airConsole.message(deviceId, value);
	};

	Acts.prototype.Broadcast = function (property, message) {
		//this.airConsole.postMessage_({ action: property, to: undefined, data: message });
		this.airConsole.broadcast(message);
	};

	Acts.prototype.SetCustomDeviceStateProperty = function (property, value) {
		this.airConsole.setCustomDeviceState(property, value);
	};

	Acts.prototype.RequestHighScores = function (level_name, level_version, uids, ranks, total, top) {
		this.highscores = null;
		var uidsArray;
		if (uids === 'all') {
			uidsArray = '';
		}
		else if (uids.indexOf(',') > -1) {
			uidsArray = uids.split(',');
		}
		else {
			uidsArray = [uids];
		}
		var ranksArray = (ranks === 'world') ? [ranks] : ranks.split(',');
		this.airConsole.requestHighScores(level_name, level_version, uidsArray, ranksArray, total, top);
	};

	Acts.prototype.StoreHighScores = function (level_name, level_version, score, uid, data, score_string) {
		var uidArray = uid.split(',');
		this.airConsole.storeHighScore(level_name, level_version, score, uidArray, data, score_string);
	};

	Acts.prototype.SetActivePlayers = function (max_players) {
		this.airConsole.setActivePlayers(max_players);
	};

	Acts.prototype.ShowAd = function () {
		this.airConsole.showAd();
	};

	Acts.prototype.NavigateHome = function () {
		this.airConsole.navigateHome();
	};

	Acts.prototype.NavigateTo = function (url) {
		this.airConsole.navigateTo(url);
	};

	Acts.prototype.RequestPersistentData = function (uids) {
		this.persistentData = null;
		var uidsArray = (uids.indexOf(',') > -1) ? uids.split(',') : [uids];
		this.airConsole.requestPersistentData(uidsArray);
	};

	Acts.prototype.StorePersistentData = function (key, value, uid) {
		this.airConsole.storePersistentData(key, value, uid);
	};

	Acts.prototype.SendPresetMessage = function(deviceId) {
		if (this.runningOffline) return;

		this.airConsole.message(deviceId, this.presetMessage);
		this.presetMessage = {};
	};

	Acts.prototype.BroadcastPresetMessage = function () {
		this.airConsole.broadcast(this.presetMessage);
		this.presetMessage = {};
	};

	Acts.prototype.SetPresetMessage = function(key, value) {
		this.presetMessage[key] = value;
	};

	Acts.prototype.ClearPresetMessage = function() {
		this.presetMessage = {};
	};

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {}
	//ret.set_int(1337);			// return our value
	// ret.set_float(0.5);			// for returning floats
	// ret.set_string("Hello");		// for ef_return_string
	// ret.set_any("woo");			// for ef_return_any, accepts either a number or string

	Exps.prototype.DeviceId = function (ret) {
		ret.set_int(this.deviceId);
	};

	Exps.prototype.Message = function (ret) {
		if (typeof this.message === 'object') {
			if (Object.keys(this.message).length === 1) {
				ret.set_string(this.message[Object.keys(this.message)[0]]);
			}
			else {
				ret.set_string(JSON.stringify(this.message));
			}
		}
	};

	Exps.prototype.MessageAtProperty = function (ret, property) {
		if (typeof this.message === 'object' && this.message.hasOwnProperty(property)) {
			ret.set_string(this.message[property])
		}
		else {
			console.warn("MessageAtProperty - Tried to access a non existing property");
		}
	};

	Exps.prototype.IsMultipartMessage = function(ret) {
		if (this.message !== null && typeof this.message === 'object' && Object.keys(this.message).length > 1) {
			ret.set_int(1);
		}
		else {
			ret.set_int(0);
		}
	};

	Exps.prototype.MessageHasProperty = function(ret, property) {
		if (this.message !== null && typeof this.message === 'object' && this.message.hasOwnProperty(property)) {
			ret.set_int(1);
		}
		else {
			ret.set_int(0);
		}
	};

	Exps.prototype.MessageAsJSON = function(ret) {
		var c2Dictionary = new Object();
		c2Dictionary['c2dictionary'] = true;
		c2Dictionary['data'] = getProperties(this.message);
		ret.set_string(JSON.stringify(c2Dictionary));
	};

	Exps.prototype.GetProfilePicture = function(ret, deviceId) {
		var pic = this.airConsole.getProfilePicture(deviceId) || "https://www.gravatar.com/avatar/00000000000000000000000000000000?f=y";
		ret.set_string(pic);
	};
	
	Exps.prototype.GetProfilePictureWithSize = function(ret, deviceId, pictureSize) {
		var pic = this.airConsole.getProfilePicture(deviceId, pictureSize) || "https://www.gravatar.com/avatar/00000000000000000000000000000000?f=y";
		ret.set_string(pic);
	};

	Exps.prototype.GetNickname = function(ret, deviceId) {
		var nickname = this.airConsole.getNickname(deviceId) || "Nickname not found";
		ret.set_string(nickname);
	};

	Exps.prototype.GetUID = function (ret, deviceId) {
		var uid = this.airConsole.getUID(deviceId) || "Unknown UID";
		ret.set_string(uid);
	};

	Exps.prototype.GetMessagePropertiesCount = function (ret) {
		if (this.message !== null && typeof this.message === 'object') {
			ret.set_int(Object.keys(this.message).length);
		}
		else {
			ret.set_int(0);
		}
	};

	Exps.prototype.GetMasterControllerDeviceId = function (ret) {
		var id = this.airConsole.getMasterControllerDeviceId();
		ret.set_int((typeof id !== 'number' || isNaN(id)) ? -1 : id);
	};

	Exps.prototype.ConvertPlayerNumberToDeviceId = function (ret, playerNumber) {
		var id = this.airConsole.convertPlayerNumberToDeviceId(playerNumber);
		ret.set_int((typeof id !== 'number') ? -1 : id);
	};

	Exps.prototype.ConvertDeviceIdToPlayerNumber = function (ret, deviceId) {
		var playerNumber = this.airConsole.convertDeviceIdToPlayerNumber(deviceId);
		ret.set_int((typeof playerNumber !== 'number') ? -1 : playerNumber);
	};

	Exps.prototype.IsPremium = function (ret, deviceId) {
		ret.set_int((this.airConsole.isPremium(deviceId) !== false) ? 1 : 0);
	};

	Exps.prototype.GetControllerDeviceIds = function (ret) {
		var arr = this.airConsole.getControllerDeviceIds();

		var c2array = new Object();
		c2array['c2array'] = true;
		c2array['size'] = [arr.length, 1, 1];
		var data = [];
		for (var i in arr) {
			data.push([[arr[i]]]);
		}
		c2array['data'] = data;

		ret.set_string(JSON.stringify(c2array));
	};

	Exps.prototype.GetPersistentData = function (ret) {
		if (this.persistentData !== null) {
			var c2Dictionary = new Object();
			c2Dictionary['c2dictionary'] = true;
			c2Dictionary['data'] = getProperties(this.persistentData);
			ret.set_string(JSON.stringify(c2Dictionary));
		}
		else {
			console.warn("Persistent data requested but they weren't loaded. Did you forget to use RequestPersistentData?");
			ret.set_string('');
		}
	};

	Exps.prototype.GetHighscores = function (ret) {
		if (this.highscores !== null) {
			var c2Dictionary = new Object();
			c2Dictionary['c2dictionary'] = true;
			c2Dictionary['data'] = getProperties(this.highscores);
			ret.set_string(JSON.stringify(c2Dictionary));
		}
		else {
			console.warn("Highscores data requested but they weren't loaded. Did you forget to use RequestHighscores?");
			ret.set_string('');
		}
	};

	Exps.prototype.IsPluginOffline = function (ret) {
		if (this.runningOffline) {
			ret.set_int(1);
		}
		else {
			ret.set_int(0);
		}
	};

	Exps.prototype.GetActivePlayerDeviceIds = function (ret) {
		var arr = this.airConsole.getActivePlayerDeviceIds();

		var c2array = new Object();
		c2array['c2array'] = true;
		c2array['size'] = [arr.length, 1, 1];
		var data = [];
		for (var i in arr) {
			data.push([[arr[i]]]);
		}
		c2array['data'] = data;

		ret.set_string(JSON.stringify(c2array));
	};
	
	Exps.prototype.IsAddShowing = function (ret) {
		ret.set_int(this.adShowing);
	};

	Exps.prototype.AdShown = function (ret) {
		ret.set_int(this.adCompleted);
	};

	pluginProto.exps = new Exps();

	function getProperties(object) {
		var data = new Object();
		$.each(object, function(property, value) {
			if (typeof value === 'object') {
				var c2Dictionary = new Object();
				c2Dictionary['c2dictionary'] = true;
				c2Dictionary['data'] = getProperties(value);
				data[property] = JSON.stringify(c2Dictionary);
			}
			else {
				if (typeof value === 'boolean') {
					value = (!value) ? 0 : 1;
				}
				data[property] = value;
			}
		});
		return data;
	}

}());