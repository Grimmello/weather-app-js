const Weather = require('./../js/weather.js').weatherModule

const displayHumidity = function(city, humidityData) {
  $('#showHumidity').text('Da humidity in ' + city + ' is ' + humidityData + '%')
}

const displayTemperature = function(city, temperatureData) {
  $('#showTemperature').text('Da temperature in '+ city +' is '+ temperatureData + ' degrees farenheight.')
}

const displayWind = function(city, windDirectionData, windSpeedData) {
  $('#showWind').text('Da wind in '+ city +' is blowing '+ windDirectionData + ' at '+ windSpeedData +' MPH')
}

const displayMinTempList = function(city, displayMinTempList, date) {
  $('#showMinTemperature').append('<div class="col-sm-1">Da min temperature for da week in ' + city + ' is <strong>' + displayMinTempList+'</strong> dagreez @ '+date+'</div>')
}

const displayMaxTempList = function(city, displayMaxTempList, date) {
  $('#showMaxTemperature').append('<div class="col-sm-1">Da makxz temperature for da week in ' + city + ' is ' + displayMaxTempList+' duhbreeze @ '+date+'</div>')
}

const displayWindList = function(city, displayWindList, displayWindSpeed, date) {
  $('#showWindList').append('<div class="col-sm-1">Da weeind for da week in ' + city + ' is ' + displayWindList+' die-rectum @'+displayWindSpeed+' MPH '+date+'</div>')
}

$(document).ready(function() {
  let currentWeatherObject = new Weather()
  $('#weather-location').click(function() {
    let city = $('#location').val()
    $('#location').val('')
    currentWeatherObject.getWeather(city, displayTemperature, displayHumidity, displayWind)
    currentWeatherObject.getForecast(city, displayMinTempList, displayMaxTempList, displayWindList)
  })
})
