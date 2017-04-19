const apiKey = require('./../.env').apiKey
var minTemps = []
var maxTemps = []
var windSpeeds = []
var timeArray = []
Weather = function(){
}

Weather.prototype.getWeather = function(city, displayTemperature, displayHumidity, displayWind) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city+'&units=imperial&appid=' + apiKey).then(function(response) {
    displayHumidity(city, response.main.humidity)
    displayTemperature(city, response.main.temp)
    var windDirect = getWindDirection(response.wind.deg)
    console.log(response.wind.deg)
    console.log(windDirect)
    displayWind(city, windDirect, response.wind.speed)
  }).fail(function(error) {
    $('.showWeather').text('ERRAR')
  })
}

Weather.prototype.getForecast = function(city) {
  minTemps.length = 0
  maxTemps.length = 0
  $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city+',us&units=imperial&cnt=7&appid=' + apiKey).then(function(response) {
    for (var i = 0; i < response.list.length; i++) {
      var min = parseFloat(response.list[i].temp.min)
      minTemps.push(min)
      var max = parseFloat(response.list[i].temp.max)
      maxTemps.push(max)
    }
  }).fail(function(error) {
    $('.showWeather').text('ERRAR')
  })
}

const getWindDirection = function(windDeg) {
  let windRose = ''
  if (windDeg > 340 || windDeg <= 20) {
    windRose = 'N'
  } else if (windDeg > 20 && windDeg <= 65) {
    windRose = 'NE'
  } else if (windDeg > 65 && windDeg <= 110) {
    windRose = 'E'
  } else if (windDeg > 110 && windDeg <= 155) {
    windRose = 'SE'
  } else if (windDeg > 155 && windDeg <= 200) {
    windRose = 'S'
  } else if (windDeg > 200 && windDeg <= 245) {
    windRose = 'SW'
  } else if (windDeg > 245 && windDeg <= 290) {
    windRose = 'W'
  } else if (windDeg > 290 && windDeg <= 340) {
    windRose = 'NW'
  } else {
    windRose = `${windDeg}`
  }
  return windRose
}

exports.weatherModule = Weather
exports.minTemps = minTemps
exports.maxTemps = maxTemps
exports.windSpeeds = windSpeeds
exports.timeArray = timeArray
