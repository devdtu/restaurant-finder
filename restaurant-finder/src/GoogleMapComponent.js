import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RestaurantMarker from "./RestaurantMarker.js";

const GoogleMapComponent = withScriptjs(
  withGoogleMap(props => {
    const markers = props.doctors.map(doctor => (
      <RestaurantMarker
        key={doctor.uid}
        doctor={doctor}
        location={{
          lat: parseFloat(doctor.lat),
          lng: parseFloat(doctor.lng)
        }}
      />
    ));
    return (
      <GoogleMap defaultZoom={14} center={{ lat: 28.549999, lng: 77.199997 }}>
        {markers}
      </GoogleMap>
    );
  })
);

export default GoogleMapComponent;
