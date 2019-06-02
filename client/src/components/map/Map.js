// import React from 'react';
// import ReactDOM from 'react-dom';
// import './map.css'

// const mapStyles = {
//   map: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%'
//   }
// };

// export class CurrentLocation extends React.Component {
//     constructor(props) {
//         super(props);
    
//         const { lat, lng } = this.props.initialCenter;
//         this.state = {
//           currentLocation: {
//             lat: lat,
//             lng: lng
//           }
//         };
//     }
    
//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.google !== this.props.google) {
//           this.loadMap();
//         }
//         if (prevState.currentLocation !== this.state.currentLocation) {
//           this.recenterMap();
//         }
//     }
//     recenterMap() {
//         const map = this.map;
//         const current = this.state.currentLocation;
    
//         const google = this.props.google;
//         const maps = google.maps;
    
//         if (map) {
//           let center = new maps.LatLng(current.lat, current.lng);
//           map.panTo(center);
//         }
//     }
//     componentDidMount() {
//         if (this.props.centerAroundCurrentLocation) {
//           if (navigator && navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(pos => {
//               const coords = pos.coords;
//               this.setState({
//                 currentLocation: {
//                   lat: coords.latitude,
//                   lng: coords.longitude
//                 }
//               });
//             });
//           }
//         }
//         this.loadMap();
//     }

    

//     loadMap() {
//         if (this.props && this.props.google) {
//           // checks if google is available
//           const { google } = this.props;
//           const maps = google.maps;
    
//           const mapRef = this.refs.map;
    
//           // reference to the actual DOM element
//           const node = ReactDOM.findDOMNode(mapRef);
    
//           let { zoom } = this.props;
//           const { lat, lng } = this.state.currentLocation;
//           const center = new maps.LatLng(lat, lng);
//           const mapConfig = Object.assign(
//             {},
//             {
//               center: center,
//               zoom: zoom
//             }
//           );
    
//           // maps.Map() is constructor that instantiates the map
//           this.map = new maps.Map(node, mapConfig);
          
//         }
//     }
    
//     renderChildren() {
//         const { children } = this.props;
    
//         if (!children) return;
    
//         return React.Children.map(children, c => {
//           if (!c) return;
//           return React.cloneElement(c, {
//             map: this.map,
//             google: this.props.google,
//             mapCenter: this.state.currentLocation
//           });
//         });
//     }
//     render() {
//         const style = Object.assign({}, mapStyles.map);
//        return (
//          <div>
//            <div style={style} ref="map">
//              Loading map...
//            </div>
           
//            {this.renderChildren()}
//          </div>
//        );
//     }
// }

// export default CurrentLocation;

// CurrentLocation.defaultProps = {
//   zoom: 14,
//   initialCenter: {
//     lat: -1.2884,
//     lng: 36.8233
//   },
//   centerAroundCurrentLocation: false,
//   visible: true
// };

import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MyMapComponent from './MapContainer'

class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 34.1286357,
        lng: 74.8448533
      },
      isMarkerShown: false
    }
  }

  componentWillUpdate(){
    this.getGeoLocation()
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation()
      this.setState({ isMarkerShown: true })
    }, 5000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            }
        )
    } else {
        // error => console.log(error)
    }
}

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
      />
    )
  }
}

export default Map;