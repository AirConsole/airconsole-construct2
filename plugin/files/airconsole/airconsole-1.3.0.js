/**
 * AirConsole.
 * @copyright 2015 by N-Dream AG, Switzerland. All rights reserved.
 * @version 1.3.0
 *
 * IMPORTANT:
 *
 * See http://developers.airconsole.com/ for API documentation
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
  script.src = 'https://www.airconsole.com/api/airconsole-1.3.0.js';
  head.appendChild(script);
})();
