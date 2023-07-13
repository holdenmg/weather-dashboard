var cityInputEl = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form');


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
   var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon + '&appid=c0071185ee231827a2eb0bc81f09dac1'
   
   fetch(apiUrl)
   .then(function (response) {
     if (response.ok) {
       console.log(response);
       response.json().then(function (data) {
         console.log(data);
         //displayRepos(data, city);
       });
     } else {
       alert('Error: ' + response.statusText);
     }
   })
   .catch(function (error) {
     alert('Unable to connect to open weather');
   });
}
  userFormEl.addEventListener('submit', formSubmitHandler);