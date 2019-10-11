import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

class MapContainer extends Component {
  markerClicked = marker => {
    this.props.handlemarkerClick(marker.restaurant);
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.restaurants ? (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 px-0">
            <GoogleMapComponent
              selectedRestaurant={this.props.selectedRestaurant}
              handlemarkerClick={this.markerClicked}
              restaurants={this.props.restaurants}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAWpENcpeYKhtVHiJArdrtiumOW42WA6Ac&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div style={{ height: `100vh`, width: `100%` }} />
              }
              mapElement={<div style={{ height: `100%` }} />}
            ></GoogleMapComponent>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default MapContainer;
