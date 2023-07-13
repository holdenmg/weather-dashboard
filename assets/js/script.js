var cityInputEl = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form');


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = nameInputEl.value.trim();
  
    if (city) {
      getUserRepos(city);
  
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
  };



var getUserRepos = function (city) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&limit=5&appid=c0071185ee231827a2eb0bc81f09dac1'
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayRepos(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to open weather');
      });
  };