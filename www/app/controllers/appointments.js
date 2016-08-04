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
app.controller('AppointmentsCtrl', function ($scope, $rootScope, Auth, AccountManager) {
	$rootScope.setTitle('Appointments');

	var user = Auth.getActiveUser();

	$scope.firstname = user.attributes.firstname;

	$scope.locations = [];

	AccountManager.getAppointmentLocations().then(function (locations) {
		$scope.locations = locations;
		$scope.$apply();
	});

	$scope.schedule = function () {
		AccountManager.scheduleAppointment($scope.date, $scope.time, $scope.location).then(function (response) {
			alert(response.message);
			$rootScope.back();
		}, function (error) {
			alert(error.message);
		});
	};
});