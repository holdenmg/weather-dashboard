var cityInputEl = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form');
var forecastEl = document.querySelector('#forecast');
var currentEl =document.querySelector("#current-weather");


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = cityInputEl.value.trim();
  
    if (city) {
      getCityLoc(city);
  
      
      cityInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
  };



var getCityLoc = function (city) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&limit=5&appid=c0071185ee231827a2eb0bc81f09dac1'
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            var lon = data[0].lon;
            var lat = data[0].lat
            console.log(lat)
            console.log(lon)
            getCity(lat, lon);
            getCurrent(lat, lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to open weather');
      });
      //return city;
  };

var getCity = function (lat, lon) {
   var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon + '&appid=c0071185ee231827a2eb0bc81f09dac1'
   
   fetch(apiUrl)
   .then(function (response) {
     if (response.ok) {
       console.log(response);
       response.json().then(function (data) {
         console.log(data);
         displayForecast(data);
         
       });
     } else {
       alert('Error: ' + response.statusText);
     }
   })
   .catch(function (error) {
     alert('Unable to connect to open weather');
   });
}
   var getCurrent = function (lat, lon) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=c0071185ee231827a2eb0bc81f09dac1'

    fetch(apiUrl)
   .then(function (response) {
     if (response.ok) {
       console.log(response);
       response.json().then(function (data) {
         console.log(data);
         displayCurrent(data);
         
       });
     } else {
       alert('Error: ' + response.statusText);
     }
   })
   .catch(function (error) {
     alert('Unable to connect to open weather');
   });
   }
   
   function displayForecast(data){
        var i = 4;
        while( i < data.list.length){
            var date = data.list[i].dt_txt
            var icon = data.list[i].weather[0].icon
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humid = data.list[i].main.humidity;
            console.log(date);
            console.log(icon);
            console.log(temp);
            console.log(wind);
            console.log(humid);
            var dayDiv = document.createElement('div');
            var aDate = document.createElement('a')
            var aIcon = document.createElement('img');
            var aTemp = document.createElement('a');
            var aWind = document.createElement('a');
            var aHumid = document.createElement('a');
            aDate.textContent = date;
            aIcon.innerHTML = "<src = http://openweathermap.org/img/w/"+ icon +".png>";
            aTemp.textContent = "Temp: " + temp;
            aWind.textContent = "Wind: " + wind +" MPH";
            aHumid.textContent = "Humidity: " + humid + "%";
            dayDiv.appendChild(aDate);
            dayDiv.appendChild(aIcon);
            dayDiv.appendChild(aTemp);
            dayDiv.appendChild(aWind);
            dayDiv.appendChild(aHumid);
            forecastEl.appendChild(dayDiv)
            i = i+8
        }
   }

   function displayCurrent(data){

    var date = dayjs();
    var icon = data.weather[0].icon
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humid = data.main.humidity;
    var dayDiv = document.createElement('div');
    var aDate = document.createElement('a')
    var aIcon = document.createElement('img');
    var aTemp = document.createElement('a');
    var aWind = document.createElement('a');
    var aHumid = document.createElement('a');
    aDate.textContent = city + date;
    aIcon.innerHTML = "<src = http://openweathermap.org/img/w/"+ icon +".png>";
    aTemp.textContent = "Temp: " + temp;
    aWind.textContent = "Wind: " + wind +" MPH";
    aHumid.textContent = "Humidity: " + humid + "%";
    dayDiv.appendChild(aDate);
    dayDiv.appendChild(aIcon);
    dayDiv.appendChild(aTemp);
    dayDiv.appendChild(aWind);
    dayDiv.appendChild(aHumid);
    currentEl.appendChild(dayDiv);




   }


  userFormEl.addEventListener('submit', formSubmitHandler);