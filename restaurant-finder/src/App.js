import React, { Component, useCallback } from "react";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";

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
    this.setState(
      {
        selectedRestaurant: restaurant
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  componentDidMount() {
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
      this.setState({ restaurants: JSON.parse(xhr.responseText) }, () => {
        console.log(this.state);
      });
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
    console.log(address);
    this.getRestaurants(address);
    console.log(place);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4 px-0">
                <ListContainer
                  restaurants={this.state.restaurants}
                  selectedRestaurant={this.state.selectedRestaurant}
                  selectRestaurant={this.restaurantSelected}
                  deSelectRestaurant={this.deSelectRestaurant.bind(
                    this.selfReference
                  )}
                ></ListContainer>
              </div>
              <div className="col-md-8 px-0">
                <MapContainer
                  onSearchTextChanged={this.searchTextChanged.bind(
                    this.selfReference
                  )}
                  selectedRestaurant={this.state.selectedRestaurant}
                  restaurants={this.state.restaurants}
                  handlemarkerClick={this.restaurantSelected}
                ></MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
