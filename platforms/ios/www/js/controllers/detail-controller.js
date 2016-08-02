/**
 * Created by jeewanaryal on 7/22/16.
 */

starterController.controller("detail-controller", [
  "$scope", "$stateParams", "DashboardService", "$localStorage", "$ionicPopup", "$http",
  function($scope, $stateParams, DashboardService, $localStorage, $ionicPopup, $http) {


    console.log($stateParams.movieId);


    theMovieDb.movies.getById(
      {
        "id": $stateParams.movieId
      },
      function(d){
        d = JSON.parse(d);
        //console.log("D: " + angular.toJson(d));
        $scope.$apply(function () {
          $scope.movieDetail = d;
        });
      },
      function(err) {});


    $scope.addToFavorite = function(movieDetail) {
      var tmpArr = [];
      for (var key in $localStorage.favoriteList) {
        var obj = $localStorage.favoriteList[key];
        tmpArr.push(obj.id);
      }
      if(tmpArr.indexOf(movieDetail.id) > -1) {
        showAlert("Already Added", movieDetail.title + " is already added in your favorite list.");
      } else {
        showAlert("Added to Your Favorite List", movieDetail.title + " is now added in your favorite list.");
        $localStorage.favoriteList.push(movieDetail);
      }
    };
    $scope.clearFavorite = function() {
      $localStorage.$reset();
      $localStorage.idList = [];
    };

    $scope.showFavorite = function(md) {
      var alertPopup = $ionicPopup.alert({
        title: "Already Added",
        template: $localStorage.idList
      });

    };

    function showAlert(heading, bodyText) {
      var alertPopup = $ionicPopup.alert({
        title: "<div class='heading'>"+heading+"</div>",
        template: "<div class='body-text'>"+bodyText+"</div>"
      });
    }

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
