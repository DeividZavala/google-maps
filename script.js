var map;
var geo;
var marker;


function initMap() {
    geo = new google.maps.Geocoder(); 
    
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom:8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var infoWindow = new google.maps.InfoWindow({map:map});

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        infoWindow.setPosition(pos);
        infoWindow.setContent('Ya te encontre mijo');
        map.setCenter(pos);
    },function () {
        handleLocationErro(true, infoWindow, map.getCenter());
    });
    
    }
}

function getAddres() {
    var address = document.getElementById('addres').value;
    console.log(google.maps.GeocoderStatus)
    geo.geocode({'address': address}, function (results, status) {
        console.log(google.maps.GeocoderStatus)
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map:map,
                position: results[0].geometry.location
            });
        }else{
            alert('Erros: '+ status);
        }
    });
}