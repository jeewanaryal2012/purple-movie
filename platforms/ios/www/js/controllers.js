
var starterController = angular.module('starter.controllers', []);

starterController.controller("DashCtrl", function($rootScope, $scope, DashboardService, $ionicPopup, $stateParams) {

  $scope.ratingValues = [0,1,2,3,4,5,6,7,8,9];

  render($scope.pageNum);
  $scope.nextPage = function(s) {
    $scope.loading = true;
    if(s === "p") {
      if($scope.pageNum > 1) {
        $scope.pageNum = $scope.pageNum - 1;
        render($scope.pageNum);
      } else {
        alert("No Previous");
        $scope.pageNum = 1;
        $scope.loading = false;
      }
    }
    if(s === "n") {
      if($scope.pageNum <= $scope.res.total_pages - 1) {
        $scope.pageNum = $scope.pageNum + 1;
        render($scope.pageNum);
      } else {
        alert("No More Results");
        $scope.pageNum = $scope.res.total_pages;
        $scope.loading = false;
      }
    }
  };
  function render(pageNum) {
    theMovieDb.search.getMovie({"query": $stateParams.searchName+"&page="+pageNum},
      function(d) {
        d = JSON.parse(d);
        $scope.$apply(function () {
          $scope.res = d;
          $scope.arr = d.results;
          $scope.moreData = false;
          $scope.loading = false;
        });
      },
      function(err) {
      });
  }

  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500
  };
})


.controller('SearchFormController', function($scope, $stateParams) {
    // http://putlocker.is/watch-titanic-online-free-putlocker.html
    var pre = "http://putlocker.is/watch-";
    var pos = "-online-free-putlocker.html";

    $scope.openInAppBrowser = function(s, url) {
      alert(s);
      cordova.ThemeableBrowser.open(pre+s+pos, '_blank', {
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
        alert('back pressed');
      }).addEventListener('helloPressed', function(e) {
        alert('hello pressed');
      }).addEventListener('sharePressed', function(e) {
        alert(e.url);
      }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
      });
    };
  })

.controller("MovieDetailController", function($rootScope, $scope, DashboardService, $stateParams, $localStorage, $ionicPopup) {

  /*
  DashboardService.getDetailMovies($stateParams.movieId).then(function(d) {
    console.log(d.data.Title);
    $scope.movieDetail = d.data;
  });
  */

    /* InAppBrowser */
    var pre = "http://putlocker.is/watch-";
    var pos = "-online-free-putlocker.html";

    $scope.watchOnlineXYZ = function(s) {
      alert(s);
      cordova.ThemeableBrowser.open("http://putlocker.is/watch-philadelphia-online-free-putlocker.html", '_blank', {
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
        alert('back pressed');
      }).addEventListener('helloPressed', function(e) {
        alert('hello pressed');
      }).addEventListener('sharePressed', function(e) {
        alert(e.url);
      }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
      });
    };
    /* InAppBrowser */

  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
