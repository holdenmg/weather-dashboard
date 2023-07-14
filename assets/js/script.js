var cityInputEl = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form');
var forecastEl = document.querySelector('#forecast');
var currentEl =document.querySelector("#current-weather");
var savedCities = document.querySelector("#saved-cities");

cities = [];

var formSubmitHandler = function (event) {
    event.preventDefault();
  

    
       

    var city = cityInputEl.value.trim();
    

    //save city to local storage for recalling later
    

    //remove previous results, if any
    first = forecastEl.firstElementChild;
    while (first) {
        first.remove();
        first = forecastEl.firstElementChild;
    }
    first = currentEl.firstElementChild;
    while (first) {
        first.remove();
        first = currentEl.firstElementChild;
    }

    //check if input is valid
    if (city) {
        //create element for city title
        cityNameEl = document.createElement('h3');
        cityNameEl.textContent = city;
        currentEl.appendChild(cityNameEl)
        //save city to local storage for recalling later
        var key = "cities"
        cities.push(city);
        arrayCities = JSON.stringify(cities);
        localStorage.setItem(key, arrayCities);
        getCityLoc(city); 
        cityInputEl.value = '';
        


    } else {
        alert('Please enter a city');
    }
    
  };

  
    
  

var getCityLoc = function (city) {

    //geo api to get lat and lon of desired city
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
     
  };

var getCity = function (lat, lon) {

    //5 day forecast api
   var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon + '&appid=c0071185ee231827a2eb0bc81f09dac1&units=imperial'
   
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

    //current weather api
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=c0071185ee231827a2eb0bc81f09dac1&units=imperial'

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
   
   //Create elements containing forecast data and display on page
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
            aDate.textContent = dayjs(date).format('MM/DD/YYYY');
            aIcon.innerHTML = "<src = http://openweathermap.org/img/w/"+ icon +".png>";
            aTemp.textContent = "Temp: " + temp + " F";
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

   //Create element containing current data and display on page
   function displayCurrent(data){

    var date = dayjs().format('MM/DD/YYYY');
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
    aDate.textContent = date;
    aIcon.innerHTML = "<src = http://openweathermap.org/img/w/"+ icon +".png>";
    aTemp.textContent = "Temp: " + temp + " F";
    aWind.textContent = "Wind: " + wind +" MPH";
    aHumid.textContent = "Humidity: " + humid + "%";
    dayDiv.appendChild(aDate);
    dayDiv.appendChild(aIcon);
    dayDiv.appendChild(aTemp);
    dayDiv.appendChild(aWind);
    dayDiv.appendChild(aHumid);
    currentEl.appendChild(dayDiv);
    //call init to refresh buttons
    init()




   }

   //initializes buttons from previous searches
function init(){
   var pCityArray = localStorage.getItem('cities');
   const pCities = JSON.parse(pCityArray);
   for(i=0; i < pCities.length; i++){
   newButton = document.createElement('button');
   var pCity = pCities[i]
   newButton.textContent = pCity;
   newButton.setAttribute("id", pCity);
   savedCities.appendChild(newButton);
   }
}


init()
userFormEl.addEventListener('submit', formSubmitHandler);