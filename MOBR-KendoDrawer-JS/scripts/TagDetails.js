function setTaggedItemValues(callback) {
    // -- build up the query for children -- 
    var expandDocuments = {
        "TagDocuments": true
    };
    var queryDocuments = new Everlive.Query();
    queryDocuments.expand(expandDocuments);
    var documentData = el.data("TaggedItem");
    documentData.expand(expandDocuments).getById(SelectedTag.Id)
        .then(function (documentData) {
                docObjects = documentData.result.TagDocuments;
                for (var i = 0; i < docObjects.length; i++) {
                    docObjects[i].Icon_URL = "./Images/" + docObjects[i].Type + ".png";
                };
                localStorage.setItem('docObjects', JSON.stringify(docObjects));
            },
            function (error) {
                console.log(JSON.stringify(error));
            });
    
    //
    // -- build up the query for tags -- 
    //
    var expandTags = {
        "TagToObservationReport": true
    };
    var queryTags = new Everlive.Query();
    queryTags.expand(expandTags);
    var data = el.data("TaggedItem");

    // -- execute the query --
    data.expand(expandTags).getById(SelectedTag.Id)
        .then(function (data) {
        	reportObjects = data.result.TagToObservationReport;
            
            // create the item for binding purposes. 
            taggedItem =
                ({
                    name: SelectedTag.Name,
                    classification: SelectedTag.Classification,
                	observationReports: reportObjects,
                	tagDocuments: JSON.parse(localStorage.getItem('docObjects')),
                });

            callback(taggedItem);
        })
}

function bindToTagGrid(result) {
    kendo.bind($('#tagContent'), result, kendo.mobile.ui);
}

function showTagDetails() {
    //uses a callback to bind the data to the grid only after the tag values have been populated.
    setTaggedItemValues(bindToTagGrid);

}