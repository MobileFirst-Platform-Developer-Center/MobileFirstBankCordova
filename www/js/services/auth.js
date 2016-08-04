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
app.factory('Auth', function ($rootScope) {

	var securityCheckName = 'MobileFirstBankUserLogin',
		authInProgress = false,
		_$scope = null,
		challengeHandler = null,
		activeUser = null;

	challengeHandler = WL.Client.createSecurityCheckChallengeHandler(securityCheckName);
	challengeHandler.securityCheckName = securityCheckName;

	challengeHandler.handleChallenge = function (challenge) {
		authInProgress = true;

		if (challenge.errorMsg !== null && _$scope) {
			_$scope.$emit('login-error', {
				message: challenge.errorMsg
			});
		} else {
			// redirect to login page
			$rootScope.$emit('login-challenge');
		}


	};

	challengeHandler.handleSuccess = function (data) {
		authInProgress = false;

		activeUser = data.user;

		if(_$scope) {
			_$scope.$emit('login-success', {
				data: data
			});
		}
	};

	challengeHandler.handleFailure = function (error) {
		authInProgress = false;

		var message = error.failure !== null ? error.failure : 'Failed to login.';

		if(_$scope) {
			_$scope.$emit('login-error', {
				message: message
			});
		}
	};


	return {
		logout: function () {
			return WLAuthorizationManager.logout(securityCheckName);
		},
		getActiveUser: function () {
			return activeUser ? activeUser : false;
		},
		login: function ($scope, username, password) {
			_$scope = $scope;

			if (!username || !password) {
				$scope.$emit('login-error', {
					message: 'Username and Password are required.'
				});
			} else if (authInProgress) {
				challengeHandler.submitChallengeAnswer({'username': username, 'password': password});
			} else {
				WLAuthorizationManager.login(securityCheckName, {'username': username, 'password': password});
			}
		}
	};
});
