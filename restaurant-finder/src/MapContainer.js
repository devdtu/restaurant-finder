import React, { Component } from "react";
import GoogleMapComponent from "./MapComponent";

class MapContainer extends Component {
  render() {
    const test = {
      markers: ["test", "test", "test", "test"]
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <GoogleMapComponent GoogleMapComponent={test}></GoogleMapComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default MapContainer;
