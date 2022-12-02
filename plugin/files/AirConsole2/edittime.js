function GetPluginSettings() {
    return {
        'name': 'AirConsole 2',			// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
        'id': 'AirConsole2',			// this is used to identify this plugin and is saved to the project; never change it
        'version': '1.8.0.0',				// 3 first digits follow AirConsole API's version. Last digit for the plugin's version
        'description': 'Extend your game with local multiplayer fun',
        'author': 'Psychokiller1888 for N-Dreams AG',
        'help url': 'https://github.com/AirConsole/airconsole-construct2/wiki',
        'dependency': 'https://www.airconsole.com/api/airconsole-1.8.0.js',
        'category': 'Web',					// Prefer to re-use existing categories, but you can set anything here
        'type': 'object',				// either "world" (appears in layout and is drawn), else "object"
        'rotatable': false,					// only used when "type" is "world".  Enables an angle property on the object.
        'flags': pf_singleglobal			// uncomment lines to enable flags...
        //	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
        //	| pf_texture			// object has a single texture (e.g. tiled background)
        //	| pf_position_aces		// compare/set/get x, y...
        //	| pf_size_aces			// compare/set/get width, height...
        //	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
        //	| pf_appearance_aces	// compare/set/get visible, opacity...
        //	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
        //	| pf_animations			// enables the animations system.  See 'Sprite' for usage
        //	| pf_zorder_aces		// move to top, bottom, layer...
        //  | pf_nosize				// prevent resizing in the editor
        //	| pf_effects			// allow WebGL shader effects to be added
        //  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
        // a single non-tiling image the size of the object) - required for effects to work properly
    }
}

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// Signalling
AddCondition(0, cf_trigger, 'On connect', 'Signalling', 'On new connection', 'Triggered when a device connects to the game.', 'OnConnect')

AddCondition(1, cf_trigger, 'On disconnect', 'Signalling', 'On disconnection', 'Triggered when a device disconnects from the game.', 'OnDisconnect')

AddNumberParam('Device id', 'Device id to track', '')
AddCondition(2, cf_trigger, 'On device disconnect', 'Signalling', 'On device id {0} disconnects', 'Triggered when a specific device disconnects from the game.', 'OnDeviceDisconnect')

AddCondition(3, cf_trigger, 'On too many players', 'Signalling', 'On too many players', 'Triggered when a device connects but the max player limit property is reached or exceeded.', 'OnTooManyPlayers')

AddCondition(4, cf_trigger, 'On premium connect', 'Signalling', 'On premium connect', 'Triggered when a device becomes premium or when a premium device connects.', 'OnPremium')

AddCondition(5, cf_trigger, 'On message', 'Messaging', 'On message from any device', 'Triggered when receiving a message from any device', 'OnMessage')

AddNumberParam('Device id', 'Device id from which the message should be', '')
AddCondition(6, cf_trigger, 'On message from', 'Messaging', 'On message from device id {0}', 'Triggered when receiving a message from a specific device', 'OnMessageFrom')

AddStringParam('Property', 'The message property to compare to', '"message"')
AddStringParam('Property value', 'The message content awaited', '')
AddCondition(7, cf_trigger, 'On message is', 'Messaging', 'On message property {0} is {1}', 'Triggered when receiving a message with a specific content', 'OnMessageIs')

AddStringParam('Property', 'The message property to compare to', '"message"')
AddStringParam('Property value', 'The message content awaited', '')
AddNumberParam('Device id', 'Device id from which the message should be', '')
AddCondition(8, cf_trigger, 'On message from is', 'Messaging', 'On message property {0} is {1} and from device id {2}', 'Triggered when receiving a message with a specific content from a specific device', 'OnMessageFromIs')

AddStringParam('Property', 'The message property awaited')
AddCondition(9, cf_trigger, 'On message has property', 'Messaging', 'On message has property {0}', 'Triggered when a message from any device has a specific property.', 'OnMessageHasProperty')

