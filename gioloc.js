
var x = document.getElementById("latitude");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude; +
        "<br>Longitude: " + position.coords.longitude;


    var apikey = '466f5ef8a1134839b5774d9453439da7';

    var latitude = position.coords.latitude;

    var longitude = position.coords.longitude;

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'


    var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1';

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function () {
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            var format = data.results[0].formatted;

            document.getElementById('searchUser').value = data.results[0].components.city;
            fetchUserInput();

        } else if (request.status <= 500) {
            // We reached our target server, but it returned an error
            alert("Unable to fetch location.")
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log(data.status.message);
        } else {
            alert("Server Error. Unable to fetch location.")
            console.log("server error");
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log("unable to connect to server");
    };

    request.send();
    // make the request
}  