import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import SearchBoxComponent from "./googleSearchBoxNew";

class MapContainer extends Component {
  markerReload = false;
  markerClicked = marker => {
    this.props.handlemarkerClick(marker.restaurant);
  };

  setMarkerReload = bool => {
    this.markerReload = bool;
    console.log(this.markerReload);
  };

  centerChanged = coord => {
    this.props.centerChanged(coord);
    // console.log(coord);
  };
  selfReference;
  constructor(props) {
    super(props);
    this.selfReference = this;
    this.setState({});
  }

  onSearchTextChange(place) {
    this.props.onSearchTextChanged(place);
  }

  onCenterChange(center) {
    console.log(center);
  }

  render() {
    return this.props.restaurants ? (
      <div className="container-fluid">
        <div className="search-box-container">
          {this.props.screenWidth > 767 ? (
            <SearchBoxComponent
              searchTextChange={this.onSearchTextChange.bind(
                this.selfReference
              )}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
            ></SearchBoxComponent>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="col-md-12 px-0">
            <GoogleMapComponent
              selectedRestaurant={this.props.selectedRestaurant}
              handlemarkerClick={this.markerClicked}
              centerChanged={this.centerChanged}
              restaurants={this.props.restaurants}
              markerReload={this.markerReload}
              setMarkerReload={this.setMarkerReload}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places`}
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
