(function () {
    var currentPBSItem;
    window.PBSItemDetail = {
        show: function () {
            // //Pull the ISBN number from the query string
            //var location = window.location.toString();
			//alert(SelectedPBS.Name);
            // window.ItemDetails = {
            //     "name": SelectedPBS.Name;
            // }
            //var id = location.substring(location.lastIndexOf('?') + 4);
	
            //window.CurrentID=id;
            //alert(window.pbs.ds.data.view()[0].uid);
            // window.pbs.data.filter({
            //     field: "Name",
            //     operator: "eq",
            //     value: id
            // });
            // currentPBSItem = window.pbs.data.view()[0];
            // alert(currentPBSItem.Name);
            // // Filter the DataSource bt ISBN to get the selected record
            // window.Books.data.filter({
            //     field: "isbn",
            //     operator: "eq",
            //     value: isbn
            // });
            // currentBook = window.Books.data.view()[0];
            // // Create a model for the page and bind it to the view
            // var book = {
            //     title: currentBook.name + " by " + currentBook.author,
            //     image_url: currentBook.image_url,
            //     amazon_url: currentBook.amazon_url,
            //     is_favorite: currentBook.is_favorite
            // };
            // kendo.bind($('#bookContent'), book, kendo.mobile.ui);
            // // If the current book is a favorited item, toggle the switch on the view
            // if (currentBook.is_favorite) {
            //     $('#favorite').data('kendoMobileSwitch').toggle();
            // }
        },
        hide: function () {
            // When the user navigates away from the page, remove the filter
            //window.Books.data.filter([]);
        },
        openLink: function () {
            // Will use the Cordova InAppBrowser plugin when deployed to a device. Opens a new window in
            // the simulator
            //window.open(currentBook.amazon_url, '_blank', 'location=yes');
        }
    };
}());