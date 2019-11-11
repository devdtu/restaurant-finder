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

        showAllNodesOfCluster(marker.restaurant);

        // props.selectedRestaurant = {};
        // props.selectedRestaurant = null;
        // marker.setMap(_map);
      } else {
        props.handlemarkerClick(marker);
      }
    };

    function showAllNodesOfCluster(restaurant) {
      var index = -1;
      for (let key in clusters) {
        if (clusters.hasOwnProperty(key)) {
          if (clusters[key][0].id === restaurant.id) {
            index = key;
          }
        }
      }

      if (index !== -1) {
        //add all the restaurant at that cluster index to finalRestaurantMarkerList
        // IMP - remove set label to 1 for all of it

        let restaurantsToAdd = clusters[index];

        restaurantsToAdd = restaurantsToAdd.map(item => {
          item.label = 1;
          return item;
        });

        console.log(index);
        console.log(restaurantsToAdd);

        let newRestaurantList = finalRestaurantMarkerList.filter(
          item => item.id !== restaurant.id
        );

        finalRestaurantMarkerList = [...newRestaurantList, ...restaurantsToAdd];
        console.log(finalRestaurantMarkerList);

        setMarkers();
        console.log(markers);
      }
    }

    function setMarkers() {
      markers = !props.selectedRestaurant
        ? finalRestaurantMarkerList.map(restaurant => (
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
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
      return (Value * Math.PI) / 180;
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = toRad(lat2 - lat1);
      var dLon = toRad(lon2 - lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    }

    var calculateDistance = function(restaurant1, restaurant2) {
      // coordinates
      var distance = calcCrow(
        restaurant1.coordinates.latitude,
        restaurant1.coordinates.longitude,
        restaurant2.coordinates.latitude,
        restaurant2.coordinates.longitude
      );
      return distance;
    };

    if (props.restaurants.businesses) {
      props.restaurants.businesses.forEach((element, index) => {
        let clusterNodes = [];
        for (let i = index + 1; i < props.restaurants.businesses.length; i++) {
          if (!indexesUsed[i]) {
            let distance = calculateDistance(
              element,
              props.restaurants.businesses[i]
            );

            if (distance < 3) {
              clusterNodes.push(props.restaurants.businesses[i]);
              indexesUsed[i] = 1;
            }
          }
        }

        if (clusterNodes.length) {
          clusters[clusterCount] = [...clusterNodes, element];
          clusterCount = clusterCount + 1;
        } else {
          if (!indexesUsed[index]) {
            clusters[clusterCount] = [element];
            clusterCount = clusterCount + 1;
          }
        }
      });
      console.log(clusters);
    }

    for (let key in clusters) {
      if (clusters.hasOwnProperty(key)) {
        console.log(key);
        let restaurant = clusters[key][0];
        restaurant.label = clusters[key].length;
        finalRestaurantMarkerList.push(restaurant);
      }
    }
    console.log(finalRestaurantMarkerList);

    let markers = !props.selectedRestaurant
      ? finalRestaurantMarkerList.map(restaurant => (
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
