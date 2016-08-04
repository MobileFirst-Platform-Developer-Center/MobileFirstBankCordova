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
app.factory('AccountManager', function ($q, Util) {
	return {
		scheduleAppointment: function (date, time, location) {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/appointments', WLResourceRequest.PUT);

			return req.sendFormParameters({
				date: date,
				time: time,
				location: location
			}).then(function (response) {
				return response.responseJSON;
			});
		},
		getAppointmentDetails: function (id) {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/appointments/' + id, WLResourceRequest.PUT);

			return req.send().then(function (response) {
				return response.responseJSON;
			});
		},
		depositCheck: function (front, back) {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/accounts/deposit', WLResourceRequest.PUT);

			return req.sendFormParameters({
				front: front,
				back: back
			}).then(function (response) {
				return response.responseJSON;
			});
		},
		transferFunds: function (from, to, amount) {

			var req = new WLResourceRequest('/adapters/MobileFirstBank/accounts/transfer', WLResourceRequest.PUT);

			return req.sendFormParameters({
				src: from,
				dst: to,
				amount: amount
			}).then(function (response) {
				return response.responseJSON;
			}, function (error) {
				return WLJQ.Deferred().reject(error.responseJSON).promise();
			});
		},
		getAccounts: function () {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/accounts', WLResourceRequest.GET);
			return req.send().then(function (response) {
				return response.responseJSON.map(function (account) {

					var balance = parseFloat(account.balance);

					account.negative = balance < 0;
					account.balance = Util.currency(balance);


					return account;
				});
			});
		},
		getAllTransactions: function () {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/accounts/transactions', WLResourceRequest.GET);
			return req.send().then(function (response) {
				return response.responseJSON.map(function (transaction) {

					var amount = parseFloat(transaction.amount);

					transaction.negative = amount < 0;
					transaction.amount = Util.currency(amount);

					transaction.type = transaction.type.toLowerCase();
					transaction.date = Util.date(transaction.date);


					return transaction;
				});
			});
		},
		getTransactions: function (account) {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/accounts/' + account, WLResourceRequest.GET);
			return req.send().then(function (response) {
				return response.responseJSON.map(function (transaction) {

					var amount = parseFloat(transaction.amount);

					transaction.negative = amount < 0;
					transaction.amount = Util.currency(amount);

					transaction.type = transaction.type.toLowerCase();
					transaction.date = Util.date(transaction.date);


					return transaction;
				});
			});

		},
		getAtmLocations: function () {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/branches', WLResourceRequest.GET);
			return req.send().then(function (response) {
				return response.responseJSON;
			});
		},
		getAppointmentLocations: function () {
			var req = new WLResourceRequest('/adapters/MobileFirstBank/branches/appointment-locations', WLResourceRequest.GET);
			return req.send().then(function (response) {
				return response.responseJSON;
			});
		}
	};
});
