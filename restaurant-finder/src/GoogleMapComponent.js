import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RestaurantMarker from "./RestaurantMarker.js";

const GoogleMapComponent = withScriptjs(
  withGoogleMap(props => {
    const markerClicked = marker => {
      props.handlemarkerClick(marker);
    };
    console.log(props);
    const markers = props.restaurants.businesses.map(restaurant => (
      <RestaurantMarker
        handleMarkerClick={markerClicked}
        key={restaurant.id}
        restaurant={restaurant}
        location={{
          lat: parseFloat(restaurant.coordinates.latitude),
          lng: parseFloat(restaurant.coordinates.longitude)
        }}
      />
    ));

    const centerCoordinates = {
      lat: parseFloat(props.restaurants.region.center.latitude),
      lng: parseFloat(props.restaurants.region.center.longitude)
    };

    console.log(markers);

    return (
      <GoogleMap
        defaultZoom={14}
        center={{ lat: centerCoordinates.lat, lng: centerCoordinates.lng }}
      >
        {markers}
      </GoogleMap>
    );
  })
);

export default GoogleMapComponent;