AddNumberParam('Device id', 'Device id to check if logged in', '')
AddCondition(10, 0, 'Is user logged in', 'Device and user', 'Is device id {0} user logged in', 'True if the device\'s user is logged in, false otherwise.', 'IsUserLoggedIn')

AddCondition(11, cf_trigger, 'On ad complete', 'Ads', 'On ad complete', 'Triggered when an advertisement is finished or no advertisement was shown.', 'OnAdComplete')

AddCondition(12, cf_trigger, 'On ad show', 'Ads', 'On advertisement showing', 'Triggered when an advertisement is shown.', 'OnAdShow')

AddCondition(13, cf_trigger, 'On persistent data loaded', 'Persistent data', 'On persistent data loaded', 'Gets called when persistent data was loaded from RequestPersistentData.', 'OnPersistentDataLoaded')

AddCondition(14, cf_trigger, 'On persistent data stored', 'Persistent data', 'On persistent data stored', 'Gets called when persistent data was stored from StorePersistentData.', 'OnPersistentDataStored')

AddCondition(15, cf_trigger, 'On receiving highscores', 'Highscores', 'On receiving highscores', 'Triggered when highscores received.', 'OnHighScores')

AddCondition(16, cf_trigger, 'On highscores stored', 'Highscores', 'On highscores stored', 'Triggered when highscores storing is done.', 'OnHighScoreStored')

AddCondition(17, cf_trigger, 'On device profile change', 'Device and user', 'On device profile change', 'Triggered when a device updates it\'s profile pic, nickname or email.', 'OnDeviceProfileChange')

AddCondition(18, cf_trigger, 'On custom device state change', 'Device and user', 'On custom device state change', 'Triggered when a device updates it\'s custom device state.', 'OnCustomDeviceStateChange')

AddNumberParam('Device id', 'Device id to check if premium', '')
AddCondition(19, 0, 'Is premium', 'Device and user', 'Is device id {0} premium', 'True if the device\'s user is premium, false otherwise.', 'IsPremium')

AddCondition(20, 0, 'Is plugin offline', 'Plugin', 'Is plugin offline', 'True if the plugin loaded as offline, false otherwise.', 'IsPluginOffline')

AddCondition(21, 0, 'Is multipart message', 'Messaging', 'Is multipart message', 'True if the last received message has more than one property set, false otherwise', 'IsMultipartMessage')

AddCondition(22, 0, 'Ad shown', 'Ads', 'Ad shown', 'True if an ad was shown.', 'AdShown')

AddCondition(23, 0, 'Is ad showing', 'Ads', 'Is ad showing', 'True if an ad is currently showing.', 'IsAdShowing')

AddCondition(24, cf_trigger, 'On device motion', 'Controller only', 'On device motion', 'Triggered every X millisecond if the plugin property has the \'Device motion\' property set higher than 0. This only works for controllers.', 'OnDeviceMotion')

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
AddAction(0, af_none, 'Game ready', 'Game', 'Set the game as ready', 'Sets the game as ready. This will trigger OnConnect for all already connected devices', 'GameReady')

AddNumberParam('Device id', 'Device id to send the message to.')
AddStringParam('Property name', 'Message property name. (can only be \'message\' for now)', '"message"')
AddStringParam('Message', 'Message to send')
AddAction(1, af_none, 'Message', 'Messaging', 'Send <i>{1}: {2}</i> to device id {0}.', 'Sends a message to a specific device', 'Message')

AddStringParam('Property name', 'Message property name. (can only be \'message\' for now)', '"message"')
AddStringParam('Message', 'Message to send')
AddAction(2, af_none, 'Broadcast', 'Messaging', 'Send <i>{0}: {1}</i> to all connected devices.', 'Sends a message to all connected devices', 'Broadcast')

AddAnyTypeParam('Property', 'Device state property to set')
AddAnyTypeParam('Value', 'Device state value')
AddAction(3, af_none, 'Set custom device state property', 'Messaging', 'Set custom state property <i>{0}</i> to <i>{1}</i>', 'Sets a device custom state property', 'SetCustomDeviceStateProperty')

