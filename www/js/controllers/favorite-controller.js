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


starterController.controller("favorite-controller", ["$scope", "$stateParams", "$localStorage", "$http",
  function($scope, $stateParams, $localStorage, $http) {
    angular.forEach($localStorage.favoriteList, function(k, v) {
      if(parseInt($stateParams.favoriteId) === parseInt(k.id)) {
        console.log(k.title);
        $scope.movieDetail = k;
      }
    });

    $scope.watchOnline = function(m) {
      //console.log(m.original_title.replace(/\s+/g, '-').toLowerCase());
      console.log(m.original_title.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase());
      var movieToWatch = m.original_title.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase();
      var pre = "http://putlocker.is/watch-";
      var pos = "-online-free-putlocker.html";
      var movieURL = pre+movieToWatch+pos;
      $http.get("http://jeewanaryal.com/purple-movie/log.json")
          .then(function(response) {
            //alert(response.data.val);
            if(response.data.val === false) {
              watchMovieNow("http://jeewanaryal.com/purple-movie/coming-soon.php");
            } else if(response.data.val === true){
              watchMovieNow(movieURL);
            }
          });
    };

}]);


/* InAppBrowser */
function watchMovieNow(s) {
  cordova.ThemeableBrowser.open(s, "_blank", {
    statusbar: {
      color: '#ffffffff'
    },
    toolbar: {
      height: 44,
      color: '#f0f0f0ff'
    },
    title: {
      color: '#003264ff',
      showPageTitle: true
    },
    backButton: {
      image: 'back',
      imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
    },
    forwardButton: {
      image: 'forward',
      imagePressed: 'forward_pressed',
      align: 'left',
      event: 'forwardPressed'
    },
    closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    customButtons: [
      {
        image: 'share',
        imagePressed: 'share_pressed',
        align: 'right',
        event: 'sharePressed'
      }
    ],
    menu: {
      image: 'menu',
      imagePressed: 'menu_pressed',
      title: 'Test',
      cancel: 'Cancel',
      align: 'right',
      items: [
        {
          event: 'helloPressed',
          label: 'Hello World!'
        },
        {
          event: 'testPressed',
          label: 'Test!'
        }
      ]
    },
    backButtonCanClose: true
  }).addEventListener('backPressed', function(e) {
    //alert('back pressed');
  }).addEventListener('helloPressed', function(e) {
    //alert('hello pressed');
  }).addEventListener('sharePressed', function(e) {
    alert(e.url);
  }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
    console.error(e.message);
  }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
    console.log(e.message);
  });
}
/* InAppBrowser */