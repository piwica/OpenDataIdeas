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
var ciclovias = [];
var comisarias = [];
var cultura = [];
var educacion = [];
var polideportivos = [];
var subte = [];

function emergenciasHandle() {
    var isChecked = $('#emergencias').is(":checked");
    if (isChecked) {
        leerArchivoEmergencias();
    } else {
            firemarkers.setMap(null);
    }

}

function hospitalHandle() {
    var isChecked = $('#hospital').is(":checked");
    if (isChecked) {
        leerArchivoHospital();
    } else {
        hospitalmarkers.setMap(null);
    }

}

function metroBusHandle() {
    var isChecked = $('#metrobus').is(":checked");
    if (isChecked) {
        leerArchivoMetroBus();
    } else {
         metrobusmarkers.setMap(null);

    }

}

function zonasVerdesHandle() {
    var isChecked = $('#zonasverdes').is(":checked");
    if (isChecked) {
        leerArchivoZonasVerdes();
    } else {
            zonasverdesmarkers.setMap(null);

    }

}

function centrosVerdesHandle() {
    var isChecked = $('#centrosverdes').is(":checked");
    if (isChecked) {
        leerArchivoCentrosVerdes();
    } else {
        centrosverdesmarkers.setMap(null);

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

function comisariasHandle() {
    var isChecked = $('#comisarias').is(":checked");
    if (isChecked) {
        leerArchivoComisarias();
    } else {
        comisarias.setMap(null);

    }

}
function educacionHandle() {
    var isChecked = $('#educacion').is(":checked");
    if (isChecked) {
        leerArchivoEducacion();
    } else {
        educacion.setMap(null);

    }

}

function culturaHandle() {
    var isChecked = $('#cultura').is(":checked");
    if (isChecked) {
        leerArchivoCultura();
    } else {
        cultura.setMap(null);

    }

}

function subteHandle() {
    var isChecked = $('#subte').is(":checked");
    if (isChecked) {
        leerArchivoSubte();
    } else {
        subte.setMap(null);

    }

}

function polideportivoHandle() {
    var isChecked = $('#polideportivo').is(":checked");
    if (isChecked) {
        leerArchivoPolideportivos();
    } else {
        polideportivos.setMap(null);
    }

}

function leerArchivoSubte() {
    $.ajax({
        type: "GET",
        url: "datos/estaciones.csv",
        dataType: "text",
        success: function (data) {
            processDataSubte(data);
        }
    });

}

function leerArchivoPolideportivos() {
    $.ajax({
        type: "GET",
        url: "datos/polideportivos.csv",
        dataType: "text",
        success: function (data) {
            processDataPolideportivos(data);
        }
    });

}

function leerArchivoEducacion() {
    $.ajax({
        type: "GET",
        url: "datos/establecimientos-privados.csv",
        dataType: "text",
        success: function (data) {
            processDataEducacion(data);
        }
    });
    $.ajax({
        type: "GET",
        url: "datos/establecimientos-publicos.csv",
        dataType: "text",
        success: function (data) {
            processDataEducacion(data);
        }
    });
}


function leerArchivoCultura() {
    $.ajax({
        type: "GET",
        url: "datos/dependencias-culturales.csv",
        dataType: "text",
        success: function (data) {
            processDataCultura(data);
        }
    });
}

function leerArchivoComisarias() {
    $.ajax({
        type: "GET",
        url: "datos/comisarias-policia-federal.csv",
        dataType: "text",
        success: function (data) {
            processDataComisarias(data);
        }
    });
}


function leerArchivoCentrosVerdes() {
    $.ajax({
        type: "GET",
        url: "datos/centros-verdes.csv",
        dataType: "text",
        success: function (data) {
            processDataCentrosVerdes(data);
        }
    });
}

function leerArchivoZonasVerdes() {
    $.ajax({
        type: "GET",
        url: "datos/arbolado-espacios-verdes.csv",
        dataType: "text",
        success: function (data) {
            processDataZonasVerdes(data);
        }
    });
}

function leerArchivoMetroBus() {
    $.ajax({
        type: "GET",
        url: "datos/metrobus-estaciones.csv",
        dataType: "text",
        success: function (data) {
            processDataMetrobus(data);
        }
    });
}

function leerArchivoHospital() {
    $.ajax({
        type: "GET",
        url: "datos/areas-hospitalarias.csv",
        dataType: "text",
        success: function (data) {
            processDataHospital(data);
        }
    });
}

function leerArchivoEmergencias() {
    $.ajax({
        type: "GET",
        url: "datos/emergencias.csv",
        dataType: "text",
        success: function (data) {
            processDataEmergencias(data);
        }
    });
}

function leerArchivoCiclovias() {
    $.ajax({
        type: "GET",
        url: "datos/ciclovias.csv",
        dataType: "text",
        success: function (data) {
            processDataCiclovias(data);
        }
    });
}

function processDataSubte(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[4], data[3]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(0,0,0,1)'
    ];
    subte = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(500),
        gradient: gradient,
        opacity:0.8
    });
    subte.setMap(map);
}

