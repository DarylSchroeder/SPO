
var currentTheme = "glacier";
var SelectedObject;
var apiKey = "Hro5ZCMacvvdbWuA";
var el = new Everlive(apiKey);
var app;


//creates a chart on the canvas object.
function populateChart() {
    var pieData = [{ value: window.APP.models.home.observationsClosed, color: "#F38630", label: 'Closed', labelColor: 'white', labelFontSize: '16' },
        		   { value: window.APP.models.home.observationsOpen, color: "#F34353", label: 'Open', labelColor: 'white', labelFontSize: '16' }];
    var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData, {
        animationSteps: 100,
        animationEasing: 'easeInOutQuart'
    });
}

//chain the 2 expansions together to get Closed & open statuses, use callbacks to ensure correct ordering, then populate chart.
function loadchart() {
    QueryCountByProperty("ObservationReport", "Status", "Closed", function (e) {
        QueryCountByProperty("ObservationReport", "Status", "Open", function (f)
        {
            window.APP.models.home.observationsClosed = e;
            window.APP.models.home.observationsOpen = f;

            document.getElementById("observationClosed").textContent = e;
            document.getElementById("observationOpen").textContent = f;
            
            var NextObservation = kendo.observable({

                distance: 25,
                tag: { Name: '21-PA-413', Type: 'Pump' },
                description: 'pump is leaking with residue situated underneath the rotation shaft'
            });
            //alert(JSON.stringify(NextObservation));
            kendo.bind($("div"), NextObservation);

            populateChart();
        })
    });
}

function refreshFilter() {
    var query = location.href;
    var filterString = query.split("?")[1].split("=")[1];
    var dataSource = window.APP.models.pbs.ds;
    dataSource.fetch().then(function () {
        dataSource.filter({ field: "Type", operator: "startswith", value: filterString });
    });
}

function refreshReportFilter() {
    var query = location.href;
    var filterType = query.split("?")[1].split("&")[0].split("=")[1];
    var filterString = query.split("?")[1].split("&")[1].split("=")[1];
    var dataSource = window.APP.models.observation_reports.ds;
    dataSource.fetch().then(function () {
        dataSource.filter({ field: filterType, operator: "startswith", value: filterString });
    });
}

function toggleTheme() {
    var themes = ["glacier", "shadow"];
    for (var i = 0; i < themes.length; i++) {
        var styleSheet = document.getElementById(themes[i]);
        if (themes[i] != currentTheme) {
            styleSheet.removeAttribute("disabled");
            newTheme = themes[i];
        } else {
            styleSheet.setAttribute("disabled", "disabled");
        }
    }
    currentTheme = newTheme;
}

function launch_details_function(e) {
    SelectedObject = e.data;
    app.navigate("views/details.html", "slide");
    showDetails();
}

function compareObjectsByName(a, b) {
    if (a.Name > b.Name)
        return 1;
    if (a.Name < b.Name)
        return -1;
    return 0;
};

(function () {

    // create an object to store the models for each view
    window.APP = {
        models: {
            home: {
                title: 'Home',
                observationsOpen: {},
                observationsClosed: {}                
            },
            settings: {
                title: 'Settings'
            },
            pbs: {
                title: 'PBS',

               
                ds: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "https://api.everlive.com/v1/" + apiKey + "/PBSLevel",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                        data: function (response) {
                            pbsObjects = response.Result.sort(compareObjectsByName);
                            for (var i = 0; i < pbsObjects.length; i++) {
                                pbsObjects[i].ClassType = "PBS";
                                pbsObjects[i].Icon_URL = "./Images/" + pbsObjects[i].Type + ".png";
                                if (pbsObjects[i].PBSObservation == undefined)
                                    pbsObjects[i].Count = 0;
                                else
                                    pbsObjects[i].Count = pbsObjects[i].PBSObservation.length;
                            };

                            return pbsObjects;
                        }
                    }
                }),

                details_pbs: launch_details_function
            },
            observation_reports: {
                ds: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "https://api.everlive.com/v1/" + apiKey + "/ObservationReport",
                            datatype: "jsonp"
                        }
                    },
                    schema: {
                        data: function (response) {
                            reportObjects = response.Result;
                            for (var i = 0; i < reportObjects.length; i++) {
                                reportObjects[i].ClassType = "Observation Report";
                                reportObjects[i].Icon_URL = "./Images/ReportType/IM_SPO_Damage_" + reportObjects[i].Type + ".png";
                            };

                            return reportObjects;
                        }
                    }
                }),

                launch_details: launch_details_function
            },
            tags: {
                ds: new kendo.data.DataSource({
                    type: "everlive",
                    transport: {
                        typeName: "TaggedItem"
                    },
                    schema: {
                        data: function (response) {
                            tagObjects = response.Result;
                            for (var i = 0; i < tagObjects.length; i++) {
                                tagObjects[i].ClassType = "Tag";
                                tagObjects[i].Icon_URL = "./Images/" + tagObjects[i].Type + ".png";
                            };
                            return tagObjects;
                        }
                    }
                })
            }
        }
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {

        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();

        app = new kendo.mobile.Application(document.body, {

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'native',
            transition: 'slide',

            // the application needs to know which view to load first
            initial: 'views/home.html'
        });

    }, false);

}());