AddStringParam('Level name', 'The name of the level.')
AddStringParam('Level version', 'The version of the level.', '"1.0"')
AddAnyTypeParam('Uids', 'A comma separated list of users UIDs that should be included in the result. Default is all connected controllers.', '"all"')
AddStringParam('Ranks', 'A comma separated list of high score rank types. High score rank types can include data from across the world, only a specific area or a users friends. Valid array entries are \'world\', \'country\', \'region\', \'city\', \'friends\'. Use comma to separate the types if you need more than one.', '"world"')
AddNumberParam('Total', 'Amount of high scores to return per rank type.', '8')
AddNumberParam('Top', 'Amount of top high scores to return per rank type. top is part of total.', '5')
AddAction(4, af_none, 'Request HighScores', 'Highscores', 'Request highscores', 'Requests highscores. OnHighScores triggered when the highscores are returned.', 'RequestHighScores')

AddStringParam('Level name', 'The name of the level the user was playing. This should be a human readable string because it appears in the high score sharing image. You can also just pass an empty string.', '')
AddStringParam('Level version', 'The version of the level the user was playing. This is for your internal use.', '"1.0"')
AddNumberParam('Score', 'The score the user has achieved.')
AddStringParam('Uid', 'The UIDs of the users that achieved the high score. Can be a single uid or an array of uids. Default is the uid of this device. Use comma to separate multiple UIDS.')
AddStringParam('Data', 'Custom high score data (e.g. can be used to implement Ghost modes or include data to verify that it is not a fake high score).', '')
AddStringParam('Score string', 'A short human readable representation of the score. (e.g. \'4 points in 3s\'). Defaults to \'X points\' where x is the score converted to an integer.', '')
AddAction(5, af_none, 'Store HighScores', 'Highscores', 'Store highscores', 'Stores highscores. OnHighScoreStored triggered when the request is completed.', 'StoreHighScores')

AddNumberParam('Max player', 'The maximum number of controllers that should get a player number assigned.')
AddAction(6, af_none, 'Set active players', 'System', 'Set active players', 'Takes all currently connected controllers and assigns them a player number. Can only be called by the screen. The assigned player numbers always start with 0 and are consecutive. You can hardcode player numbers, but not device_ids. Once the screen has called setActivePlayers you can get the device_id of the first player by calling convertPlayerNumberToDeviceId(0), the device_id of the second player by using ConvertPlayerNumberToDeviceId(1). You can also convert device_ids to player numbers by using ConvertDeviceIdToPlayerNumber(device_id). You can get all device_ids that are active players by using GetActivePlayerDeviceIds().', 'SetActivePlayers')

AddAction(7, af_none, 'Show ad', 'Ads', 'Show ad on controllers and screen', 'Show ad on every connected controller and screen. onAdComplete is called when showing ad is over', 'ShowAd')

AddAction(8, af_none, 'Navigate home', 'Browser', 'Navigate home', 'Request that all devices return to the AirConsole store.', 'NavigateHome')

AddStringParam('Url', 'The base url of the game to navigate to (excluding screen.html or controller.html).', '""')
AddAction(9, af_none, 'Navigate to', 'Browser', 'Navigate to {0}', 'Request that all devices load a game by url.', 'NavigateTo')

AddStringParam('Uids', 'A comma separated list of the uids for which you would like to request the persistent data.', '""')
AddAction(10, af_none, 'Request persistent data', 'Persistent data', 'Request persistent data for ids {0}', 'Requests persistent data from the servers.', 'RequestPersistentData')

AddStringParam('Property', 'Persistent data property name.', '""')
AddStringParam('Value', 'Persistent data property value.', '""')
AddStringParam('uid', 'The uid for which the data should be stored.', '""')
AddAction(11, af_none, 'Store persistent data', 'Persistent data', 'Store persistent data {0} = {1} for uid {2}', 'Stores a property-value pair persistently on the AirConsole servers. Storage is per game. Total storage can not exceed 1 MB per game and uid. Storage is public, not secure and anyone can request and tamper with it. Do not store sensitive data.', 'StorePersistentData')

