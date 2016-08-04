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

function wlCommonInit() {
	angular.bootstrap(document, ['mobilebank']);
}

var app = angular.module('mobilebank', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'app/pages/login.html'
	}).when('/home', {
		templateUrl: 'app/pages/dashboard.html'
	}).when('/accounts', {
		templateUrl: 'app/pages/accounts.html'
	}).when('/appointments', {
		templateUrl: 'app/pages/appointments.html'
	}).when('/check-deposit', {
		templateUrl: 'app/pages/check-deposit.html'
	}).when('/find-atm', {
		templateUrl: 'app/pages/find-atm.html'
	}).when('/transactions/:account?', {
		templateUrl: 'app/pages/transactions.html'
	}).when('/transfer/:account?', {
		templateUrl: 'app/pages/transfer.html'
	}).when('/view-appointment', {
		templateUrl: 'app/pages/view-appointment.html'
	}).when('/logout', {
		template: '',
		controller: 'LogoutCtrl'
	}).otherwise({redirectTo: '/login'});
});

app.run(function ($rootScope, $location, Analytics) {

	$rootScope.$on('login-challenge', function (e) {
		$location.path('/login');
		$rootScope.$apply();
	});

	$rootScope.$on("$locationChangeSuccess", function (e, newUrl, oldUrl) {

		var path = function (path) {
			var parts = path.split('#');

			var uri = parts.length > 1 ? parts[1] : path;

			var parser = document.createElement('a');
			parser.href = uri;

			return parser.pathname;
		};


		var next = path(newUrl);
		var prev = path(oldUrl);

		Analytics.pageVisit(next);
		Analytics.pageNavigation(prev, next);

		$rootScope.toggleMenu(true);

		if ($rootScope.isHome($location.path())) {
			$rootScope.hideNavigation();
		} else if ($location.path() === '/logout') {
			alert('logout');
			Analytics.logout(prev);
		} else {
			$rootScope.showNavigation();
		}
	});

	$rootScope.navigation = false;
	$rootScope.activeElement = null;

	$rootScope.isHome = function (uri) {
		return uri === '/home';
	};

	$rootScope.back = function () {
		history.back();
	};


	$rootScope.showNavigation = function () {
		$rootScope.navigation = true;
	};

	$rootScope.hideNavigation = function () {
		$rootScope.navigation = false;
	};

	$rootScope.toggleMenu = function (hide) {
		var drawer = angular.element('#drawer');

		if (drawer.hasClass('open') || hide) {
			drawer.removeClass('open');
		} else {
			drawer.addClass('open');
		}
	};

	$rootScope.setTitle = function (title) {
		$rootScope.title = title;
	};

	$rootScope.toggle = function (id) {
		if ($rootScope.activeElement === id) {
			$rootScope.activeElement = null;
		} else {
			$rootScope.activeElement = id;
		}
	};
});