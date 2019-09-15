import React, { Component } from "react";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";

class App extends Component {
  state = {
    selectedRestaurant: null,
    restaurants: null
  };

  restaurantSelected = restaurant => {
    console.log(restaurant);
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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <ListContainer
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
