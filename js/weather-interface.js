const Weather = require('./../js/weather.js').weatherModule
var minTemps = require('./../js/weather.js').minTemps
var maxTemps = require('./../js/weather.js').maxTemps
var windSpeeds = require('./../js/weather.js').windSpeeds
var timeArray = require('./../js/weather.js').timeArray
var content
var myChart

const displayHumidity = function(city, humidityData) {
  $('#showHumidity').text('Da humidity in ' + city + ' is ' + humidityData + '%')
}

const displayTemperature = function(city, temperatureData) {
  $('#showTemperature').text('Da temperature in '+ city +' is '+ temperatureData + ' degrees farenheight.')
}

const displayWind = function(city, windDirectionData, windSpeedData) {
  $('#showWind').text('Da wind in '+ city +' is blowing '+ windDirectionData + ' at '+ windSpeedData +' MPH')
}


function reload(){
    let container = document.getElementById("container");
    content = container.innerHTML;
    container.innerHTML= content;
}

function container(min, max) {
  myChart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Max and Min Temps'
        },
        xAxis: {
            categories: ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"]
        },
        yAxis: {
            title: {
                text: 'Temp °F'
            }
        },
        series: [{
            name: 'Min temp °F',
            data: min
        }, {
            name: 'Max temp °F',
            data: max
        }]
    })
}

function time() {
  setTimeout(function(){container(minTemps, maxTemps)},500)
}

$(document).ready(function() {
  let currentWeatherObject = new Weather()
  $('#weather-location').click(function() {
    let city = $('#address').val()
    $('#location').val('')
    currentWeatherObject.getWeather(city, displayTemperature, displayHumidity, displayWind)
    currentWeatherObject.getForecast(city)

    console.log(minTemps)
    console.log(maxTemps)
    time()
  })
})
