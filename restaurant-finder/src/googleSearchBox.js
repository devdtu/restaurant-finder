import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import get from "lodash/get";
import head from "lodash/head";
// import { Search } from "../components";

const GOOGLE_API_KEY = "123";

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          console.log("onSearchBoxMountedCalled");
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          console.log("line 30");
          this.setState({
            places
          });
        }
      });
    }
  }),
  withScriptjs
)(props => {
  console.log(props);
  return (
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
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
        {props.places.map(
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
});

export default PlacesWithStandaloneSearchBox;

{
  /* <PlacesWithStandaloneSearchBox />; */
}

// const AddressSearchbox = compose(
//   withProps(props => {
//     return {
//       ...props,
//       googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWpENcpeYKhtVHiJArdrtiumOW42WA6Ac&v=3.exp&libraries=geometry,drawing,places`,
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />
//     };
//   }),
//   withScriptjs,
//   lifecycle({
//     componentDidMount() {
//       const refs = {};

//       this.setState({
//         places: [],
//         searchText: "",
//         error: null,
//         onSearchBoxMounted: ref => {
//           refs.searchBox = ref;
//         },
//         onPlacesChanged: () => {
//           const places = refs.searchBox.getPlaces();
//           this.setState({
//             places,
//             searchText: ""
//           });
//         }
//       });

//       //   ***
//       //   const geocoder = new google.maps.Geocoder();
//       //   geocoder.geocode({ address: this.props.placeName }, (results, status) => {
//       //   if (status === google.maps.DirectionsStatus.OK) {
//       //     const lngs = results[0].geometry.bounds.j;
//       //     const lats = results[0].geometry.bounds.l;
//       //     this.setState({
//       //       boundSearch: new google.maps.LatLngBounds(
//       //         new google.maps.LatLng(lats.l, lngs.l),
//       //         new google.maps.LatLng(lats.j, lngs.j)
//       //       ),
//       //     });
//       //   } else {
//       //     this.setState({
//       //       error: status,
//       //     });
//       //   }
//       //   ***
//       //   });
//     }
//   })
// )(props => {
//   return (
//     <div data-standalone-searchbox="">
//       <StandaloneSearchBox>
//         {/* <Search searchText={props.searchText} /> */}
//       </StandaloneSearchBox>
//       <div>{get(head(props.places), "formatted_address")}</div>
//     </div>
//   );
// });

// export default AddressSearchbox;

// {
//   /* <AddressSearchbox address="cleveland, oh" />; */
// }
