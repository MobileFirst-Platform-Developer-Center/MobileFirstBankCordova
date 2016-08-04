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
app.controller('CheckDepositCtrl', function ($scope, $rootScope, AccountManager, Analytics) {
	$rootScope.setTitle('Check Deposit');

	$rootScope.snapFront = true;
	$rootScope.snapBack = false;
	$rootScope.confirmDeposit = false;

	$scope.takePicture = function (id) {
		//noinspection JSUnresolvedVariable
		var isEmulator = device.model.indexOf("x86") > -1;

		var cameraOptions = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 300,
			targetHeight: 170,
			sourceType: isEmulator ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA
		};

		if (id === 0) {
			Analytics.checkDepositStep('Step 1: Deposit Started');

			navigator.camera.getPicture(successImageFront, cameraError, cameraOptions);
		} else if (id === 1) {
			navigator.camera.getPicture(successImageBack, cameraError, cameraOptions);
		}
	};

	$scope.deposit = function () {
		Analytics.checkDepositStep('Step 4: Confirm');

		AccountManager.depositCheck($scope.imgFront, $scope.imgBack).then(function (response) {
			alert(response.message);
			$rootScope.back();
		}, function (error) {
			alert(error.message);
		});
	};

	function successImageFront(imgData) {
		Analytics.checkDepositStep('Step 2: Front side photo');

		$scope.imgFront = 'data:image/jpeg;base64,' + imgData;

		if ($scope.snapFront) {
			$scope.snapFront = false;
			$scope.snapBack = true;
		}

		$scope.$apply();
	}

	function successImageBack(imgData) {
		Analytics.checkDepositStep('Step 3: Back side photo');

		$scope.imgBack = 'data:image/jpeg;base64,' + imgData;
		$scope.snapBack = false;
		$scope.confirmDeposit = true;

		$scope.$apply();
	}

	function cameraError() {
		alert('Error taking the picture.');
	}
});