// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', "ngStorage", 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $localStorage, $rootScope, $state, $ionicScrollDelegate) {
    $rootScope.$state = $state;
    if($localStorage.favoriteList === undefined) {
      $localStorage.favoriteList = [];
    }
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    window.addEventListener("statusTap", function() {
      $ionicScrollDelegate.scrollTop(true);
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

    .state('tab.search-form', {
      url: '/dash/search-form',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-search-form.html',
          controller: 'DashCtrl'
        }
      }
    })

  .state('tab.dash', {
    url: '/dash/:searchName',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.movie-detail', {
    url: '/dash/detail/:movieId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/movie-detail.html',
        controller: 'MovieDetailController'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/search.html',
        controller: 'SearchController'
      }
    }
  })
  .state('tab.search-detail', {
    url: '/search/detail/:searchId',
    views: {
      'tab-search': {
        templateUrl: 'templates/search-details.html',
        controller: 'SearchController'
      }
    }
  })

  .state('tab.person', {
    url: '/person',
    views: {
      'tab-person': {
        templateUrl: 'templates/person.html',
        controller: 'PersonController'
      }
    }
  })

  .state('tab.favorite', {
      url: '/favorite',
      views: {
        'tab-favorite': {
          templateUrl: 'templates/tab-favorite.html',
          controller: 'FavoriteCtrl'
        }
      }
    })
    .state('tab.favorite-detail', {
      url: '/favorite/detail/:favoriteId',
      views: {
        'tab-favorite': {
          templateUrl: 'templates/favorite-detail.html',
          controller: 'FavoriteCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash/search-form');

});
