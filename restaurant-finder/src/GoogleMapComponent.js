import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StandaloneSearchBox
} from "react-google-maps";
import RestaurantMarker from "./RestaurantMarker.js";

import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const GoogleMapComponent = withScriptjs(
  withGoogleMap(props => {
    const markerClicked = marker => {
      props.handlemarkerClick(marker);
    };

    const onPlacesChange = () => {
      const places = this.searchBox.getPlaces();
      this.setState({ places });
    };

    const markers = !props.selectedRestaurant
      ? props.restaurants.businesses.map(restaurant => (
          <RestaurantMarker
            handleMarkerClick={markerClicked}
            key={restaurant.id}
            restaurant={restaurant}
            location={{
              lat: parseFloat(restaurant.coordinates.latitude),
              lng: parseFloat(restaurant.coordinates.longitude)
            }}
          />
        ))
      : [
          <RestaurantMarker
            handleMarkerClick={markerClicked}
            key={props.selectedRestaurant.id}
            restaurant={props.selectedRestaurant}
            location={{
              lat: parseFloat(props.selectedRestaurant.coordinates.latitude),
              lng: parseFloat(props.selectedRestaurant.coordinates.longitude)
            }}
          />
        ];

    const centerCoordinates = !props.selectedRestaurant
      ? {
          lat: parseFloat(props.restaurants.region.center.latitude),
          lng: parseFloat(props.restaurants.region.center.longitude)
        }
      : {
          lat: parseFloat(props.selectedRestaurant.coordinates.latitude),
          lng: parseFloat(props.selectedRestaurant.coordinates.longitude)
        };

    return (
      <GoogleMap
        defaultZoom={14}
        center={{ lat: centerCoordinates.lat, lng: centerCoordinates.lng }}
      >
        <SearchBox
          ref={searchBox => (searchBox = searchBox)}
          onPlacesChanged={onPlacesChange}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </SearchBox>
        {markers}
      </GoogleMap>
    );
  })
);

export default GoogleMapComponent;
