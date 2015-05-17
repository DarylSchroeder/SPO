//var pbsItem;
function details_pbs()
{
    alert("hello.");
}
function setTagValues(callback) {
    //alert("set values");


    // -- build up the query for children -- 
    var expandChildren = {
        "Children": true
    };
    var queryChildren = new Everlive.Query();
    queryChildren.expand(expandChildren);
    var childData = el.data("PBSLevel");
    childData.expand(expandChildren).getById(SelectedPBS.Id)
        .then(function (childData) {
        		//alert(JSON.stringify(childData.result.Children));
                childObjects = childData.result.Children;
                for (var i = 0; i < childObjects.length; i++) {
                    childObjects[i].Icon_URL = "./Images/" + childObjects[i].Type + ".png";
                };
        		localStorage.setItem('childObjects', JSON.stringify(childObjects));
            },
            function (error) {
                console.log(JSON.stringify(error));
            });

    
    //
    // -- build up the query for tags -- 
    //
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
                        pbsItemTags: tagObjets,
                        children: JSON.parse(localStorage.getItem('childObjects'))
                    });
        		//console.log(pbsItem);
                callback(pbsItem);
            },
            function (error) {
                console.log(JSON.stringify(error));
            });

}

function bindToGrid(result) {
    kendo.bind($('#pbsItemContent'), result, kendo.mobile.ui);
}

function showPBSItemDetail() {
    //uses a callback to bind the data to the grid only after the tag values have been populated.
    setTagValues(bindToGrid);

}