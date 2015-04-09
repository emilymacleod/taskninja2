'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',    
    'ngResource',
    'ngRoute',    
    'firebase'
  ])
  .constant('FURL', 'https://testing-app123.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'TaskController'     
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'TaskController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/edit/:taskId', {
        templateUrl: 'views/edit.html',
        controller: 'TaskController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
