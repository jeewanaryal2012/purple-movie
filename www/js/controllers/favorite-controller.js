/**
 * Created by jeewanaryal on 7/24/16.
 */

starterController.controller("FavoriteCtrl", [
  "$rootScope", "$scope", "DashboardService", "$ionicPopup", "$stateParams", "$localStorage", "$timeout",
  function($rootScope, $scope, DashboardService, $ionicPopup, $stateParams, $localStorage, $timeout) {

    //console.log(angular.toJson($localStorage.favoriteList));
    $scope.favorites = $localStorage.favoriteList;
    if($scope.favorites.length > 0) {
      $scope.hasFavorites = true;
    } else {
      $scope.hasFavorites = false;
    }

    $scope.removeFavorite = function(m) {
      var filteredArr = $localStorage.favoriteList.filter(function( obj ) {
        return obj.id !== m.id;
      });
      console.log("RMV " + angular.toJson(filteredArr));
      $localStorage.favoriteList = filteredArr;
      $scope.favorites = $localStorage.favoriteList;
      if($scope.favorites.length > 0) {
        $scope.hasFavorites = true;
      } else {
        $scope.hasFavorites = false;
      }
    };

    $scope.clearFavorites = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: "<div class='heading'>Clear All Favorites?</div>",
        buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
          text: "Cancel",
          type: 'button-default',
          onTap: function(e) {

          }
        }, {
          text: "Clear All",
          type: 'button-assertive',
          onTap: function(e) {
            $localStorage.$reset();
            $localStorage.favoriteList = [];
            $scope.favorites = $localStorage.favoriteList;
            $scope.hasFavorites = true;
          }
        }],
        template: "<div class='body-text'>Are you sure you want to clear all your favorite movies from the list?</div>"
      });

      /*
      confirmPopup.then(function(res) {
        if(res) {
          $localStorage.$reset();
          $localStorage.favoriteList = [];
          $scope.favorites = $localStorage.favoriteList;
          $scope.hasFavorites = true;
        } else {

        }
      });
      */

    };



  }
]);
