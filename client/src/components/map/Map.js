import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './map.css'
const google = window.google;
var map;
console.log("in map.js")
class Map extends Component {
  

// createMarkers = (places) => {
//   var bounds = new google.maps.LatLngBounds();
//   var placesList = document.getElementById('places');

//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });

//     var li = document.createElement('li');
//     li.textContent = place.name;
//     placesList.appendChild(li);

//     bounds.extend(place.geometry.location);
//   }
//   map.fitBounds(bounds);
// }
// initMap = () =>  {
//   // Create the map.
//   var pyrmont = {lat: 34.1252, lng: 74.8374};
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: pyrmont,
//     zoom: 17
//   });

//   // Create the places service.
//   var service = new google.maps.places.PlacesService(map);
//   var getNextPage = null;
//   var moreButton = document.getElementById('more');
//   moreButton.onclick = function() {
//     moreButton.disabled = true;
//     if (getNextPage) getNextPage();
//   };

//   // Perform a nearby search.
//   service.nearbySearch(
//       {location: pyrmont, radius: 500, type: ['hospital']},
//       function(results, status, pagination) {
//         if (status !== 'OK') return;

//         this.createMarkers(results);
//         moreButton.disabled = !pagination.hasNextPage;
//         getNextPage = pagination.hasNextPage && function() {
//           pagination.nextPage();
//         };
//       });
// }
// componentDidMount() {
//   fetch("https://maps.googleapis.com/maps/api/js?key=AIzaSyBGoviyqJcjxzKIRaPp1k1yNewIdpsgs5Q&libraries=places&callback=initMap")
// }
  render() {
    return (

      <div id="map">
        <div id="right-panel">
          <h2>Results</h2>
          <ul id="places"></ul>
          <button id="more">More results</button>
        </div>
      </div>
    )
  }
}

export default Map;