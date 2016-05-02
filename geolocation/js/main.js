define(['domReady', 'jquery'],function(domReady){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        $('#startBtn').on('click', function(){
            if(navigator.geolocation){
                document.getElementById('stopBtn').className = '';
                document.getElementById('startBtn').className = 'hide';
                navigator.geolocation.getCurrentPosition(showPosition, showError);
                watchId = navigator.geolocation.watchPosition(showPositionUpdate,showError);
            } else {
                alert('Geolokacja nies jest wspierana');
            }        });

        $('#stopBtn').on('click', function(){
            navigator.geolocation.clearWatch(watchId);
            document.getElementById('stopBtn').className = 'hide';
            document.getElementById('startBtn').className = '';
        });
    });

    var startPos;
    var watchId;

    function showPosition(position){
        startPos = position;
        document.getElementById('startLatitude').innerHTML = startPos.coords.latitude;
        document.getElementById('startLongitude').innerHTML = startPos.coords.longitude;
    }

    function showPositionUpdate(position){
        document.getElementById('currentLatitude').innerHTML = position.coords.latitude;
        document.getElementById('currentLongitude').innerHTML = position.coords.longitude;
        document.getElementById('distance').innerHTML =
            calculateDistance(startPos.coords.latitude,startPos.coords.longitude,position.coords.latitude,position.coords.longitude);
    }

    function showError(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert('Odmówiono uprawnień');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Lokalizacja nieosiągalna');
                break;
            case error.TIMEOUT:
                alert('timeout....');
                break;
            case error.UNKNOWN_ERROR:
                alert('nieznany błąd');
                break;
        }
    }

    //czary
    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2-lat1).toRad();
        var dLon = (lon2-lon1).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    }

    Number.prototype.toRad = function(){
        return this * Math.PI / 180;
    };

});
