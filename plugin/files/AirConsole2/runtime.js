// ECMAScript 5 strict mode
'use strict'

assert2(cr, 'cr namespace not created')
assert2(cr.plugins_, 'cr.plugins_ not created')

/////////////////////////////////////
// Plugin class
cr.plugins_.AirConsole2 = function (runtime) {
	this.runtime = runtime
}

function AirConsoleOffline() {
	console.warn('You are currently offline or AirConsole could not be loaded. Plugin fallback to AirConsole mock-up.')
	AirConsoleOffline.prototype.getNickname = function () {
		console.log('AirConsole mock-up: Getting nickname')
		return 'John Doe'
	}
	AirConsoleOffline.prototype.getProfilePicture = function () {
		console.log('AirConsole mock-up: Getting profile picture')
		return 'undefined when offline'
	}
	AirConsoleOffline.prototype.getUID = function () {
		console.log('AirConsole mock-up: Getting UID')
		return -9999
	}
	AirConsoleOffline.prototype.isPremium = function () {
		console.log('AirConsole mock-up: Checking if premium')
		return false
	}
	AirConsoleOffline.prototype.getControllerDeviceIds = function () {
		console.log('AirConsole mock-up: Getting controller device ids')
		return []
	}
	AirConsoleOffline.prototype.getCustomDeviceState = function () {
		console.log('AirConsole mock-up: Getting custom device state')
		return null
	}
	AirConsoleOffline.prototype.isUserLoggedIn = function () {
		console.log('AirConsole mock-up: Checking if user is logged in')
		return false
	}
	AirConsoleOffline.prototype.message = function () {
		console.log('AirConsole mock-up: Sending a message')
	}
	AirConsoleOffline.prototype.broadcast = function () {
		console.log('AirConsole mock-up: Broadcasting a message')
	}
	AirConsoleOffline.prototype.requestHighScores = function () {
		console.log('AirConsole mock-up: Requesting highscores')
	}
	AirConsoleOffline.prototype.storeHighScore = function () {
		console.log('AirConsole mock-up: Storing highscores')
	}
	AirConsoleOffline.prototype.setActivePlayers = function () {
		console.log('AirConsole mock-up: Setting active players')
	}
	AirConsoleOffline.prototype.showAd = function () {
		console.log('AirConsole mock-up: Showing ad')
	}
	AirConsoleOffline.prototype.navigateHome = function () {
		console.log('AirConsole mock-up: Navigating home')
	}
	AirConsoleOffline.prototype.navigateTo = function () {
		console.log('AirConsole mock-up: Navigating to given url')
	}
	AirConsoleOffline.prototype.requestPersistentData = function () {
		console.log('AirConsole mock-up: Requesting persistent data')
	}
	AirConsoleOffline.prototype.storePersistentData = function () {
		console.log('AirConsole mock-up: Storing persistent data')
	}
	AirConsoleOffline.prototype.getMasterControllerDeviceId = function () {
		console.log('AirConsole mock-up: Getting master controller device id')
		return -9999
	}
	AirConsoleOffline.prototype.getActivePlayerDeviceIds = function () {
		console.log('AirConsole mock-up: Getting active player device ids')
		return []
	}
	AirConsoleOffline.prototype.convertPlayerNumberToDeviceId = function () {
		console.log('AirConsole mock-up: Converting player number to device id')
		return -1
	}
	AirConsoleOffline.prototype.convertDeviceIdToPlayerNumber = function () {
		console.log('AirConsole mock-up: Converting device id to player number')
		return -1
	}
	AirConsoleOffline.prototype.getLanguage = function () {
		console.log('AirConsole mock-up: Sending a message')
		return 'en-US'
	}
}

