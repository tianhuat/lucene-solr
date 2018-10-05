/*
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

solrAdminApp.controller('LoginController',
    ['$scope', '$routeParams', '$rootScope', '$location', 'AuthenticationService',
      function ($scope, $routeParams, $rootScope, $location, AuthenticationService) {
        var authType = sessionStorage.getItem("auth.type");
        var basicTypes = ['Basic', 'xBasic'];
        if (authType !== null && basicTypes.includes(authType)) {
          if (authType === 'xBasic') authType = 'Basic';
          $scope.authType = authType;
        } else {
          $scope.authType = 'unknown';
        }      
        
        $scope.wwwAuthHeader = sessionStorage.getItem("auth.wwwAuthHeader");
        $scope.authConfig = sessionStorage.getItem("auth.config");
        $scope.authLocation = sessionStorage.getItem("auth.location");
        $scope.authLoggedinUser = sessionStorage.getItem("auth.username");
        $scope.authHeader = sessionStorage.getItem("auth.header");
        
        $scope.login = function () {
          AuthenticationService.SetCredentials($scope.username, $scope.password);
          console.log("Redirecting back to " + $scope.authLocation);
          $location.path($scope.authLocation); // Redirect to the location that caused the login prompt
          
          // TODO: "login" by hitting the failing URL again
          // AuthenticationService.Login($scope.username, $scope.password, function (response) {
          //   if (response.success) {
          //     AuthenticationService.SetCredentials($scope.username, $scope.password);
          //     $location.path('/');
          //   } else {
          //     $scope.error = response.message;
          //     $scope.dataLoading = false;
          //   }
          // });
        };
        
        $scope.logout = function() {
          // reset login status
          AuthenticationService.ClearCredentials();
          console.log("Logged out user and cleared creds");
          $location.path("/");
        };
        
        $scope.isLoggedIn = function() {
          return (sessionStorage.getItem("auth.username") !== null);
        };
      }]);