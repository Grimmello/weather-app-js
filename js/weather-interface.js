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

// const displayHumidityList = function(city, displayHumidityList) {
//   $('#showHumidityList').text('Da humidity for da week in ' + city + ' is ' + displayHumidityList)
// }

const displayMinTempList = function(city, displayMinTempList) {
  $('#showMinTemperature').append('Da min temperature for da week in ' + city + ' is ' + displayMinTempList+' dagreez<br>')
}

const displayMaxTempList = function(city, displayMaxTempList) {
  $('#showMaxTemperature').append('Da makxz temperature for da week in ' + city + ' is ' + displayMaxTempList+' duhbreeze<br>')
}

const displayWindList = function(city, displayWindList) {
  $('#showWindList').append('Da weeind for da week in ' + city + ' is ' + displayWindList+' die-rectum<br>')
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
