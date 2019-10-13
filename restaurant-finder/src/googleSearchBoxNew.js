import React, { Component } from "react";
import { render } from "react-dom";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { withScriptjs } from "react-google-maps";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      places: []
    };
  }

  onPlacesChange = () => {
    console.log("onPlacesChange called");
    const places = this.searchBox.getPlaces();
    console.log(places);
    this.setState({ places });
  };

  render() {
    return (
      <div>
        <p>Start editing to see some magic happen :)</p>
        <StandaloneSearchBox
          onPlacesChanged={this.onPlacesChange}
          ref={searchBox => (this.searchBox = searchBox)}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </StandaloneSearchBox>
        <ol>
          {this.state.places.map(
            ({ place_id, formatted_address, geometry: { location } }) => (
              <li key={place_id}>
                {formatted_address}
                {" at "}({location.lat()}, {location.lng()})
              </li>
            )
          )}
        </ol>
      </div>
    );
  }
}

const AppHoc = withScriptjs(App);

export default AppHoc;
