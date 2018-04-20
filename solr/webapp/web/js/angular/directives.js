/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('loginDirectives', []).
directive('loginDialog', function($timeout) {
   return {
       templateUrl: '/templates/loginDialog.html',
       restrict: 'E',
       replace: true,
       controller: CredentialsController,
       link: function(scope, element, attributes, controller) {
           var isShowing = false;
           
           element.on('shown.bs.modal', function(e) {
               element.find('#userName').focus();
           });

           scope.$on('event:auth-loginRequired', function() {
               if (isShowing) {
                   return;
               }
               
               // If we're in the process of hiding the modal, we need to wait for
               // all CSS animations to complete before showing the modal again.
               // Otherwise, we might end up with an invisible modal, making the whole
               // view rather unusable. I've been unable to control the transitions
               // between "showing", "shown", "hiding", and "hidden" tightly using
               // JQuery notifications without collecting more and more modal backdrops
               // in the DOM, so the dirty solution here is to simply wait a second
               // before showing the log-in dialog.
               isShowing = true;
               $timeout(function() {
                   element.modal('show');
                   isShowing = false;
               }, 1000);
           });

           scope.$on('event:auth-loginConfirmed', function() {
               element.modal('hide');
               scope.credentials.password = '';
           });
       }
   } 
}).
directive('logoutLink', function() {
   return {
       templateUrl: '/templates/logoutLink.html',
       restrict: 'E',
       replace: true,
       controller: LoginController
   } 
});