import React, { Component, useCallback } from "react";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";
import { GetRestaurants } from "./service";

const params = {
  term: "restaurants",
  location: "Peachtree Corners, GA, US",
  offset: 19
};
class App extends Component {
  state = {
    selectedRestaurant: null,
    restaurants: null
  };

  restaurantSelected = restaurant => {
    this.setState(
      {
        selectedRestaurant: restaurant,
        restaurant: this.state.restaurants ? [...this.state.restaurants] : null
      },
      () => {
        console.log(this.state);
      }
    );
  };

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      this.setState({ restaurants: JSON.parse(xhr.responseText) }, () => {
        console.log(this.state);
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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <ListContainer
                  restaurants={this.state.restaurants}
                  selectedRestaurant={this.state.selectedRestaurant}
                ></ListContainer>
              </div>
              <div className="col-md-8">
                <MapContainer
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