function processDataPolideportivos(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[1], data[0]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(248,181,0,1)'
    ];
    polideportivos = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(1500),
        gradient: gradient,
        opacity:0.8
    });
    polideportivos.setMap(map);
}

function processDataEducacion(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[21], data[20]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(255,0,132,1)'
    ];
    educacion = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(500),
        gradient: gradient,
        opacity:0.8
    });
    educacion.setMap(map);
}

function processDataComisarias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[7], data[6]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(109,0,25,1)'
    ];
    comisarias = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(1000),
        gradient: gradient,
        opacity:0.8
    });
    comisarias.setMap(map);
}


function processDataCiclovias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var geojson = $.parseJSON(data[14]);
        var mypath = new Array();
        $.each(geojson.coordinates[0], function (index, record) {
            mypath.push(new google.maps.LatLng(record[1], record[0]));
        });
        var polyline = new google.maps.Polyline({
            path: mypath,
            strokeColor: '#207ce5',
            strokeOpacity: 0.2,
            strokeWeight: 20
        });
        polyline.setMap(map);
        ciclovias.push(polyline);
    }

}

function processDataCentrosVerdes(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[10], data[9]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(31,59,8,1)'
    ];
    centrosverdesmarkers = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(500),
        gradient: gradient,
        opacity:0.8
    });
    centrosverdesmarkers.setMap(map);
}

function processDataZonasVerdes(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[15], data[16]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(0,255,0,1)'
    ];
    zonasverdesmarkers = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(500),
        gradient: gradient,
        opacity:0.8
    });
    zonasverdesmarkers.setMap(map);

}

function processDataMetrobus(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[7], data[6]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(255,255,255,0)',
        'rgba(0,0,0,1)'
    ];
    metrobusmarkers = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(500),
        gradient: gradient,
        opacity:0.8
    });
    metrobusmarkers.setMap(map);

}
function processDataCultura(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var myLatLng = new google.maps.LatLng(data[18], data[17]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(219,54,164,0)',
        'rgba(219,54,164,1)',
        'rgba(242,211,235,1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 0, 255, 1)'
    ];
    cultura = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(1500),
        gradient: gradient,
        opacity:0.9
    });
    cultura.setMap(map);

}

function processDataEmergencias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var myLatLng = new google.maps.LatLng(data[2], data[1]);
        puntos.push(myLatLng);
    }

    var pointArray = new google.maps.MVCArray(puntos);
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    firemarkers = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(250),
        gradient: gradient,
        opacity:0.8
    });
    firemarkers.setMap(map);
}

function processDataHospital(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var puntos = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');

        var myLatLng = new google.maps.LatLng(data[8], data[7]);
        puntos.push(myLatLng);
    }
    var pointArray = new google.maps.MVCArray(puntos);
    hospitalmarkers = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: getNewRadius(500),
        opacity:0.5
    });
    hospitalmarkers.setMap(map);
}

function add_marker(point, note, icon) {
    var $note = $("<div style='white-space: nowrap;'>"+note+"</div>");
    var marker = new google.maps.Marker({map: map, position: point, clickable: true,icon:icon, title:note });
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent($note[0]);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
    return marker;
}

//Mercator --BEGIN--
var TILE_SIZE = 256;
function bound(value, opt_min, opt_max) {
    if (opt_min !== null) value = Math.max(value, opt_min);
    if (opt_max !== null) value = Math.min(value, opt_max);
    return value;
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    return rad / (Math.PI / 180);
}

function MercatorProjection() {
    this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2,
        TILE_SIZE / 2);
    this.pixelsPerLonDegree_ = TILE_SIZE / 360;
    this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}

MercatorProjection.prototype.fromLatLngToPoint = function (latLng,
                                                           opt_point) {
    var me = this;
    var point = opt_point || new google.maps.Point(0, 0);
    var origin = me.pixelOrigin_;

    point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

    // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
    // 89.189.  This is about a third of a tile past the edge of the world
    // tile.
    var siny = bound(Math.sin(degreesToRadians(latLng.lat())), - 0.9999,
        0.9999);
    point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
    return point;
};

MercatorProjection.prototype.fromPointToLatLng = function (point) {
    var me = this;
    var origin = me.pixelOrigin_;
    var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
    var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
    return new google.maps.LatLng(lat, lng);
};

//Mercator --END--

function getNewRadius(desiredRadiusPerPointInMeters) {


    var numTiles = 1 << map.getZoom();
    var center = map.getCenter();
    var moved = google.maps.geometry.spherical.computeOffset(center, 10000, 90); /*1000 meters to the right*/
    var projection = new MercatorProjection();
    var initCoord = projection.fromLatLngToPoint(center);
    var endCoord = projection.fromLatLngToPoint(moved);
    var initPoint = new google.maps.Point(
        initCoord.x * numTiles,
        initCoord.y * numTiles);
    var endPoint = new google.maps.Point(
        endCoord.x * numTiles,
        endCoord.y * numTiles);
    var pixelsPerMeter = (Math.abs(initPoint.x-endPoint.x))/10000.0;
    var totalPixelSize = Math.floor(desiredRadiusPerPointInMeters*pixelsPerMeter);
    console.log(totalPixelSize);
    return totalPixelSize;

}