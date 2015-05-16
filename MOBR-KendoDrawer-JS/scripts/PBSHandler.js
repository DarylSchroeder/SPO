(function () {
    var currentPBSItem;
    window.PBSItemDetail = {
        show: function () {
			//console.log("TRACE: [PBSItemDetail.show] Enter");
            
            // -- build up the query for tags -- 
            var expandTags = { "PBSItemTag": true };            
            var queryTags = new Everlive.Query();
            queryTags.expand(expandTags);
            var data = el.data("PBSLevel");
            
            
            
            // -- execute the query --
			data.expand(expandTags).getById(SelectedPBS.Id)
             	.then(function(data){
                	//store this, because 'data' dies outside this function.
                	localStorage.setItem('tagResults', JSON.stringify(data.result.PBSItemTag));
             	}, 
                function(error){
                	console.log(JSON.stringify(error));
             });
            
            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem('tagResults');
            
            // create the item for binding purposes. 
            var pbsItem =
             ({
			        name: SelectedPBS.Name,
					type: SelectedPBS.Type,
                    pbsItemTags:JSON.parse(retrievedObject),
                    
			});
            
            kendo.bind($('#pbsItemContent'), pbsItem, kendo.mobile.ui);
          
        },
        hide: function () {
        },
        openLink: function () {
        }
    };
}());