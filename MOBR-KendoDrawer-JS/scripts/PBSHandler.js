(


    function () {
        var currentPBSItem;
        window.PBSItemDetail = {
            show: function () {

                //TODO: use callbacks here so we can make sure the data is fully set before we bind.

                console.log("TRACE: [PBSItemDetail.show] Enter");

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

                            //bind out to the pbsItemContent div
                            kendo.bind($('#pbsItemContent'), pbsItem, kendo.mobile.ui);
                        },
                        function (error) {
                            console.log(JSON.stringify(error));
                        });

            },
            hide: function () {},
            openLink: function () {}
        };
    }());