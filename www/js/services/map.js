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
app.factory('Map', function ($q, Analytics) {
	var map = null,
		isMapLoaded = false,
		infoWindows = [];

	function openInfoWindow() {

		var targetInfoWindow = null;

		for (var id in infoWindows) {
			var win = infoWindows[id];
			win.close();

			if (win.atmID === this.atmID) {
				targetInfoWindow = win;
			}
		}

		if (targetInfoWindow != null) {
			targetInfoWindow.open(map, this);

			Analytics.findATMLocation(this.atmID + ' - ' + this.address);
		}
	}


	return {
		load: function () {
			var defer = $q.defer();

			if (!isMapLoaded) {
				window.mapLoaded = defer.resolve;

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapLoaded';
				document.body.appendChild(script);

				return defer.promise.then(function () {
					return isMapLoaded = true;
				});

			} else {
				defer.resolve();
			}

			return defer.promise;
		},
		show: function (element) {

			var location = {
				latitude: 36.120700,
				longitude: -115.169628
			};

			var latitude = location.latitude;
			var longitude = location.longitude;

			var mapOptions = {
				zoom: 13,
				center: new google.maps.LatLng(latitude, longitude),
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_BOTTOM,
					style: google.maps.ZoomControlStyle.LARGE
				}
			};


			map = new google.maps.Map(element, mapOptions);

			google.maps.event.addListener(map, 'tilesloaded', function (evt) {
				google.maps.event.clearListeners(map);
			});
		},
		loadMarkers: function (markers) {
			infoWindows = [];

			markers.forEach(function (marker) {
				var mapMarker = new google.maps.Marker({
					map: map,
					position: {
						lat: marker.geometry.location.lat,
						lng: marker.geometry.location.lng
					},
					animation: google.maps.Animation.DROP,
					icon: 'images/app-map-marker.png'
				});


				mapMarker.address = marker.address;
				mapMarker.atmID = marker.id;

				var infoWindow = new google.maps.InfoWindow({
					content: marker.address,
					maxWidth: 200
				});

				infoWindow.atmID = marker.id;

				infoWindows.push(infoWindow);

				google.maps.event.addListener(mapMarker, 'click', openInfoWindow);
			});
		}
	};
});