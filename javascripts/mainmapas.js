/**
 * Created by Piwica on 12/6/14.
 */
// This example adds a UI control allowing users to remove the
// ground overlay from the map.

var firemarkers = [];
var hospitalmarkers = [];
var metrobusmarkers = [];
var zonasverdesmarkers = [];
var centrosverdesmarkers = [];
var ciclovias  = [];
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
        for (var i = 0; i < hospitalmarkers.length; i++) {
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
        for (var i = 0; i < metrobusmarkers.length; i++) {
            metrobusmarkers[i].setMap(null);
        }
        metrobusmarkers = [];
    }

}

function zonasVerdesHandle() {
    var isChecked = $('#zonasverdes').is(":checked");
    if (isChecked) {
        leerArchivoZonasVerdes();
    } else {
        for (var i = 0; i < zonasverdesmarkers.length; i++) {
            zonasverdesmarkers[i].setMap(null);
        }
        zonasverdesmarkers = [];
    }

}

function centrosVerdesHandle() {
    var isChecked = $('#centrosverdes').is(":checked");
    if (isChecked) {
        leerArchivoCentrosVerdes();
    } else {
        for (var i = 0; i < centrosverdesmarkers.length; i++) {
            centrosverdesmarkers[i].setMap(null);
        }
        centrosverdesmarkers = [];
    }

}

function cicloviasHandle() {
    var isChecked = $('#ciclovias').is(":checked");
    if (isChecked) {
        leerArchivoCiclovias();
    } else {
        for (var i = 0; i < ciclovias.length; i++) {
            ciclovias[i].setMap(null);
        }
        ciclovias = [];
    }

}

function leerArchivoCentrosVerdes(){
    $.ajax({
        type: "GET",
        url: "datos/centros-verdes.csv",
        dataType: "text",
        success: function(data) {processDataCentrosVerdes(data);}
    });
}

function leerArchivoZonasVerdes(){
    $.ajax({
        type: "GET",
        url: "datos/arbolado-espacios-verdes.csv",
        dataType: "text",
        success: function(data) {processDataZonasVerdes(data);}
    });
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

function leerArchivoCiclovias(){
    $.ajax({
        type: "GET",
        url: "datos/ciclovias.csv",
        dataType: "text",
        success: function(data) {processDataCiclovias(data);}
    });
}

function processDataCiclovias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var geojson = $.parseJSON(data[14]);
        var mypath = new Array();
        $.each(geojson.coordinates[0], function(index, record) {
            mypath.push(new google.maps.LatLng(record[1], record[0]));
        });
        var polyline = new google.maps.Polyline({
            path: mypath,
            strokeColor: '#ff0000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        polyline.setMap(map);
        ciclovias.push(polyline);
    }
}

function processDataCentrosVerdes(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/centroverde.png';
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[10], data[9]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        centrosverdesmarkers.push(marker);
    }
}

function processDataZonasVerdes(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/arbol.png';
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[15], data[16]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        zonasverdesmarkers.push(marker);
    }
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