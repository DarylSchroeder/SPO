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
                         reportObjects[i].Icon_URL = "./Images/ReportType/IM_SPO_Damage_" + reportObjects[i].Type + ".png";
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
        setPBSItemValues2(callback);
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
    // create the item for binding purposes. 
    pbsItem =
        ({
            name: SelectedObject.Name,
            header1: "Type",
            subItem1: SelectedObject.Type,
            Icon_URL: "./Images/" + SelectedObject.Type + ".png",
            launch_details: launch_details_function,
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            list5: [],
            documentList: []
        });



    callback(pbsItem);
}

function setPBSItemValues2(callback) {
    // -- build up the query for children -- 
    var expandReports = {
        "PBSObservation": true
    };
    var queryReports = new Everlive.Query();
    queryReports.expand(expandReports);
    var reportData = el.data("PBSLevel");
    reportObjects = [];
    localStorage.setItem('reportObjects', JSON.stringify(reportObjects));
    reportData.expand(expandReports).getById(SelectedObject.Id)
        .then(function (reportData) {
            reportObjects = reportData.result.PBSObservation;
            for (var i = 0; i < reportObjects.length; i++) {
                reportObjects[i].ClassType = "Observation Report";
                reportObjects[i].Icon_URL = "./Images/ReportType/IM_SPO_Damage_" + reportObjects[i].Type + ".png";
            };
            localStorage.setItem('reportObjects', JSON.stringify(reportObjects));
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
                    tagObjects = data.result.PBSItemTag;

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
                            listHeader1: "Reports",
                            list1: JSON.parse(localStorage.getItem('reportObjects')),
                            listHeader2: "Tags",
                            list2: JSON.parse(localStorage.getItem('tagObjects')),
                            launch_details: launch_details_function,
                            list3: [],
                            list4: [],
                            list5: [],
                            documentList: []
                        });



                    callback(pbsItem);
                });
        });
}