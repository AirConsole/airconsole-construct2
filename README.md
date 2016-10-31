# AirConsole Construct2
Construct2 Plugin for AirConsole Version 1.5.0
## Installation
Clone this repo or [download files as zip](https://github.com/AirConsole/airconsole-construct2/archive/master.zip) and drag and drop the airconsole.c2addon file into the Construct2 application.

More information about the plugin:

http://developers.airconsole.com/#/guides/construct2

## Changes in version 1.4.3
* Added getMasterControllerDeviceId. See (http://puu.sh/s1HlV.png) for usage
* Added convertDeviceIdToPlayerNumber()
* Added convertPlayerNumberToDeviceId()
* Added setActivePlayers()
* see (http://puu.sh/s1JBd.png) for usage

## Changes in version 1.4.2
* Added ControllerDeviceIDs. See (http://puu.sh/s0wNv.png) for usage

## Changes in version 1.4.1
* Added IsUserLoggedIn support

## Changes in version 1.4.0
* Updated to 1.5.0
* Fixed script loading error due to DOM logic (http://puu.sh/rTEc8.png)
* Added onTooManyPlayers as well as plugin config
* Added alpha support for highscores
* Cosmetic cleanups

## Changes in version 1.3.2
* Added onAnyDeviceLeft

## Changes in version 1.3.1
* Renamed onMessage
* Added proper onMessage
* Added onMessageFrom

## Changes in version 1.3
* Updated to AirConsole Version 1.3 API

## Changes in version 1.2
* Fixed onDisconnect bug
* Replace example game
* onMessage does not need all input variables
* Improved onDeviceJoin event - first connect was not always working correctly

## Changes in version 1.1
* Condition: on device custom state change (key, value)
* Action: set device custom state (key, value)