AddNumberParam('Device id', 'Device id to send the message to.')
AddAction(12, af_none, 'Send preset message', 'Preset message', 'Send preset message to device id {0}.', 'Sends a previously set message to a specific device', 'SendPresetMessage')

AddAction(13, af_none, 'Broadcast preset message', 'Preset message', 'Send preset message to all connected devices.', 'Sends a previously set message to all connected devices', 'BroadcastPresetMessage')

AddStringParam('Property', 'The message property.')
AddAnyTypeParam('Value', 'The property value.')
AddAction(14, af_none, 'Set message property', 'Preset message', 'Set <i>{0}</i> property to <i>{1}</i>', 'Set message property', 'SetPresetMessage')

AddAction(15, af_none, 'Clear preset message', 'Preset message', 'Clear the preset message.', 'Clear the preset message', 'ClearPresetMessage')

AddAction(16, af_none, 'Edit profile', 'Profile', '(Controller only) Edit the player profile', 'Edit profile', 'EditProfile')

AddAction(17, af_none, 'Get premium', 'Profile', '(Controller only) Offers the user to become a premium member. Can only be called from controllers. If you call getPremium in development mode, the device becomes premium immediately', 'Get Premium', 'GetPremium')

AddNumberParam('Time', 'Duration, in milliseconds, of the vibration.')
AddAction(18, af_none, 'Vibrate', 'Controller only', '(Controller only) Vibrate the controller for {0} millisecond', 'Vibrate', 'Vibrate')

AddComboParamOption('Landscape')
AddComboParamOption('Portrait')
AddComboParam('Orientation', 'Desired controller orientation.', 0)
AddAction(19, af_none, 'Set orientation', 'Controller only', 'Set orientation to {0}', 'Set orientation', 'SetOrientation')


////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, 'Ids', 'Ids', 'DeviceId', 'Returns the device id that last triggered an AirConsole condition')

AddExpression(1, ef_return_string, 'Data', 'Data', 'Message', 'Last message received.')

AddStringParam('Property name', 'Property name', '')
AddExpression(2, ef_return_string, 'Data', 'Data', 'MessageAtProperty', 'Last message received with a specific property name')

AddExpression(3, ef_return_number, 'Data', 'Data', 'IsMultipartMessage', 'Returns 1 if the last message has more than 1 property, else 0')

AddStringParam('Property name', 'Property name', '')
AddExpression(4, ef_return_number, 'Data', 'Data', 'MessageHasProperty', 'Returns 1 if the last message has the specified property set, else 0')

AddExpression(5, ef_return_string, 'Data', 'Data', 'MessageAsJSON', 'Returns a JSON string representation of the last message received')

AddNumberParam('Device id', 'Device id')
AddExpression(6, ef_return_string | ef_deprecated, 'Profile', 'Profile', 'GetProfilePicture', 'Returns the profile picture url of the specified device id')

AddNumberParam('Device id', 'Device id')
AddExpression(7, ef_return_string, 'Profile', 'Profile', 'GetNickname', 'Returns the nickname of the specified device id')

AddNumberParam('Device id', 'Device id')
AddExpression(8, ef_return_string, 'Profile', 'Profile', 'GetUID', 'Returns UID of the specified device id')

AddExpression(9, ef_return_number, 'Data', 'Data', 'GetMessagePropertiesCount', 'Returns how many properties the last received message contains')

AddExpression(10, ef_return_number, 'Ids', 'Ids', 'GetMasterControllerDeviceId', 'Returns the device id of the master controller')

AddNumberParam('Player number', 'Player number')
AddExpression(11, ef_return_number, 'Ids', 'Ids', 'ConvertPlayerNumberToDeviceId', 'Converts the specified player number into its attributed device id')

AddNumberParam('Device id', 'Device id')
AddExpression(12, ef_return_number, 'Ids', 'Ids', 'ConvertDeviceIdToPlayerNumber', 'Converts the specified device id into its attributed player number')

