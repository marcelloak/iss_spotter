const request = require('request');
const issURL = "http://api.open-notify.org/iss-pass.json?";
const coordsUrl = "https://ipvigilante.com/";
const ipUrl = "https://api.ipify.org?format=json";

const fetchISSFlyOverTimes = function(coords, callback) {
  const issURLWithCoords = `${issURL}lat=${coords.latitude}&lon=${coords.longitude}`;
  request(issURLWithCoords, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const issResponse = JSON.parse(body).response;
    callback(null, issResponse);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(coordsUrl + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coords = {};
    coords.latitude = JSON.parse(body).data.latitude;
    coords.longitude = JSON.parse(body).data.longitude;
    callback(null, coords);
  });
};

const fetchMyIP = function(callback) {
  request(ipUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, pass) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, pass);
      });
    });
  });
};

module.exports   = { nextISSTimesForMyLocation };