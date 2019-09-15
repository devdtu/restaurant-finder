import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text} sfafd</div>;

class GoogleMapComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const { markers } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAWpENcpeYKhtVHiJArdrtiumOW42WA6Ac" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* {this.props.markers.map(marker => (
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          ))} */}
          <AnyReactComponent lat={59.955413} lng={31.337844} text="My Marker" />
          <AnyReactComponent lat={59.955413} lng={32.337844} text="My Marker" />
          <AnyReactComponent lat={59.955413} lng={33.337844} text="My Marker" />
          <AnyReactComponent lat={59.955413} lng={34.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapComponent;
