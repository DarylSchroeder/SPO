
//build a query & 
function QueryCountByProperty(strDataTable, strProperty, strStatus, callback) {
    var filter = new Everlive.Query();
    filter.where().eq(strProperty, strStatus);
    var data = Everlive.$.data(strDataTable);
    data.get(filter)
        .then(function (res) {
            callback(res.count);
        });
}
