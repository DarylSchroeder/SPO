//var pbsItem;
function setTagValues(callback) {
    //alert("set values");

    // -- build up the query for tags -- 
    var expandTags = {
        "PBSItemTag": true
    };
    var queryTags = new Everlive.Query();
    queryTags.expand(expandTags);
    var data = el.data("PBSLevel");

    // -- execute the query --
    console.log("pbsid=" + SelectedPBS.Id);
    data.expand(expandTags).getById(SelectedPBS.Id)
        .then(function (data) {
                tagObjets = data.result.PBSItemTag; //JSON.parse(retrievedObject);

                //set icon for all objects -- probably be a better way to do this... 
                for (var i = 0; i < tagObjets.length; i++) {
                    tagObjets[i].Icon_URL = "./Images/" + tagObjets[i].Classification + ".png";
                };

                // create the item for binding purposes. 
                pbsItem =
                    ({
                        name: SelectedPBS.Name,
                        type: SelectedPBS.Type,
                        Icon_URL: "./Images/" + SelectedPBS.Type + ".png",
                        pbsItemTags: tagObjets
                    });
                callback(pbsItem);                
            },
            function (error) {
                console.log(JSON.stringify(error));
            });
    
}

function bindToGrid(result)
{
    kendo.bind($('#pbsItemContent'), result, kendo.mobile.ui);
}

function showPBSItemDetail()
{
    //uses a callback to bind the data to the grid only after the tag values have been populated.
   setTagValues(bindToGrid);

}