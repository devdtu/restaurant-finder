import React from "react";
import { Marker } from "react-google-maps";
export default class RestaurantMarker extends React.Component {
  markerClicked = marker => {
    this.props.handleMarkerClick(this.props);
  };
  render() {
    return (
      <Marker
        onClick={this.markerClicked}
        position={this.props.location}
      ></Marker>
    );
  }
}
