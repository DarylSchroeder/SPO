function setTaggedItemValues(callback) {
    // -- build up the query for children -- 
    var expandDocuments = {
        "TagDocument": true
    };
    var queryDocuments = new Everlive.Query();
    queryDocuments.expand(expandDocuments);
    var documentData = el.data("TaggedItem");
    
    documentData.expand(expandDocuments).getById(SelectedObject.Id)
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
    data.expand(expandTags).getById(SelectedObject.Id)
        .then(function (data) {
            reportObjects = data.result.TagToObservationReport;

            //set icon for all objects -- probably be a better way to do this... 
            for (var i = 0; i < reportObjects.length; i++) {
                reportObjects[i].ClassType = "Observation Report";
            };

            // create the item for binding purposes. 
            taggedItem =
                ({
                    name: SelectedObject.Name,
                    header1: "Type",
                    subItem1: SelectedObject.Classification,
                    listHeader1: "Observation Reports",
                    list1: reportObjects,
                    documentListHeader: "Documents",
                    documentList: JSON.parse(localStorage.getItem('docObjects')),
                    launch_details: launch_details_function,
                	file_doc: function (e) {
                	    SelectedDoc = e.data;

                	    var expandFiles = {
                	        "DocumentFile": true
                	    };
                	    var queryFiles = new Everlive.Query();
                	    queryFiles.expand(expandFiles);
                	    var fileData = el.data("Documents");
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

function bindToDetailsGrid(result) {
    kendo.bind($('#detailsContent'), result, kendo.mobile.ui);
}

function showDetails() {
    //uses a callback to bind the data to the grid only after the tag values have been populated.
    setItemValues(bindToDetailsGrid);
}

function setItemValues(callback) {
    if (SelectedObject.ClassType == "Observation Report")
    {
        setObservationReportItemValues(callback);
    }
    else if (SelectedObject.ClassType == "Tag") {
        setTaggedItemValues(callback);
    }
}

function setObservationReportItemValues(callback) {   
    observationItem =
                ({
                    name: SelectedObject.Name,
                    header1: "Type",
                    subItem1: SelectedObject.Type,
                    header2: "Priority",
                    subItem2: SelectedObject.Severity,
                    header3: "Status",
                    subItem3: SelectedObject.Status,
                    header4: "Description",
                    subItem4: SelectedObject.Description
                });

    alert(JSON.stringify(observationItem.name));
    callback(observationItem);
}