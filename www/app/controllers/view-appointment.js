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
app.controller('ViewAppointmentCtrl', function ($scope, $rootScope, Auth, AccountManager, Util) {
	$rootScope.setTitle('Appointment Details');

	$scope.firstname = Auth.getActiveUser().attributes.firstname;

	AccountManager.getAppointmentDetails(1234).then(function (appointment) {
		var timestamp = appointment.timestamp;
		$scope.date = Util.date(timestamp);
		$scope.time = Util.time(timestamp);
		$scope.location = appointment.location;

		$scope.$apply();
	});
});