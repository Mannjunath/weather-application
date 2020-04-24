const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ded466204cfd5eb2bbc75ea6df90adbf&query=${longitude},${latitude}&units=f`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Server not connected", undefined);
    } else if (response.body.error) {
      callback("Unabel to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degress out`
      );
    }
  });
};

module.exports = forecast;
