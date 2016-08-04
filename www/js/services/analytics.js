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
app.factory('Analytics', function () {

	//Count number of pages visited in a session
	var pageVisitCount = 0,
		appStartTime;


	return {
		login: function () {
			//Start time for when user starts a new session
			appStartTime = new Date();
		},
		logUserReturning: function (id) {
			//Logs returning users of the application
			WL.Analytics.log({userReturning: id}, 'UserReturning');
		},
		logUserNew: function (id) {
			//Logs new users of the application
			WL.Analytics.log({userNew: id}, 'UserNew');
		},
		logout: function (page) {
			//Logs sent to analytics

			var sessionTime = ((new Date()).getTime() - appStartTime) / 1000 / 60;

			//Log how long a user spent in a session
			WL.Analytics.log({sessionTime: parseFloat(sessionTime.toFixed(2))}, 'SessionTime');

			//Log how many pages visited in a session
			WL.Analytics.log({numberOfPages: pageVisitCount}, 'NumberOfPages');

			//Log what page the user existed the session on
			WL.Analytics.log({closedOnPage: page}, 'ClosedOnPage');

			setTimeout(function () {
				//Send logs to analytics console
				WL.Analytics.send();
			}, 300);
		},
		pageVisit: function (page) {
			//Log the page name the user visits
			WL.Analytics.log({pageVisit: page}, 'PageVisit');
		},
		pageNavigation: function (sourcePage, destinationPage) {
			//Log how many pages user goes through in a session
			WL.Analytics.log({fromPage: sourcePage, toPage: destinationPage}, 'PageTransition');
			pageVisitCount++;
		},
		checkDepositStep: function (step) {
			//Logs where a user is at in the check deposit process. This way analytics
			// can show how far users generally make it when depositing a check.
			WL.Analytics.log({checkDeposit: step}, 'CheckDeposit');
		},
		findATMLocation: function (locationName) {
			//Logs which ATM the user is interested in
			WL.Analytics.log({findATMLocation: locationName}, 'FindATMLocation');
		}
	};
});



