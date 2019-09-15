import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

class MapContainer extends Component {
  render() {
    const test = {
      doctors: [
        {
          uid: "12323443",
          lat: 28.549507,
          lng: 77.203613
        },
        {
          uid: "23237892",
          lat: 28.549999,
          lng: 77.199997
        }
      ]
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <GoogleMapComponent
              doctors={test.doctors}
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
    );
  }
}

export default MapContainer;
