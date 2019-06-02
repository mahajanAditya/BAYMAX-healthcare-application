// import React, { Component } from "react";
// import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
// import CurrentLocation from './Map';
// import './test.html'
// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {}
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });

//   onClose = props => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };

//   componentDidMount() {
//     console.log("in mount")
//     var service = new this.props.google.maps.places.PlacesService(this.map);
//           var getNextPage = null;
//             var moreButton = document.getElementById('more');
//             moreButton.onclick = function() {
//                 moreButton.disabled = true;
//                 if (getNextPage) getNextPage();
//             };

//             // Perform a nearby search.
//             service.nearbySearch(
//                 {location: this.state.currentLocation, radius: 500, type: ['store']},
//                 function(results, status, pagination) {
//                     if (status !== 'OK') return;

//                     this.createMarkers(results);
//                     moreButton.disabled = !pagination.hasNextPage;
//                     getNextPage = pagination.hasNextPage && function() {
//                     pagination.nextPage();
//                     };
//                 });
//   }
//   createMarkers(places) {
//     // google = this.props.google
//     var bounds = new this.props.google.maps.LatLngBounds();
//     var placesList = document.getElementById('places');
  
//     for (var i = 0, place; place = places[i]; i++) {
//       var image = {
//         url: place.icon,
//         size: new this.props.google.maps.Size(71, 71),
//         origin: new this.props.google.maps.Point(0, 0),
//         anchor: new this.props.google.maps.Point(17, 34),
//         scaledSize: new this.props.google.maps.Size(25, 25)
//       };
  
//       var marker = new this.props.google.maps.Marker({
//         map: this.map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location
//       });
//       console.log("hi")
//       var li = document.createElement('li');
//       li.textContent = place.name;
//       placesList.appendChild(li);
  
//       bounds.extend(place.geometry.location);
//     }
//     this.map.fitBounds(bounds);
//   }
//   render() {
//     return (
//       <CurrentLocation
//         centerAroundCurrentLocation
//         google={this.props.google}
//       >
//         <Marker onClick={this.onMarkerClick} name={'current location'} />
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//         </InfoWindow>
//         <div id="right-panel">
//                 <h2>Results</h2>
//                 <ul id="places"></ul>
//                 <button id="more">More results</button>
//         </div>
//       </CurrentLocation>
      
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAjUeoBDfaJI_BHzLe7Qssf9IunNiGpk90'
// })(MapContainer);

import React from "react"
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
/*global google*/
const google = window.google = window.google ? window.google : {}
const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUplQSVBYRjv0D87QKYOuAbdBmFgLbuHY&libraries=places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                let places;
                const bounds = refs.map.getBounds();
                console.log("in fetch")
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: ['hospital']
                };
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        updatePlaces(results);
                    }
                })
            }
        }
    }),
)((props) => {
    return (
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={8}
            defaultCenter={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
        >{console.log(props)}
            {props.places && props.places.map((place, i) =>
                <Marker title={place.name} key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )}
        </GoogleMap>
    )
})

// export default class MapContainer extends React.PureComponent {
//     render() {
//         return (
//             <MyMapComponent />
//         )
//     }
// }
export default MyMapComponent