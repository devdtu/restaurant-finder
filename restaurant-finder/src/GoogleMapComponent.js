import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RestaurantMarker from "./RestaurantMarker.js";

const GoogleMapComponent = withScriptjs(
  withGoogleMap(props => {
    var _map;
    var _zoom = 12;
    var finalRestaurantMarkerList = [];
    var indexesUsed = {};
    var clusters = {};
    var clusterCount = 0;
    var markersNew;

    const markerClicked = marker => {
      if (marker.restaurant.label > 1) {
        let newCenter = {
          lat: parseFloat(marker.restaurant.coordinates.latitude),
          lng: parseFloat(marker.restaurant.coordinates.longitude)
        };

        let mapReference = _map;

        setTimeout(() => {
          mapReference.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
            newCenter
          );

          mapReference.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(
            15
          );
          _zoom = null;
        }, 1000);
        props.handleClusterClick(marker);
      } else {
        props.handlemarkerClick(marker);
      }
    };

    let markers = !props.selectedRestaurant
      ? props.finalRestaurantMarkerList.map(restaurant => (
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

    var test = function(a, b, c) {
      let center = _map.getCenter();
      let lat = center.lat(),
        lng = center.lng();
      props.centerChanged({
        lat: lat,
        lng: lng
      });
    };

    return (
      <GoogleMap
        ref={map => {
          _map = map;
        }}
        defaultZoom={_zoom}
        center={{ lat: centerCoordinates.lat, lng: centerCoordinates.lng }}
        onDragEnd={test}
      >
        {markers}
      </GoogleMap>
    );
  })
);

export default GoogleMapComponent;
