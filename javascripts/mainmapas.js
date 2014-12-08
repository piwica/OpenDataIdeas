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

function comisariasHandle() {
    var isChecked = $('#comisarias').is(":checked");
    if (isChecked) {
        leerArchivoComisarias();
    } else {
        for (var i = 0; i < comisarias.length; i++) {
            comisarias[i].setMap(null);
        }
        comisarias = [];
    }

}
function educacionHandle() {
    var isChecked = $('#educacion').is(":checked");
    if (isChecked) {
        leerArchivoEducacion();
    } else {
        for (var i = 0; i < educacion.length; i++) {
            educacion[i].setMap(null);
        }
        educacion = [];
    }

}

function culturaHandle() {
    var isChecked = $('#cultura').is(":checked");
    if (isChecked) {
        leerArchivoCultura();
    } else {
        for (var i = 0; i < cultura.length; i++) {
            cultura[i].setMap(null);
        }
        cultura = [];
    }

}

function subteHandle() {
    var isChecked = $('#subte').is(":checked");
    if (isChecked) {
        leerArchivoSubte();
    } else {
        for (var i = 0; i < subte.length; i++) {
            subte[i].setMap(null);
        }
        subte = [];
    }

}

function polideportivoHandle() {
    var isChecked = $('#polideportivo').is(":checked");
    if (isChecked) {
        leerArchivoPolideportivos();
    } else {
        for (var i = 0; i < polideportivos.length; i++) {
            polideportivos[i].setMap(null);
        }
        polideportivos = [];
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
    $.ajax({
        type: "GET",
        url: "datos/comisarias-policia-metropolitana.csv",
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
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[4], data[3]);
        if (data[2] === 'A') {
            var styleIconClass = new StyledIcon(StyledIconTypes.CLASS, {color: "#00BFE0"});
            var marker = new StyledMarker(
                {styleIcon: new StyledIcon(StyledIconTypes.MARKER, {text: "A"}, styleIconClass),
                    position: myLatLng,
                    map: map});

            subte.push(marker);
        }
        if (data[2] === 'B') {
            var styleIconClass = new StyledIcon(StyledIconTypes.CLASS, {color: "#FF0000"});
            var marker = new StyledMarker(
                {styleIcon: new StyledIcon(StyledIconTypes.MARKER, {text: "B"}, styleIconClass),
                    position: myLatLng,
                    map: map});

            subte.push(marker);
        }
        if (data[2] === 'C') {
            var styleIconClass = new StyledIcon(StyledIconTypes.CLASS, {color: "#0000BB"});
            var marker = new StyledMarker(
                {styleIcon: new StyledIcon(StyledIconTypes.MARKER, {text: "C"}, styleIconClass),
                    position: myLatLng,
                    map: map});

            subte.push(marker);
        }
        if (data[2] === 'D') {
            var styleIconClass = new StyledIcon(StyledIconTypes.CLASS, {color: "#008000"});
            var marker = new StyledMarker(
                {styleIcon: new StyledIcon(StyledIconTypes.MARKER, {text: "D"}, styleIconClass),
                    position: myLatLng,
                    map: map});

            subte.push(marker);
        }
        if (data[2] === 'E') {
            var styleIconClass = new StyledIcon(StyledIconTypes.CLASS, {color: "#A800A8"});
            var marker = new StyledMarker(
                {styleIcon: new StyledIcon(StyledIconTypes.MARKER, {text: "E"}, styleIconClass),
                    position: myLatLng,
                    map: map});

            subte.push(marker);
        }if (data[2] === 'H') {
            var styleIconClass = new StyledIcon(StyledIconTypes.CLASS, {color: "#FFCC00"});
            var marker = new StyledMarker(
                {styleIcon: new StyledIcon(StyledIconTypes.MARKER, {text: "H"}, styleIconClass),
                    position: myLatLng,
                    map: map});

            subte.push(marker);
        }
    }
}

function processDataPolideportivos(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/deportes.png';
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[1], data[0]);
        var marker=add_marker(myLatLng, data[3], image);
        polideportivos.push(marker);
    }
}

function processDataEducacion(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/educacion.png';
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[21], data[20]);
        var marker=add_marker(myLatLng, data[7], image);
        educacion.push(marker);
    }
}

function processDataComisarias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/policia.png';
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[7], data[6]);
        var marker=add_marker(myLatLng, data[1], image);
        comisarias.push(marker);
    }
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
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[10], data[9]);
        var marker=add_marker(myLatLng, data[1], image);
        centrosverdesmarkers.push(marker);
    }
}

function processDataZonasVerdes(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/arbol.png';
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[15], data[16]);
        var marker=add_marker(myLatLng, data[5], image);
        zonasverdesmarkers.push(marker);
    }
}

function processDataMetrobus(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/bus.png';
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');

        var myLatLng = new google.maps.LatLng(data[7], data[6]);
        var marker=add_marker(myLatLng, data[1], image);
        metrobusmarkers.push(marker);
    }
}
function processDataCultura(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/cultura.png';

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        if (data.length > 1) {
            if (data[12].toLowerCase().indexOf("archivo") >= 0 || data[12].toLowerCase().indexOf("libre") >= 0 || data[12].toLowerCase().indexOf("biblio") >= 0) {
                image = 'images/bibliotecas.png';
            } else if (data[12].toLowerCase().indexOf("disque") >= 0 || data[12].toLowerCase().indexOf("peña") >= 0 || data[12].toLowerCase().indexOf("milonga") >= 0 || data[12].toLowerCase().indexOf("disco") >= 0 || data[12].toLowerCase().indexOf("radio") >= 0 || data[12].toLowerCase().indexOf("bar") >= 0) {
                image = 'images/baile.png';
            } else if (data[12].toLowerCase().indexOf("exposi") >= 0 || data[12].toLowerCase().indexOf("calesita") >= 0 || data[12].toLowerCase().indexOf("arte") >= 0) {
                image = 'images/galeriasarte.png';
            } else if (data[12].toLowerCase().indexOf("teatro") >= 0 || data[12].toLowerCase().indexOf("cine") >= 0 || data[12].toLowerCase().indexOf("televi") >= 0) {
                image = 'images/teatro.png';
            }
            var myLatLng = new google.maps.LatLng(data[18], data[17]);
            var marker=add_marker(myLatLng, data[1], image);
            cultura.push(marker);
        }

    }
}

function processDataEmergencias(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/emergencia.png';

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data[0].toLowerCase().indexOf("lluvia") >= 0) {
            image = 'images/lluvia.png';
        } else if (data[0].toLowerCase().indexOf("inundacion") >= 0) {
            image = 'images/inundacion.png';
        } else if (data[0].toLowerCase().indexOf("derrumbe") >= 0) {
            image = 'images/derrumbe.png';
        } else if (data[0].toLowerCase().indexOf("explosion") >= 0) {
            image = 'images/explosion.png';
        } else if (data[0].toLowerCase().indexOf("incendio") >= 0) {
            image = 'images/fire.png';
        } else if (data[0].toLowerCase().indexOf("lluvia") >= 0) {
            image = 'images/lluvia.png';
        }
        var myLatLng = new google.maps.LatLng(data[2], data[1]);
        var marker=add_marker(myLatLng, data[0], image);
        firemarkers.push(marker);
    }
}

function processDataHospital(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var image = 'images/hospital.png';
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');

        var myLatLng = new google.maps.LatLng(data[8], data[7]);
        var marker=add_marker(myLatLng, data[1], image);
        hospitalmarkers.push(marker);
    }
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