// Map API Key
var mapApiKey = 'pk.eyJ1Ijoia3Jpc3RpbmFrdXN0YSIsImEiOiJjbDRjd3g5NmUwMndnM2lwYXo4eTdxbm01In0.lwgd5lmxf-B4H8CSZWyz7w';
mapboxgl.accessToken = mapApiKey;

// Map
var map = new mapboxgl.Map(
	{container: 'map',
  	style: 'mapbox://styles/kristinakusta/cl4cx5n94000u16qc75ugoca3',
  	center: [10.000000, 45.000000],
  	zoom: 1}
);

// Space stations
var spaceStations = [
  {
    name: 'Kennedy Space Center, Florida, United States',
    location: {lat: 28.573367,lng:  -80.648970},
    traveltime: "26 hours 20 minutes"
  }, {
    name: 'Amsterdam Space Center, the Netherlands',
    location: {lat: 52.314520,lng: 4.752819},
    traveltime: "15 hours 34 minutes"
  }, {
    name: 'Paris Space Center, France',
    location: {lat: 49.013833, lng:  2.541890},
    traveltime: "13 hours 07 minutes"
  }, {
    name: 'Berlin Space Center, Germany',
    location: {lat: 52.558977, lng: 13.288425},
    traveltime: "6 hours 03 minutes"
  }, {
    name: 'London Space Center, United Kingdom',
    location: {lat: 51.470009, lng: -0.454285},
    traveltime: "7 hours 58 minutes"
  }, {
    name: 'Beijing Space Center, China',
    location: {lat: 40.081298, lng: 116.603267},
    traveltime: "21 hours 31 minutes"
  }, {
    name: 'Seoul Space Center, South Korea',
    location: {lat: 37.460370, lng: 126.440760},
    traveltime: "19 hours 59 minutes"
  }
];

//Icons
for(var i = 0; i < spaceStations.length; i++) {
	var stationMarker = document.createElement('div');

	stationMarker.className = 'stationMarker';

	var stationPopup = new mapboxgl.Popup().setHTML(spaceStations[i].name + "<br>" + "Travel Time: " + spaceStations[i].traveltime);
	var marker = new mapboxgl.Marker(stationMarker).setLngLat([spaceStations[i].location.lng, spaceStations[i].location.lat]).setPopup(stationPopup).addTo(map);
}

// Input 
document.getElementById("search_button").onclick = function () {
	console.log('Button clicked');

	// Get City
	var location = document.getElementById("location").value;
	console.log(location);

	// Form Map URL
	var mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
	var mapRequest = mapURL + location + '.json' + '?' + 'access_token=' + mapApiKey; 

	// Get Map Data
	fetch(mapRequest)

	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onMapAPISuccess(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	}); 

	// Weather URL
	var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
	var WeatherApiKey ='d07cb0443c8c2f9282a45255860f6181';
	var weatherRequest = weatherURL + '?' + 'appid=' + WeatherApiKey + '&' + 'q=' + location;

	// Weather data
	fetch(weatherRequest)

	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onWeatherAPISuccess(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	});
};

function onMapAPISuccess(response) {
	console.log(response);

	// Location coordinates
	var longitude = response.features[0].center[0];
	var latitude = response.features[0].center[1];
	console.log(longitude,latitude);

	map.flyTo({
		center: [longitude, latitude],
		essential: true,
		zoom: 11.5	
	});
}

// Display information
function onWeatherAPISuccess(response) {
	console.log(response);

	var weatherBox = document.getElementById('weather');
	var weatherDesc = response.weather[0].description;
	var weatherIcon = response.weather[0].icon;
	var weatherIconURL = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
	var wind = response.wind.speed;
	
	var temp = Math.floor(response.main.temp - 273.25);

	weatherBox.innerHTML = '<h2>' + 'Landing location: ' + response.name + '</h2>';
	weatherBox.innerHTML += 'Weather: ' + weatherDesc + '<br>' + '<img src="'+ weatherIconURL +'">' + '<br>';
	weatherBox.innerHTML += 'Temperature: ' + temp + '°C <br>';
	weatherBox.innerHTML += 'Wind: ' + wind + 'm/s' + '<br>';
}

function onAPIError(error) {
	console.error('Request failed', error);
	document.getElementById('weather').innerHTML = '<h1>Error!</h1> <br>' + '<h2>Something went wrong. <br> Please try again.</h2>'; 
}