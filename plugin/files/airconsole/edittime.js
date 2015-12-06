function GetPluginSettings()
{
  return {
    "name": "AirConsole",
    "id": "AirConsole",
    "version": "1.0",
    "description": "Extend your game with local multiplayer fun",
    "author": "N-Dream AG",
    "help url": "http://developers.airconsole.com",
    "dependency": "airconsole-1.3.0.js",
    "category": "Web",        // Prefer to re-use existing categories, but you can set anything here
    "type": "object",        // either "world" (appears in layout and is drawn), else "object"
    "rotatable":  false,         // only used when "type" is "world".  Enables an angle property on the object.
    "flags": pf_singleglobal           // uncomment lines to enable flags...
          //  | pf_singleglobal   // exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
          //  | pf_texture      // object has a single texture (e.g. tiled background)
          //  | pf_position_aces    // compare/set/get x, y...
          //  | pf_size_aces      // compare/set/get width, height...
          //  | pf_angle_aces     // compare/set/get angle (recommended that "rotatable" be set to true)
          //  | pf_appearance_aces  // compare/set/get visible, opacity...
          //  | pf_tiling       // adjusts image editor features to better suit tiled images (e.g. tiled background)
          //  | pf_animations     // enables the animations system.  See 'Sprite' for usage
          //  | pf_zorder_aces    // move to top, bottom, layer...
          //  | pf_nosize       // prevent resizing in the editor
          //  | pf_effects      // allow WebGL shader effects to be added
          //  | pf_predraw      // set for any plugin which draws and is not a sprite (i.e. does not simply draw
                        // a single non-tiling image the size of the object) - required for effects to work properly
  };
};

// ==============================================
// CONDITION
// ==============================================
// Receive onMessageKey
AddAnyTypeParam("Message Key", "Data of the message key AirConsole.MessageKey");
AddCmpParam("Is", "Compare message data key");
AddAnyTypeParam("Value", "Compare to this value");
AddCondition(0, cf_trigger, "On message key", "Data", "On message key is {2}", "Triggered when a message key is received from a device.", "OnMessageKey");

// Receive onMessage
AddAnyTypeParam("Value", "Compare to this value");
// AND DEVICE ID IS
AddAnyTypeParam("Object DeviceID", "The object associated to this device id");
AddCondition(1, cf_trigger, "On message", "Data", "On message is {0} and from {1}", "Triggered when a message is received from a device.", "OnMessage");

// On Join
AddCondition(2, cf_trigger, "On device join", "Signalling", "On device join", "Triggered when device joins the game.", "OnDeviceJoin");

// On Leave
AddAnyTypeParam("DeviceID", "The device id which leaves");
AddCondition(3, cf_trigger, "On device left", "Signalling", "On device {0} disconnects", "Triggered when device leaves the game.", "OnDeviceLeft");

// Receive on device state
AddAnyTypeParam("DeviceID", "The device id to check the custom state");
AddAnyTypeParam("Key", "The key of the custom state data");
AddAnyTypeParam("Value", "Is equal this value");
AddCondition(4, cf_trigger, "On check device custom state", "Data", "Custom state {1} of device {0} is {2}", "Triggered when custom state data of a device matches a value.", "OnGetCustomDeviceState");

// ==============================================
// ACTION
// ==============================================
// Message
AddAnyTypeParam("Device ID", "The device id to send the data");
AddAnyTypeParam("Data", "The data to send to the device");
AddAction(1, af_none, "Send data", "Data", "Send data <i>{1}</i> to {0}", "Send data to the device.", "Message");

// Broadcast
AddAnyTypeParam("Data", "The data to send to all device.");
AddAction(2, af_none, "Broadcast data", "Data", "Broadcast data <i>{0}</i>", "Send a message to all devices", "Broadcast");

// Game ready
AddAction(3, af_none, "Game ready", "Data", "Broadcast game is ready", "Send a message to all devices that game is ready and devices can connect", "GameReady");

// Set setCustomDeviceState
AddAnyTypeParam("Key", "The device state key");
AddAnyTypeParam("Value", "The device state value");
AddAction(4, af_none, "Set custom device state (key and value)", "Data", "Set custom data <i>{0}</i> to <i>{1}</i>", "Sets the screen custom data", "SetCustomDeviceState");


// ==============================================
// EXPRESSIONS
// ==============================================
AddExpression(1, ef_return_string, "", "Data", "Message", "The message received in a message trigger.");
AddExpression(2, ef_return_string, "", "Data", "MessageKey", "The message key received in a message trigger.");
AddExpression(3, ef_return_number, "", "Data", "DeviceID", "The ID of the device the message is from in a message trigger.");
AddExpression(4, ef_return_number, "", "Data", "DeviceIDJoin", "The ID of the device which joined in OnDeviceJoin event.");
AddExpression(5, ef_return_number, "", "Data", "DeviceIDLeft", "The ID of the device which left in OnDeviceLeft event.");

////////////////////////////////////////
ACESDone();
////////////////////////////////////////

var property_list = [
  //new cr.Property(ept_integer,  "Max players",    2,   "Define the maximum amount of players")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
  return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
  assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
  return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
  assert2(this instanceof arguments.callee, "Constructor called as a function");

  // Save the constructor parameters
  this.instance = instance;
  this.type = type;

  // Set the default property values from the property table
  this.properties = {};

  for (var i = 0; i < property_list.length; i++)
    this.properties[property_list[i].name] = property_list[i].initial_value;

  // Plugin-specific variables
  // this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
