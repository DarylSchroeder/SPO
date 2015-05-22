function setTaggedItemValues(callback) {
    // -- build up the query for children -- 
    var expandDocuments = {
        "TagDocument": true
    };
    var queryDocuments = new Everlive.Query();
    queryDocuments.expand(expandDocuments);
    var documentData = el.data("TaggedItem");
    
    docObjects = [];
    localStorage.setItem('docObjects', JSON.stringify(docObjects));
    documentData.expand(expandDocuments).getById(SelectedObject.Id)
        .then(function (documentData) {
                docObjects = documentData.result.TagDocument;
                localStorage.setItem('docObjects', JSON.stringify(docObjects));
            },
            function (error) {
                console.log(JSON.stringify(error));
            })
         .then(function () {
             //
             // -- build up the query for tags -- 
             //
             var expandTags = {
                 "TagToObservationReport": true
             };
             var queryTags = new Everlive.Query();
             queryTags.expand(expandTags);
             var data = el.data("TaggedItem");

             reportObjects = [];
             localStorage.setItem('reportObjects', JSON.stringify(reportObjects));
             // -- execute the query --
             data.expand(expandTags).getById(SelectedObject.Id)
                 .then(function (data) {
                     reportObjects = data.result.TagToObservationReport;

                     //set icon for all objects -- probably be a better way to do this... 
                     for (var i = 0; i < reportObjects.length; i++) {
                         reportObjects[i].ClassType = "Observation Report";
                     };

                     localStorage.setItem('reportObjects', JSON.stringify(reportObjects));
                 })
                .then(function () {
                    // create the item for binding purposes. 
                    taggedItem =
                        ({
                            name: SelectedObject.Name,
                            header1: "Type",
                            subItem1: SelectedObject.Classification,
                            listHeader1: "Observation Reports",
                            list1: JSON.parse(localStorage.getItem('reportObjects')),
                            documentListHeader: "Documents",
                            documentList: JSON.parse(localStorage.getItem('docObjects')),
                            launch_details: launch_details_function,
                            list2: [],
                            list3: [],
                            list4: [],
                            list5: [],
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
                });

         });
      
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
    else if (SelectedObject.ClassType == "PBS") {
        setPBSItemValues(callback);
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
                    subItem4: SelectedObject.Description,
                    list1: [],
                    list2: [],
                    list3: [],
                    list4: [],
                    list5: [],
                    documentList: []
                });

    callback(observationItem);
}

function setPBSItemValues(callback) {
    // -- build up the query for children -- 
    var expandChildren = {
        "Children": true
    };
    var queryChildren = new Everlive.Query();
    queryChildren.expand(expandChildren);
    var childData = el.data("PBSLevel");
    childObjects = [];
    localStorage.setItem('childObjects', JSON.stringify(childObjects));
    childData.expand(expandChildren).getById(SelectedObject.Id)
        .then(function (childData) {
            //alert(JSON.stringify(childData.result.Children));
            childObjects = childData.result.Children;
            for (var i = 0; i < childObjects.length; i++) {
                childObjects[i].ClassType = "PBS";
                childObjects[i].Icon_URL = "./Images/" + childObjects[i].Type + ".png";
            };
            localStorage.setItem('childObjects', JSON.stringify(childObjects));
        },
        function (error) {
            console.log(JSON.stringify(error));
        })
        .then(function () {
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
            console.log("pbsid=" + SelectedObject.Id);
            tagObjects = [];
            localStorage.setItem('tagObjects', JSON.stringify(tagObjects));
            data.expand(expandTags).getById(SelectedObject.Id)
                .then(function (data) {
                    tagObjects = data.result.PBSItemTag; //JSON.parse(retrievedObject);

                    //set icon for all objects -- probably be a better way to do this... 
                    for (var i = 0; i < tagObjects.length; i++) {
                        tagObjects[i].ClassType = "Tag";
                        tagObjects[i].Icon_URL = "./Images/" + tagObjects[i].Classification + ".png";
                    };

                    localStorage.setItem('tagObjects', JSON.stringify(tagObjects));

                },
                function (error) {
                    console.log(JSON.stringify(error));
                })
                .then(function () {

                    // create the item for binding purposes. 
                    pbsItem =
                        ({
                            name: SelectedObject.Name,
                            header1: "Type",
                            subItem1: SelectedObject.Type,
                            Icon_URL: "./Images/" + SelectedObject.Type + ".png",
                            listHeader1: "Tags",
                            list1: JSON.parse(localStorage.getItem('tagObjects')),
                            listHeader2: "Children",
                            list2: JSON.parse(localStorage.getItem('childObjects')),
                            launch_details: launch_details_function,
                            list3: [],
                            list4: [],
                            list5: [],
                            documentList: []
                        });
                    //console.log(pbsItem);



                    callback(pbsItem);
                });
        });
}