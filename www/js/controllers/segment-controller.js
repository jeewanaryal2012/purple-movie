/**
 * Created by jeewanaryal on 7/22/16.
 */

starterController.controller("segment-controller", [
  "$rootScope", "$scope", "DashboardService", "$ionicListDelegate", "$ionicPopup", "$stateParams",
  function($rootScope, $scope, DashboardService, $ionicListDelegate, $ionicPopup, $stateParams) {
    $scope.fpPopular = false;
    $scope.fpTopRated = false;
    $scope.fpUpcoming = false;
    $scope.fpNowPlaying = false;

    $scope.loading = true;
    //render($scope.pageNum);
    $scope.arr = [];
    $scope.pageNum = 1;
    var cnt = 0;

    $scope.popularArr = [];
    $scope.topRatedArr = [];
    $scope.upcomingArr = [];
    $scope.nowPlayingArr = [];
    $scope.popularPageNum = 1;
    $scope.topRatedPageNum = 1
    $scope.upcomingPageNum = 1
    $scope.nowPlayingPageNum = 1

    $scope.selectedIndex = 0;
    $scope.buttonClicked = function(index){
      $scope.selectedIndex = index;
      $scope.$apply();
    }

    /* 1. GET POPULAR */
    $scope.popularLoading = true;
    theMovieDb.movies.getPopular({},
      function(d) {
        d = JSON.parse(d);
        //console.log("D: " + JSON.parse(d));
        $scope.$apply(function () {
          $scope.popularRes = d;
          $scope.popularArr = d.results;
          $scope.popularMoreData = false;
          $scope.popularLoading = false;
          $scope.popularTotalPage = d.total_pages;
        });
      },
      function(err) {
        console.log("ERR : " + err);
      });

    $scope.popularPrev = function() {
      $scope.popularLoading = true;
      $scope.popularPageNum = $scope.popularPageNum > 1 ? $scope.popularPageNum : 2;
      theMovieDb.movies.getPopular(
        {
          page: $scope.popularPageNum-1
        },
        function(d) {
          d = JSON.parse(d);
          //console.log("D: " + JSON.parse(d));
          $scope.$apply(function () {
            $scope.popularRes = d;
            $scope.popularArr = d.results;
            $scope.popularMoreData = false;
            $scope.popularPageNum = $scope.popularRes.page;
            $scope.popularLoading = false;
          });
        },
        function(err) {});
      if($scope.popularPageNum-1 <= 1) {
        $scope.fpPopular = false;
      } else {
        $scope.fpPopular = true;
      }
  };

  $scope.popularNext = function() {
    $scope.popularLoading = true;
    $scope.popularPageNum = $scope.popularPageNum > $scope.popularTotalPage ? $scope.popularTotalPage : $scope.popularPageNum;
    theMovieDb.movies.getPopular(
      {
        page: $scope.popularPageNum+1
      },
      function(d) {
        d = JSON.parse(d);
        //console.log("D: " + JSON.parse(d));
        $scope.$apply(function () {
          $scope.popularRes = d;
          $scope.popularArr = d.results;
          $scope.popularMoreData = false;
          $scope.popularPageNum = $scope.popularRes.page;
          $scope.popularLoading = false;
        });
      },
      function(err) {});

    if($scope.popularPageNum+1 > 1) {
      $scope.fpPopular = true;
    } else {
      $scope.fpPopular = false;
    }
  };

  $scope.firstPagePopular = function() {
    $scope.popularLoading = true;
    theMovieDb.movies.getPopular(
        {
          page: 1
        },
        function(d) {
          d = JSON.parse(d);
          //console.log("D: " + JSON.parse(d));
          $scope.$apply(function () {
            $scope.popularRes = d;
            $scope.popularArr = d.results;
            $scope.popularMoreData = false;
            $scope.popularPageNum = $scope.popularRes.page;
            $scope.popularLoading = false;
          });
        },
        function(err) {});

    $scope.fpPopular = false;
  };
  /* GET POPULAR */

  /* 2. GET TOP-RATED */
  $scope.topRatedLoading = true;
  theMovieDb.movies.getTopRated({},
    function(d) {
      d = JSON.parse(d);
      //console.log("D: " + JSON.parse(d));
      $scope.$apply(function () {
        $scope.topRatedRes = d;
        $scope.topRatedArr = d.results;
        $scope.topRatedMoreData = false;
        $scope.topRatedTotalPage = d.total_pages;
        $scope.topRatedLoading = false;
      });
      //console.log("POP: " + angular.toJson(d));
    },
    function(err) {
      console.log("ERR : " + err);
    });

    $scope.topRatedPrev = function() {
      $scope.topRatedLoading = true;
      $scope.topRatedPageNum = $scope.topRatedPageNum > 1 ? $scope.topRatedPageNum : 2;
      theMovieDb.movies.getTopRated(
        {
          page: $scope.topRatedPageNum-1
        },
        function(d) {
          d = JSON.parse(d);
          //console.log("D: " + JSON.parse(d));
          $scope.$apply(function () {
            $scope.topRatedRes = d;
            $scope.topRatedArr = d.results;
            $scope.topRatedMoreData = false;
            $scope.topRatedPageNum = $scope.topRatedRes.page;
            $scope.topRatedLoading = false;
          });
        },
        function(err) {});
      if($scope.topRatedPageNum-1 <= 1) {
        $scope.fpTopRated = false;
      } else {
        $scope.fpTopRated = true;
      }
    };

    $scope.topRatedNext = function() {
      $scope.topRatedLoading = true;
      $scope.topRatedPageNum = $scope.topRatedPageNum > $scope.topRatedTotalPage ? $scope.topRatedTotalPage : $scope.topRatedPageNum;
      theMovieDb.movies.getTopRated(
        {
          page: $scope.topRatedPageNum+1
        },
        function(d) {
          d = JSON.parse(d);
          //console.log("D: " + JSON.parse(d));
          $scope.$apply(function () {
            $scope.topRatedRes = d;
            $scope.topRatedArr = d.results;
            $scope.topRatedMoreData = false;
            $scope.topRatedPageNum = $scope.topRatedRes.page;
            $scope.topRatedLoading = false;
          });
        },
        function(err) {});
      if($scope.topRatedPageNum+1 > 1) {
        $scope.fpTopRated = true;
      } else {
        $scope.fpTopRated = false;
      }
    };

    $scope.firstPageTopRated = function() {
      $scope.topRatedLoading = true;
      theMovieDb.movies.getTopRated(
          {
            page: 1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.topRatedRes = d;
              $scope.topRatedArr = d.results;
              $scope.topRatedMoreData = false;
              $scope.topRatedPageNum = $scope.topRatedRes.page;
              $scope.topRatedLoading = false;
            });
          },
          function(err) {});

      $scope.fpTopRated = false;
    };

  /* GET TOP-RATED */



    /* 3. GET UPCOMING */
    $scope.upcomingLoading = true;
    theMovieDb.movies.getUpcoming({},
        function(d) {
          d = JSON.parse(d);
          //console.log("D: " + JSON.parse(d));
          $scope.$apply(function () {
            $scope.upcomingRes = d;
            $scope.upcomingArr = d.results;
            $scope.upcomingMoreData = false;
            $scope.upcomingTotalPage = d.total_pages;
            $scope.upcomingLoading = false;
          });
          //console.log("POP: " + angular.toJson(d));
        },
        function(err) {
          console.log("ERR : " + err);
        });

    $scope.upcomingPrev = function() {
      $scope.upcomingLoading = true;
      $scope.upcomingPageNum = $scope.upcomingPageNum > 1 ? $scope.upcomingPageNum : 2;
      theMovieDb.movies.getUpcoming(
          {
            page: $scope.upcomingPageNum-1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.upcomingRes = d;
              $scope.upcomingArr = d.results;
              $scope.upcomingMoreData = false;
              $scope.upcomingPageNum = $scope.upcomingRes.page;
              $scope.upcomingLoading = false;
            });
          },
          function(err) {});
      if($scope.upcomingPageNum-1 <= 1) {
        $scope.fpUpcoming = false;
      } else {
        $scope.fpUpcoming = true;
      }
    };

    $scope.upcomingNext = function() {
      $scope.upcomingLoading = true;
      $scope.upcomingPageNum = $scope.upcomingPageNum > $scope.upcomingTotalPage ? $scope.upcomingTotalPage : $scope.upcomingPageNum;
      theMovieDb.movies.getUpcoming(
          {
            page: $scope.upcomingPageNum+1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.upcomingRes = d;
              $scope.upcomingArr = d.results;
              $scope.upcomingMoreData = false;
              $scope.upcomingPageNum = $scope.upcomingRes.page;
              $scope.upcomingLoading = false;
            });
          },
          function(err) {});
      if($scope.upcomingPageNum+1 > 1) {
        $scope.fpUpcoming = true;
      } else {
        $scope.fpUpcoming = false;
      }
    };

    $scope.firstPageUpcoming = function() {
      $scope.upcomingLoading = true;
      theMovieDb.movies.getUpcoming(
          {
            page: 1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.upcomingRes = d;
              $scope.upcomingArr = d.results;
              $scope.upcomingMoreData = false;
              $scope.upcomingPageNum = $scope.upcomingRes.page;
              $scope.upcomingLoading = false;
            });
          },
          function(err) {});

      $scope.fpUpcoming = false;
    };
    /* GET UPCOMING */



    /* 4. NOW PLAYING */
    $scope.nowPlayingLoading = true;
    theMovieDb.movies.getNowPlaying({},
        function(d) {
          d = JSON.parse(d);
          //console.log("D: " + JSON.parse(d));
          $scope.$apply(function () {
            $scope.nowPlayingRes = d;
            $scope.nowPlayingArr = d.results;
            $scope.nowPlayingMoreData = false;
            $scope.nowPlayingTotalPage = d.total_pages;
            $scope.nowPlayingLoading = false;
          });
          //console.log("POP: " + angular.toJson(d));
        },
        function(err) {
          console.log("ERR : " + err);
        });

    $scope.nowPlayingPrev = function() {
      $scope.nowPlayingLoading = true;
      $scope.nowPlayingPageNum = $scope.nowPlayingPageNum > 1 ? $scope.nowPlayingPageNum : 2;
      theMovieDb.movies.getNowPlaying(
          {
            page: $scope.nowPlayingPageNum-1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.nowPlayingRes = d;
              $scope.nowPlayingArr = d.results;
              $scope.nowPlayingMoreData = false;
              $scope.nowPlayingPageNum = $scope.nowPlayingRes.page;
              $scope.nowPlayingLoading = false;
            });
          },
          function(err) {});
      if($scope.nowPlayingPageNum-1 <= 1) {
        $scope.fpNowPlaying = false;
      } else {
        $scope.fpNowPlaying = true;
      }
    };

    $scope.nowPlayingNext = function() {
      $scope.nowPlayingLoading = true;
      $scope.nowPlayingPageNum = $scope.nowPlayingPageNum > $scope.nowPlayingTotalPage ? $scope.nowPlayingTotalPage : $scope.nowPlayingPageNum;
      theMovieDb.movies.getNowPlaying(
          {
            page: $scope.nowPlayingPageNum+1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.nowPlayingRes = d;
              $scope.nowPlayingArr = d.results;
              $scope.nowPlayingMoreData = false;
              $scope.nowPlayingPageNum = $scope.nowPlayingRes.page;
              $scope.nowPlayingLoading = false;
            });
          },
          function(err) {});
      if($scope.nowPlayingPageNum+1 > 1) {
        $scope.fpNowPlaying = true;
      } else {
        $scope.fpNowPlaying = false;
      }
    };

    $scope.firstPageNowPlaying = function() {
      $scope.nowPlayingLoading = true;
      theMovieDb.movies.getNowPlaying(
          {
            page: 1
          },
          function(d) {
            d = JSON.parse(d);
            //console.log("D: " + JSON.parse(d));
            $scope.$apply(function () {
              $scope.nowPlayingRes = d;
              $scope.nowPlayingArr = d.results;
              $scope.nowPlayingMoreData = false;
              $scope.nowPlayingPageNum = $scope.nowPlayingRes.page;
              $scope.nowPlayingLoading = false;
            });
          },
          function(err) {});

      $scope.fpNowPlaying = false;
    };

    /* NOW PLAYING */

}]);
