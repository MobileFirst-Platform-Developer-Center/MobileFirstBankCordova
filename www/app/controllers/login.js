/*
 *  © Copyright 2016 IBM Corp.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
app.controller('LoginCtrl', function ($scope, $rootScope, $location, Auth, Util, Analytics) {
	navigator.splashscreen.hide();

	$rootScope.hideNavigation();

	var authInProgress = false;

	$scope.login = function () {
		if (!authInProgress) {
			Auth.login($scope, $scope.username.toLowerCase(), $scope.password.toLowerCase());
			authInProgress = true;
		}
	};


	$scope.$on('login-success', function () {
		Analytics.login();

		Util.isNewToDevice($scope.username).then(function (user) {
			Analytics.logUserNew(user.id);
		}, function (user) {
			Analytics.logUserReturning(user.id);
		});

		$location.path('/home');

		$scope.$apply();
	});

	$scope.$on('login-error', function (event, error) {
		alert(error.message);

		authInProgress = false;
	});
});