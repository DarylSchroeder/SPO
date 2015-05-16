var currentTheme = "glacier";
var SelectedPBS;
var apiKey = "Hro5ZCMacvvdbWuA";
var el = new Everlive(apiKey);    



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
    var app;


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