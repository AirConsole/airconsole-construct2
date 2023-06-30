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

	var instanceProto = pluginProto.Instance.prototype

	// called whenever an instance is created
	instanceProto.onCreate = function () {
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
		return instanceProto.deviceId === deviceId
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
		return instanceProto.deviceId === deviceId
	}

	Cnds.prototype.OnMessageIs = function (property, value) {
		if (typeof instanceProto.message === 'string') {
			return instanceProto.message === value
		} else {
			return (instanceProto.message.hasOwnProperty(property) && instanceProto.message[property] == value)
		}
	}

	Cnds.prototype.OnMessageFromIs = function (property, value, deviceId) {
		if (typeof instanceProto.message === 'string') {
			return (instanceProto.message === value && instanceProto.deviceId === deviceId)
		} else {
			return (instanceProto.message.hasOwnProperty(property) && instanceProto.message[property] == value && instanceProto.deviceId === deviceId)
		}
	}

	Cnds.prototype.OnMessageHasProperty = function (property) {
		return (instanceProto.message.hasOwnProperty(property))
	}

	Cnds.prototype.IsUserLoggedIn = function (deviceId) {
		return instanceProto.airConsole.isUserLoggedIn(deviceId)
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
		return instanceProto.airConsole.isPremium(deviceId)
	}

	Cnds.prototype.IsPluginOffline = function () {
		return instanceProto.runningOffline
	}

	Cnds.prototype.IsMultipartMessage = function () {
		return (instanceProto.message !== null && typeof instanceProto.message === 'object' && Object.keys(instanceProto.message).length > 1)
	}

	Cnds.prototype.AdShown = function () {
		return instanceProto.adCompleted === 1
	}

	Cnds.prototype.IsAdShowing = function () {
		return instanceProto.adShowing === 1
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
		if (instanceProto.airConsoleStarted) {
			return
		}

		if (typeof AirConsole !== 'undefined') {
			instanceProto.runningOffline = false
			if (instanceProto.properties[1] === 1) {
				instanceProto.gameReady = true
				var config = {
					orientation: AirConsole.ORIENTATION_LANDSCAPE,
					synchronize_time: false,
					setup_document: true,
					device_motion: false
				}
				if (instanceProto.properties[2] === 0) {
					config.translation = true
				}
				if (instanceProto.properties[3] === 1) {
					config.orientation = AirConsole.ORIENTATION_PORTRAIT
				}
				if (instanceProto.properties[4] === 0) {
					config.synchronize_time = true
				}
				if (instanceProto.properties[5] > 0) {
					config.device_motion = instanceProto.properties[4]
				}

				instanceProto.airConsole = new AirConsole(config)
			} else {
				instanceProto.airConsole = new AirConsole()
			}
		} else {
			instanceProto.runningOffline = true
			instanceProto.airConsole = new AirConsoleOffline()
		}

		instanceProto.maxPlayers = self.properties[0]
		instanceProto.isController = (self.properties[1] === 1)
		instanceProto.useTranslation = (self.properties[2] === 1)

		if (instanceProto.isController) {
			instanceProto.airConsole.onReady = function () {
				instanceProto.airConsole.message(AirConsole.SCREEN, {
					handshake: true
				})
			}
		}

		instanceProto.airConsole.onReady = function (code) {
			instanceProto.airConsoleReady = true
		}

		instanceProto.airConsole.onPause = function () {
			instanceProto.runtime.trigger(pluginProto.cnds.OnPause, self)
		}

		instanceProto.airConsole.onResume = function () {
			instanceProto.runtime.trigger(pluginProto.cnds.OnResume, self)
		}


		instanceProto.airConsole.onConnect = function (deviceId) {
			if (instanceProto.gameReady) {
				instanceProto.deviceId = deviceId
				if (instanceProto.airConsole.getControllerDeviceIds().length > self.maxPlayers) {
					instanceProto.runtime.trigger(pluginProto.cnds.OnTooManyPlayers, self)
				} else {
					instanceProto.runtime.trigger(pluginProto.cnds.OnConnect, self)
				}
			}
		}

		instanceProto.airConsole.onDisconnect = function (deviceId) {
			if (instanceProto.gameReady) {
				instanceProto.deviceId = deviceId
				instanceProto.runtime.trigger(pluginProto.cnds.OnDisconnect, instanceProto)
				instanceProto.runtime.trigger(pluginProto.cnds.OnDeviceDisconnect, instanceProto)
			}
		}

		instanceProto.airConsole.onMessage = function (deviceId, data) {
			if (instanceProto.gameReady && data) {
				instanceProto.deviceId = deviceId
				instanceProto.message = data
				instanceProto.runtime.trigger(pluginProto.cnds.OnMessage, instanceProto)
				instanceProto.runtime.trigger(pluginProto.cnds.OnMessageFrom, instanceProto)
				instanceProto.runtime.trigger(pluginProto.cnds.OnMessageIs, instanceProto)
				instanceProto.runtime.trigger(pluginProto.cnds.OnMessageFromIs, instanceProto)
				instanceProto.runtime.trigger(pluginProto.cnds.OnMessageHasProperty, instanceProto)
			}
		}

		instanceProto.airConsole.onDeviceStateChange = function (deviceId, data) {
		}

		instanceProto.airConsole.onCustomDeviceStateChange = function (deviceId, customData) {
			instanceProto.deviceId = deviceId
			instanceProto.customData = customData
			instanceProto.runtime.trigger(pluginProto.cnds.OnCustomDeviceStateChange, instanceProto)
		}

		instanceProto.airConsole.onHighScores = function (highscores) {
			if (highscores) {
				instanceProto.highscores = highscores
				instanceProto.runtime.trigger(pluginProto.cnds.OnHighScores, instanceProto)
			}
		}

		instanceProto.airConsole.onHighScoreStored = function (highscores) {
			if (highscores) {
				instanceProto.highscores = highscores
				instanceProto.runtime.trigger(pluginProto.cnds.OnHighScoreStored, instanceProto)
			}
		}

		instanceProto.airConsole.onAdComplete = function (adWasShown) {
			instanceProto.adCompleted = (adWasShown) ? 1 : 0
			instanceProto.adShowing = 0
			instanceProto.runtime.trigger(pluginProto.cnds.OnAdComplete, instanceProto)
		}

		instanceProto.airConsole.onAdShow = function () {
			instanceProto.adShowing = 1
			instanceProto.runtime.trigger(pluginProto.cnds.OnAdShow, instanceProto)
		}

		instanceProto.airConsole.onPremium = function (deviceId) {
			if (instanceProto.gameReady) {
				instanceProto.deviceId = deviceId
				instanceProto.runtime.trigger(pluginProto.cnds.OnPremium, instanceProto)
			}
		}

		instanceProto.airConsole.onPersistentDataLoaded = function (data) {
			if (data) {
				instanceProto.persistentData = data
				instanceProto.runtime.trigger(pluginProto.cnds.OnPersistentDataLoaded, instanceProto)
			}
		}

		instanceProto.airConsole.onPersistentDataStored = function (uid) {
			instanceProto.runtime.trigger(pluginProto.cnds.OnPersistentDataStored, instanceProto)
		}

		instanceProto.airConsole.onDeviceProfileChange = function (deviceId) {
			instanceProto.deviceId = deviceId
			instanceProto.runtime.trigger(pluginProto.cnds.OnDeviceProfileChange, instanceProto)
		}

		instanceProto.airConsole.onDeviceMotion = function (data) {
			instanceProto.motionData = data
			instanceProto.runtime.trigger(pluginProto.cnds.OnDeviceMotion, instanceProto)
		}

		instanceProto.airConsole.onMute = function (mute) {
			console.warn('Using deprecated action "onMute/onUnmute"')
		}
	}

	Acts.prototype.GameReady = function () {
		instanceProto.gameReady = true
		var deviceIds = instanceProto.airConsole.getControllerDeviceIds()
		for (var i = 0; i < deviceIds.length; i++) {
			instanceProto.airConsole.onConnect(deviceIds[i])
			instanceProto.airConsole.onCustomDeviceStateChange(deviceIds[i], null)
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

		instanceProto.airConsole.message(deviceId, value)
	}

	Acts.prototype.Broadcast = function (property, message) {
		instanceProto.airConsole.broadcast(message)
	}

	Acts.prototype.SetCustomDeviceStateProperty = function (property, value) {
		instanceProto.airConsole.setCustomDeviceState(property, value)
	}

	Acts.prototype.RequestHighScores = function (level_name, level_version, uids, ranks, total, top) {
		instanceProto.highscores = null
		var uidsArray
		if (uids === 'all') {
			uidsArray = ''
		} else if (uids.indexOf(',') > -1) {
			uidsArray = uids.split(',')
		} else {
			uidsArray = [uids]
		}
		var ranksArray = (ranks === 'world') ? [ranks] : ranks.split(',')
		instanceProto.airConsole.requestHighScores(level_name, level_version, uidsArray, ranksArray, total, top)
	}

	Acts.prototype.StoreHighScores = function (level_name, level_version, score, uid, data, score_string) {
		var uidArray = uid.split(',')
		instanceProto.airConsole.storeHighScore(level_name, level_version, score, uidArray, data, score_string)
	}

	Acts.prototype.SetActivePlayers = function (max_players) {
		instanceProto.airConsole.setActivePlayers(max_players)
	}

	Acts.prototype.ShowAd = function () {
		instanceProto.airConsole.showAd()
	}

	Acts.prototype.NavigateHome = function () {
		instanceProto.airConsole.navigateHome()
	}

	Acts.prototype.NavigateTo = function (url) {
		instanceProto.airConsole.navigateTo(url)
	}

	Acts.prototype.RequestPersistentData = function (uids) {
		instanceProto.persistentData = null
		var uidsArray = (uids.indexOf(',') > -1) ? uids.split(',') : [uids]
		instanceProto.airConsole.requestPersistentData(uidsArray)
	}

	Acts.prototype.StorePersistentData = function (key, value, uid) {
		instanceProto.airConsole.storePersistentData(key, value, uid)
	}

	Acts.prototype.SendPresetMessage = function (deviceId) {
		if (instanceProto.runningOffline) return

		instanceProto.airConsole.message(deviceId, instanceProto.presetMessage)
		instanceProto.presetMessage = {}
	}

	Acts.prototype.BroadcastPresetMessage = function () {
		instanceProto.airConsole.broadcast(instanceProto.presetMessage)
		instanceProto.presetMessage = {}
	}

	Acts.prototype.SetPresetMessage = function (key, value) {
		instanceProto.presetMessage[key] = value
	}

	Acts.prototype.ClearPresetMessage = function () {
		instanceProto.presetMessage = {}
	}

	Acts.prototype.EditProfile = function () {
		if (instanceProto.isController) {
			instanceProto.airConsole.editProfile()
		} else {
			console.warn('You can\' use "Edit profile" on screen')
		}
	}

	Acts.prototype.SetOrientation = function (orientation) {
		if (instanceProto.isController) {
			instanceProto.airConsole.setOrientation((orientation === 1) ? AirConsole.ORIENTATION_PORTRAIT : AirConsole.ORIENTATION_LANDSCAPE)
		}
	}

	Acts.prototype.GetPremium = function () {
		instanceProto.airConsole.getPremium()
	}

	Acts.prototype.Vibrate = function (time) {
		if (instanceProto.properties[1] === 1 && time > 0) {
			instanceProto.airConsole.vibrate(time)
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
		ret.set_int(instanceProto.deviceId)
	}

	Exps.prototype.Message = function (ret) {
		if (typeof instanceProto.message === 'object') {
			if (Object.keys(instanceProto.message).length === 1) {
				ret.set_string(instanceProto.message[Object.keys(instanceProto.message)[0]])
			} else {
				ret.set_string(JSON.stringify(instanceProto.message))
			}
		} else {
			ret.set_string(instanceProto.message)
		}
	}

	Exps.prototype.MessageAtProperty = function (ret, property) {
		if (typeof instanceProto.message === 'object' && instanceProto.message.hasOwnProperty(property)) {
			ret.set_string(instanceProto.message[property])
		} else {
			console.warn('MessageAtProperty - Tried to access a non existing property')
		}
	}

	Exps.prototype.IsMultipartMessage = function (ret) {
		if (instanceProto.message !== null && typeof instanceProto.message === 'object' && Object.keys(instanceProto.message).length > 1) {
			ret.set_int(1)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.MessageHasProperty = function (ret, property) {
		if (instanceProto.message !== null && typeof instanceProto.message === 'object' && instanceProto.message.hasOwnProperty(property)) {
			ret.set_int(1)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.MessageAsJSON = function (ret) {
		var c2Dictionary = {}
		c2Dictionary['c2dictionary'] = true
		c2Dictionary['data'] = getProperties(instanceProto.message)
		ret.set_string(JSON.stringify(c2Dictionary))
	}

	Exps.prototype.GetProfilePicture = function (ret, deviceId) {
		var pic = instanceProto.airConsole.getProfilePicture(deviceId) || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?f=y'
		ret.set_string(pic)
	}

	Exps.prototype.GetProfilePictureWithSize = function (ret, deviceId, pictureSize) {
		var pic = instanceProto.airConsole.getProfilePicture(deviceId, pictureSize) || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?f=y'
		ret.set_string(pic)
	}

	Exps.prototype.GetNickname = function (ret, deviceId) {
		var nickname = instanceProto.airConsole.getNickname(deviceId) || 'Nickname not found'
		ret.set_string(nickname)
	}

	Exps.prototype.GetUID = function (ret, deviceId) {
		var uid = instanceProto.airConsole.getUID(deviceId) || 'Unknown UID'
		ret.set_string(uid)
	}

	Exps.prototype.GetMessagePropertiesCount = function (ret) {
		if (instanceProto.message !== null && typeof instanceProto.message === 'object') {
			ret.set_int(Object.keys(instanceProto.message).length)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.GetMasterControllerDeviceId = function (ret) {
		var id = instanceProto.airConsole.getMasterControllerDeviceId()
		ret.set_int((typeof id !== 'number' || isNaN(id)) ? -1 : id)
	}

	Exps.prototype.ConvertPlayerNumberToDeviceId = function (ret, playerNumber) {
		var id = instanceProto.airConsole.convertPlayerNumberToDeviceId(playerNumber)
		ret.set_int((typeof id !== 'number') ? -1 : id)
	}

	Exps.prototype.ConvertDeviceIdToPlayerNumber = function (ret, deviceId) {
		var playerNumber = instanceProto.airConsole.convertDeviceIdToPlayerNumber(deviceId)
		ret.set_int((typeof playerNumber !== 'number') ? -1 : playerNumber)
	}

	Exps.prototype.IsPremium = function (ret, deviceId) {
		ret.set_int((instanceProto.airConsole.isPremium(deviceId) !== false) ? 1 : 0)
	}

	Exps.prototype.GetControllerDeviceIds = function (ret) {
		var arr = instanceProto.airConsole.getControllerDeviceIds()

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
		if (instanceProto.persistentData !== null) {
			var c2Dictionary = {}
			c2Dictionary['c2dictionary'] = true
			c2Dictionary['data'] = getProperties(instanceProto.persistentData)
			ret.set_string(JSON.stringify(c2Dictionary))
		} else {
			console.warn('Persistent data requested but they weren\'t loaded. Did you forget to use RequestPersistentData?')
			ret.set_string('')
		}
	}

	Exps.prototype.GetHighscores = function (ret) {
		if (instanceProto.highscores !== null) {
			var c2Dictionary = {}
			c2Dictionary['c2dictionary'] = true
			c2Dictionary['data'] = getProperties(instanceProto.highscores)
			ret.set_string(JSON.stringify(c2Dictionary))
		} else {
			console.warn('Highscores data requested but they weren\'t loaded. Did you forget to use RequestHighscores?')
			ret.set_string('')
		}
	}

	Exps.prototype.IsPluginOffline = function (ret) {
		if (instanceProto.runningOffline) {
			ret.set_int(1)
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.GetActivePlayerDeviceIds = function (ret) {
		var arr = instanceProto.airConsole.getActivePlayerDeviceIds()

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
		ret.set_int(instanceProto.adShowing)
	}

	Exps.prototype.AdShown = function (ret) {
		ret.set_int(instanceProto.adCompleted)
	}

	Exps.prototype.GetThisDeviceId = function (ret) {
		if (instanceProto.isController) {
			ret.set_int(instanceProto.airConsole.getDeviceId())
		} else {
			ret.set_int(0)
		}
	}

	Exps.prototype.MotionData = function (ret) {
		if (instanceProto.motionData !== null) {
			var c2Dictionary = {}
			c2Dictionary['c2dictionary'] = true
			c2Dictionary['data'] = getProperties(instanceProto.motionData)
			ret.set_string(JSON.stringify(c2Dictionary))
		} else {
			ret.set_string('')
		}
	}

	Exps.prototype.GetLanguage = function (ret, deviceId) {
		if (!instanceProto.useTranslation) {
			console.log('Translation support not enabled. Please turn it on in your Construct 2 project settings.')
			ret.set_string('')
		} else {
			ret.set_string(instanceProto.airConsole.getLanguage(deviceId) || 'en-US')
		}
	}

	Exps.prototype.GetTranslation = function (ret, id, values) {
		if (!instanceProto.useTranslation) {
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
		ret.set_string(instanceProto.airConsole.getTranslation(id, values) || '')
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
