var currentTheme = "glacier";
var SelectedPBS;
var SelectedTag;
var apiKey = "Hro5ZCMacvvdbWuA";
var el = new Everlive(apiKey);
var app;


//creates a chart on the canvas object.
function populateChart(closed, open) {
    var pieData = [{ value: closed, color: "#F38630", label: 'Closed', labelColor: 'white', labelFontSize: '16' },
        		   { value: open, color: "#F34353", label: 'Open', labelColor: 'white', labelFontSize: '16' }];
    var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData, {
        animationSteps: 100,
        animationEasing: 'easeInOutQuart'
    });
}

//chain the 2 expansions together to get Closed & open statuses, use callbacks to ensure correct ordering, then populate chart.
function loadchart() {
	//getChartValues(populateChart);
    QueryCountByProperty("ObservationReport", "Status", "Closed", function (e) {
        QueryCountByProperty("ObservationReport", "Status", "Open", function (f)
        { populateChart(e, f); })
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

(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be



    // create an object to store the models for each view
    window.APP = {
        models: {
            home: {
                title: 'Home'

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
                            return response.Result;
                        }
                    }
                }),

                details_pbs: function (e) {
                    SelectedPBS = e.data;
                    app.navigate("views/pbsItemDetails.html", "slide");

                }
            },
            tags: {
                ds: new kendo.data.DataSource({
                    type: "everlive",
                    transport: {
                        typeName: "TaggedItem"
                    }
                })
            },
            reportView: {

                closed: function () {
                    return QueryCountByProperty("ObservationReport", "Status", "Closed");
                },
                open: function () {
                    return QueryCountByProperty("ObservationReport", "Status", "Open");
                }

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