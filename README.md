⚠️ We also have a [Construct3 plugin](https://github.com/AirConsole/airconsole-construct3/)

# AirConsole Construct2
Construct2 plugin second generation for AirConsole version 1.7.0

## Installation
[Download the plugin](c2airconsole.c2addon) and drag and drop it into Construct 2

More information about the plugin:

http://developers.airconsole.com/#/guides/construct2

## Version 1.7.0.12
* Fixed wrong usage of "deprecated", thanks Mad_Spy and Toby R for bringing this up

## Version 1.7.0.11
* Added expression airconsole.AdShown()
* Added expression airconsole.IsAdShowing()
* Added expression airconsole.GetProfilePictureWithSize(deviceId, picturesize)
* Deprecated expression airconsole.GetProfilePicture()
* Added condition AdShown()
* Added condition IsAdShowing()
* Fixed N-Dream naming in plugin infos....

## Version 1.7.0.10
* Fixed OnCustomDeviceStateChange trigger
* Fixed ConvertDeviceIdToPlayerNumber expression
* Comparison fix
* Cleanup

## Version 1.7.0.9
* Fixed GetPersistentData and GetHighscores expressions wrong return type

## Version 1.7.0.8
* Fixed onDeviceProfileChange (trigger not defined)

## Version 1.7.0.7
* Fixed GetMasterControllerDeviceId

## Version 1.7.0.6
* Fixed illogic expressions order and naming

## Version 1.7.0.5
* Updated documentation links and website links

## Version 1.7.0.4
* Fixed Message and Broadcast

## Version 1.7.0.3
* Missing GetActivePlayerDeviceIds

## Version 1.7.0.2
* Missing IsPluginOffline condition
* Missing IsPluginOffline expression
* Missing IsMultipartMessage condition

## Version 1.7.0.1
* Initial plugin release


A new AirConsole plugin for Construct 2

The aim of this new plugin is to cleanup deprecated stuffs and implement missing features without the fear of breaking backward compatibility.
It solves Construct 2 controller connection problems as well as introduces an easier and faster way to handle messages.

AirConsole can be visited on www.airconsole.com and is a great way for unique game experience using your smartphones as controllers
Construct 2 is a great 2D game creation tool that allows anybody, with or without coding experiences, to start developping their own games
