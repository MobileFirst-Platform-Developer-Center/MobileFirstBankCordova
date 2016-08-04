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
app.factory('Util', function ($q) {

	return {
		isNewToDevice: function(username) {
			var defer = $q.defer(),
				collection = {
					users: {
						searchFields: {id: 'string'}
					}
				},
				user = {
					id: username
				};

			WL.JSONStore.init(collection).then(function () {
				return WL.JSONStore.get('users').find(user, {});
			}).then(function (result) {
				if (result.length == 0) {
					return WL.JSONStore.get('users').add(user, {});
				}
				// user has already used this app
				defer.reject(user);
			}).then(function () {
				// user has never used this app
				defer.resolve(user);
			}).fail(function () {
				// error performing JSONStore Operations
				defer.resolve(user);
			});

			return defer.promise;
		},
		currency: function (value) {
			return parseFloat(value).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		prefixZero: function (val) {
			if (val / 10 < 1) {
				return '0' + val;
			}

			return val;
		},
		date: function (timestamp) {
			var date = new Date(timestamp),
				month = date.getMonth() + 1,
				day = date.getDate(),
				year = date.getFullYear() % 100;

			return this.prefixZero(month) + '.' + this.prefixZero(day) + '.' + this.prefixZero(year);
		},
		time: function (timestamp) {
			var date = new Date(timestamp),
				hours = date.getHours() % 12,
				minutes = date.getMinutes(),
				meridiem = parseInt(date.getHours() / 12) === 0 ? 'AM' : 'PM';

			return this.prefixZero(hours === 0 ? 12 : hours) + ':' + this.prefixZero(minutes) + ' ' + meridiem;
		}
	};
});



