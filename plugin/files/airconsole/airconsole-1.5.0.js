/**
 * AirConsole.
 * @copyright 2016 by N-Dream AG, Switzerland. All rights reserved.
 * @version 1.5.0
 *
 * IMPORTANT:
 *
 * See http://developers.airconsole.com/ for API documentation
 *
 * Read http://developers.airconsole.com/#/guides/device_ids_and_states to
 * learn more about devices, device states, onReady, etc.
 *
 * If your prefer an event driven api with .on() .off() and .dispatch()
 * interface instead of sending messages, use:
 * http://github.com/AirConsole/airconsole-events/
 *
 */

/**
 * We include the AirConsole API dynamically, so you don't have to update the construct2
 * plugin whenever a new AirConsole API update was made.
 */
(function() {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://www.airconsole.com/api/airconsole-1.5.0.js';
  head.appendChild(script);
})();
