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

function AirConsoleOffline() {
  console.warning('You are currently offline or AirConsole could not be loaded. Plugin fallback to AirConsole mock.');
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
  AirConsoleOffline.prototype.getControllerDeviceIds = function() {return []};
  AirConsoleOffline.prototype.getMasterControllerDeviceId = function() {return -9999};
  AirConsoleOffline.prototype.convertPlayerNumberToDeviceId = function() {};
  AirConsoleOffline.prototype.convertDeviceIdToPlayerNumber = function() {};
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
    this.ac_nickname_join = null;
    this.ac_nickname = null;
    // @deprecated Use ac_message_keys instead
    this.ac_message_key = null;
    //
    this.ac_message_data = null;
    this.ac_profile_picture_join = "";
    this.ac_profile_picture = "";
    this.ac_uid = null;
    this.ac_max_players = null;
    this.ac_is_premium_message = null;
    this.ac_is_premium_join = null;
    this.ac_message_keys = null;
    this.ac_message_keys_count = null;
    this.ac_persistent_data = null;
    this.ac_highscores_data = null;
  };

  var instanceProto = pluginProto.Instance.prototype;

  // called whenever an instance is created
  instanceProto.onCreate = function()
  {
    var self = this;
    if (typeof AirConsole !== 'undefined') {
      this.runningOffline = false;
      this.air_console = new AirConsole();
    }
    else {
      this.runningOffline = true;
      this.air_console = new AirConsoleOffline();
    }

    this.air_console.game_ready = false;
    this.ac_max_players = self.properties[0];

    var addDeviceId = function(device_id) {
      self.ac_join_id = device_id;
      self.ac_nickname_join = self.air_console.getNickname(device_id);
      self.ac_profile_picture_join = self.air_console.getProfilePicture(device_id);
      self.ac_uid = self.air_console.getUID(device_id);
      self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnDeviceJoin, self);
      if (self.air_console.isPremium(device_id)) {
        self.ac_is_premium_join = 1;
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnPremium, self);
      }
      else {
        self.ac_is_premium_join = 0;
      }
    };

    this.air_console.onMessage = function(device_id, data) {
      if (data.handshake) {
        if (self.air_console.getControllerDeviceIds().length > self.ac_max_players) {
          self.ac_join_id = device_id;
          self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnTooManyPlayers, self);
        } else {
          addDeviceId(device_id);
        }
      } else {
        self.ac_from_id = device_id;
        self.ac_message_key = data.key; //@deprecated
        self.ac_message_data = data.message;
        self.ac_nickname = self.air_console.getNickname(device_id);
        self.ac_profile_picture = self.air_console.getProfilePicture(device_id);
        self.ac_is_premium_message = (self.air_console.isPremium(device_id) !== false) ? 1 : 0;
        if (data.message) {
          self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnMessageIs, self);
          self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnMessageFrom, self);
          self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnMessage, self);
        }
        else {
          // We allow multiple object properties to be received, should work with the actual controller generator
          self.ac_message_keys_count = 0;
          if (typeof data === 'object') {
            for(var propertyName in data) {
              self.ac_message_keys_count++;
            }
          }
          if (data.key && self.ac_message_keys_count === 1) { // Just for the sake of backward compatibility... Flagged the condition as deprecated TODO remove me
            self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnMessageKey, self);
          }
          else if (self.ac_message_keys_count > 0) {
            // Do not work this out yet, just save data and we'll work that later if the user wants the keys-values dictionary
            self.ac_message_keys = data;
            self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnNewMessageKey, self);
            self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnNewMessageKeyIs, self);
            self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnNewMessageKeyContains, self);
          }
        }
      }
    };

    this.air_console.onDeviceStateChange = function(device_id, device_data) {
      if (!device_data) {
        self.ac_leave_id = device_id;
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnDeviceLeft, self);
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnAnyDeviceLeft, self);
      // Game already started, then we can simply add a device
      } else {
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnGetCustomDeviceState, self);
      }
    };

    this.air_console.onHighScores = function(data) {
      if (data) {
        self.ac_highscores_data = data;
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnHighScores, self);
      }
    }

    this.air_console.onHighScoreStored = function(data) {
      if (data) {
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnHighScoreStored, self);
      }
    }

    this.air_console.onAdComplete = function(complete) {
      self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnAdComplete, self);
    }

    this.air_console.onPremium = function(device_id) {
      self.ac_from_id = device_id;
      self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnPremium, self);
    }

    this.air_console.onPersistentDataLoaded = function(data) {
      if (data) {
        self.ac_persistent_data = data;
        self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnPersistentDataLoaded, self);
      }
    }

    this.air_console.onPersistentDataStored = function(uid) {
      self.runtime.trigger(cr.plugins_.AirConsole.prototype.cnds.OnPersistentDataStored, self);
    }

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
      this.myProperty = value;
  };
  /**END-PREVIEWONLY**/

  //////////////////////////////////////
  // Conditions
  function Cnds() {};

  Cnds.prototype.OnMessageIs = function (expected_message_val, object_device_id)
  {
    return this.ac_message_data === expected_message_val && this.ac_from_id === object_device_id;
  };

  Cnds.prototype.OnMessageFrom = function (object_device_id)
  {
    return this.ac_from_id === object_device_id;
  };

  Cnds.prototype.OnMessage = function ()
  {
    return true;
  };

  // @deprecated
  Cnds.prototype.OnMessageKey = function (sent_message_val, comp1, expected_message_val)
  {
    return sent_message_val === expected_message_val;
  };

  Cnds.prototype.OnNewMessageKey = function ()
  {
    return true;
  };

  Cnds.prototype.OnNewMessageKeyIs = function (expected_key)
  {
    return (this.ac_message_keys !== null && this.ac_message_keys_count === 1 && this.ac_message_keys.hasOwnProperty(expected_key));
  };

  Cnds.prototype.OnNewMessageKeyContains = function (expected_key)
  {
    return (this.ac_message_keys !== null && this.ac_message_keys.hasOwnProperty(expected_key));
  };

  Cnds.prototype.OnDeviceJoin = function (myparam)
  {
    return true;
  };

  Cnds.prototype.OnDeviceLeft = function (expected_device_id)
  {
    return this.ac_leave_id === expected_device_id;
  };

  Cnds.prototype.OnAnyDeviceLeft = function ()
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

  Cnds.prototype.OnHighScores = function (data)
  {
    return true;
  };

  Cnds.prototype.OnHighScoreStored = function (data)
  {
    return true;
  };

  Cnds.prototype.OnTooManyPlayers = function ()
  {
    return true;
  };

  Cnds.prototype.IsUserLoggedIn = function (device_id)
  {
    return this.air_console.isUserLoggedIn(device_id);
  };

  Cnds.prototype.OnAdComplete = function (complete)
  {
    return true;
  };

  Cnds.prototype.OnPremium = function ()
  {
    return true;
  };

  Cnds.prototype.OnPersistentDataLoaded = function (data)
  {
    return true;
  };

  Cnds.prototype.OnPersistentDataStored = function ()
  {
    return true;
  };

  Cnds.prototype.IsPluginOffline = function ()
  {
    return this.runningOffline;
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

  Acts.prototype.RequestHighScores = function (level_name, level_version, uids, ranks, total, top)
  {
    this.ac_highscore_data = null;
    uids = (uids === 'all') ? '' : uids;
    var ranksArray = (ranks === 'world') ? [ranks] : ranks.split(',');
    this.air_console.requestHighScores(level_name, level_version, uids, ranksArray, total, top);
  };

  Acts.prototype.StoreHighScores = function (level_name, level_version, score, uid, data, score_string)
  {
    var uidArray = uid.split(',');
    this.air_console.storeHighScore(level_name, level_version, score, uidArray, data, score_string);
  };

  Acts.prototype.SetActivePlayers = function (max_players)
  {
    this.air_console.setActivePlayers(max_players);
  };

  Acts.prototype.ShowAd = function ()
  {
    this.air_console.showAd();
  };

  Acts.prototype.NavigateHome = function ()
  {
    this.air_console.navigateHome();
  };

  Acts.prototype.NavigateTo = function (url)
  {
    this.air_console.navigateTo(url);
  };

  Acts.prototype.RequestPersistentData = function (uids)
  {
    this.ac_persisent_data = null;
    var uidsArray = (uids.indexOf(',') > -1) ? uids.split(',') : [uids];
    this.air_console.requestPersistentData(uidsArray);
  };

  Acts.prototype.StorePersistentData = function (key, value, uid)
  {
    this.air_console.storePersistentData(key, value, uid);
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

  Exps.prototype.NicknameJoin = function (ret)
  {
    ret.set_string(this.ac_nickname_join);
  };

  Exps.prototype.Nickname = function (ret)
  {
    ret.set_string(this.ac_nickname);
  };

  Exps.prototype.ProfilePictureJoin = function (ret)
  {
    ret.set_string(this.ac_profile_picture_join);
  };

  Exps.prototype.ProfilePicture = function (ret)
  {
    ret.set_string(this.ac_profile_picture);
  };

  Exps.prototype.DeviceUID = function (ret)
  {
    ret.set_string(this.ac_uid);
  };

  Exps.prototype.ControllerDeviceIDs = function (ret)
  {
    var arr = this.air_console.getControllerDeviceIds();

    // Ok, let's create a fake C2 JSON string that is compatible with C2 array load function
    var jsonStr = new Object();
    jsonStr['c2array'] = true;
    jsonStr['size'] = [arr.length, 1, 1];
    var data = [];
    for (var i in arr) {
      data.push([[arr[i]]]);
    }
    jsonStr['data'] = data;

    ret.set_string(JSON.stringify(jsonStr));
  };

  Exps.prototype.MasterControllerDeviceID = function (ret)
  {
    // getMasterControllerDeviceId can return undefined, so let's return -1 in that case
    var id = this.air_console.getMasterControllerDeviceId();
    ret.set_int((typeof id !== 'number' || isNaN(id)) ? -1 : id);
  };

  Exps.prototype.ConvertPlayerNumberToDeviceId = function (ret, playerNumber)
  {
    var id = this.air_console.convertPlayerNumberToDeviceId(playerNumber);
    ret.set_int((typeof id !== 'number') ? -1 : id);
  };

  Exps.prototype.ConvertDeviceIdToPlayerNumber = function (ret, deviceId)
  {
    var playerNumber = this.air_console.convertDeviceIdToPlayerNumber(deviceId);
    ret.set_int((typeof id !== 'number') ? -1 : playerNumber);
  };

  Exps.prototype.IsPremiumJoin = function (ret)
  {
    ret.set_int(this.ac_is_premium_join);
  };

  Exps.prototype.IsPremiumMessage = function (ret)
  {
    ret.set_int(this.ac_is_premium_message);
  };

  Exps.prototype.IsPremium = function (ret, deviceId)
  {
    ret.set_int((this.air_console.isPremium(deviceId) !== false) ? 1 : 0);
  };

  Exps.prototype.GetMessageProperties = function (ret)
  {
    var c2Dictionary = new Object();
    c2Dictionary['c2dictionary'] = true;
    c2Dictionary['data'] = getProperties(this.ac_message_keys);
    ret.set_string(JSON.stringify(c2Dictionary));
  };

  Exps.prototype.GetMessageProperty = function (ret, property)
  {
    if (this.ac_message_keys !== null && this.ac_message_keys.hasOwnProperty(property)) {
      ret.set_string(this.ac_message_keys[property]);
    }
  };

  Exps.prototype.GetMessagePropertiesCount = function (ret)
  {
    ret.set_int(this.ac_message_keys_count);
  };

  Exps.prototype.IsMessagePropertySet = function (ret, property)
  {
    ret.set_int(this.as_message_keys.hasOwnProperty(property) ? 1 : 0);
  };

  Exps.prototype.PersistentData = function (ret)
  {
    var c2Dictionary = new Object();
    c2Dictionary['c2dictionary'] = true;
    c2Dictionary['data'] = getProperties(this.ac_persistent_data);
    ret.set_string(JSON.stringify(c2Dictionary));
  };

  Exps.prototype.HighscoresData = function (ret)
  {
    var c2Dictionary = new Object();
    c2Dictionary['c2dictionary'] = true;
    c2Dictionary['data'] = getProperties(this.ac_highscores_data);
    ret.set_string(JSON.stringify(c2Dictionary));
  };

  Exps.prototype.GetUID = function (ret, deviceId)
  {
    ret.set_string(this.air_console.getUID(deviceId));
  };

  Exps.prototype.GetNickname = function (ret, deviceId)
  {
    ret.set_string(this.air_console.getNickname(deviceId));
  };

  Exps.prototype.GetProfilePicture = function (ret, deviceId)
  {
    var pic = this.air_console.getProfilePicture(deviceId) || "";
    ret.set_string(pic);
  };

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
        // Thanks to C2 non boolean compliance, let's transform them to ints
        if (typeof value === 'boolean') {
          value = (!value) ? 0 : 1;
        }
        data[property] = value;
      }
    });
    return data;
  }

  pluginProto.exps = new Exps();

}());
