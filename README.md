# AirConsole Construct2
Construct2 Plugin for AirConsole Version 1.6.0

## Installation
[Download the plugin only](airconsole.c2addon) and drag it in to Construct 2 or
[Download files as zip](../../archive/master.zip) and drag and drop the airconsole.c2addon file into the Construct2 application.

More information about the plugin:

http://developers.airconsole.com/#/guides/construct2

## Changes in version 1.4.8
* Implemented GetNickname
* Implemented GetProfilePicture

## Changes in version 1.4.7.1
* Hotfix for Highscores data

## Changes in version 1.4.7
* Implemented persistent data support
* Completed highscores support
* Added (AirConsole).GetUID(deviceId) returning you the device's UID based on its deviceId

## Changes in version 1.4.6.1
* Hotfix for generated controllers and Construct2 Dictionaries 
non compliance to booleans

## Changes in version 1.4.6
* Deprecating onMessageKey
* Adding new onMessageKey
* Adding onMessageKeyIs
* Adding onMessageKeyContains
* Adding (AirConsole).GetMessageProperties
* Adding (AirConsole).GetMessageProperty
* Adding (AirConsole).GetMessagePropertiesCount
* Adding (AirConsole).IsMessagePropertySet

## Changes in version 1.4.5
* Implemented action NavigateHome: requesting all devices to open AirConsole store
* Implemented action NavigateTo: requesting all devices to load a game by url

## Changes in version 1.4.4
* Update to API 1.6.0
* Added OnAdComplete
* Added OnPremium
* Added ShowAd
* Added IsPremiumJoin
* Added IsPremiumMessage
* Added IsPremium
* Cleaned and reordered expressions: (https://puu.sh/slyWo.png)

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

