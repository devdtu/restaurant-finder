import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RestaurantMarker from "./RestaurantMarker.js";

const GoogleMapComponent = withScriptjs(
  withGoogleMap(props => {
    var _map;
    var _zoom = 14;
    var finalRestaurantMarkerList = [];
    var indexesUsed = {};
    var clusters = {};
    var clusterCount = 0;
    var markersNew;

    const markerClicked = marker => {
      if (marker.restaurant.label > 1) {
        // _zoom = 16;
        // show all the restaurant's marker

        let newCenter = {
          lat: parseFloat(marker.restaurant.coordinates.latitude),
          lng: parseFloat(marker.restaurant.coordinates.longitude)
        };

        _map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
          newCenter
        );

        _map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(16);

        // showAllNodesOfCluster(marker.restaurant);

        // props.selectedRestaurant = {};
        // props.selectedRestaurant = null;
        // marker.setMap(_map);
      } else {
        props.handlemarkerClick(marker);
      }
    };

    // function showAllNodesOfCluster(restaurant) {
    //   var index = -1;
    //   for (let key in clusters) {
    //     if (clusters.hasOwnProperty(key)) {
    //       if (clusters[key][0].id === restaurant.id) {
    //         index = key;
    //       }
    //     }
    //   }

    //   if (index !== -1) {
    //     //add all the restaurant at that cluster index to finalRestaurantMarkerList
    //     // IMP - remove set label to 1 for all of it

    //     let restaurantsToAdd = clusters[index];

    //     restaurantsToAdd = restaurantsToAdd.map(item => {
    //       item.label = 1;
    //       return item;
    //     });

    //     console.log(index);
    //     console.log(restaurantsToAdd);

    //     let newRestaurantList = finalRestaurantMarkerList.filter(
    //       item => item.id !== restaurant.id
    //     );

    //     finalRestaurantMarkerList = [...newRestaurantList, ...restaurantsToAdd];
    //     console.log(finalRestaurantMarkerList);

    //     setMarkers();
    //     console.log(markers);
    //   }
    // }

    // function setMarkers() {
    //   markers = !props.selectedRestaurant
    //     ? finalRestaurantMarkerList.map(restaurant => (
    //         <RestaurantMarker
    //           handleMarkerClick={markerClicked}
    //           key={restaurant.id}
    //           restaurant={restaurant}
    //           location={{
    //             lat: parseFloat(restaurant.coordinates.latitude),
    //             lng: parseFloat(restaurant.coordinates.longitude)
    //           }}
    //         />
    //       ))
    //     : [
    //         <RestaurantMarker
    //           handleMarkerClick={markerClicked}
    //           key={props.selectedRestaurant.id}
    //           restaurant={props.selectedRestaurant}
    //           location={{
    //             lat: parseFloat(props.selectedRestaurant.coordinates.latitude),
    //             lng: parseFloat(props.selectedRestaurant.coordinates.longitude)
    //           }}
    //         />
    //       ];
    // }

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
          console.log(_map);
          console.log(map);
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
