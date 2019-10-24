import React, { Component } from "react";
import { render } from "react-dom";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { withScriptjs } from "react-google-maps";

class App extends Component {
  constructor() {
    super();
  }

  onPlacesChange = () => {
    const places = this.searchBox.getPlaces();
    console.log(places);

    this.props.searchTextChange(places[0]);
  };

  render() {
    return (
      <div>
        <StandaloneSearchBox
          onPlacesChanged={this.onPlacesChange}
          ref={searchBox => (this.searchBox = searchBox)}
        >
          <input
            type="text"
            placeholder="Select Region"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `350px`,
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
      </div>
    );
  }
}

const SearchBoxComponent = withScriptjs(App);

export default SearchBoxComponent;
