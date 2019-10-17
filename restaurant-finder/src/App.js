import React, { Component, useCallback } from "react";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";
import SwitchButton from "./switch-button";
import SearchBoxComponent from "./googleSearchBoxNew";

class App extends Component {
  state = {
    selectedRestaurant: null,
    restaurants: null
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

  resize() {
    const stateObject = { screenWidth: window.innerWidth };
    if (window.innerWidth < 768) {
      stateObject.switchMap = true;
    }

    console.log(stateObject);
    this.setState(stateObject, () => {
      console.log(this.state);
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      this.setState({ restaurants: JSON.parse(xhr.responseText) }, () => {
        // console.log(this.state);
      });
    });
    xhr.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=Peachtree Corners, GA, US&offset=19"
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
    xhr.addEventListener("load", () => {
      this.setState(
        { restaurants: JSON.parse(xhr.responseText), selectedRestaurant: null },
        () => {
          console.log(this.state);
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
                    selectedRestaurant={this.state.selectedRestaurant}
                    restaurants={this.state.restaurants}
                    handlemarkerClick={this.restaurantSelected}
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
