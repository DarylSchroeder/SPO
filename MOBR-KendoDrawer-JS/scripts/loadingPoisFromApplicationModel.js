

/* this is a dummy implementation to create poi-data, which are passed over to JS / Wikitude SDK on first location update */
function onLocationUpdated(position, reports) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var altitude = position.coords.altitude;
    var placesAmount = 10;
    var poiData = [];
    alert('here');
     //alert(position);
     //alert(observationReports);

    //obsReports[i]
    //Status
    //Name
    //Description
    //Severity
    //Type

    alert("Hello! Hello! Hello!");
    var dataSource = window.APP.models.observation_reports.ds;
    dataSource.fetch().then(function () {
        
        alert(dataSource);
        alert("Hello! Hello! Hello!");
        // creates dummy poi-data around given lat/lon
        for (var i = 0; i < dataSource.length; i++) {
            poiData.push({
                'id': (i + 1),
                'longitude': longitude + 0.001 * (5 - getRandomInt(1, 10)),
                'latitude': latitude + 0.001 * (5 - getRandomInt(1, 10)),
                'description': dataSource[i].Description,
                'altitude': 100.0,
                'name': dataSource[i].Name,
                'obrtype': dataSource[i].Type
            })

            if (dataSource[i].Type == 'Leak')
                {
                    alert('is leak');        
                } else
                    {
                        alert(dataSource[i].Type);
                    }
        }

        // inject POI data in JSON-format to JS
        app.wikitudePlugin.callJavaScript("window.loadPoisFromJsonData(" + JSON.stringify(poiData) + ");");
	});
}

function onLocationError(error) {
    alert("Not able to fetch location.");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

