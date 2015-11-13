// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.AirConsole = function(runtime)
{
  this.runtime = runtime;
};

(function ()
{
  /////////////////////////////////////
  // *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
  //                            vvvvvvvv
  var pluginProto = cr.plugins_.AirConsole.prototype;

  /////////////////////////////////////
  // Object type class
  pluginProto.Type = function(plugin)
  {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  // called on startup for each object type
  typeProto.onCreate = function()
  {
  };

  /////////////////////////////////////
  // Instance class
  pluginProto.Instance = function(type)
  {
    this.type = type;
    this.runtime = type.runtime;

    this.ac_join_id = null;
    this.ac_leave_id = null;
    this.ac_from_id = null;
    this.ac_message_key = null;
    this.ac_message_data = null;

    // any other properties you need, e.g...
    // this.myValue = 0;
  };

  var instanceProto = pluginProto.Instance.prototype;

  // called whenever an instance is created
  instanceProto.onCreate = function()
  {
    var self = this;
    this.air_console = new AirConsole();
    this.air_console.game_ready = false;

    var addDeviceId = function(device_id) {
      self.ac_join_id = device_id;
      self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnDeviceJoin, self);
    };

    this.air_console.onMessage = function(device_id, data) {
      if (data.handshake) {
        addDeviceId(device_id);
      } else {
        self.ac_from_id = device_id;
        self.ac_message_key = data.key;
        self.ac_message_data = data.message;
        if (data.key) {
          self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnMessageKey, self);
        }
        if (data.message) {
          self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnMessage, self);
        }
      }
    };

    this.air_console.onDeviceStateChange = function(device_id, device_data) {
      if (!device_data) {
        self.ac_leave_id = device_id;
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnDeviceLeft, self);
      // Game already started, then we can simply add a device
      } else {
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnGetCustomDeviceState, self);
      }
    };

    this.air_console.onReady = function() {};
  };

  // called whenever an instance is destroyed
  // note the runtime may keep the object after this call for recycling; be sure
  // to release/recycle/reset any references to other objects in this function.
  instanceProto.onDestroy = function ()
  {
  };

  // called when saving the full state of the game
  instanceProto.saveToJSON = function ()
  {
    // return a Javascript object containing information about your object's state
    // note you MUST use double-quote syntax (e.g. "property": value) to prevent
    // Closure Compiler renaming and breaking the save format
    return {
      // e.g.
      //"myValue": this.myValue
    };
  };

  // called when loading the full state of the game
  instanceProto.loadFromJSON = function (o)
  {
    // load from the state previously saved by saveToJSON
    // 'o' provides the same object that you saved, e.g.
    // this.myValue = o["myValue"];
    // note you MUST use double-quote syntax (e.g. o["property"]) to prevent
    // Closure Compiler renaming and breaking the save format
  };

  // only called if a layout object - draw to a canvas 2D context
  instanceProto.draw = function(ctx)
  {
  };

  // only called if a layout object in WebGL mode - draw to the WebGL context
  // 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
  // directory or just copy what other plugins do.
  instanceProto.drawGL = function (glw)
  {
  };

  // The comments around these functions ensure they are removed when exporting, since the
  // debugger code is no longer relevant after publishing.
  /**BEGIN-PREVIEWONLY**/
  instanceProto.getDebuggerValues = function (propsections)
  {
    // Append to propsections any debugger sections you want to appear.
    // Each section is an object with two members: "title" and "properties".
    // "properties" is an array of individual debugger properties to display
    // with their name and value, and some other optional settings.
    propsections.push({
      "title": "My debugger section",
      "properties": [
        // Each property entry can use the following values:
        // "name" (required): name of the property (must be unique within this section)
        // "value" (required): a boolean, number or string for the value
        // "html" (optional, default false): set to true to interpret the name and value
        //                   as HTML strings rather than simple plain text
        // "readonly" (optional, default false): set to true to disable editing the property

        // Example:
        // {"name": "My property", "value": this.myValue}
      ]
    });
  };

  instanceProto.onDebugValueEdited = function (header, name, value)
  {
    // Called when a non-readonly property has been edited in the debugger. Usually you only
    // will need 'name' (the property name) and 'value', but you can also use 'header' (the
    // header title for the section) to distinguish properties with the same name.
    if (name === "My property")
      this.myProperty = value; //asd asd
  };
  /**END-PREVIEWONLY**/

  //////////////////////////////////////
  // Conditions
  function Cnds() {};

  Cnds.prototype.OnMessage = function (sent_message_val, comp1, expected_message_val, from_id, comp2, object_device_id)
  {
    return sent_message_val === expected_message_val && from_id === object_device_id;
  };

  Cnds.prototype.OnMessageKey = function (sent_message_val, comp1, expected_message_val)
  {
    return sent_message_val === expected_message_val;
  };

  Cnds.prototype.OnDeviceJoin = function (myparam)
  {
    return true;
  };

  Cnds.prototype.OnDeviceLeft = function (myparam)
  {
    return true;
  };

  Cnds.prototype.OnGetCustomDeviceState = function (device_id, key, value)
  {
    var result = false;
    var custom_data = this.air_console.getCustomDeviceState(device_id);
    if (custom_data) {
      result = custom_data[key] === value;
    }
    return result;
  };

  pluginProto.cnds = new Cnds();

  //////////////////////////////////////
  // Actions
  function Acts() {};

  // the example action
  Acts.prototype.Message = function (device_id, message)
  {
    this.air_console.message(device_id, message);
  };

  Acts.prototype.Broadcast = function (message)
  {
    this.air_console.broadcast(message);
  };

  Acts.prototype.SetCustomDeviceState = function (key, value)
  {
    var custom = this.air_console.getCustomDeviceState() || {};
    custom[key] = value;
    this.air_console.setCustomDeviceState(custom);
  };

  Acts.prototype.GameReady = function (message)
  {
    this.air_console.game_ready = true;
    this.air_console.broadcast({
      handshake: true
    });
  };

  pluginProto.acts = new Acts();

  //////////////////////////////////////
  // Expressions
  function Exps() {};

  // the example expression
  Exps.prototype.Message = function (ret)  // 'ret' must always be the first parameter - always return the expression's result through it!
  {
    ret.set_string(this.ac_message_data || ""); // return our value
    // ret.set_float(0.5);      // for returning floats
    // ret.set_string("Hello");   // for ef_return_string
    // ret.set_any("woo");      // for ef_return_any, accepts either a number or string
  };

  Exps.prototype.MessageKey = function (ret)
  {
    ret.set_string(this.ac_message_key || "");
  };

  Exps.prototype.DeviceID = function (ret)
  {
    ret.set_string(this.ac_from_id);
  };

  Exps.prototype.DeviceIDJoin = function (ret)
  {
    ret.set_string(this.ac_join_id);
  };

  Exps.prototype.DeviceIDLeft = function (ret)
  {
    ret.set_string(this.ac_leave_id);
  };

  pluginProto.exps = new Exps();

}());
