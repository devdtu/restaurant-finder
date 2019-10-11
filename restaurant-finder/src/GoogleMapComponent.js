import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RestaurantMarker from "./RestaurantMarker.js";

const GoogleMapComponent = withScriptjs(
  withGoogleMap(props => {
    const markerClicked = marker => {
      props.handlemarkerClick(marker);
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
        {markers}
      </GoogleMap>
    );
  })
);

export default GoogleMapComponent;
