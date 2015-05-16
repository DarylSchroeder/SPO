function doalert()
{
    alert("hi");
}
(function () {
    var currentPBSItem;
    window.PBSItemDetail = {
        show: function () {
            
            //use callbacks here so we can make sure the data is fully set before we bind.
            
			console.log("TRACE: [PBSItemDetail.show] Enter");
            
            // -- build up the query for tags -- 
            var expandTags = { "PBSItemTag": true };            
            var queryTags = new Everlive.Query();
            queryTags.expand(expandTags);
            var data = el.data("PBSLevel");
            
            
            
            // -- execute the query --
            console.log("pbsid=" + SelectedPBS.Id);
			data.expand(expandTags).getById(SelectedPBS.Id)
             	.then(function(data){
                	console.log("got data from expand");
                	//store this, because 'data' dies outside this function.
                	console.log(JSON.stringify(data.result.PBSItemTag));
                	localStorage.setItem('tagResults', JSON.stringify(data.result.PBSItemTag));
             	}, 
                function(error){
                	console.log(JSON.stringify(error));
             });
            
            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem('tagResults');
            tagObjets = JSON.parse(retrievedObject);
            
            //set icon for all objects -- probably be a better way to do this... 
            for (var i = 0; i < tagObjets.length; i++)  
            {
                tagObjets[i].Icon_URL="./Images/"+ tagObjets[i].Classification + ".png";
			};
            
            // create the item for binding purposes. 
            console.log("creating collection");
            pbsItem =
             ({
			        name: SelectedPBS.Name,
					type: SelectedPBS.Type,   
                 	Icon_URL: "./Images/"+ SelectedPBS.Type + ".png",
                    pbsItemTags: tagObjets                    
			});
            
            //bind out to the pbsItemContent div
            kendo.bind($('#pbsItemContent'), pbsItem, kendo.mobile.ui);
        },
        hide: function () {
        },
        openLink: function () {
        }
    };
}());