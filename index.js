const { nextISSTimesForMyLocation } = require('./iss.js');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Error:", error);
//     return;
//   }
//   console.log("IP:", ip);
// });

// fetchCoordsByIP("172.219.157.205", (error, coords) => {
//   if (error) {
//     console.log("Error:", error);
//     return;
//   }
//   console.log("Coords:", coords);
// });

// fetchISSFlyOverTimes({latitude: 50.98190, longitude: -114.10040}, (error, pass) => {
//   if (error) {
//     console.log("Error:", error);
//     return;
//   }
//   console.log("Pass:", pass);
// });

nextISSTimesForMyLocation((error, pass) => {
  if (error) {
    console.log("Error:", error);
    return;
  }
  for (const time of pass) {
    const date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date.toUTCString()} for ${time.duration} seconds`);
  }
});