(function () {
	var pluginProto = cr.plugins_.AirConsole2.prototype

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin = plugin
		this.runtime = plugin.runtime
	}

	var typeProto = pluginProto.Type.prototype

	// called on startup for each object type
	typeProto.onCreate = function () {
	}

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type = type
		this.airconsole = null
		this.runtime = type.runtime
		this.maxPlayers = 0
		this.useTranslation = false
		this.gameReady = false
		this.airConsoleReady = false
		this.airConsoleStarted = false
		this.isController = false
		this.deviceId = 0
		this.message = ''
		this.adCompleted = 0
		this.adShowing = 0
		this.persistentData = null
		this.highscores = null
		this.emailAddress = null
		this.customData = null
		this.presetMessage = {}
		this.motionData = {}
	}

	var pluginInstance = null
	var instanceProto = pluginProto.Instance.prototype

	// called whenever an instance is created
	instanceProto.onCreate = function () {
		pluginInstance = this
	}

	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function (ctx) {
	}

	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw) {
	}


	//////////////////////////////////////
	// Conditions
	function Cnds() {
	}

	Cnds.prototype.OnConnect = function () {
		return true
	}

	Cnds.prototype.OnDisconnect = function () {
		return true
	}

	Cnds.prototype.OnDeviceDisconnect = function (deviceId) {
		return pluginInstance.deviceId === deviceId
	}

	Cnds.prototype.OnTooManyPlayers = function () {
		return true
	}

	Cnds.prototype.OnPremium = function () {
		return true
	}

	Cnds.prototype.OnMessage = function () {
		return true
	}

	Cnds.prototype.OnMessageFrom = function (deviceId) {
		return pluginInstance.deviceId === deviceId
	}

	Cnds.prototype.OnMessageIs = function (property, value) {
		if (typeof pluginInstance.message === 'string') {
			return pluginInstance.message === value
		} else {
			return (pluginInstance.message.hasOwnProperty(property) && pluginInstance.message[property] == value)
		}
	}

	Cnds.prototype.OnMessageFromIs = function (property, value, deviceId) {
		if (typeof pluginInstance.message === 'string') {
			return (pluginInstance.message === value && pluginInstance.deviceId === deviceId)
		} else {
			return (pluginInstance.message.hasOwnProperty(property) && pluginInstance.message[property] == value && pluginInstance.deviceId === deviceId)
		}
	}

	Cnds.prototype.OnMessageHasProperty = function (property) {
		return (pluginInstance.message.hasOwnProperty(property))
	}

	Cnds.prototype.IsUserLoggedIn = function (deviceId) {
		return pluginInstance.airConsole.isUserLoggedIn(deviceId)
	}

	Cnds.prototype.OnAdComplete = function () {
		return true
	}

	Cnds.prototype.OnAdShow = function () {
		return true
	}

	Cnds.prototype.OnPersistentDataLoaded = function () {
		return true
	}

	Cnds.prototype.OnPersistentDataStored = function () {
		return true
	}

	Cnds.prototype.OnHighScores = function () {
		return true
	}

	Cnds.prototype.OnHighScoreStored = function () {
		return true
	}

	Cnds.prototype.OnEmailAddress = function () {
		return true
	}

	Cnds.prototype.OnDeviceProfileChange = function () {
		return true
	}

	Cnds.prototype.OnCustomDeviceStateChange = function () {
		return true
	}

	Cnds.prototype.IsPremium = function (deviceId) {
		return pluginInstance.airConsole.isPremium(deviceId)
	}

	Cnds.prototype.IsPluginOffline = function () {
		return pluginInstance.runningOffline
	}

	Cnds.prototype.IsMultipartMessage = function () {
		return (pluginInstance.message !== null && typeof pluginInstance.message === 'object' && Object.keys(pluginInstance.message).length > 1)
	}

	Cnds.prototype.AdShown = function () {
		return pluginInstance.adCompleted === 1
	}

	Cnds.prototype.IsAdShowing = function () {
		return pluginInstance.adShowing === 1
	}

	Cnds.prototype.OnDeviceMotion = function () {
		return true
	}

	Cnds.prototype.OnMute = function () {
		return true
	}

	Cnds.prototype.OnUnmute = function () {
		return true
	}

	Cnds.prototype.OnPause = function () {
		return true
	}

	Cnds.prototype.OnResume = function () {
		return true
	}

	pluginProto.cnds = new Cnds()

	//////////////////////////////////////
	// Actions
	function Acts() {
	}

	Acts.prototype.StartAirConsole = function () {
		if (pluginInstance.airConsoleStarted) {
			return
		}

		if (typeof AirConsole !== 'undefined') {
			pluginInstance.runningOffline = false
			if (pluginInstance.properties[1] === 1) {
				pluginInstance.gameReady = true
				var config = {
					orientation: AirConsole.ORIENTATION_LANDSCAPE,
					synchronize_time: false,
					setup_document: true,
					device_motion: false
				}
				if (pluginInstance.properties[2] === 0) {
					config.translation = true
				}
				if (pluginInstance.properties[3] === 1) {
					config.orientation = AirConsole.ORIENTATION_PORTRAIT
				}
				if (pluginInstance.properties[4] === 0) {
					config.synchronize_time = true
				}
				if (pluginInstance.properties[5] > 0) {
					config.device_motion = pluginInstance.properties[4]
				}

				pluginInstance.airConsole = new AirConsole(config)
			} else {
				pluginInstance.airConsole = new AirConsole()
			}
		} else {
			pluginInstance.runningOffline = true
			pluginInstance.airConsole = new AirConsoleOffline()
		}

		pluginInstance.maxPlayers = pluginInstance.properties[0]
		pluginInstance.isController = (pluginInstance.properties[1] === 1)
		pluginInstance.useTranslation = (pluginInstance.properties[2] === 1)

		if (pluginInstance.isController) {
			pluginInstance.airConsole.onReady = function () {
				pluginInstance.airConsole.message(AirConsole.SCREEN, {
					handshake: true
				})
			}
		}

		pluginInstance.airConsole.onReady = function (code) {
			pluginInstance.airConsoleReady = true
		}

		pluginInstance.airConsole.onPause = function () {
			pluginInstance.runtime.trigger(pluginProto.cnds.OnPause, pluginInstance)
		}

		pluginInstance.airConsole.onResume = function () {
			pluginInstance.runtime.trigger(pluginProto.cnds.OnResume, pluginInstance)
		}


		pluginInstance.airConsole.onConnect = function (deviceId) {
			if (pluginInstance.gameReady) {
				pluginInstance.deviceId = deviceId
				if (pluginInstance.airConsole.getControllerDeviceIds().length > pluginInstance.maxPlayers) {
					pluginInstance.runtime.trigger(pluginProto.cnds.OnTooManyPlayers, pluginInstance)
				} else {
					pluginInstance.runtime.trigger(pluginProto.cnds.OnConnect, pluginInstance)
				}
			}
		}

		pluginInstance.airConsole.onDisconnect = function (deviceId) {
			if (pluginInstance.gameReady) {
				pluginInstance.deviceId = deviceId
				pluginInstance.runtime.trigger(pluginProto.cnds.OnDisconnect, pluginInstance)
				pluginInstance.runtime.trigger(pluginProto.cnds.OnDeviceDisconnect, pluginInstance)
			}
		}

		pluginInstance.airConsole.onMessage = function (deviceId, data) {
			if (pluginInstance.gameReady && data) {
				pluginInstance.deviceId = deviceId
				pluginInstance.message = data
				pluginInstance.runtime.trigger(pluginProto.cnds.OnMessage, pluginInstance)
				pluginInstance.runtime.trigger(pluginProto.cnds.OnMessageFrom, pluginInstance)
				pluginInstance.runtime.trigger(pluginProto.cnds.OnMessageIs, pluginInstance)
				pluginInstance.runtime.trigger(pluginProto.cnds.OnMessageFromIs, pluginInstance)
				pluginInstance.runtime.trigger(pluginProto.cnds.OnMessageHasProperty, pluginInstance)
			}
		}

		pluginInstance.airConsole.onDeviceStateChange = function (deviceId, data) {
		}

		pluginInstance.airConsole.onCustomDeviceStateChange = function (deviceId, customData) {
			pluginInstance.deviceId = deviceId
			pluginInstance.customData = customData
			pluginInstance.runtime.trigger(pluginProto.cnds.OnCustomDeviceStateChange, pluginInstance)
		}

		pluginInstance.airConsole.onHighScores = function (highscores) {
			if (highscores) {
				pluginInstance.highscores = highscores
				pluginInstance.runtime.trigger(pluginProto.cnds.OnHighScores, pluginInstance)
			}
		}

		pluginInstance.airConsole.onHighScoreStored = function (highscores) {
			if (highscores) {
				pluginInstance.highscores = highscores
				pluginInstance.runtime.trigger(pluginProto.cnds.OnHighScoreStored, pluginInstance)
			}
		}

		pluginInstance.airConsole.onAdComplete = function (adWasShown) {
			pluginInstance.adCompleted = (adWasShown) ? 1 : 0
			pluginInstance.adShowing = 0
			pluginInstance.runtime.trigger(pluginProto.cnds.OnAdComplete, pluginInstance)
		}

		pluginInstance.airConsole.onAdShow = function () {
			pluginInstance.adShowing = 1
			pluginInstance.runtime.trigger(pluginProto.cnds.OnAdShow, pluginInstance)
		}

		pluginInstance.airConsole.onPremium = function (deviceId) {
			if (pluginInstance.gameReady) {
				pluginInstance.deviceId = deviceId
				pluginInstance.runtime.trigger(pluginProto.cnds.OnPremium, pluginInstance)
			}
		}

		pluginInstance.airConsole.onPersistentDataLoaded = function (data) {
			if (data) {
				pluginInstance.persistentData = data
				pluginInstance.runtime.trigger(pluginProto.cnds.OnPersistentDataLoaded, pluginInstance)
			}
		}

		pluginInstance.airConsole.onPersistentDataStored = function (uid) {
			pluginInstance.runtime.trigger(pluginProto.cnds.OnPersistentDataStored, pluginInstance)
		}

		pluginInstance.airConsole.onDeviceProfileChange = function (deviceId) {
			pluginInstance.deviceId = deviceId
			pluginInstance.runtime.trigger(pluginProto.cnds.OnDeviceProfileChange, pluginInstance)
		}

		pluginInstance.airConsole.onDeviceMotion = function (data) {
			pluginInstance.motionData = data
			pluginInstance.runtime.trigger(pluginProto.cnds.OnDeviceMotion, pluginInstance)
		}

		pluginInstance.airConsole.onMute = function (mute) {
			console.warn('Using deprecated action "onMute/onUnmute"')
		}
	}

	Acts.prototype.GameReady = function () {
		pluginInstance.gameReady = true
		var deviceIds = pluginInstance.airConsole.getControllerDeviceIds()
		for (var i = 0; i < deviceIds.length; i++) {
			pluginInstance.airConsole.onConnect(deviceIds[i])
			pluginInstance.airConsole.onCustomDeviceStateChange(deviceIds[i], null)
		}
	}

	Acts.prototype.Message = function (deviceId, property, value) {
		if (property !== 'message') {
			console.warn('Property other than "message" isn\'t currently supported')
		}

		var obj = parseJSON(value)
		if (obj !== false) {
			value = obj
		}

		pluginInstance.airConsole.message(deviceId, value)
	}

	Acts.prototype.Broadcast = function (property, message) {
		pluginInstance.airConsole.broadcast(message)
	}

	Acts.prototype.SetCustomDeviceStateProperty = function (property, value) {
		pluginInstance.airConsole.setCustomDeviceState(property, value)
	}

	Acts.prototype.RequestHighScores = function (level_name, level_version, uids, ranks, total, top) {
		pluginInstance.highscores = null
		var uidsArray
		if (uids === 'all') {
			uidsArray = ''
		} else if (uids.indexOf(',') > -1) {
			uidsArray = uids.split(',')
		} else {
			uidsArray = [uids]
		}
		var ranksArray = (ranks === 'world') ? [ranks] : ranks.split(',')
		pluginInstance.airConsole.requestHighScores(level_name, level_version, uidsArray, ranksArray, total, top)
	}

	Acts.prototype.StoreHighScores = function (level_name, level_version, score, uid, data, score_string) {
		var uidArray = uid.split(',')
		pluginInstance.airConsole.storeHighScore(level_name, level_version, score, uidArray, data, score_string)
	}

	Acts.prototype.SetActivePlayers = function (max_players) {
		pluginInstance.airConsole.setActivePlayers(max_players)
	}

	Acts.prototype.ShowAd = function () {
		pluginInstance.airConsole.showAd()
	}

	Acts.prototype.NavigateHome = function () {
		pluginInstance.airConsole.navigateHome()
	}

	Acts.prototype.NavigateTo = function (url) {
		pluginInstance.airConsole.navigateTo(url)
	}

	Acts.prototype.RequestPersistentData = function (uids) {
		pluginInstance.persistentData = null
		var uidsArray = (uids.indexOf(',') > -1) ? uids.split(',') : [uids]
		pluginInstance.airConsole.requestPersistentData(uidsArray)
	}

	Acts.prototype.StorePersistentData = function (key, value, uid) {
		pluginInstance.airConsole.storePersistentData(key, value, uid)
	}

	Acts.prototype.SendPresetMessage = function (deviceId) {
		if (pluginInstance.runningOffline) return

		pluginInstance.airConsole.message(deviceId, pluginInstance.presetMessage)
		pluginInstance.presetMessage = {}
	}

	Acts.prototype.BroadcastPresetMessage = function () {
		pluginInstance.airConsole.broadcast(pluginInstance.presetMessage)
		pluginInstance.presetMessage = {}
	}

	Acts.prototype.SetPresetMessage = function (key, value) {
		pluginInstance.presetMessage[key] = value
	}

	Acts.prototype.ClearPresetMessage = function () {
		pluginInstance.presetMessage = {}
	}

	Acts.prototype.EditProfile = function () {
		if (pluginInstance.isController) {
			pluginInstance.airConsole.editProfile()
		} else {
			console.warn('You can\' use "Edit profile" on screen')
		}
	}

	Acts.prototype.SetOrientation = function (orientation) {
		if (pluginInstance.isController) {
			pluginInstance.airConsole.setOrientation((orientation === 1) ? AirConsole.ORIENTATION_PORTRAIT : AirConsole.ORIENTATION_LANDSCAPE)
		}
	}

	Acts.prototype.GetPremium = function () {
		pluginInstance.airConsole.getPremium()
	}

	Acts.prototype.Vibrate = function (time) {
		if (pluginInstance.properties[1] === 1 && time > 0) {
			pluginInstance.airConsole.vibrate(time)
		}
	}

	pluginProto.acts = new Acts()

	//////////////////////////////////////
	// Expressions
	function Exps() {
	}

	// ret.set_int(1337);			// return our value
	// ret.set_float(0.5);			// for returning floats
	// ret.set_string("Hello");		// for ef_return_string
	// ret.set_any("woo");			// for ef_return_any, accepts either a number or string

	Exps.prototype.DeviceId = function (ret) {
		ret.set_int(pluginInstance.deviceId)
	}

	Exps.prototype.Message = function (ret) {
		if (typeof pluginInstance.message === 'object') {
			if (Object.keys(pluginInstance.message).length === 1) {
				ret.set_string(pluginInstance.message[Object.keys(pluginInstance.message)[0]])
			} else {
				ret.set_string(JSON.stringify(pluginInstance.message))
			}
		} else {
			ret.set_string(pluginInstance.message)
		}
	}

	Exps.prototype.MessageAtProperty = function (ret, property) {
		if (typeof pluginInstance.message === 'object' && pluginInstance.message.hasOwnProperty(property)) {
			ret.set_string(pluginInstance.message[property])
		} else {
			console.warn('MessageAtProperty - Tried to access a non existing property')
		}
	}

	Exps.prototype.IsMultipartMessage = function (ret) {
		if (pluginInstance.message !== null && typeof pluginInstance.message === 'object' && Object.keys(pluginInstance.message).length > 1) {
			ret.set_int(1)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.MessageHasProperty = function (ret, property) {
		if (pluginInstance.message !== null && typeof pluginInstance.message === 'object' && pluginInstance.message.hasOwnProperty(property)) {
			ret.set_int(1)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.MessageAsJSON = function (ret) {
		var c2Dictionary = {}
		c2Dictionary['c2dictionary'] = true
		c2Dictionary['data'] = getProperties(pluginInstance.message)
		ret.set_string(JSON.stringify(c2Dictionary))
	}

	Exps.prototype.GetProfilePicture = function (ret, deviceId) {
		var pic = pluginInstance.airConsole.getProfilePicture(deviceId) || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?f=y'
		ret.set_string(pic)
	}

	Exps.prototype.GetProfilePictureWithSize = function (ret, deviceId, pictureSize) {
		var pic = pluginInstance.airConsole.getProfilePicture(deviceId, pictureSize) || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?f=y'
		ret.set_string(pic)
	}

	Exps.prototype.GetNickname = function (ret, deviceId) {
		var nickname = pluginInstance.airConsole.getNickname(deviceId) || 'Nickname not found'
		ret.set_string(nickname)
	}

	Exps.prototype.GetUID = function (ret, deviceId) {
		var uid = pluginInstance.airConsole.getUID(deviceId) || 'Unknown UID'
		ret.set_string(uid)
	}

	Exps.prototype.GetMessagePropertiesCount = function (ret) {
		if (pluginInstance.message !== null && typeof pluginInstance.message === 'object') {
			ret.set_int(Object.keys(pluginInstance.message).length)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.GetMasterControllerDeviceId = function (ret) {
		var id = pluginInstance.airConsole.getMasterControllerDeviceId()
		ret.set_int((typeof id !== 'number' || isNaN(id)) ? -1 : id)
	}

	Exps.prototype.ConvertPlayerNumberToDeviceId = function (ret, playerNumber) {
		var id = pluginInstance.airConsole.convertPlayerNumberToDeviceId(playerNumber)
		ret.set_int((typeof id !== 'number') ? -1 : id)
	}

	Exps.prototype.ConvertDeviceIdToPlayerNumber = function (ret, deviceId) {
		var playerNumber = pluginInstance.airConsole.convertDeviceIdToPlayerNumber(deviceId)
		ret.set_int((typeof playerNumber !== 'number') ? -1 : playerNumber)
	}

	Exps.prototype.IsPremium = function (ret, deviceId) {
		ret.set_int((pluginInstance.airConsole.isPremium(deviceId) !== false) ? 1 : 0)
	}

	Exps.prototype.GetControllerDeviceIds = function (ret) {
		var arr = pluginInstance.airConsole.getControllerDeviceIds()

		var c2array = {}
		c2array['c2array'] = true
		c2array['size'] = [arr.length, 1, 1]
		var data = []
		for (var i in arr) {
			data.push([[arr[i]]])
		}
		c2array['data'] = data

		ret.set_string(JSON.stringify(c2array))
	}

	Exps.prototype.GetPersistentData = function (ret) {
		if (pluginInstance.persistentData !== null) {
			var c2Dictionary = {}
			c2Dictionary['c2dictionary'] = true
			c2Dictionary['data'] = getProperties(pluginInstance.persistentData)
			ret.set_string(JSON.stringify(c2Dictionary))
		} else {
			console.warn('Persistent data requested but they weren\'t loaded. Did you forget to use RequestPersistentData?')
			ret.set_string('')
		}
	}

	Exps.prototype.GetHighscores = function (ret) {
		if (pluginInstance.highscores !== null) {
			var c2Dictionary = {}
			c2Dictionary['c2dictionary'] = true
			c2Dictionary['data'] = getProperties(pluginInstance.highscores)
			ret.set_string(JSON.stringify(c2Dictionary))
		} else {
			console.warn('Highscores data requested but they weren\'t loaded. Did you forget to use RequestHighscores?')
			ret.set_string('')
		}
	}

	Exps.prototype.IsPluginOffline = function (ret) {
		if (pluginInstance.runningOffline) {
			ret.set_int(1)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.GetActivePlayerDeviceIds = function (ret) {
		var arr = pluginInstance.airConsole.getActivePlayerDeviceIds()

		var c2array = {}
		c2array['c2array'] = true
		c2array['size'] = [arr.length, 1, 1]
		var data = []
		for (var i in arr) {
			data.push([[arr[i]]])
		}
		c2array['data'] = data

		ret.set_string(JSON.stringify(c2array))
	}

	Exps.prototype.IsAddShowing = function (ret) {
		ret.set_int(pluginInstance.adShowing)
	}

	Exps.prototype.AdShown = function (ret) {
		ret.set_int(pluginInstance.adCompleted)
	}

	Exps.prototype.GetThisDeviceId = function (ret) {
		if (pluginInstance.isController) {
			ret.set_int(pluginInstance.airConsole.getDeviceId())
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.MotionData = function (ret) {
		if (pluginInstance.motionData !== null) {
			var c2Dictionary = {}
			c2Dictionary['c2dictionary'] = true
			c2Dictionary['data'] = getProperties(pluginInstance.motionData)
			ret.set_string(JSON.stringify(c2Dictionary))
		} else {
			ret.set_string('')
		}
	}

	Exps.prototype.GetLanguage = function (ret, deviceId) {
		if (!pluginInstance.useTranslation) {
			console.log('Translation support not enabled. Please turn it on in your Construct 2 project settings.')
			ret.set_string('')
		} else {
			ret.set_string(pluginInstance.airConsole.getLanguage(deviceId) || 'en-US')
		}
	}

	Exps.prototype.GetTranslation = function (ret, id, values) {
		if (!pluginInstance.useTranslation) {
			console.warn('Translation support not enabled. Please turn it on in your Construct 2 project settings.')
			ret.set_string('')
			return
		}

		if (!id) {
			console.warn('Cannot fetch translation without a string id')
			ret.set_string('')
			return
		}

		if (values) {
			try {
				values = JSON.parse(values)
			} catch {
				console.warn('Couldn\'t parse passed values for AirConsole GetTranslation.')
				values = {}
			}
			if (values.hasOwnProperty('foo')) {
				console.warn('Removed "foo" from translation values')
				delete values['foo']
			}
		} else {
			values = {}
		}
		ret.set_string(pluginInstance.airConsole.getTranslation(id, values) || '')
	}

	pluginProto.exps = new Exps()

	function getProperties(object) {
		if (object === null) return
		var data = {}
		$.each(object, function (property, value) {
			if (typeof value === 'object') {
				var c2Dictionary = {}
				c2Dictionary['c2dictionary'] = true
				c2Dictionary['data'] = getProperties(value)
				data[property] = JSON.stringify(c2Dictionary)
			} else {
				if (typeof value === 'boolean') {
					value = (!value) ? 0 : 1
				}
				data[property] = value
			}
		})
		return data
	}

	/**
	 * Check if a given string is JSON or not
	 * @param string
	 * @return false or the parsed object
	 */
	function parseJSON(string) {
		try {
			var obj = JSON.parse(string)
		} catch (e) {
			return false
		}
		return obj
	}

}())
