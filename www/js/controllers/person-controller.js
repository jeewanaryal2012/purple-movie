/**
 * Created by jeewanaryal on 7/24/16.
 */

starterController.controller("PersonController", ["$scope", "$http",
    function($scope, $http) {
    theMovieDb.search.getPerson(
        {"query":"leonardo"},
        function(d) {
            //console.log(d);
        },
        function(err) {

        }
    );

    theMovieDb.people.getById({"id":287}, function(d) {
        //console.log(d);
    }, function(err) {});

    $scope.getToken = function() {
        $http({
            method : "GET",
            url : "http://api.themoviedb.org/3/authentication/token/new?api_key=a4061510f8a63f683dbb2e4cbfa54d8e"
        }).then(function mySucces(res) {
            //console.log(res.data);
            var url = "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a4061510f8a63f683dbb2e4cbfa54d8e&request_token="+res.data.request_token+"&username=xxx&password=xxx";

            $http.get(url).then(function(d){
                console.log(d.data.request_token);
                $http.get("http://api.themoviedb.org/3/authentication/session/new?api_key=a4061510f8a63f683dbb2e4cbfa54d8e&request_token="+d.data.request_token).then(function(d) {
                    console.log(d);
                }, function() {});


            }, function(err) {
                console.log(err);
            });

        }, function myError(err) {
            console.log(err.statusText);
        });
    };

}]);