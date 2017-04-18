const apiKey = require('./../.env').apiKey

Weather = function(){
}

Weather.prototype.getWeather = function(city, displayTemperature, displayHumidity, displayWind) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city+'&units=imperial' +'&appid=' + apiKey).then(function(response) {
    displayHumidity(city, response.main.humidity)
    displayTemperature(city, response.main.temp)
    displayWind(city, getWindDirection(response.wind.deg), response.wind.speed)
  }).fail(function(error) {
    $('.showWeather').text('ERRAR')
  })
}

Weather.prototype.getForecast = function(city, displayMinTempList, displayMaxTempList, displayWindList) {
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city+',us&units=imperial' +'&appid=' + apiKey).then(function(response) {
    for (var i = 0; i < response.list.length; i++) {
      // displayHumidityList(city, response.list.main.humidity)
      displayMinTempList(city, response.list[i].main.temp_min, response.list[i].dt_txt)
      displayMaxTempList(city, response.list[i].main.temp_max, response.list[i].dt_txt)
      displayWindList(city, getWindDirection(response.list[i].wind.deg), response.list[i].wind.speed, response.list[i].dt_txt)
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
    windRose = `WHAT YUO DOU you put ${windDeg}`
  }
  return windRose
}

exports.weatherModule = Weather