AddExpression(13, ef_return_string, 'Ids', 'Ids', 'GetControllerDeviceIds', 'Returns a JSON converted C2Array of all the device ids that have loaded your game')

AddNumberParam('Device id', 'Device id')
AddExpression(14, ef_return_number, 'Profile', 'Profile', 'IsPremium', 'Returns 1 if the specified device id is premium, else 0')

AddExpression(15, ef_return_string, 'Persistent data', 'Persistent data', 'GetPersistentData', 'Returns a JSON converted C2Dictionary of the last loaded persistent data')

AddExpression(16, ef_return_string, 'Highscores', 'Highscores', 'GetHighscores', 'Returns a JSON converted C2Dictionary of the last loaded highscores')

AddExpression(17, ef_return_number, 'Plugin', 'Plugin', 'IsPluginOffline', 'Returns 1 if the plugin loaded as offline, else 0')

AddExpression(18, ef_return_string, 'Ids', 'Ids', 'GetActivePlayerDeviceIds', 'Returns an array of device_ids of the active players previously set by the screen by calling setActivePlayers. The first device_id in the array is the first player, the second device_id in the array is the second player etc.')

AddNumberParam('Device id', 'Device id')
AddNumberParam('Picture size', 'Picture size', '64')
AddExpression(19, ef_return_string, 'Profile', 'Profile', 'GetProfilePictureWithSize', 'Returns the profile picture url of the specified device id')

AddExpression(20, ef_return_number, 'Ads', 'Ads', 'AdShown', 'Returns 1 if ads were shown, else 0')

AddExpression(21, ef_return_number, 'Ads', 'Ads', 'IsAddShowing', 'Returns 1 if ads are currently showing, else 0.')

AddExpression(22, ef_return_number, 'Profile', 'Profile', 'GetThisDeviceId', 'Returns the current device id from which this function is called.')

AddExpression(23, ef_return_number, 'Controller only', 'Controller only', 'MotionData', 'Returns a JSON converted C2Dictionary containing the device motion data. This works for controllers only, and the plugin should have it\'s \'Device motion\' property set higher than 0')

AddNumberParam('Device id', 'Device id')
AddExpression(24, ef_return_string, 'Profile', 'Profile', 'GetLanguage', 'Returns the current IETF language tag of a device e.g. "en" or "en-US"')
////////////////////////////////////////
ACESDone()

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
    new cr.Property(ept_integer, 'Max players', 4, 'Define the maximum amount of players'),
    new cr.Property(ept_combo, 'Type', 'Screen', 'Is this project intended to be a controller?', 'Screen|Controller'),
    new cr.Property(ept_combo, 'Use translations', 'false', 'Use AirConsole server translations service', 'false|true'),
    new cr.Property(ept_section, 'Controller only', 'These properties only take effect if \'Is controller\' is checked'),
    new cr.Property(ept_combo, 'Orientation', 'Landscape', 'CONTROLLER ONLY - Sets this controller in either PORTRAIT or LANDSCAPE mode', 'Landscape|Portrait'),
    new cr.Property(ept_combo, 'Synchronize time', 'false', 'CONTROLLER ONLY - Enable time synchronization with server. This is needed for \'getServerTime()\'', 'false|true'),
    new cr.Property(ept_integer, 'Device motion', 0, 'CONTROLLER ONLY - If set > 0, onDeviceMotion gets called every \'Device motion\' milliseconds with the data from the accelerometer and gyroscope')
]

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
    return new IDEObjectType()
}

// Class representing an object type in the IDE
function IDEObjectType() {
    assert2(this instanceof arguments.callee, 'Constructor called as a function')
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
    return new IDEInstance(instance)
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
    assert2(this instanceof arguments.callee, 'Constructor called as a function')

    // Save the constructor parameters
    this.instance = instance
    this.type = type

    // Set the default property values from the property table
    this.properties = {}

    for (var i = 0; i < property_list.length; i++)
        this.properties[property_list[i].name] = property_list[i].initial_value

    // Plugin-specific variables
    // this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function (renderer) {
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function (renderer) {
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function (renderer) {
}
