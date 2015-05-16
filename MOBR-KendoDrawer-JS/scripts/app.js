
(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

		
    var apiKey = "Hro5ZCMacvvdbWuA";
    var el = new Everlive(apiKey);
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
          alert: function(e) {
            alert(e.data.Name);
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

        // the application needs to know which view to load first
        initial: 'views/home.html'
      });

    }, false);


}());