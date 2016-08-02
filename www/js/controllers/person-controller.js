/**
 * Created by jeewanaryal on 7/24/16.
 */

starterController.controller("PersonController", [function() {
    theMovieDb.search.getPerson(
        {"query":"leonardo"},
        function(d) {
            console.log(d);
        },
        function(err) {

        }
    );

    theMovieDb.people.getById({"id":287}, function(d) {
        //console.log(d);
    }, function(err) {})
}]);