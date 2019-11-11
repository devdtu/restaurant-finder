import React, { Component, useCallback } from "react";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";
import SwitchButton from "./switch-button";
import SearchBoxComponent from "./googleSearchBoxNew";

class App extends Component {
  finalRestaurantMarkerList = [];
  indexesUsed = {};
  clusters = {};
  clusterCount = 0;
  markersNew;

  state = {
    selectedRestaurant: null,
    restaurants: null,
    offset: 20,
    location: "Peachtree Corners, GA"
  };

  selfReference;

  constructor(props) {
    super(props);
    this.selfReference = this;
  }

  restaurantSelected = restaurant => {
    const stateObject = { selectedRestaurant: restaurant };
    if (window.innerWidth < 768) {
      stateObject.switchMap = true;
    }

    this.setState(stateObject, () => {
      // console.log(this.state);
    });
  };

  // Converts numeric degrees to radians
  toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  calculateDistance(restaurant1, restaurant2) {
    // coordinates
    var distance = this.calcCrow(
      restaurant1.coordinates.latitude,
      restaurant1.coordinates.longitude,
      restaurant2.coordinates.latitude,
      restaurant2.coordinates.longitude
    );
    return distance;
  }

  developCluster() {
    if (this.state.restaurants.businesses) {
      this.state.restaurants.businesses.forEach((element, index) => {
        let clusterNodes = [];
        for (
          let i = index + 1;
          i < this.state.restaurants.businesses.length;
          i++
        ) {
          if (!this.indexesUsed[i]) {
            let distance = this.calculateDistance(
              element,
              this.state.restaurants.businesses[i]
            );

            if (distance < 3) {
              clusterNodes.push(this.state.restaurants.businesses[i]);
              this.indexesUsed[i] = 1;
            }
          }
        }

        if (clusterNodes.length) {
          this.clusters[this.clusterCount] = [...clusterNodes, element];
          this.clusterCount = this.clusterCount + 1;
        } else {
          if (!this.indexesUsed[index]) {
            this.clusters[this.clusterCount] = [element];
            this.clusterCount = this.clusterCount + 1;
          }
        }
      });

      console.log(this.clusters);
    }

    for (let key in this.clusters) {
      if (this.clusters.hasOwnProperty(key)) {
        console.log(key);
        let restaurant = this.clusters[key][0];
        restaurant.label = this.clusters[key].length;
        this.finalRestaurantMarkerList.push(restaurant);
      }
    }

    this.setState({
      cluster: JSON.parse(JSON.stringify(this.clusters)),
      finalRestaurantMarkerList: [...this.finalRestaurantMarkerList]
    });
    console.log(this.finalRestaurantMarkerList);
  }

  centerChanged = coord => {
    // console.log(coord);
    this.GetNewRestaurantsReCenter(coord);
  };

  GetNewRestaurantsReCenter(coord) {
    // fetch rest using coord
    var xhr = new XMLHttpRequest();
    console.log(coord);
    xhr.addEventListener("load", () => {
      // console.log(this.state.restaurants);
      // console.log(JSON.parse(xhr.responseText));

      let newRestaurantsList = JSON.parse(xhr.responseText);

      newRestaurantsList.businesses = [
        ...newRestaurantsList.businesses,
        ...this.state.restaurants.businesses
      ];

      this.setState(
        {
          restaurants: newRestaurantsList
          // selectedRestaurant: null
          // location: address,
          // offset: 20
        },
        () => {
          this.developCluster();
          console.log(this.state.restaurants);
          // console.log(this.state);
        }
      );
    });
    var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${coord.lat}&longitude=${coord.lng}`;
    xhr.open("GET", url);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " +
        "wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx"
    );
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send();
  }

  resize() {
    const stateObject = { screenWidth: window.innerWidth };
    if (window.innerWidth < 768) {
      stateObject.switchMap = true;
    }

    this.setState(stateObject, () => {
      // console.log(this.state);
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      this.setState({ restaurants: JSON.parse(xhr.responseText) }, () => {
        // console.log(this.state);
        this.developCluster();
      });
    });
    xhr.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=Peachtree Corners, GA, US"
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " +
        "wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx"
    );
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send();
  }

  getRestaurants(address) {
    var xhr = new XMLHttpRequest();
    console.log(address);
    xhr.addEventListener("load", () => {
      this.setState(
        {
          restaurants: JSON.parse(xhr.responseText),
          selectedRestaurant: null,
          location: address,
          offset: 20
        },
        () => {
          // console.log(this.state);
          this.developCluster();
        }
      );
    });
    var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}`;
    xhr.open("GET", url);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " +
        "wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx"
    );
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send();
  }

  deSelectRestaurant() {
    this.setState({ selectedRestaurant: null });
  }

  searchTextChanged(place) {
    let address = place.formatted_address;
    this.getRestaurants(address);
  }

  switchChanged() {
    this.setState({ switchMap: !this.state.switchMap }, () => {
      // console.log(this.state);
    });
  }

  loadMore() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      let restaurants = JSON.parse(xhr.responseText);
      if (this.state.restaurants && restaurants.businesses) {
        const restaurantsState = this.state.restaurants;
        restaurants.businesses.forEach(restaurant => {
          restaurantsState.businesses.push(restaurant);
        });
        this.setState(
          {
            restaurants: restaurantsState,
            selectedRestaurant: null,
            offset: this.state.offset + 20
          },
          () => {
            this.developCluster();
            // console.log(this.state);
          }
        );
      }
    });
    var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${this.state.location}&offset=${this.state.offset}`;
    xhr.open("GET", url);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " +
        "wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx"
    );
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {this.state.screenWidth < 768 ? (
              <div className="row d-flex align-items-center pt-2 font-weight-bold text-white switch-container">
                <div className="col-md-12">
                  <div className="d-flex justify-content-center">
                    <SearchBoxComponent
                      searchTextChange={this.searchTextChanged.bind(
                        this.selfReference
                      )}
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places`}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px` }} />}
                    ></SearchBoxComponent>
                  </div>
                  <div className="row pt-2 d-flex justify-content-center">
                    <div className="col-auto">Show on map</div>
                    <div className="col-auto">
                      <SwitchButton
                        props={this.state.switchMap}
                        switchChanged={this.switchChanged.bind(
                          this.selfReference
                        )}
                      ></SwitchButton>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="row content-wrap">
              {this.state.switchMap || this.state.screenWidth > 767 ? (
                <div className="col-md-5 col-xl-4 px-0">
                  <ListContainer
                    restaurants={this.state.restaurants}
                    selectedRestaurant={this.state.selectedRestaurant}
                    selectRestaurant={this.restaurantSelected}
                    loadMore={this.loadMore.bind(this.selfReference)}
                    deSelectRestaurant={this.deSelectRestaurant.bind(
                      this.selfReference
                    )}
                  ></ListContainer>
                </div>
              ) : (
                ""
              )}

              {!this.state.switchMap || this.state.screenWidth > 767 ? (
                <div className="col-md-7 col-xl-8 px-0">
                  <MapContainer
                    screenWidth={this.state.screenWidth}
                    onSearchTextChanged={this.searchTextChanged.bind(
                      this.selfReference
                    )}
                    finalRestaurantMarkerList={
                      this.state.finalRestaurantMarkerList
                    }
                    selectedRestaurant={this.state.selectedRestaurant}
                    restaurants={this.state.restaurants}
                    handlemarkerClick={this.restaurantSelected}
                    centerChanged={this.centerChanged}
                  ></MapContainer>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
