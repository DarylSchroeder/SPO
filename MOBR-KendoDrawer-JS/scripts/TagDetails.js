function setTaggedItemValues(callback) {
    // -- build up the query for children -- 
    var expandDocuments = {
        "TagDocument": true
    };
    var queryDocuments = new Everlive.Query();
    queryDocuments.expand(expandDocuments);
    var documentData = el.data("TaggedItem");
    
    documentData.expand(expandDocuments).getById(SelectedTag.Id)
        .then(function (documentData) {
                docObjects = documentData.result.TagDocument;
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
                	file_doc: function (e) {
                	    SelectedDoc = e.data

                	    var expandFiles = {
                	        "DocumentFile": true
                	    };
                	    var queryFiles = new Everlive.Query();
                	    queryFiles.expand(expandFiles);
                	    var fileData = el.data("Documents");
                	    alert("Hello!");
                	    fileData.expand(expandFiles).getById(SelectedDoc.Id)
                            .then(function (fileData) {
                                fileObjects = fileData.result.DocumentFile;
                                window.open("https://bs3.cdn.telerik.com/v1/Hro5ZCMacvvdbWuA/" + fileObjects.Id, "_system");
                            })
                	}
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