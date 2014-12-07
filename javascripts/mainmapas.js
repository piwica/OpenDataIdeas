/**
 * Created by Piwica on 12/6/14.
 */
// This example adds a UI control allowing users to remove the
// ground overlay from the map.

var firemarkers = [];
var hospitalmarkers = [];
var metrobusmarkers = [];
function emergenciasHandle() {
    var isChecked = $('#emergencias').is(":checked");
    if (isChecked) {
        leerArchivoEmergencias();
    } else {
        for (var i = 0; i < firemarkers.length; i++) {
            firemarkers[i].setMap(null);
        }
        firemarkers = [];
    }

}

function hospitalHandle() {
    var isChecked = $('#hospital').is(":checked");
    if (isChecked) {
        leerArchivoHospital();
    } else {
        for (var i = 0; i < firemarkers.length; i++) {
            hospitalmarkers[i].setMap(null);
        }
        hospitalmarkers = [];
    }

}

function metroBusHandle() {
    var isChecked = $('#metrobus').is(":checked");
    if (isChecked) {
        leerArchivoMetroBus();
    } else {
        for (var i = 0; i < firemarkers.length; i++) {
            metrobusmarkers[i].setMap(null);
        }
        metrobusmarkers = [];
    }

}

function leerArchivoMetroBus(){
    $.ajax({
        type: "GET",
        url: "datos/metrobus-estaciones.csv",
        dataType: "text",
        success: function(data) {processDataMetrobus(data);}
    });
}

function leerArchivoHospital(){
    $.ajax({
        type: "GET",
        url: "datos/areas-hospitalarias.csv",
        dataType: "text",
        success: function(data) {processDataHospital(data);}
    });
}

function leerArchivoEmergencias(){
    $.ajax({
        type: "GET",
        url: "datos/emergencias.csv",
        dataType: "text",
        success: function(data) {processDataEmergencias(data);}
    });
}

function processDataMetrobus(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/bus.png';
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[7], data[6]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        metrobusmarkers.push(marker);
    }
}

function processDataEmergencias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/emergencia.png';

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data[0].toLowerCase().indexOf("lluvia") >= 0){
            image = 'images/lluvia.png';
        }else if (data[0].toLowerCase().indexOf("inundacion") >= 0){
            image = 'images/inundacion.png';
        }else if (data[0].toLowerCase().indexOf("derrumbe") >= 0){
            image = 'images/derrumbe.png';
        }else if (data[0].toLowerCase().indexOf("explosion") >= 0){
            image = 'images/explosion.png';
        }else if (data[0].toLowerCase().indexOf("incendio") >= 0){
            image = 'images/fire.png';
        }else if (data[0].toLowerCase().indexOf("lluvia") >= 0){
            image = 'images/lluvia.png';
        }
        var myLatLng = new google.maps.LatLng(data[2], data[1]);
        var fireMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        firemarkers.push(fireMarker);
    }
}

function processDataHospital(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/hospital.png';
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');

        var myLatLng = new google.maps.LatLng(data[8], data[7]);
        var fireMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        hospitalmarkers.push(fireMarker);
    }
}