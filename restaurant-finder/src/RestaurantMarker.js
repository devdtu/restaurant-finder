import React from "react";
import { Marker } from "react-google-maps";
export default class RestaurantMarker extends React.Component {
  testFunction = marker => {
    console.log(this.props);
    this.props.handleMarkerClick(this.props);
  };
  render() {
    return (
      <Marker
        onClick={this.testFunction}
        position={this.props.location}
      ></Marker>
    );
  }
}
