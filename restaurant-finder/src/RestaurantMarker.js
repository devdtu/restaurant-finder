import React from "react";
import { Marker } from "react-google-maps";
export default class RestaurantMarker extends React.Component {
  markerClicked = marker => {
    console.log(this.props);
    this.props.handleMarkerClick(this.props);
  };
  render() {
    return this.props.restaurant.label > 1 ? (
      <Marker
        onClick={this.markerClicked}
        position={this.props.location}
        label={this.props.restaurant.label.toString()}
      ></Marker>
    ) : (
      <Marker
        onClick={this.markerClicked}
        position={this.props.location}
      ></Marker>
    );
  }
}
