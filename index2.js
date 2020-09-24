const { nextISSTimesForMyLocation } = require('./iss_promised.js');

nextISSTimesForMyLocation()
  .then((data) => {
    for (const time of data) {
      const date = new Date(time.risetime * 1000);
      console.log(`Next pass at ${date.toUTCString()} for ${time.duration} seconds`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });