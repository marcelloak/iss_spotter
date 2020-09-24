const request = require('request-promise-native');
const issUrl = "http://api.open-notify.org/iss-pass.json?";
const coordsUrl = "https://ipvigilante.com/";
const ipUrl = "https://api.ipify.org?format=json";

const fetchMyIP = function() {
  return request(ipUrl);
};

const fetchCoordsByIP = function(ip) {
  return request(coordsUrl + JSON.parse(ip).ip);
};

const fetchISSFlyOverTimes = function(coords) {
  coords = JSON.parse(coords).data;
  return request(`${issUrl}lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    });
};

module.exports = { nextISSTimesForMyLocation };